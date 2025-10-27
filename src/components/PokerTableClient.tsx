import { useEffect, useMemo, useRef, useState } from "react";

type Suit = "♠" | "♥" | "♦" | "♣";

type Rank =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "10"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

type StageName =
  | "Pre-Flop"
  | "Flop"
  | "Flop Betting"
  | "Turn"
  | "Turn Betting"
  | "River"
  | "River Betting"
  | "Showdown";

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

const suits: Suit[] = ["♠", "♥", "♦", "♣"];
const ranks: Rank[] = [
  "A",
  "K",
  "Q",
  "J",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const PLAYER_COUNT = 7;

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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

const formatCard = (card: Card | undefined) =>
  card ? `${card.rank}${card.suit}` : "";

const getCardImagePath = (card: Card | undefined): string => {
  if (!card) return "/images/playing-cards/Back Blue 1.png";

  // Map rank to number (A=1, 2-10=2-10, J=11, Q=12, K=13)
  const rankMap: Record<Rank, string> = {
    A: "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    J: "11",
    Q: "12",
    K: "13",
  };

  // Map suit symbol to suit name
  const suitMap: Record<Suit, string> = {
    "♠": "Spades",
    "♥": "Hearts",
    "♦": "Diamond",
    "♣": "Clubs",
  };

  const rankNumber = rankMap[card.rank];
  const suitName = suitMap[card.suit];

  return `/images/playing-cards/${suitName} ${rankNumber}.png`;
};

const CHIP_ASSETS = [
  "images/chips-red.png",
  "images/chips-blue.png",
  "images/chips-green.png",
  "images/chips-black.png",
];

const CARD_ASSET_TEMPLATE = "images/cards/{rank}_of_{suit}.png";

const PokerTableClient = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    community: [],
    pot: 0,
    currentStage: "Pre-Flop",
    log: [],
    winnerId: null,
  });

  const timeouts = useRef<TimeoutId[]>([]);
  const deckRef = useRef<Card[]>([]);

  // Available assets for future visual enhancements
  // const availableAssets = useMemo(
  //   () => ({
  //     chips: CHIP_ASSETS,
  //     cardTemplate: CARD_ASSET_TEMPLATE,
  //   }),
  //   [],
  // );

  useEffect(() => {
    startNewGame();
    return () => {
      timeouts.current.forEach((timeoutId: TimeoutId) =>
        clearTimeout(timeoutId),
      );
      timeouts.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleStage = (
    delay: number,
    stage: StageName,
    callback: () => void,
  ) => {
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
      const betEvents: { player: Player; amount: number }[] = prev.players.map(
        (player: Player) => ({
          player,
          amount: randomInt(10, 120),
        }),
      );

      const updatedPlayers = prev.players.map(
        (player: Player, index: number) => ({
          ...player,
          bets: [...player.bets, { stage, amount: betEvents[index].amount }],
        }),
      );

      const logEntries = [
        `${stage} begins.`,
        ...betEvents.map(
          (event: { player: Player; amount: number }) =>
            `${event.player.name} bets ${event.amount} chips.`,
        ),
      ];

      const potIncrease = betEvents.reduce(
        (sum: number, event: { player: Player; amount: number }) =>
          sum + event.amount,
        0,
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

    const players: Player[] = Array.from(
      { length: PLAYER_COUNT },
      (_, index) => ({
        id: index + 1,
        name: `Player ${index + 1}`,
        hand: drawCards(2),
        bets: [],
        isWinner: false,
      }),
    );

    setGameState({
      players,
      community: [],
      pot: 0,
      currentStage: "Pre-Flop",
      log: [
        "A new hand is dealt.",
        ...players.map(
          (player: Player) =>
            `${player.name} receives ${formatCard(player.hand[0])} and ${formatCard(player.hand[1])}.`,
        ),
      ],
      winnerId: null,
    });

    scheduleStage(4000, "Flop", () => {
      const flop = drawCards(3);
      setGameState((prev: GameState) => ({
        ...prev,
        community: flop,
        log: [
          ...prev.log,
          `The flop reveals ${flop.map((card: Card) => formatCard(card)).join(", ")}.`,
        ],
      }));
    });

    scheduleStage(7000, "Flop Betting", () => {
      addBettingRound("Flop Betting");
    });

    scheduleStage(10000, "Turn", () => {
      const turn = drawCards(1)[0];
      setGameState((prev: GameState) => ({
        ...prev,
        community: [...prev.community, turn],
        log: [...prev.log, `The turn is ${formatCard(turn)}.`],
      }));
    });

    scheduleStage(13000, "Turn Betting", () => {
      addBettingRound("Turn Betting");
    });

    scheduleStage(16000, "River", () => {
      const river = drawCards(1)[0];
      setGameState((prev: GameState) => ({
        ...prev,
        community: [...prev.community, river],
        log: [...prev.log, `The river is ${formatCard(river)}.`],
      }));
    });

    scheduleStage(19000, "River Betting", () => {
      addBettingRound("River Betting");
    });

    scheduleStage(22000, "Showdown", () => {
      setGameState((prev: GameState) => {
        const winnerIndex = randomInt(0, prev.players.length - 1);
        const updatedPlayers = prev.players.map(
          (player: Player, index: number) => ({
            ...player,
            isWinner: index === winnerIndex,
          }),
        );

        return {
          ...prev,
          players: updatedPlayers,
          winnerId: updatedPlayers[winnerIndex]?.id ?? null,
          log: [
            ...prev.log,
            `${updatedPlayers[winnerIndex]?.name ?? "A player"} wins the pot of ${prev.pot} chips!`,
            "The dealer shuffles for the next hand.",
          ],
        };
      });
    });

    scheduleStage(28000, "Pre-Flop", () => {
      startNewGame();
    });
  };

  // Position players around the table: Dealer(top), 3 left, 3 right, 1 bottom
  const positionedPlayers = [
    { player: gameState.players[0], position: "top", label: "Dealer" },
    { player: gameState.players[1], position: "left-1", label: "Player 2" },
    { player: gameState.players[2], position: "left-2", label: "Player 3" },
    { player: gameState.players[3], position: "left-3", label: "Player 4" },
    { player: gameState.players[4], position: "right-1", label: "Player 5" },
    { player: gameState.players[5], position: "right-2", label: "Player 6" },
    { player: gameState.players[6], position: "bottom", label: "Player 7" },
  ];

  return (
    <div className="poker-game-container">
      <div className="game-info">
        <div className="stage-badge">{gameState.currentStage}</div>
        <button type="button" className="new-hand-btn" onClick={startNewGame}>
          Deal New Hand
        </button>
      </div>

      <div className="poker-table">
        <div className="table-felt">
          {/* Community Cards in Center */}
          <div className="center-area">
            <div className="pot-indicator">
              <span className="pot-label">POT</span>
              <span className="pot-amount">{gameState.pot}</span>
            </div>
            <div className="community-cards">
              {Array.from({ length: 5 }).map((_, index: number) => {
                const card = gameState.community[index];
                return (
                  <div
                    className={`card ${card ? "revealed" : ""}`}
                    key={`community-${index}`}
                  >
                    <img
                      src={getCardImagePath(card)}
                      alt={card ? formatCard(card) : "Face down card"}
                      className="card-image"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Players Around Table */}
          {positionedPlayers.map(({ player, position, label }) =>
            player ? (
              <div
                key={player.id}
                className={`player-seat ${position} ${player.isWinner ? "winner" : ""}`}
              >
                <div className="player-card">
                  <div className="player-name">{label}</div>
                  <div className="player-cards">
                    {player.hand.map((card: Card, index: number) => (
                      <div key={`${player.id}-card-${index}`} className="card">
                        <img
                          src={getCardImagePath(card)}
                          alt={formatCard(card)}
                          className="card-image"
                        />
                      </div>
                    ))}
                  </div>
                  {player.bets.length > 0 && (
                    <div className="player-bet">
                      Bet: {player.bets[player.bets.length - 1]?.amount || 0}
                    </div>
                  )}
                </div>
              </div>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
};

export default PokerTableClient;
