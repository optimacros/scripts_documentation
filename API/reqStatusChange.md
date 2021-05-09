# Изменение статуса текущего запроса

### Интерфейс RequestManager ...<a name="RequestManager"></a>
```ts
interface RequestManager {
    log(message: string, print?: boolean): RequestManager;
    logStatusMessage(message: string, print?: boolean): RequestManager;
    setStatusMessage(message: string): RequestManager;
}
```
Интерфейс для записи в лог (устаревший функционал) и работы со статусными сообщениями. Все функции возвращают `this`.

&nbsp;


```js
log(message: string, print?: boolean): RequestManager
```
Выводит сообщение `message` в лог, доступ к которому можно получить в админке. Если `print == true` (по умолчанию: `false`), дублирует `message` в консоль и дополнительно переносит курсор на новую строку. *Устаревшая функция.*

![Лог в админке](./pic/requestInfo.png)

&nbsp;

```js
logStatusMessage(message: string, print?: boolean): RequestManager
```
Делает то же, что и `setStatusMessage()`. Если `print == true` (по умолчанию: `false`), дублирует `message` в консоль и дополнительно переносит курсор на новую строку. *Устаревшая функция.*

&nbsp;

```js
setStatusMessage(message: string): RequestManager
```
Устанавливает статусное сообщение `message`. Имеет смысл во время длительной работы скриптов сообщать пользователю об этапах или процентах выполненных работ.

![Статусное сообщение](./pic/statusMessage.png)

[API Reference](API.md)

[Оглавление](../README.md)