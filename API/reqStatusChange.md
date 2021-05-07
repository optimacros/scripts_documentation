# Изменение статуса текущего запроса

### Интерфейс RequestManager ...<a name="RequestManager"></a>
```ts
interface RequestManager {
    log(message: string, print?: boolean): RequestManager;
    logStatusMessage(message: string, print?: boolean): RequestManager;
    setStatusMessage(message: string): RequestManager;
}
```

&nbsp;


```js
log(message: string, print?: boolean): RequestManager
```
Выводит сообщение `message` в лог, доступ к которому можно получить в админке. Если `print == true` (по умолчанию: `false`), дублирует его в консоль и дополнительно переносит курсор на новую строку. Возвращает `this`. **Устаревшая функция.**

![Лог в админке](./pic/requestInfo.png)

&nbsp;

```js
logStatusMessage(message: string, print?: boolean): RequestManager
```
 Возвращает `this`.

&nbsp;

```js
setStatusMessage(message: string): RequestManager
```
 Возвращает `this`.

[API Reference](API.md)

[Оглавление](../README.md)