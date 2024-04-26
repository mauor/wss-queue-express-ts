export interface Ticket{
    ticketId: string;
    number: number;
    createdAt: Date;
    handleAtDesk?: string;
    handleAt?: Date;
    done: boolean;
}