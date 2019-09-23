import { Negotiation } from '../models/Negotiation';
import { PartialNegotiation } from '../models/PartialNegotiation';

export class NegotiationService {
    getNegotiations(handler: HandlerFunction): Promise<void | Negotiation[]> {
		return fetch('http://localhost:8081/dados')
            .then(response => handler(response))
            .then(response => response.json())
            .then((data: PartialNegotiation[]) =>
                data.map(item => 
                    new Negotiation(new Date(), item.vezes, item.montante)
                )
            )
            .catch(err => console.log(err.message));
    }
}

export interface HandlerFunction {
    (res: Response): Response;
}