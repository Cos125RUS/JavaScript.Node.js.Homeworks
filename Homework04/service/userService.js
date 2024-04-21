'use strict'

const path = require('path');
const fs = require('fs');

/**
 * Путь до файла с пользовательскими данными
 */
const filePath = path.join(__dirname, '../repo/users.json');

/**
 * Имитация базы данных
 */
let users = [];
/**
 * Последний выданный идентификатор
 */
let customId = 0;

/**
 * Инициализация сервиса
 */
const init = () => {
    users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (users.length > 0) {
        customId = users.pop().id;
    }
}

/**
 * Запрос списка всех пользователей
 * @returns список пользователей
 */
const findAll = () => {
    return users;
}

/**
 * Сохранение нового пользователя
 * @param {*} user данные нового пользователя
 * @returns сохранённый пользователь с присвоенным идентификатором
 */
const saveUser = (user) => {
    const newUser = {
        id: ++customId,
        firstName: user.firstName,
        secondName: user.secondName,
        age: user.age,
        city: user.city,
    };
    users.push(newUser);
    writeToFile();
    return newUser;
}

/**
 * Поиск пользователя по идентификатору
 * @param {*} id идентификатор пользователя
 * @returns данные пользователя
 */
const findById = (id) => {
    return users.find(user => user.id === Number(id));
}

/**
 * Обновление данных пользователя
 * @param {*} id идентификатор пользователя
 * @param {*} user новые данные пользователя
 * @returns обновлённый пользователь
 */
const updateUser = (id, user) => {
    const oldUser = findById(id);
    if (oldUser) {
        oldUser.firstName = user.firstName;
        oldUser.secondName = user.secondName;
        oldUser.age = user.age;
        oldUser.city = user.city;
        writeToFile();
        return oldUser;
    } else {
        return;
    }
}

/**
 * Удаление пользователя
 * @param {*} id идентификатор пользователя
 * @returns результат операции (true/false)
 */
const deleteUser = (id) => {
    const userIndex = users.findIndex(user => user.id === Number(id));
    if (userIndex >= 0) {
        users.splice(userIndex, 1);
        writeToFile();
        return true;
    } else {
        return false;
    }
}

/**
 * Сохранение данных в файл
 */
const writeToFile = () => {
    fs.writeFileSync(filePath, JSON.stringify(users));
}

module.exports = {
    init,
    findAll,
    saveUser,
    findById,
    updateUser,
    deleteUser,
};

