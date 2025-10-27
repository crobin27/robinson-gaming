import { useEffect, useMemo, useRef, useState } from 'react';

type Suit = '♠' | '♥' | '♦' | '♣';

type Rank =
  | 'A'
  | 'K'
  | 'Q'
  | 'J'
  | '10'
  | '9'
  | '8'
  | '7'
  | '6'
  | '5'
  | '4'
  | '3'
  | '2';

type StageName =
  | 'Pre-Flop'
  | 'Flop'
  | 'Flop Betting'
  | 'Turn'
  | 'Turn Betting'
  | 'River'
  | 'River Betting'
  | 'Showdown';

type Card = {
  suit: Suit;
  rank: Rank;
};

type Player = {
  id: number;
  name: string;
  hand: Card[];
  bets: { stage: StageName; amount: number }[];
  isWinner: boolean;
};

type GameState = {
  players: Player[];
  community: Card[];
  pot: number;
  currentStage: StageName;
  log: string[];
  winnerId: number | null;
};

type TimeoutId = ReturnType<typeof setTimeout>;

const suits: Suit[] = ['♠', '♥', '♦', '♣'];
const ranks: Rank[] = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];

const PLAYER_COUNT = 7;

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const createDeck = () => {
  const deck: Card[] = [];
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      deck.push({ suit, rank });
    });
  });
  return deck;
};

const shuffleDeck = (deck: Card[]) => {
  for (let i = deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

const formatCard = (card: Card | undefined) => (card ? `${card.rank}${card.suit}` : '');

const CHIP_ASSETS = [
  'images/chips-red.png',
  'images/chips-blue.png',
  'images/chips-green.png',
  'images/chips-black.png',
];

const CARD_ASSET_TEMPLATE = 'images/cards/{rank}_of_{suit}.png';

const PokerTableClient = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    community: [],
    pot: 0,
    currentStage: 'Pre-Flop',
    log: [],
    winnerId: null,
  });

  const timeouts = useRef<TimeoutId[]>([]);
  const deckRef = useRef<Card[]>([]);

  const availableAssets = useMemo(
    () => ({
      chips: CHIP_ASSETS,
      cardTemplate: CARD_ASSET_TEMPLATE,
    }),
    []
  );

  useEffect(() => {
    startNewGame();
    return () => {
      timeouts.current.forEach((timeoutId: TimeoutId) => clearTimeout(timeoutId));
      timeouts.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleStage = (delay: number, stage: StageName, callback: () => void) => {
    const timeoutId = setTimeout(() => {
      setGameState((prev: GameState) => ({ ...prev, currentStage: stage }));
      callback();
    }, delay);
    timeouts.current.push(timeoutId);
  };

  const drawCards = (count: number) => {
    const cards: Card[] = [];
    for (let i = 0; i < count; i += 1) {
      const card = deckRef.current.pop();
      if (card) {
        cards.push(card);
      }
    }
    return cards;
  };

  const addBettingRound = (stage: StageName) => {
    setGameState((prev: GameState) => {
      const betEvents: { player: Player; amount: number }[] = prev.players.map((player: Player) => ({
        player,
        amount: randomInt(10, 120),
      }));

      const updatedPlayers = prev.players.map((player: Player, index: number) => ({
        ...player,
        bets: [...player.bets, { stage, amount: betEvents[index].amount }],
      }));

      const logEntries = [
        `${stage} begins.`,
        ...betEvents.map(
          (event: { player: Player; amount: number }) =>
            `${event.player.name} bets ${event.amount} chips.`
        ),
      ];

      const potIncrease = betEvents.reduce(
        (sum: number, event: { player: Player; amount: number }) => sum + event.amount,
        0
      );

      return {
        ...prev,
        players: updatedPlayers,
        pot: prev.pot + potIncrease,
        log: [...prev.log, ...logEntries],
      };
    });
  };

  const startNewGame = () => {
    timeouts.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeouts.current = [];

    const deck = createDeck();
    shuffleDeck(deck);
    deckRef.current = deck;

    const players: Player[] = Array.from({ length: PLAYER_COUNT }, (_, index) => ({
      id: index + 1,
      name: `Player ${index + 1}`,
      hand: drawCards(2),
      bets: [],
      isWinner: false,
    }));

    setGameState({
      players,
      community: [],
      pot: 0,
      currentStage: 'Pre-Flop',
      log: [
        'A new hand is dealt.',
        ...players.map((player: Player) => `${player.name} receives ${formatCard(player.hand[0])} and ${formatCard(player.hand[1])}.`),
      ],
      winnerId: null,
    });

    scheduleStage(2000, 'Flop', () => {
      const flop = drawCards(3);
      setGameState((prev: GameState) => ({
        ...prev,
        community: flop,
        log: [
          ...prev.log,
          `The flop reveals ${flop.map((card: Card) => formatCard(card)).join(', ')}.`,
        ],
      }));
    });

    scheduleStage(3500, 'Flop Betting', () => {
      addBettingRound('Flop Betting');
    });

    scheduleStage(5000, 'Turn', () => {
      const turn = drawCards(1)[0];
      setGameState((prev: GameState) => ({
        ...prev,
        community: [...prev.community, turn],
        log: [...prev.log, `The turn is ${formatCard(turn)}.`],
      }));
    });

    scheduleStage(6500, 'Turn Betting', () => {
      addBettingRound('Turn Betting');
    });

    scheduleStage(8000, 'River', () => {
      const river = drawCards(1)[0];
      setGameState((prev: GameState) => ({
        ...prev,
        community: [...prev.community, river],
        log: [...prev.log, `The river is ${formatCard(river)}.`],
      }));
    });

    scheduleStage(9500, 'River Betting', () => {
      addBettingRound('River Betting');
    });

    scheduleStage(11000, 'Showdown', () => {
      setGameState((prev: GameState) => {
        const winnerIndex = randomInt(0, prev.players.length - 1);
        const updatedPlayers = prev.players.map((player: Player, index: number) => ({
          ...player,
          isWinner: index === winnerIndex,
        }));

        return {
          ...prev,
          players: updatedPlayers,
          winnerId: updatedPlayers[winnerIndex]?.id ?? null,
          log: [
            ...prev.log,
            `${updatedPlayers[winnerIndex]?.name ?? 'A player'} wins the pot of ${prev.pot} chips!`,
            'The dealer shuffles for the next hand.',
          ],
        };
      });
    });

    scheduleStage(15000, 'Pre-Flop', () => {
      startNewGame();
    });
  };

  return (
    <div className="poker-table-container">
      <header className="table-header">
        <h2>Casino Royale: Seven-Player Poker</h2>
        <p className="stage-indicator">Current Stage: {gameState.currentStage}</p>
        <div className="pot-display">Pot Size: {gameState.pot} chips</div>
      </header>

      <section className="table-surface">
        <div className="felt-texture">
          <div className="table-rail" />
          <div className="community-cards">
            {Array.from({ length: 5 }).map((_, index: number) => {
              const card = gameState.community[index];
              return (
                <div
                  className={`card-slot ${card ? 'revealed' : ''}`}
                  key={`community-${index}`}
                  aria-label={card ? `Community card ${formatCard(card)}` : 'Community card slot'}
                >
                  {card ? formatCard(card) : '🂠'}
                </div>
              );
            })}
          </div>

          <ul className="player-ring">
            {gameState.players.map((player: Player) => (
              <li
                key={player.id}
                className={`player ${player.isWinner ? 'winner' : ''}`}
                aria-label={`${player.name} ${player.isWinner ? 'wins the hand' : ''}`.trim()}
              >
                <div className="player-info">
                  <h3>{player.name}</h3>
                  <div className="player-hand">
                    {player.hand.map((card: Card, index: number) => (
                      <span key={`${player.id}-card-${index}`} className="card-slot revealed">
                        {formatCard(card)}
                      </span>
                    ))}
                  </div>
                  <ul className="bet-list">
                    {player.bets.map((bet: { stage: StageName; amount: number }) => (
                      <li key={`${player.id}-${bet.stage}`}>{bet.stage}: {bet.amount} chips</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="sidebar">
        <div className="asset-callout">
          <h4>Suggested Assets</h4>
          <p>Recommended image files for visual polish:</p>
          <ul>
            {availableAssets.chips.map((chip: string) => (
              <li key={chip}>{chip}</li>
            ))}
            <li>{availableAssets.cardTemplate}</li>
          </ul>
        </div>
        <div className="log">
          <h4>Dealer Announcements</h4>
          <ol>
            {gameState.log.map((entry: string, index: number) => (
              <li key={`log-${index}`}>{entry}</li>
            ))}
          </ol>
        </div>
        <button type="button" className="restart" onClick={startNewGame}>
          Deal New Hand
        </button>
      </aside>
    </div>
  );
};

export default PokerTableClient;
