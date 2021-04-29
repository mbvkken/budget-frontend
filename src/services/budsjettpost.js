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