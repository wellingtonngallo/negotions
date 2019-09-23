import { isEquals } from './IsEquals';
import { Negotiation } from './Negotiation';

export class Negotiations implements isEquals<Negotiations> { 
	private _negotiations: Negotiation[] = [];

	add(negotiation: Negotiation) {
		this._negotiations.push(negotiation);
	}

	getNegotiations(): Negotiation[] {
		return ([] as Negotiation[]).concat(this._negotiations);
	}

	isEqual(negotiations: Negotiations): boolean {
		return JSON.stringify(this._negotiations) == JSON.stringify(negotiations.getNegotiations());
	}
} 