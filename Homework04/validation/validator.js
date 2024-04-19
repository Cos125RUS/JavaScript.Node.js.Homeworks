'use strict'

/**
 * Проверка параметров запроса
 * @param {*} scheme схема проверки валидности
 * @returns callback функция проверки валидности
 */
const checkParams = (scheme) => {
    return (req, res, next) => {
        const validationResult = scheme.validate(req.params);
        if (validationResult.error) {
            return res.status(404).send(validationResult.error.details);
        }
        next();
    }
}

/**
 * Проверка параметров, переданных в теле запроса
 * @param {*} scheme схема проверки валидности
 * @returns callback функция проверки валидности
 */
const checkBody = (scheme) => {
    return (req, res, next) => {
        const validationResult = scheme.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send(validationResult.error.details);
        }
        next();
    }
}

module.exports = { checkParams, checkBody };