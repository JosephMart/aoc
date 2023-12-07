import fs from "fs";

const filePath = "./src/input.txt";
// const filePath = "./src/ex.txt";

const cardMapping = { T: 10, J: 11, Q: 12, K: 13, A: 14 };

enum HandType {
    HighCard = 1,
    OnePair,
    TwoPair,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind,
}

function getHandType(hand: number[]): HandType {
    const counts = hand.reduce(
        (m, card) => m.set(card, (m.get(card) ?? 0) + 1),
        new Map<number, number>()
    );

    const countsArr = [...counts.values()].sort((a, b) => b - a);

    if (countsArr[0] === 5) {
        return HandType.FiveOfAKind;
    }

    if (countsArr[0] === 4) {
        return HandType.FourOfAKind;
    }

    if (countsArr[0] === 3 && countsArr[1] === 2) {
        return HandType.FullHouse;
    }

    if (countsArr[0] === 3) {
        return HandType.ThreeOfAKind;
    }

    if (countsArr[0] === 2 && countsArr[1] === 2) {
        return HandType.TwoPair;
    }

    if (countsArr[0] === 2) {
        return HandType.OnePair;
    }

    return HandType.HighCard;
}

type HandInfo = { hand: number[]; bid: number; type: HandType };

class HandManager {
    private hands: Record<HandType, HandInfo[]> = {
        [HandType.HighCard]: [],
        [HandType.OnePair]: [],
        [HandType.TwoPair]: [],
        [HandType.ThreeOfAKind]: [],
        [HandType.FullHouse]: [],
        [HandType.FourOfAKind]: [],
        [HandType.FiveOfAKind]: [],
    };

    insertHand(hand: HandInfo) {
        const hands = this.hands[hand.type];
        for (let i = 0; i < hands.length; i++) {
            if (this.compareHandStrength(hand, hands[i]!)) {
                hands.splice(i, 0, hand);
                return this;
            }
        }
        hands.push(hand);
        return this;
    }

    // True if hand1 is better than hand2.
    compareHandStrength(hand1: HandInfo, hand2: HandInfo): boolean {
        for (let i = 0; i < hand1.hand.length; i++) {
            if (hand1.hand[i]! > hand2.hand[i]!) {
                return true;
            }
            if (hand1.hand[i]! < hand2.hand[i]!) {
                return false;
            }
        }
        throw new Error("Hands are equal");
    }

    getWinnings(): number {
        return Object.values(HandType)
            .filter(Number)
            .reverse()
            .map((type) => this.hands[type as HandType]!)
            .flat()
            .reduce((acc, hand, i, { length }) => {
                return acc + hand.bid * (length - i);
            }, 0);
    }
}

const result = fs
    .readFileSync(filePath, "utf-8")
    .split("\n")
    .reduce((manager, line): HandManager => {
        const [handStr, bid] = line.split(" ") as [string, string];
        const hand = handStr
            .split("")
            .map(
                (card) => cardMapping[card as keyof typeof cardMapping] ?? +card
            );
        return manager.insertHand({
            hand,
            bid: parseInt(bid),
            type: getHandType(hand),
        });
    }, new HandManager())
    .getWinnings();

console.log(result);
