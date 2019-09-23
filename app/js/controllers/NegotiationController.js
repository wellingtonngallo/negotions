System.register(["../views/NegotiationsView", "../views/MessageView", "../models/Negotiations", "../models/Negotiation", "../helpers/decorators/index", "../services/NegotiationService"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var NegotiationsView_1, MessageView_1, Negotiations_1, Negotiation_1, index_1, index_2, NegotiationService_1, NegotiationController, DayOfWeek;
    return {
        setters: [
            function (NegotiationsView_1_1) {
                NegotiationsView_1 = NegotiationsView_1_1;
            },
            function (MessageView_1_1) {
                MessageView_1 = MessageView_1_1;
            },
            function (Negotiations_1_1) {
                Negotiations_1 = Negotiations_1_1;
            },
            function (Negotiation_1_1) {
                Negotiation_1 = Negotiation_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
                index_2 = index_1_1;
            },
            function (NegotiationService_1_1) {
                NegotiationService_1 = NegotiationService_1_1;
            }
        ],
        execute: function () {
            NegotiationController = class NegotiationController {
                constructor() {
                    this._negotiations = new Negotiations_1.Negotiations();
                    this._negociationsView = new NegotiationsView_1.NegotiationView('#negotiationsView');
                    this._messageView = new MessageView_1.MessageView('#mensagemView');
                    this._negotiationService = new NegotiationService_1.NegotiationService();
                    this._negociationsView.update(this._negotiations);
                }
                add() {
                    let date = new Date(this._inputDate.val().replace(/-/g, ','));
                    if (!this.isBusinessDay(date)) {
                        this._messageView.update('Somente negociações em dias úteis, por favor.');
                        return;
                    }
                    const negotiation = new Negotiation_1.Negotiation(date, parseInt(this._inputQuantity.val()), parseFloat(this._inputValue.val()));
                    this._negotiations.add(negotiation);
                    this._negociationsView.update(this._negotiations);
                    this._messageView.update('Negociação adicionada com sucesso');
                }
                isBusinessDay(date) {
                    return date.getDay() != DayOfWeek.Saturday && date.getDay() != DayOfWeek.Sunday;
                }
                dataImport() {
                    function isOk(res) {
                        if (res.ok) {
                            return res;
                        }
                        else {
                            throw new Error(res.statusText);
                        }
                    }
                    fetch('http://localhost:8081/dados')
                        .then(response => isOk(response))
                        .then(response => response.json())
                        .then((data) => {
                        data.map(item => new Negotiation_1.Negotiation(new Date(), item.vezes, item.montante)).forEach(negotiation => this._negotiations.add(negotiation));
                        this._negociationsView.update(this._negotiations);
                    })
                        .catch(err => console.log(err.message));
                }
            };
            __decorate([
                index_1.domInject('#data')
            ], NegotiationController.prototype, "_inputDate", void 0);
            __decorate([
                index_1.domInject('#quantidade')
            ], NegotiationController.prototype, "_inputQuantity", void 0);
            __decorate([
                index_1.domInject('#valor')
            ], NegotiationController.prototype, "_inputValue", void 0);
            __decorate([
                index_2.throttle(500)
            ], NegotiationController.prototype, "add", null);
            __decorate([
                index_2.throttle(500)
            ], NegotiationController.prototype, "dataImport", null);
            exports_1("NegotiationController", NegotiationController);
            (function (DayOfWeek) {
                DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
                DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
                DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
                DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
                DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
                DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
                DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
            })(DayOfWeek || (DayOfWeek = {}));
        }
    };
});
