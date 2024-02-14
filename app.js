let method = "GET";
let endpoint = "api/v4/leads";
let subdomain = "johanndelacruz2023";
let url = `https://${subdomain}.amocrm.ru/${endpoint}`;
let headersList = {
  Accept: "*/*",
  "Content-Type": "application/json",
  "User-Agent": "amoCRM-oAuth-client/1.0",
  Authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ4ZTUxNDdiMDJmZWY4ZGUxMDI4Njg3OWRkYWFmM2Y3NGYxMTA3YzM5NGU5ZDMyZjk2NGZkZWRjOGM1NTkwMDA4ZGYyZTc3MjMxMmQ3NmQwIn0.eyJhdWQiOiJjM2QzMWY4Zi1jODY1LTQxMDgtYTdkMS0yYzE1N2U2MGYyOTQiLCJqdGkiOiI0OGU1MTQ3YjAyZmVmOGRlMTAyODY4NzlkZGFhZjNmNzRmMTEwN2MzOTRlOWQzMmY5NjRmZGVkYzhjNTU5MDAwOGRmMmU3NzIzMTJkNzZkMCIsImlhdCI6MTcwNzg3ODUyNywibmJmIjoxNzA3ODc4NTI3LCJleHAiOjE3NDc4NzIwMDAsInN1YiI6IjEwNjY0MzM0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTY0NDEwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiOTliNDBlYjAtNWFiMS00Nzc3LWE0M2ItZGRhNmYwMTQ2OGQyIn0.qLlZBWRVd5DHO5fK4RVooCC8AFqX_ew1IbE2bG4GSbT3qV1JIheG98R4yNCfi9kIq6YdQ-aAo-AQEWMeQhpcEBLn2pZxHh-rCXtXj4R9Q74hJYrb2U7YFewApyuu5K4pbAoHze86G4ihB8YDou4Mu7owIbAxDv3-Z2xFyY53QCjspitKNoMenHncwCQm4V8SyQdRLBzsAvnwJthPFVPw1IXVDLvgKgDrF5N7m3qAhsPJHyNPNvGiUrL9-UtSKmFN6KelaFcezGLDxMOBGZ-RXQ8UV3Jqg5i6ve74t1vUf6WO2kMJpKG6iETJlMN1JElae7Pksi4Y5mHPgrGE7AfeoQ",
};

let reqOptions = {
  method: method,
  headers: headersList,
};

async function fetchDeals() {
  try {
    const response = await fetch(url, reqOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data._embedded.leads;
  } catch (error) {
    console.error("Error fetching deals:", error);
    return [];
  }
}

async function renderDealsTable() {
  const deals = await fetchDeals();
  const dealsBody = document.getElementById("deals-body");
  dealsBody.innerHTML = "";

  deals.forEach((deal) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border px-4 py-2">${deal.name}</td>
      <td class="border px-4 py-2">${deal.id}</td>
      <td class="border px-4 py-2">${deal.price}</td>
      <td class="border px-4 py-2">${deal.created_at}</td>
      <td class="border px-4 py-2">${deal.updated_at}</td>
      <td class="border px-4 py-2">${deal.updated_by}</td>
      <td class="border px-4 py-2">${deal.updated_by}</td>
      <td class="border px-4 py-2">${deal.responsible_user_id}</td>
    `;
    dealsBody.appendChild(row);
  });
}

renderDealsTable();
