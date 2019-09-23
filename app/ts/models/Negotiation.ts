import { isEquals } from './IsEquals';

export class Negotiation implements isEquals<Negotiation> {

    constructor(
        readonly date: Date,
        readonly quantity: number,
        readonly value: number) {
    }

    get volume() {
        return this.quantity* this.value;
    }

    isEqual(negotiation: Negotiation): boolean {
        return this.date.getDate() == negotiation.date.getDate()
            && this.date.getMonth() == negotiation.date.getMonth()
            && this.date.getFullYear() == negotiation.date.getFullYear()
    }
}