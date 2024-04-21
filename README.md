# Урок 1. Введение в Node.js
#### Напишите HTTP сервер и реализуйте два обработчика, где:
* По URL “/” будет возвращаться страница, на которой есть гиперссылка на вторую страницу по ссылке “/about”
* А по URL “/about” будет возвращаться страница, на которой есть гиперссылка на первую страницу “/”
* Также реализуйте обработку несуществующих роутов (404).
* \* На каждой странице реализуйте счетчик просмотров. Значение счетчика должно увеличиваться на единицу каждый раз, когда загружается страница.


# Урок 2. Программа для генерации паролей указанной длины 
#### `Длина - необязательный параметр, по умолчанию - 20 символов`

### добавление зависимости:
![добавление зависимости](require.png)


### Доступна в качестве программы из командной строки. 

![доступ из командной строки](command_line.png)

Если сразу не сработает, то нужно выполнить команду `npm link`

# Урок 3. Модули и фреймворк Express (WIP)
Обрабатываемые запросы:
* `“/”` - Корневая страница
* `“/about”` - Страница About

Порт по умолчанию: `8080` (можно указать значение в файле `.env`)

Статические файлы хранятся в папке `static`

В проекте используется шаблонизатор pug. Представления хранятся в папке `views`. Предоставляемые данные находятся в файле `pages.js`

Данные счётчика страниц хранятся в файле `count.json` (создаётся при первом запуске)
