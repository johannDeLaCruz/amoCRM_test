## Описание проекта

Данный код получает данные о сделках из amoCRM API, сортирует их в соответствии с вводом пользователя и отображает в виде таблицы с пагинацией. 

## Ограничения
Код будет работать с отключенным CORS в браузере или через прокси, который добавит нужные заголовки.
Сервер API не возвращает заголовки Access-Control-Allow-* необходимые для работы с разными источниками такие, как
Access-Control-Allow-Headers: authorization
Access-Control-Allow-Methods: PATCH, GET, POST
Access-Control-Allow-Origin: *

Для этого может быть использован плагин для Хрома 
"Allow CORS: Access-Control-Allow-Origin" 
https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/
(не забудьте в настройках плагина добавить "Access-Control-Allow-Header")

### Параметры функции
`dealsBody` - Параметр `dealsBody` представляет собой HTML-элемент, который представляет собой тело таблицы, где будут отображаться сделки.

### Возвращаемое значение
Код возвращает таблицу сделок, полученных из API. В таблице содержится информация, такая как идентификатор сделки, имя, цена, идентификатор ответственного пользователя, идентификатор статуса, идентификатор воронки, создано пользователем, обновлено пользователем, создано в, обновлено в и идентификатор аккаунта. Таблица может быть отсортирована (client side) по разным критериям и разбита на страницы (client side).
