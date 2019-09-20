class Negotiations { 
	private _negotiations: Negotiation[] = [];

	add(negotiation: Negotiation) {
		this._negotiations.push(negotiation);
	}

	getNegotiations(): Negotiation[] {
		return [].concat(this._negotiations);
	}
} 