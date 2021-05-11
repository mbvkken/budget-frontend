const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export async function opprettNyKategori(tittel, budsjettID) {
  return fetch(`${API_URL}/kategori`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tittel, budsjettID }),
  });
}

export async function endreKategori(tittel, kategoriID) {
  return fetch(`${API_URL}/kategori/${kategoriID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tittel, kategoriID }),
  });
}

export async function sletteKategori(kategoriID) {
  return fetch(`${API_URL}/kategori/${kategoriID}`, {
    method: "DELETE",
  });
}
export function getKatsByBudsjettID(budsjettID) {
  return fetch(`${API_URL}/kategori/${budsjettID}`).then((res) => res.json());
}
