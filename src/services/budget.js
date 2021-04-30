const API_URL = "http://localhost:3001";

export function getBudgetByEpost(epost) {
  return fetch(`${API_URL}/budsjett/${epost}`)
    .then((res) => res.json());
}

export function createNewBudget(tittel, shared, epost) {
  let emailArray = shared.replace(/\s+/g, '').split(",")
  emailArray.push(epost);
  let noNullEmailArray = emailArray.filter(item => item);

  console.log('array is', noNullEmailArray);
  emailArray.map((epost) => {
    // console.log(typeof(email))
    return fetch(`${API_URL}/budsjett`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tittel, epost })
    })
      .then((res) => {
        if (res.ok) {
          return;
          // throw new Error('negativ test');
        } else {
          throw new Error('dette funket ikke');
        }
      });
  });
}

export function deleteBudget(id) {
  return fetch(`${API_URL}/budsjett/${id}`, {
    method: 'DELETE',
  })
  .then((res) => res.json());
}

export function updateBudget(id) {
  return fetch(`${API_URL}/budsjett/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(id)
  })
  .then((res) => res.json())
}



        // 'X-Auth-Token': localStorage.getItem('bruker_budsjett_token')