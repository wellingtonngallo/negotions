import { NegotiationView } from '../views/NegotiationsView';
import { MessageView } from '../views/MessageView';
import { Negotiations } from '../models/Negotiations';
import { Negotiation } from '../models/Negotiation';
import { domInject } from '../helpers/decorators/index';
import { throttle } from '../helpers/decorators/index';
import { NegotiationService } from '../services/NegotiationService';

export class NegotiationController {
	@domInject('#data')
	private _inputDate: JQuery;

	@domInject('#quantidade')
	private _inputQuantity: JQuery;

	@domInject('#valor')
	private _inputValue: JQuery;

	private _negotiations = new Negotiations();
	private _negociationsView = new NegotiationView('#negotiationsView');
	private _messageView = new MessageView('#mensagemView');
	private _negotiationService = new NegotiationService();
	
    constructor() {
		this._negociationsView.update(this._negotiations);
	}
	
	@throttle(500)
	add() {
		let date = new Date(this._inputDate.val().replace(/-/g, ','));

		if (!this.isBusinessDay(date)) {
			this._messageView.update('Somente negociações em dias úteis, por favor.');

			return;
		}
		
		const negotiation = new Negotiation(
			date,
			parseInt(this._inputQuantity.val()),
			parseFloat(this._inputValue.val())
		);

		this._negotiations.add(negotiation);
		this._negociationsView.update(this._negotiations);
		this._messageView.update('Negociação adicionada com sucesso');
	}

	private isBusinessDay(date: Date) {
		return date.getDay() != DayOfWeek.Saturday && date.getDay() != DayOfWeek.Sunday;
	}

	@throttle(500)
	dataImport() {
		function isOk(res: Response) {
			if (res.ok) {
				return res;
			} else {
				throw new Error(res.statusText);
			}
		}
		
		this._negotiationService
			.getNegotiations(isOk)
			.then(negotiations => {
				negotiations.forEach(negotiation => {
					this._negotiations.add(negotiation);
				});
			});
	}
}

enum DayOfWeek {
	Sunday,
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday
}