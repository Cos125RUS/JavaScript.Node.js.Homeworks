'use strict'

const express = require('express');

/**
 * сервис для манипуляции данными пользователей
 */
const userService = require('./service/userService');

const { userScheme, idScheme } = require('./validation/scheme'); //схемы валидации
const { checkParams, checkBody } = require('./validation/validator'); //методы валидации

userService.init(); //инициализация репозитория

const app = express();

app.use(express.json());

/**
 * Логирование запросов
 */
app.use((req, res, next) => {
    const date = new Date(Date.now()).toISOString().replace('T', ' ').split('.')[0];
    console.group(date);
    console.log(`${req.method} ${req.url}`);
    next();
});

/**
 * Логирование результата запроса
 * @param {*} code код ответа
 */
const logResult = (code, data) => {
    console.log('Status: ' + code);
    if (data) {
        console.log(data.result);
    }
    console.groupEnd();
}

/**
 * Запрос списка всех пользователей
 */
app.get('/users', (req, res) => {
    const users = userService.findAll();
    logResult(200);
    res.send({ users });
});

/**
 * Запрос данных пользователя по идентификатору
 */
app.get('/users/:id', checkParams(idScheme), (req, res) => {
    const user = userService.findById(req.params.id);
    if (user) {
        logResult(200, { result: 'user founded by id: ' + req.params.id });
        res.send({ user });
    } else {
        logResult(404, { result: 'User not founded by id: ' + req.params.id });
        res.send({ error: 'User not found' });
    }
});

/**
 * Обновление данных пользователя по указанному идентификатору
 */
app.put('/users/:id', checkParams(idScheme), checkBody(userScheme), (req, res) => {
    const user = userService.updateUser(req.params.id, req.body);
    if (user) {
        logResult(200, { result: 'update user by id: ' + req.params.id });
        res.send({ user });
    } else {
        logResult(404, { result: 'User not founded by id: ' + req.params.id });
        res.send({ error: 'User not found' });
    }
});

/**
 * Создание нового пользователя
 */
app.post('/users', checkBody(userScheme), (req, res) => {
    const user = userService.saveUser(req.body);
    res.status(201);
    logResult(201, { result: 'add user: ' + JSON.stringify(user) });
    res.send({ user });
});

/**
 * Удаление пользователя по идентификатору
 */
app.delete('/users/:id', checkParams(idScheme), (req, res) => {
    if (userService.deleteUser(req.params.id)) {
        logResult(200, { result: 'deleted user by id: ' + req.params.id });
        res.send({ status: 'ok' });
    } else {
        logResult(404, { result: 'User not founded by id: ' + req.params.id });
        res.send({ error: 'User not found' });
    }
});

/**
 * Обработка ошибочных путей запросов
 */
app.route('/*').all((req, res) => {
    res.status(400);
    logResult(400, { result: 'Bad request' });
    res.send({ error: 'Bad request' });
})

app.listen(8080, () => console.log("Started"));