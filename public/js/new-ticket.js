
const label = document.querySelector("span");
const button = document.querySelector("button");

async function getLastTicket(){
    const lastTicket = await fetch('/api/tickets/last')
        .then( resp => resp.json() );
    label.innerText = lastTicket;
}

async function createTicket(){
    const newTicket = await fetch('api/tickets', {
        method: 'POST'
    }).then( resp => resp.json() );

    label.innerText = newTicket.number;
}

button.addEventListener('click', createTicket );

getLastTicket();