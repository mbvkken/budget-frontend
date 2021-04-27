const API_URL = "http://localhost:3001";

export async function registrerBruker({ navn, epost, passord }) {
    return fetch(`${API_URL}/registrer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ navn, epost, passord })
    })
    .then((res) => res.json());
}

export function sjekkBruker({ epost, passord }) {
    return fetch(`${API_URL}/session`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( { epost, passord } )
    })
    .then((result) => result.json());
}

export function checkSession() {
    return fetch(`${API_URL}/session`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': localStorage.getItem('bruker_budsjett_token')
        }
    })
    .then((result) => result.status === 200);
}