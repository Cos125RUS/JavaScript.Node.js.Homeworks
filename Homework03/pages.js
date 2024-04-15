'use strict'

const page = (title, count, link) => {
    return `<h1>${title}</h1>
    <p>Просмотров: ${count}</p>
    <a href="${link}">Ссыдка на страницу ${link}</a>`;
};
const home = (count) => {
    return page('Корневая страница', count, '/about');
};
const about = (count) => {
    return page('Страница about', count, '/');
};

module.exports = { home, about };