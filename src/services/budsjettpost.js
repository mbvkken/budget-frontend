const API_URL = "http://localhost:3001";

export function lagBudsjettpost(tittel, sum, fast, budsjettID){
    return fetch(`${API_URL}/budsjettpost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({tittel, sum, fast, budsjettID})
    })
    .then((res) => res.json());
}

export function redigereBudsjettpost(tittel, sum, fast, budsjettpostID){ 
    return fetch(`${API_URL}/budsjettpost/${budsjettpostID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({tittel, sum, fast})
    })  
}

export function henteBudsjettposterEtterKat(kategoriID) {
    return fetch(`${API_URL}/budsjettpost/${kategoriID}`)
    .then((res) => res.json());
}

export function sletteBudsjettpost(budsjettpostID) {
    return fetch(`${API_URL}/budsjettpost/${budsjettpostID}`, {
        method: 'DELETE'
    })
}