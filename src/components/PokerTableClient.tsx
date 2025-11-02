import { useEffect, useRef, useState } from "react";

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
  | "Dealing"
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
  cardsDealt: number; // Track how many cards have been dealt to this player
};

type GameState = {
  players: Player[];
  community: Card[];
  pot: number;
  currentStage: StageName;
  log: string[];
  winnerId: number | null;
  dealerPosition: number; // Index of the dealer
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

// More realistic betting patterns
const getBettingAmount = (stage: StageName): number => {
  const baseBet = randomInt(20, 100);
  const stageMultiplier: Partial<Record<StageName, number>> = {
    "Pre-Flop": 1,
    "Flop Betting": 1.5,
    "Turn Betting": 2,
    "River Betting": 2.5,
  };

  const multiplier = stageMultiplier[stage] || 1;

  // Sometimes make bigger bets (bluffs or strong hands)
  const isBigBet = Math.random() < 0.2;
  const betSize = isBigBet ? baseBet * 3 : baseBet;

  return Math.floor(betSize * multiplier);
};

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

const PokerTableClient = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    community: [],
    pot: 0,
    currentStage: "Dealing",
    log: [],
    winnerId: null,
    dealerPosition: 0,
  });

  const timeouts = useRef<TimeoutId[]>([]);
  const deckRef = useRef<Card[]>([]);
  const dealerPositionRef = useRef<number>(-1); // Track dealer position across hands (starts at -1, first hand will be 0)

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
      // Some players fold (don't bet) - create a map of player bets
      const playerBets = new Map<number, number>();
      const logEntries = [`${stage} begins.`];
      let potIncrease = 0;

      prev.players.forEach((player: Player) => {
        // 15% chance to fold (not bet)
        if (Math.random() > 0.15) {
          const betAmount = getBettingAmount(stage);
          playerBets.set(player.id, betAmount);
          potIncrease += betAmount;
          logEntries.push(`${player.name} bets ${betAmount} chips.`);
        } else {
          logEntries.push(`${player.name} folds.`);
        }
      });

      const updatedPlayers = prev.players.map((player: Player) => {
        const betAmount = playerBets.get(player.id);
        if (betAmount !== undefined) {
          return {
            ...player,
            bets: [...player.bets, { stage, amount: betAmount }],
          };
        }
        return player; // Player folded, no new bet
      });

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

    // Rotate dealer position (clockwise)
    dealerPositionRef.current = (dealerPositionRef.current + 1) % PLAYER_COUNT;
    const dealerPos = dealerPositionRef.current;

    // Calculate blind positions
    const smallBlindPos = (dealerPos + 1) % PLAYER_COUNT;
    const bigBlindPos = (dealerPos + 2) % PLAYER_COUNT;

    const SMALL_BLIND = 25;
    const BIG_BLIND = 50;

    // Create players with no cards initially
    const players: Player[] = Array.from(
      { length: PLAYER_COUNT },
      (_, index) => {
        const bets = [];
        // Post blinds
        if (index === smallBlindPos) {
          bets.push({ stage: "Pre-Flop" as StageName, amount: SMALL_BLIND });
        } else if (index === bigBlindPos) {
          bets.push({ stage: "Pre-Flop" as StageName, amount: BIG_BLIND });
        }

        return {
          id: index + 1,
          name: `Player ${index + 1}`,
          hand: [],
          bets,
          isWinner: false,
          cardsDealt: 0,
        };
      },
    );

    const initialPot = SMALL_BLIND + BIG_BLIND;
    const dealerName = players[dealerPos].name;
    const sbName = players[smallBlindPos].name;
    const bbName = players[bigBlindPos].name;

    setGameState({
      players,
      community: [],
      pot: initialPot,
      currentStage: "Dealing",
      log: [
        `New hand begins. ${dealerName} has the dealer button.`,
        `${sbName} posts small blind ($${SMALL_BLIND})`,
        `${bbName} posts big blind ($${BIG_BLIND})`,
        "Dealer shuffles and begins dealing...",
      ],
      winnerId: null,
      dealerPosition: dealerPos,
    });

    // Deal cards sequentially with animation
    // Deal 2 rounds (each player gets 2 cards)
    const dealingDelay = 150; // ms between each card
    const allPlayerCards: Card[][] = players.map(() => drawCards(2));

    // Deal first card to each player
    players.forEach((_, playerIndex) => {
      const cardDelay = playerIndex * dealingDelay;
      const timeoutId = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          players: prev.players.map((p, idx) =>
            idx === playerIndex
              ? {
                  ...p,
                  hand: [allPlayerCards[playerIndex][0]],
                  cardsDealt: 1,
                }
              : p,
          ),
        }));
      }, cardDelay);
      timeouts.current.push(timeoutId);
    });

    // Deal second card to each player
    players.forEach((_, playerIndex) => {
      const cardDelay = (PLAYER_COUNT + playerIndex) * dealingDelay;
      const timeoutId = setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          players: prev.players.map((p, idx) =>
            idx === playerIndex
              ? {
                  ...p,
                  hand: [
                    allPlayerCards[playerIndex][0],
                    allPlayerCards[playerIndex][1],
                  ],
                  cardsDealt: 2,
                }
              : p,
          ),
        }));
      }, cardDelay);
      timeouts.current.push(timeoutId);
    });

    // Transition to Pre-Flop after dealing is complete
    const dealingCompleteDelay = PLAYER_COUNT * 2 * dealingDelay + 500;
    scheduleStage(dealingCompleteDelay, "Pre-Flop", () => {
      setGameState((prev: GameState) => ({
        ...prev,
        log: [
          ...prev.log,
          "All players have been dealt their cards.",
          ...prev.players.map(
            (player: Player) =>
              `${player.name} receives ${formatCard(player.hand[0])} and ${formatCard(player.hand[1])}.`,
          ),
        ],
      }));
    });

    // Add initial betting round (blinds)
    const bettingDelay = dealingCompleteDelay + 1000;
    const bettingTimeout = setTimeout(() => {
      addBettingRound("Pre-Flop");
    }, bettingDelay);
    timeouts.current.push(bettingTimeout);

    // Adjust all subsequent stage timings to account for dealing phase
    const baseOffset = dealingCompleteDelay + 2500; // Add extra time after dealing and betting

    scheduleStage(baseOffset + 1500, "Flop", () => {
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

    scheduleStage(baseOffset + 4000, "Flop Betting", () => {
      addBettingRound("Flop Betting");
    });

    scheduleStage(baseOffset + 6500, "Turn", () => {
      const turn = drawCards(1)[0];
      setGameState((prev: GameState) => ({
        ...prev,
        community: [...prev.community, turn],
        log: [...prev.log, `The turn is ${formatCard(turn)}.`],
      }));
    });

    scheduleStage(baseOffset + 9000, "Turn Betting", () => {
      addBettingRound("Turn Betting");
    });

    scheduleStage(baseOffset + 11500, "River", () => {
      const river = drawCards(1)[0];
      setGameState((prev: GameState) => ({
        ...prev,
        community: [...prev.community, river],
        log: [...prev.log, `The river is ${formatCard(river)}.`],
      }));
    });

    scheduleStage(baseOffset + 14000, "River Betting", () => {
      addBettingRound("River Betting");
    });

    scheduleStage(baseOffset + 16500, "Showdown", () => {
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

    scheduleStage(baseOffset + 22000, "Dealing", () => {
      startNewGame();
    });
  };

  // Position players around the table in an elliptical pattern
  const positionedPlayers = [
    { player: gameState.players[0], position: "dealer", label: "Dealer" },
    { player: gameState.players[1], position: "player-1", label: "Player 2" },
    { player: gameState.players[2], position: "player-2", label: "Player 3" },
    { player: gameState.players[3], position: "player-3", label: "Player 4" },
    { player: gameState.players[4], position: "player-4", label: "Player 5" },
    { player: gameState.players[5], position: "player-5", label: "Player 6" },
    { player: gameState.players[6], position: "player-6", label: "Player 7" },
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
          {/* Community Cards and Pot in Center - Horizontal Layout */}
          <div className="center-area">
            <div className="pot-indicator">
              <span className="pot-label">POT</span>
              <span className="pot-amount">
                ${gameState.pot.toLocaleString()}
              </span>
            </div>
            <div className="community-cards">
              {Array.from({ length: 5 }).map((_, index: number) => {
                const card = gameState.community[index];
                const shouldReveal =
                  (index < 3 &&
                    [
                      "Flop",
                      "Flop Betting",
                      "Turn",
                      "Turn Betting",
                      "River",
                      "River Betting",
                      "Showdown",
                    ].includes(gameState.currentStage)) ||
                  (index === 3 &&
                    [
                      "Turn",
                      "Turn Betting",
                      "River",
                      "River Betting",
                      "Showdown",
                    ].includes(gameState.currentStage)) ||
                  (index === 4 &&
                    ["River", "River Betting", "Showdown"].includes(
                      gameState.currentStage,
                    ));

                return (
                  <div
                    className={`card ${card && shouldReveal ? "revealed" : ""}`}
                    key={`community-${index}`}
                    style={{
                      animationDelay: card ? `${index * 0.15}s` : "0s",
                    }}
                  >
                    <img
                      src={getCardImagePath(
                        card && shouldReveal ? card : undefined,
                      )}
                      alt={
                        card && shouldReveal
                          ? formatCard(card)
                          : "Face down card"
                      }
                      className="card-image"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Players Around Table */}
          {positionedPlayers.map(({ player, position, label }, index) => {
            if (!player) return null;

            const playerIndex = index;
            const isDealer = playerIndex === gameState.dealerPosition;
            const isSmallBlind =
              playerIndex === (gameState.dealerPosition + 1) % PLAYER_COUNT;
            const isBigBlind =
              playerIndex === (gameState.dealerPosition + 2) % PLAYER_COUNT;

            return (
              <div
                key={player.id}
                className={`player-seat ${position} ${player.isWinner ? "winner" : ""}`}
              >
                <div className="player-card">
                  {/* Position badges above player name */}
                  {(isDealer || isSmallBlind || isBigBlind) && (
                    <div
                      style={{
                        display: "flex",
                        gap: "4px",
                        marginBottom: "4px",
                        justifyContent: "center",
                      }}
                    >
                      {isDealer && (
                        <span
                          style={{
                            padding: "2px 6px",
                            fontSize: "9px",
                            fontWeight: "700",
                            background:
                              "linear-gradient(135deg, #ffd700, #ffb700)",
                            color: "#000",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            boxShadow: "0 2px 4px rgba(255,215,0,0.4)",
                          }}
                        >
                          D
                        </span>
                      )}
                      {isSmallBlind && (
                        <span
                          style={{
                            padding: "2px 6px",
                            fontSize: "9px",
                            fontWeight: "700",
                            background:
                              "linear-gradient(135deg, #4a90e2, #357abd)",
                            color: "#fff",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            boxShadow: "0 2px 4px rgba(74,144,226,0.4)",
                          }}
                        >
                          SB
                        </span>
                      )}
                      {isBigBlind && (
                        <span
                          style={{
                            padding: "2px 6px",
                            fontSize: "9px",
                            fontWeight: "700",
                            background:
                              "linear-gradient(135deg, #e74c3c, #c0392b)",
                            color: "#fff",
                            borderRadius: "4px",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            boxShadow: "0 2px 4px rgba(231,76,60,0.4)",
                          }}
                        >
                          BB
                        </span>
                      )}
                    </div>
                  )}
                  <div className="player-name">{label}</div>
                  <div className="player-cards">
                    {/* Show placeholders for 2 cards */}
                    {[0, 1].map((cardIndex) => {
                      const card = player.hand[cardIndex];
                      const showCard =
                        gameState.currentStage === "Showdown" ||
                        player.isWinner;
                      const isDealing =
                        gameState.currentStage === "Dealing" && card;
                      const cardClass = isDealing
                        ? "card card-dealing"
                        : showCard && card
                          ? "card revealed"
                          : "card";

                      return (
                        <div
                          key={`${player.id}-card-${cardIndex}`}
                          className={cardClass}
                          style={{
                            animationDelay:
                              showCard && card ? `${cardIndex * 0.1}s` : "0s",
                            opacity: !card ? 0 : 1,
                            transition: "opacity 0.2s ease",
                          }}
                        >
                          {card && (
                            <img
                              src={getCardImagePath(
                                showCard ? card : undefined,
                              )}
                              alt={showCard ? formatCard(card) : "Hidden card"}
                              className="card-image"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {player.bets.length > 0 && (
                    <div className="player-bet">
                      $
                      {(
                        player.bets[player.bets.length - 1]?.amount || 0
                      ).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokerTableClient;
