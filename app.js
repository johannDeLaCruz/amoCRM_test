/*
Код будет работать с отключенным CORS в браузере или через прокси,
который добавит нужные заголовки.
Сервер API не возвращает заголовки Access-Control-Allow-* 
необходимые для работы с разными источниками такие, как
Access-Control-Allow-Headers: authorization
Access-Control-Allow-Methods: PATCH, GET, POST
Access-Control-Allow-Origin: *

Для этого может быть использован плагин для Хрома 
"Allow CORS: Access-Control-Allow-Origin" 
https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/
(не забудьте в настройках плагина добавить "Access-Control-Allow-Header")

*/
const method = "GET"; // Метод запроса
const endpoint = "api/v4/leads"; // API endpoint
const subdomain = "johanndelacruz2023"; // Поддомен
const url = `https://${subdomain}.amocrm.ru/${endpoint}`; // URL для запроса
// Используется долгосрочный токен доступа к API, так как интеграция небольшая и разрабатывалась под конкретный аккаунт. Действителен до 15.02.25.
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY2Y2FmNDlhY2YzZTdlNzFlNjY3ZmNmZjJiNTRlOWU0NmIxNDNjNmZhM2VlMzBiNzNlZjZhODQ4OTUzZTAzYzYzMzRiMTZhYTExZDBlOWY3In0.eyJhdWQiOiJjM2QzMWY4Zi1jODY1LTQxMDgtYTdkMS0yYzE1N2U2MGYyOTQiLCJqdGkiOiI2NmNhZjQ5YWNmM2U3ZTcxZTY2N2ZjZmYyYjU0ZTllNDZiMTQzYzZmYTNlZTMwYjczZWY2YTg0ODk1M2UwM2M2MzM0YjE2YWExMWQwZTlmNyIsImlhdCI6MTcwODAxMzA0MywibmJmIjoxNzA4MDEzMDQzLCJleHAiOjE3Mzk1Nzc2MDAsInN1YiI6IjEwNjY0MzM0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTY0NDEwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiNmUxYjljMTEtMWYxYy00YjcxLWIxMTAtMDZiMWRlNDlmZTdhIn0.He5FoumQjuK5a00cDFWC1DDDeZJ7lst1KIBD7A0TXlJYrAT9ebJU72jlL12S3vE14z_OPzn84kALUMCwugJe1C0itroRxRfd5yPuG63wLi77vmZqqUT6sS5M9K91ah7VCRg8sqJeikSH9b3_k_uabLhbyUA-qutn9fQXC4cpffdkiOVx92YMTEW2i700pcajjGmqB7DGje9mnLotlC7cmRRcMWaM3i8X8MnNjOyHB6y4_Y9eVpBA5OoTNoPb8Y_Pqs61ceA0qeibOz4uGS1qH8tLoRh7tydv017xydIr0G8wclambXa-zRoK9K4bC5ZyC4vYcERJLeVZOJZmYkCvUA"; // Токен доступа
const headersList = {
  Authorization: `Bearer ${ACCESS_TOKEN}`, // Headers запроса
};
const reqOptions = {
  method: method, // Опции запроса
  headers: headersList,
};
let currentPage = 1; // Текущая страница таблицы
let itemsPerPage = 5; // Количество элементов на странице
let sortOrder = "name-asc"; // Порядок сортировки по умолчанию

// Обработчик изменения количества элементов на странице
document
  .getElementById("items-per-page")
  .addEventListener("change", function () {
    itemsPerPage = this.value === "all" ? Infinity : parseInt(this.value);
    renderDealsTable();
  });

// Обработчик изменения порядка сортировки
document.getElementById("order-select").addEventListener("change", function () {
  sortOrder = this.value;
  renderDealsTable();
});

async function fetchDealsInBatches(dealsBody) {
  let page = 1; // Start from page 1
  let allDeals = []; // Accumulate all fetched deals

  try {
    while (true) {
      const response = await fetch(`${url}?limit=5&page=${page}`, reqOptions); // Fetch deals for the current page
      console.log("Response:", response); // Log the response

      if (response.status === 204) {
        break; // If no more content, break the loop
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json(); // Extract JSON data from response
      console.log("Data:", data); // Log the data

      const deals = data._embedded.leads; // Extract deals from JSON data
      allDeals.push(...deals); // Add fetched deals to the accumulated array

      if (deals.length === 0) {
        break; // If no more deals, break the loop
      }

      page++; // Move to the next page

      await new Promise(resolve => setTimeout(resolve, 500)); // Wait for 500 milliseconds before making the next request
    }
  } catch (error) {
    console.error("Error fetching deals:", error);
  }

  return allDeals; // Return all fetched deals
}
// Function to render a batch of fetched deals
function renderDealsBatch(deals, dealsBody) {
  deals.forEach(deal => {
    const row = document.createElement("tr"); // Create a table row
    // Fill the row with deal data
    row.innerHTML = `
      <td class="border px-4 py-2">${deal.id}</td>
      <td class="border px-4 py-2">${deal.name}</td>      
      <td class="border px-4 py-2">${deal.price}</td>
      <td class="border px-4 py-2">${deal.responsible_user_id}</td>
      <td class="border px-4 py-2">${deal.status_id}</td>
      <td class="border px-4 py-2">${deal.pipeline_id}</td>
      <td class="border px-4 py-2">${deal.created_by}</td>
      <td class="border px-4 py-2">${deal.updated_by}</td>
      <td class="border px-4 py-2">${deal.created_at}</td>
      <td class="border px-4 py-2">${deal.updated_at}</td>      
      <td class="border px-4 py-2">${deal.account_id}</td>      
    `;
    dealsBody.appendChild(row); // Add the row to the table body
    row.classList.add("transition", "ease-in-out", "transform", "hover:bg-gray-50"); // Add classes for styling
  });
}

// Modify fetchDeals function to use fetchDealsInBatches when itemsPerPage is Infinity
async function fetchDeals(dealsBody) {
  if (itemsPerPage === Infinity) {
    return await fetchDealsInBatches(dealsBody); // Return the result of fetchDealsInBatches
  } else {
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
}
// Асинхронная функция для отображения таблицы сделок
async function renderDealsTable() {
  let deals = await fetchDeals(document.getElementById("deals-body")); // Получение списка сделок
  deals = sortDeals(deals, sortOrder); // Сортировка сделок

  const dealsBody = document.getElementById("deals-body"); // Получение тела таблицы
  dealsBody.innerHTML = ""; // Очистка тела таблицы

  const startIndex =
    itemsPerPage === Infinity ? 0 : (currentPage - 1) * itemsPerPage; // Начальный индекс сделок на странице
  const endIndex =
    itemsPerPage === Infinity
      ? deals.length
      : Math.min(startIndex + itemsPerPage, deals.length); // Конечный индекс сделок на странице

  for (let i = startIndex; i < endIndex; i++) {
    const deal = deals[i]; // Получение сделки
    const row = document.createElement("tr"); // Создание строки таблицы
    // Заполнение строки данными о сделке
    row.innerHTML = `
            <td class="border px-4 py-2">${deal.id}</td>
            <td class="border px-4 py-2">${deal.name}</td>      
            <td class="border px-4 py-2">${deal.price}</td>
            <td class="border px-4 py-2">${deal.responsible_user_id}</td>
            <td class="border px-4 py-2">${deal.status_id}</td>
            <td class="border px-4 py-2">${deal.pipeline_id}</td>
            <td class="border px-4 py-2">${deal.created_by}</td>
            <td class="border px-4 py-2">${deal.updated_by}</td>
            <td class="border px-4 py-2">${deal.created_at}</td>
            <td class="border px-4 py-2">${deal.updated_at}</td>      
            <td class="border px-4 py-2">${deal.account_id}</td>      
        `;
    dealsBody.appendChild(row); // Добавление строки в тело таблицы
    row.classList.add(
      "transition",
      "ease-in-out",
      "transform",
      "hover:bg-gray-50"
    ); // Добавление классов для стилизации строки
  }
  renderPagination(deals.length); // Отображение пагинации
}

// Функция для отображения пагинации
function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Общее количество страниц
  const paginationButtons = document.getElementById("pagination-buttons"); // Получение блока кнопок пагинации
  paginationButtons.innerHTML = ""; // Очистка блока кнопок

  // Создание кнопок для каждой страницы
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button"); // Создание кнопки
    button.textContent = i; // Установка текста кнопки
    button.classList.add(
      "bg-blue-500",
      "hover:bg-blue-600",
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      "focus:outline-none",
      "focus:shadow-outline",
      "mx-1"
    ); // Добавление классов для стилизации кнопки
    if (i === currentPage) {
      button.classList.add("bg-blue-600"); // Выделение текущей страницы
    }
    button.addEventListener("click", function () {
      currentPage = i; // Обновление текущей страницы
      renderDealsTable(); // Повторное отображение таблицы
    });
    paginationButtons.appendChild(button); // Добавление кнопки в блок пагинации
  }
}

// Функция для сортировки сделок
function sortDeals(deals, order) {
  switch (order) {
    case "name-asc":
      return deals.sort((a, b) => a.name.localeCompare(b.name)); // Сортировка по имени в возрастающем порядке
    case "name-desc":
      return deals.sort((a, b) => b.name.localeCompare(a.name)); // Сортировка по имени в убывающем порядке
    case "price-asc":
      return deals.sort((a, b) => a.price - b.price); // Сортировка по цене в возрастающем порядке
    case "price-desc":
      return deals.sort((a, b) => b.price - a.price); // Сортировка по цене в убывающем порядке
    default:
      return deals;
  }
}

renderDealsTable(); // Инициализация отображения таблицы
