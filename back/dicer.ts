export type DiceType = 'Standard' | 'Dragon' | 'Humanisme' | 'Fatalité';

export class Randomizer {
    constructor() { }

    randomValue(maxValue = 10) {
        return Math.ceil(Math.random() * maxValue);
    }
}

export class ProphecyResult {
    constructor(
        public type: DiceType,
        public dice: number, 
        public finalResult: number, 
        public reussiteCritique: boolean, 
        public echecCritique: boolean) {
    }
}

export class InitiativeResult {
    constructor(public dices: number[]) {}
}

export class DommageResult {
    constructor(public dices: number[], public result: number) {}
}

export class ProphecyDice {
    constructor(private randomizer: Randomizer) {}

    launch(type: DiceType, attribut: number, competence: number, bonus: number) {
        const dice = this.randomizer.randomValue(10);
        return new ProphecyResult(
            type,
            dice,
            attribut + competence + bonus + dice,
            dice === 10 && this.randomizer.randomValue(10) <= competence,
            dice === 1 && this.randomizer.randomValue(10) >= competence
        );
    }

    launchInitiative(nbDices: number) {
        const dices = new Array(nbDices).fill(0).map(() => this.randomizer.randomValue(10));
        return new InitiativeResult(dices);
    }

    launchDommages(nbDices: number, bonus: number) {
        const dices = new Array(nbDices).fill(0).map(() => this.randomizer.randomValue(10));
        const results = dices.reduce((prev, curr) => prev + curr, 0) + bonus;
        return new DommageResult(dices, results);
    }
}

export class ProphecyTest {
    dicer: ProphecyDice;

    constructor(randomizer: Randomizer) {
        this.dicer = new ProphecyDice(randomizer);
    }

    test(attribut: number, competence: number, bonus: number, isTendance = false) {
        if (!isTendance) {
            return [this.dicer.launch('Standard', attribut, competence, bonus)];
        }
        return [
            this.dicer.launch('Dragon', attribut, competence, bonus),
            this.dicer.launch('Humanisme', attribut, competence, bonus),
            this.dicer.launch('Fatalité', attribut, competence, bonus)
        ];
    }

    initiative(nbDices: number) {
        return [this.dicer.launchInitiative(nbDices)];
    }

    dommage(nbDices: number, bonus: number) {
        return [this.dicer.launchDommages(nbDices, bonus)];
    }
}