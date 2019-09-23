System.register(["../models/Negotiation"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negotiation_1, NegotiationService;
    return {
        setters: [
            function (Negotiation_1_1) {
                Negotiation_1 = Negotiation_1_1;
            }
        ],
        execute: function () {
            NegotiationService = class NegotiationService {
                getNegotiations(handler) {
                    return fetch('http://localhost:8081/dados')
                        .then(response => handler(response))
                        .then(response => response.json())
                        .then((data) => data.map(item => new Negotiation_1.Negotiation(new Date(), item.vezes, item.montante)))
                        .catch(err => console.log(err.message));
                }
            };
            exports_1("NegotiationService", NegotiationService);
        }
    };
});
