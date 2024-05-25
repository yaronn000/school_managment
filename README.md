# school_managment

запуск
npm install
npx sequelize-cli db:migrate
npm run dev
данные для подключения к бд в файле .env

запросы
http://localhost:5000/api основной адрес

post /auth/login body: {
    "email": "super_admin@mail.com",
    "password": "12345"
} вход
post /auth/logout bearer token выход
get /auth/refresh обновить токены
get /auth/me bearer token иформация о пользоателе

post /admin/create bearer token body: {
    "surname": "Ivanov",
    "name": "Ivan",
    "patronymic": "Ivanovich",
    "email": "12345@mail.com",
    "password": "12345",
    "roleId": 1
} создать пользователя
put /admin/update/:id bearer token body: {
    "surname": "Ivanov",
    "name": "Petrq",
    "patronymic": "Ivanovich",
    "email": "12345@mail.com",
    "roleId": 2
} обновить пользователя
delete /admin/delete/:id bearer token удалить пользователя





