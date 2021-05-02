const API_URL = "http://localhost:3001";

export function getPostsByKatID(katid) {
    return fetch(`${API_URL}/budsjettpost/${katid}`)
      .then((res) => res.json());
  }


export async function opprettNyPost( tittel, sum, fast, kategoriID){
    return fetch(`${API_URL}/budsjettpost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tittel, sum, fast, kategoriID })
    })
}