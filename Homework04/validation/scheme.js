'use strict'

const joi = require('joi');

/**
 * Схема валидации пользовательских данных
 */
const userScheme = joi.object({
    firstName: joi.string().min(1).max(50).required(),
    secondName: joi.string().min(1).max(50).required(),
    age: joi.number().integer().min(0).max(200).required(),
    city: joi.string().min(3).max(50)
});

/**
 * Схема валидации идентификатора
 */
const idScheme = joi.object({
    id: joi.number().integer().min(0).required()
});



module.exports = {
    userScheme,
    idScheme
};
