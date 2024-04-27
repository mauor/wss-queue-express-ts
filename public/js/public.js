 const ticketsLvl = document.getElementsByClassName('ticket');
 const deskLvl = document.getElementsByClassName('desk');

// const currentTicketLvl1 = document.querySelector('#lbl-ticket-01');
// const currentDeskLvl1 = document.querySelector('#lbl-desk-01');

// const currentTicketLvl2 = document.querySelector('#lbl-ticket-02');
// const currentDeskLvl2 = document.querySelector('#lbl-desk-02');

// const currentTicketLvl3 = document.querySelector('#lbl-ticket-03');
// const currentDeskLvl3 = document.querySelector('#lbl-desk-03');

// const currentTicketLvl4 = document.querySelector('#lbl-ticket-04');
// const currentDeskLvl4 = document.querySelector('#lbl-desk-04');

function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:4000/ws');

    socket.onmessage = (event) => {
        const { type, payload } = JSON.parse(event.data);
        if (type !== 'on-working-changed') return;
        renderTickets(payload );
    };

    socket.onclose = (event) => {
        console.log('Connection closed');
        setTimeout(() => {
            console.log('retrying to connect');
            connectToWebSockets();
        }, 1500);

    };

    socket.onopen = (event) => {
        console.log('Connected');
    };

}


function renderTickets( tickets ){
    tickets.forEach((ticket, index) => {
        ticketsLvl[index].innerText = ticket.number;
        deskLvl[index].innerText = ticket.handleAtDesk;
    });
}

async function workingOnTickets(){
    const tickets  = await fetch('api/tickets/working-on')
        .then( resp => resp.json() );
    renderTickets( tickets );
}

workingOnTickets();

connectToWebSockets();

