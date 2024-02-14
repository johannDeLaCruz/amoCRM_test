import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

let headersList = {
  Accept: "*/*",
  "User-Agent": "amoCRM-oAuth-client/1.0",
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjAxNTViOGM5YmQxOTFlZjY4YjE1NTE2MjQ4NzUwOWE5Y2NlZjZmNjBiZjdhZTJhN2JiZmFmN2Q4Y2IxYTEyZGRmNGIwYjA0MjAxMjA0M2Y5In0.eyJhdWQiOiJjM2QzMWY4Zi1jODY1LTQxMDgtYTdkMS0yYzE1N2U2MGYyOTQiLCJqdGkiOiIwMTU1YjhjOWJkMTkxZWY2OGIxNTUxNjI0ODc1MDlhOWNjZWY2ZjYwYmY3YWUyYTdiYmZhZjdkOGNiMWExMmRkZjRiMGIwNDIwMTIwNDNmOSIsImlhdCI6MTcwNzg0MTc2NCwibmJmIjoxNzA3ODQxNzY0LCJleHAiOjE3NTUwNDMyMDAsInN1YiI6IjEwNjY0MzM0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTY0NDEwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiMzRmNzJmMzktNGYzNi00YzcwLWE3ZjAtZDRiYmZlMjYzZDk4In0.bs1I8TGPqB9wzPCkWhuM2ooyQUNhgVo5ClAtgUmkB3-j3E9533uUv0E3T2knful_C1MkXCeABVI_FOng2mn-TzPAc_BlMPj_0807Y56xQsozNi63OaL4-kju6JoRDRE5DNriYFbpJRu_1sRlNibLbLYaXPD7saohfznyscU4wAG5golKcbgZrtivDkc9Z6NoZmSJwBJ3gRBCQwNpL-LI3YPOF5EGmuW2_56JhmntWV4KzFa-Pb3UzEo5vvepmP5TSlwKX95htQStM2B1CbaaTiJu9hLHyLkf6iAzT_EfJ3eQ7v4GMkek6m30w260aGUQOt8yxWzAmXBwyQudzf9WAg",
};

let reqOptions = {
  url: "https://johanndelacruz2023.amocrm.ru/api/v4/leads",
  method: "GET",
  headers: headersList,
};
async function fetchDeals() {
  try {
    const response = await axios.request(reqOptions);
    console.log(response.data);
    return response.data._embedded.leads;
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
