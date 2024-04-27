import { Router } from "express";
import { TicketController } from "./constructor";
import { TicketService } from "../services/ticket.service";
import { WssService } from "../services/wss.service";

export class TicketRoutes{
    static get routes(){
        const router = Router();

        const wssService = WssService.instance;
        const ticketService = new TicketService( wssService );

        const controller = new TicketController( ticketService );

        router.get('/', controller.getTickets );
        router.get('/last', controller.getLastTicket );
        router.get('/pending', controller.pendingTickets );
        router.post('/', controller.createTicket );
        router.get('/draw/:desk', controller.drawTicket );
        router.put('/done/:ticketId', controller.ticketFinished );
        router.get('/working-on', controller.workingOn );

        return router;
    }
}