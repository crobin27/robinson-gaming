import { useEffect, useMemo, useState } from "react";

import "./PokerTableSimulation.css";

type Suit = "♠" | "♥" | "♦" | "♣";

type StageKey = "preflop" | "flop" | "turn" | "river";
type PhaseKey = StageKey | "showdown";

type Card = {
  rank: string;
  suit: Suit;
};

type StageBets = Record<StageKey, number>;

type PlayerRound = {
  id: number;
  name: string;
  cards: Card[];
  stack: number;
  bets: StageBets;
};

type Phase = {
  key: PhaseKey;
  label: string;
  description: string;
  pot: number;
};

type CommunityCards = {
  flop: Card[];
  turn: Card | null;
  river: Card | null;
};

type RoundData = {
  players: PlayerRound[];
  community: CommunityCards;
  phases: Phase[];
  potByStage: Record<StageKey, number>;
  totalPot: number;
  winner: PlayerRound;
  winningHandName: string;
};

const SUITS: Suit[] = ["♠", "♥", "♦", "♣"];
const RANKS = [
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

const STAGE_ORDER: StageKey[] = ["preflop", "flop", "turn", "river"];

const STAGE_LABELS: Record<PhaseKey, string> = {
  preflop: "Pre-Flop",
  flop: "Flop",
  turn: "Turn",
  river: "River",
  showdown: "Showdown",
};

const HAND_NAMES = [
  "royal flush",
  "straight flush",
  "four of a kind",
  "full house",
  "flush",
  "straight",
  "three of a kind",
  "two pair",
  "top pair",
];

function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

function drawCards(deck: Card[], count: number): Card[] {
  const drawn: Card[] = [];
  for (let i = 0; i < count; i += 1) {
    if (deck.length === 0) {
      break;
    }
    const index = Math.floor(Math.random() * deck.length);
    const [card] = deck.splice(index, 1);
    if (card) {
      drawn.push(card);
    }
  }
  return drawn;
}

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatCard(card: Card | null): string {
  if (!card) {
    return "";
  }
  return `${card.rank}${card.suit}`;
}

function formatCards(cards: Card[]): string {
  return cards.map((card) => formatCard(card)).join(" · ");
}

function generatePlayer(id: number, deck: Card[]): PlayerRound {
  const cards = drawCards(deck, 2);
  const stack = randomInRange(2200, 5200);
  const bets: StageBets = {
    preflop: 0,
    flop: 0,
    turn: 0,
    river: 0,
  };

  let aggressiveStack = Math.floor(stack * randomInRange(35, 75) * 0.01);

  STAGE_ORDER.forEach((stage, index) => {
    const stagesLeft = STAGE_ORDER.length - index;
    const maximum = Math.max(40, Math.floor(aggressiveStack / Math.max(1, stagesLeft)));
    const bet = Math.min(
      aggressiveStack,
      Math.round(randomInRange(10, Math.max(40, maximum)) / 10) * 10,
    );

    bets[stage] = Math.max(0, bet);
    aggressiveStack = Math.max(0, aggressiveStack - bet);
  });

  return {
    id,
    name: `Seat ${id}`,
    cards,
    stack,
    bets,
  };
}

function buildPhases(
  players: PlayerRound[],
  community: CommunityCards,
  winner: PlayerRound,
  winningHandName: string,
  potByStage: Record<StageKey, number>,
): Phase[] {
  const phases: Phase[] = [];
  let cumulativePot = 0;

  STAGE_ORDER.forEach((stage) => {
    const stageContribution = potByStage[stage];
    cumulativePot += stageContribution;

    let description = "";
    if (stage === "preflop") {
      description = `Hole cards are dealt and players commit ${stageContribution} chips before the flop.`;
    } else if (stage === "flop") {
      description = `The flop ${formatCards(community.flop)} arrives, pushing ${stageContribution} more chips into the pot.`;
    } else if (stage === "turn") {
      description = `The turn ${formatCard(community.turn)} slows no one down with ${stageContribution} chips added.`;
    } else {
      description = `The river ${formatCard(community.river)} sees a final wave worth ${stageContribution} chips.`;
    }

    phases.push({
      key: stage,
      label: STAGE_LABELS[stage],
      description,
      pot: cumulativePot,
    });
  });

  const totalPot = phases.length > 0 ? phases[phases.length - 1].pot : 0;
  phases.push({
    key: "showdown",
    label: STAGE_LABELS.showdown,
    description: `${winner.name} reveals ${formatCards(winner.cards)} for a ${
      winningHandName
    } and drags a pot of ${totalPot} chips.`,
    pot: totalPot,
  });

  return phases;
}

function generateRound(): RoundData {
  const deck = createDeck();
  const players = Array.from({ length: 7 }, (_, index) => generatePlayer(index + 1, deck));

  const community: CommunityCards = {
    flop: drawCards(deck, 3),
    turn: drawCards(deck, 1)[0] ?? null,
    river: drawCards(deck, 1)[0] ?? null,
  };

  const potByStage = STAGE_ORDER.reduce<Record<StageKey, number>>((acc, stage) => {
    acc[stage] = players.reduce((sum, player) => sum + player.bets[stage], 0);
    return acc;
  }, {
    preflop: 0,
    flop: 0,
    turn: 0,
    river: 0,
  });

  const winner = players[randomInRange(0, players.length - 1)];
  const winningHandName = HAND_NAMES[randomInRange(0, HAND_NAMES.length - 1)];

  const phases = buildPhases(players, community, winner, winningHandName, potByStage);
  const totalPot = phases[phases.length - 1]?.pot ?? 0;

  return {
    players,
    community,
    phases,
    potByStage,
    totalPot,
    winner,
    winningHandName,
  };
}

const seatClassMap = [
  "seat seat-1",
  "seat seat-2",
  "seat seat-3",
  "seat seat-4",
  "seat seat-5",
  "seat seat-6",
  "seat seat-7",
];

export default function PokerTableSimulation() {
  const [roundData, setRoundData] = useState<RoundData>(() => generateRound());
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) {
      return;
    }

    if (phaseIndex >= roundData.phases.length - 1) {
      return;
    }

    const timer = window.setTimeout(() => {
      setPhaseIndex((index) => Math.min(index + 1, roundData.phases.length - 1));
    }, 3500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [phaseIndex, isAutoPlay, roundData.phases.length]);

  const currentPhase = roundData.phases[phaseIndex];
  const stageName = currentPhase?.label ?? "";

  const currentStageKey = useMemo(() => {
    if (!currentPhase) {
      return null;
    }
    return currentPhase.key === "showdown" ? "river" : currentPhase.key;
  }, [currentPhase]);

  const investedThroughStage = (player: PlayerRound): number => {
    if (!currentPhase) {
      return 0;
    }

    const stageLimit = currentPhase.key === "showdown"
      ? STAGE_ORDER.length
      : Math.max(0, STAGE_ORDER.indexOf(currentPhase.key) + 1);

    return STAGE_ORDER.slice(0, stageLimit).reduce((sum, stage) => sum + player.bets[stage], 0);
  };

  const potProgress = currentPhase?.pot ?? 0;

  const isShowdown = currentPhase?.key === "showdown";

  const renderCard = (card: Card, index: number) => (
    <span
      key={`${card.rank}${card.suit}-${index}`}
      className={`card${card.suit === "♥" || card.suit === "♦" ? " card-red" : ""}`}
    >
      <span className="card-rank">{card.rank}</span>
      <span className="card-suit">{card.suit}</span>
    </span>
  );

  return (
    <section className="poker-simulation">
      <div className="table-wrapper">
        <div className="felt" aria-live="polite">
          <div className="table-header">
            <h2>Poker Table Simulation</h2>
            <p className="phase-title">Current phase: {stageName}</p>
            <p className="phase-description">{currentPhase?.description}</p>
            <div className="pot-display">Pot: {potProgress} chips</div>
          </div>

          <div className="community-cards" role="status">
            <h3>Community</h3>
            <div className="card-row">
              {roundData.community.flop.map((card, index) => (
                <span
                  key={`flop-${card.rank}${card.suit}-${index}`}
                  className={`card${
                    phaseIndex >= 1 ? " card-visible" : " card-hidden"
                  }${card.suit === "♥" || card.suit === "♦" ? " card-red" : ""}`}
                >
                  <span className="card-rank">{card.rank}</span>
                  <span className="card-suit">{card.suit}</span>
                </span>
              ))}
              {roundData.community.turn && (
                <span
                  className={`card${
                    phaseIndex >= 2 ? " card-visible" : " card-hidden"
                  }${roundData.community.turn.suit === "♥" || roundData.community.turn.suit === "♦" ? " card-red" : ""}`}
                >
                  <span className="card-rank">{roundData.community.turn.rank}</span>
                  <span className="card-suit">{roundData.community.turn.suit}</span>
                </span>
              )}
              {roundData.community.river && (
                <span
                  className={`card${
                    phaseIndex >= 3 ? " card-visible" : " card-hidden"
                  }${roundData.community.river.suit === "♥" || roundData.community.river.suit === "♦" ? " card-red" : ""}`}
                >
                  <span className="card-rank">{roundData.community.river.rank}</span>
                  <span className="card-suit">{roundData.community.river.suit}</span>
                </span>
              )}
            </div>
          </div>

          {roundData.players.map((player, index) => {
            const seatClass = seatClassMap[index] ?? "seat";
            const invested = investedThroughStage(player);
            const isWinner = isShowdown && roundData.winner.id === player.id;
            const stageSpecificBet = currentStageKey
              ? player.bets[currentStageKey as StageKey]
              : 0;

            return (
              <article
                key={player.id}
                className={`player-seat ${seatClass}${isWinner ? " winner" : ""}`}
              >
                <header className="player-header">
                  <span className="player-name">{player.name}</span>
                  <span className="player-stack">Stack: {player.stack} chips</span>
                </header>
                <div className="player-cards">{player.cards.map(renderCard)}</div>
                <dl className="player-stats">
                  <div>
                    <dt>Contributed</dt>
                    <dd>{invested} chips</dd>
                  </div>
                  <div>
                    <dt>Stage Bet</dt>
                    <dd>{stageSpecificBet} chips</dd>
                  </div>
                </dl>
                {isWinner && (
                  <p className="winner-banner">Winner · {roundData.winningHandName}</p>
                )}
              </article>
            );
          })}
        </div>
      </div>

      <div className="controls">
        <button
          type="button"
          className="control-button"
          onClick={() => setIsAutoPlay((value) => !value)}
        >
          {isAutoPlay ? "Pause" : "Resume"} animation
        </button>
        <button
          type="button"
          className="control-button"
          onClick={() => {
            setRoundData(generateRound());
            setPhaseIndex(0);
            setIsAutoPlay(true);
          }}
        >
          Deal a new hand
        </button>
        <button
          type="button"
          className="control-button"
          onClick={() =>
            setPhaseIndex((index) => Math.min(index + 1, roundData.phases.length - 1))
          }
        >
          Advance stage
        </button>
      </div>

      <ol className="phase-timeline">
        {roundData.phases.map((phase, index) => (
          <li
            key={phase.key}
            className={`timeline-item${index === phaseIndex ? " active" : ""}${
              index < phaseIndex ? " complete" : ""
            }`}
          >
            <h4>{phase.label}</h4>
            <p>{phase.description}</p>
            <span className="timeline-pot">Pot: {phase.pot} chips</span>
          </li>
        ))}
      </ol>

      <section className="asset-notes">
        <h3>Suggested visual assets</h3>
        <p>
          To fully theme this component, consider preparing the following image assets. They can
          replace the text-based cards and chips used in this simulation.
        </p>
        <ul>
          <li><code>card-back-green.png</code> — card back texture for unrevealed cards.</li>
          <li><code>card-face-spades.png</code>, <code>card-face-hearts.png</code>, etc. — stylised card faces per suit.</li>
          <li><code>poker-chip-red.png</code>, <code>poker-chip-blue.png</code>, <code>poker-chip-gold.png</code> — chip stacks for different denominations.</li>
          <li><code>dealer-button.png</code> — dealer position marker for the table.</li>
          <li><code>table-felt-texture.jpg</code> — background texture for the poker table surface.</li>
        </ul>
      </section>
    </section>
  );
}

