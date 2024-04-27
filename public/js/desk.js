

const labelPending = document.querySelector('#lbl-pending');
const deskLabel = document.querySelector('h1');
const alertNoTicket = document.querySelector('.alert');
const currentTicketLabel = document.querySelector('small');

const btnDraw = document.querySelector('#btn-draw');
const btnDone = document.querySelector('#btn-done');

const searchParams = new URLSearchParams( window.location.search );

if (! searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('Escritorio es requerido');
}
const deskNumber = searchParams.get('escritorio');
let currentTicket = null;
deskLabel.innerHTML = deskNumber;

async function loadInitialCount(){
    const pendingTickets = await fetch('api/tickets/pending').then( resp => resp.json() );
    checkTicketCount( pendingTickets.length );
}

function checkTicketCount(currentCount = 0 ){
    if( currentCount <= 0){
        alertNoTicket.classList.remove('d-none');
    }
    else{
        alertNoTicket.classList.add('d-none');
    }
    labelPending.innerHTML = currentCount;
    
}

async function getTicket(){
    await doneTicket();
    const { status, ticket, message } = await fetch(`api/tickets/draw/${ deskNumber }`)
        .then( resp => resp.json() );
    if( status === 'error'){
        currentTicketLabel.innerHTML = message;
        return;
    }

    currentTicket = ticket;
    currentTicketLabel.innerText = ticket.number;
}

async function doneTicket(){
    if( !currentTicket ) return;

    const { status, message } = await fetch(`api/tickets/done/${currentTicket.ticketId}`, { method: 'PUT' } )
        .then( resp => resp.json() );
    if( status !== 'ok'){
        console.log(message)
        return;
    }
    currentTicket = null;
    currentTicketLabel.innerText = '...';
}

function connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:4000/ws');

    socket.onmessage = (event) => {
        const { payload, type } = JSON.parse( event.data );
        if (type !== 'on-ticket-number-changed') return;

        checkTicketCount( payload );
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

btnDraw.addEventListener('click', getTicket);
btnDone.addEventListener('click', doneTicket );

loadInitialCount();
connectToWebSockets();




