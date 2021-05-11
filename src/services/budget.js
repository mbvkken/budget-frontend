const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export function getBudgetByEpost(epost) {
  return fetch(`${API_URL}/budsjett/${epost}`).then((res) => res.json());
}

export function createNewBudget(tittel, shared, epostOwner) {
  let emailArray = shared.replace(/\s+/g, "").split(",");
  emailArray.push(epostOwner);
  let noNullEmailArray = emailArray.filter((item) => item);
  console.log("array is", noNullEmailArray);

  return fetch(`${API_URL}/budsjett`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tittel, epostOwner, noNullEmailArray }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("dette funket ikke");
      }
    })
    .then((obj) => obj.newBudget);
}

export function deleteBudget(id) {
  return fetch(`${API_URL}/budsjett/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export function updateBudget(tittel, ID) {
  return fetch(`${API_URL}/budsjett/${ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tittel, ID }),
  }).then((res) => res.json());
}
