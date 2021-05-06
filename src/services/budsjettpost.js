const API_URL = "http://localhost:3001";

export function getPostsByKatID(katid) {
  return fetch(`${API_URL}/budsjettpost/${katid}`).then((res) => res.json());
}

export async function opprettNyPost(tittel, sum, fast, kategoriID) {
  return fetch(`${API_URL}/budsjettpost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tittel, sum, fast, kategoriID }),
  }).then((res) => res.json());
}

export function endrePost(tittel, sum, fast, budsjettpostID) {
  return fetch(`${API_URL}/budsjettpost/${budsjettpostID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tittel, sum, fast, budsjettpostID }),
  });
}

export function henteBudsjettposterEtterKat(kategoriID) {
  return fetch(`${API_URL}/budsjettpost/${kategoriID}`).then((res) =>
    res.json()
  );
}

export function sletteBudsjettpost(budsjettpostID) {
  return fetch(`${API_URL}/budsjettpost/${budsjettpostID}`, {
    method: "DELETE",
  });
}
