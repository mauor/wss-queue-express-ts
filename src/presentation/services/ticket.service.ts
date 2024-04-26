import { UuidApater } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket.interface";

export class TicketService{

    public readonly _tickets: Ticket[] = [
        { ticketId: UuidApater.v4(), number: 1, createdAt: new Date(), done: false },
        { ticketId: UuidApater.v4(), number: 2, createdAt: new Date(), done: false },
        { ticketId: UuidApater.v4(), number: 3, createdAt: new Date(), done: false },
        { ticketId: UuidApater.v4(), number: 4, createdAt: new Date(), done: false },
        { ticketId: UuidApater.v4(), number: 5, createdAt: new Date(), done: false },
        { ticketId: UuidApater.v4(), number: 6, createdAt: new Date(), done: false },
    ];

    private workingTikets: Ticket[] = [];
    
    constructor(){}

    public get pendingTickets(): Ticket[] {
        return this._tickets.filter( ticket => !ticket.handleAtDesk && !ticket.done );
    }

    public get lastWorkingOnTickets(): Ticket[]{
        return this.workingTikets.splice(0, 4);
    }

    public get lastTicket(): number{
        return this._tickets.length > 0 
                    ? this._tickets.at( -1 )!.number
                    : 0;
    }

    public createTicket(){
        const newTicket: Ticket = {
            ticketId: UuidApater.v4(),
            number: this.lastTicket + 1,
            createdAt: new Date(),
            done: false
        }
        this._tickets.push( newTicket );
        //TODO: conect with ws
        return newTicket;
    }

    public drawTicket(desk: string){
        const ticket = this._tickets.find( t => !t.handleAtDesk );

        if( !ticket ) return { status: 'error', message: 'Nohay tickets pendientes'};

        ticket.handleAtDesk = desk;
        ticket.handleAt = new Date();

        this.workingTikets.unshift( {...ticket} );
        //TODO notify WS

        return {status: 'ok', ticket};
    }

    public finishedTicket(id: string){
        const ticket = this._tickets.find( t => t.ticketId === id);
        if (!ticket) return {status: 'error', message: 'Ticket dont exist'};

        this._tickets.map( ticket => {
            if( ticket.ticketId === id){
                ticket.done = true;
            }
            return ticket;
        })

        return {status: 'ok'};
    }


     
}