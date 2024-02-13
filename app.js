import axios from 'axios';

const API_URL = 'https://api.amocrm.ru/v4';
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';


async function fetchDeals() {
  try {
    const response = await axios.get(`${API_URL}/leads`, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });
    return response.data._embedded.leads;
  } catch (error) {
    console.error('Error fetching deals:', error);
    return [];
  }
}
async function renderDealsTable() {
  const deals = await fetchDeals();
  const dealsBody = document.getElementById('deals-body');
  dealsBody.innerHTML = '';

  deals.forEach(deal => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="border px-4 py-2">${deal.name}</td>
      <td class="border px-4 py-2">${deal.budget}</td>
      <td class="border px-4 py-2">${deal.created_at}</td>
      <td class="border px-4 py-2">${deal.updated_at}</td>
      <td class="border px-4 py-2">${deal.responsible_user_id}</td>
    `;
    dealsBody.appendChild(row);
  });
}
renderDealsTable();