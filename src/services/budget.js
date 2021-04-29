const API_URL = "http://localhost:3001";

export function getBudgetByEpost(epost) {
    return fetch(`${API_URL}/budsjett/${epost}`)
    .then((res) => res.json());
  }

export function createNewBudget(tittel, epost) {
    return fetch(`${API_URL}/budsjett`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tittel, epost })
    })
    .then((res) => res.json());
  }


        // 'X-Auth-Token': localStorage.getItem('bruker_budsjett_token')