import { NegotiationController } from './controllers/NegotiationController';

const controller = new NegotiationController();

$('.form').submit(controller.add.bind(controller));
$('#buttonImport').click(controller.dataImport.bind(controller));