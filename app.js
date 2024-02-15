const method = "GET"; // Метод запроса
const endpoint = "api/v4/leads"; // API endpoint
const subdomain = "johanndelacruz2023"; // Поддомен
const url = `https://${subdomain}.amocrm.ru/${endpoint}`; // URL для запроса
const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImIzZmU5YzViMmNmYzFhYzQ3ODMyZDk3ZjcxMjJmNDE3M2Q0NTBiOTdkOTY3MzQzZjRmNGQ1MmVhYTg3MDE4NjgyZmUxN2U0NGQ1ZDBlYWIxIn0.eyJhdWQiOiJjM2QzMWY4Zi1jODY1LTQxMDgtYTdkMS0yYzE1N2U2MGYyOTQiLCJqdGkiOiJiM2ZlOWM1YjJjZmMxYWM0NzgzMmQ5N2Y3MTIyZjQxNzNkNDUwYjk3ZDk2NzM0M2Y0ZjRkNTJlYWE4NzAxODY4MmZlMTdlNDRkNWQwZWFiMSIsImlhdCI6MTcwNzkzNDgxOSwibmJmIjoxNzA3OTM0ODE5LCJleHAiOjE3NDk2ODY0MDAsInN1YiI6IjEwNjY0MzM0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTY0NDEwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZDQzNzkxMzAtNjJhZS00YTVhLTg4MDQtMDc3YzlhZjk0MWRhIn0.gMyJ2K19-z49waytpjJsLu-chpGaUdvnWV4CAHrdWmBRSFisIVEGGk2M8Or6cT-fqpN9FNfs6wUAUxI8x9l3wu7rZ6zyhCFbHw3WRKtkV1RlWhEmu3JaN8u6Syfx0NcoMFEc4Fo8yRUapgoizGsVaNLd-GKw12tkKtb2_Xe0wNm8bXB6Fn6Pb7QYHiuPT_yS9TZztyTWUJU9UYd5mnuBJfjTzrNFuFcunoeZgtQP4JMvoyzEjcxFOLCoOjQABKqcJcM_Bkq_mlFiUp0yTBbCYO50DvV0d_cODT99kHF4jGhcFpgHw5HCFTxmNFUlpcuUg_JkSYr9U40zltVkIL0fVw"; // Токен доступа
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

// Асинхронная функция для получения сделок
async function fetchDeals() {
  try {
    const response = await fetch(url, reqOptions); // Отправка запроса
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`); // Обработка ошибок
    }
    const data = await response.json(); // Получение данных
    return data._embedded.leads; // Возвращение списка сделок
  } catch (error) {
    console.error("Error fetching deals:", error); // Вывод ошибки в консоль
    return [];
  }
}

// Асинхронная функция для отображения таблицы сделок
async function renderDealsTable() {
  let deals = await fetchDeals(); // Получение списка сделок
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
            <td class="border px-4 py-2">${deal.group_id}</td>
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
