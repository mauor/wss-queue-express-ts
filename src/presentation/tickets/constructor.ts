import { Request, Response } from "express";
import { TicketService } from "../services/ticket.service";

export class TicketController {

    constructor(
        private readonly ticketService: TicketService
    ){}

    public getTickets = (req: Request, res: Response) => {

        res.json( this.ticketService._tickets )
    }

    public getLastTicket = (req: Request, res: Response) => {
        res.json( this.ticketService.lastTicket )
    }

    public pendingTickets = (req: Request, res: Response) => {
        res.json( this.ticketService.pendingTickets )
    }

    public createTicket = (req: Request, res: Response) => {
        res.status(201).json(this.ticketService.createTicket() )
    }

    public drawTicket = (req: Request, res: Response) => {
        const { desk } = req.params;
        res.json( this.ticketService.drawTicket( desk ) )
    }

    public ticketFinished = (req: Request, res: Response) => {
        const { ticketId } = req.params;
        res.json( this.ticketService.finishedTicket( ticketId ) )
    }

    public workingOn = (req: Request, res: Response) => {
        res.json( this.ticketService.lastWorkingOnTickets )
    }

}