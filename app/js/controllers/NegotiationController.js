class NegotiationController {
    constructor() {
        this._negotiations = new Negotiations();
        this._negociationsView = new NegotiationView('#negotiationsView');
        this._messageView = new MessageView('#mensagemView');
        this._inputDate = $('#data');
        this._inputQuantity = $('#quantidade');
        this._inputValue = $('#valor');
        this._negociationsView.update(this._negotiations);
    }
    add(event) {
        event.preventDefault();
        const negotiation = new Negotiation(new Date(this._inputDate.val().replace(/-/g, ',')), parseInt(this._inputQuantity.val()), parseFloat(this._inputValue.val()));
        this._negotiations.add(negotiation);
        this._negociationsView.update(this._negotiations);
        this._messageView.update('Negociação adicionada com sucesso');
    }
}
