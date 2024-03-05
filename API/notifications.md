# Уведомление пользователя

Все интерфейсы этого раздела находятся в пространстве имён `Notifications`.

## Интерфейс Manager<a name="manager"></a>
```ts
interface Manager {
	smtp(channel: string): Smtp.Builder;
	web(channel: string): Web.Builder;
}
```
Интерфейс, объединяющий каналы уведомлений пользователя.

&nbsp;

```js
smtp(channel: string): Smtp.Builder
```
Возвращает интерфейс [`Smtp.Builder`](#smtp.builder) канала с именем `channel` уведомления пользователя по протоколу [`SMTP`](https://ru.wikipedia.org/wiki/SMTP).

&nbsp;

```js
web(channel: string): Web.Builder
```
Возвращает интерфейс [`Web.Builder`](#web.builder) канала с именем `channel` уведомления пользователя по протоколу [`HTTP,WS`](https://ru.wikipedia.org/wiki/SMTP https://ru.wikipedia.org/wiki/WebSocket).<br>
По умолчанию, в системе присутствует один единственный канал `WEB notices`. Администраторы могут создать дополнительные каналы в интерфейсе управления workspace.

&nbsp;

### Интерфейс Smtp.Builder<a name="smtp.builder"></a>
```ts
interface Smtp.Builder {
	setTo(to: string | string[]): this;
	setSubject(subject: string): this;
	setBody(body: string): this;
	attachFiles(paths: string[]): this;
	isHtml(flag: boolean): this;
	send(): Smtp.Result;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки и отправки письма по протоколу [`SMTP`](https://ru.wikipedia.org/wiki/SMTP).

&nbsp;

```js
setTo(to: string | string[]): this
```
Устанавливает адресата или адресатов. Возвращает `this`.

&nbsp;

```js
setSubject(subject: string): this
```
Устанавливает тему письма. Возвращает `this`.

&nbsp;

```js
setBody(body: string): this
```
Устанавливает тело письма. Возвращает `this`.

&nbsp;

```js
attachFiles(paths: string[]): this
```
Прикрепляет к письму файлы из локальной директории скрипта, находящиеся по путям, переданным в `paths`. Возвращает `this`.

&nbsp;

```js
isHtml(flag: boolean): this;
```
Устанавливает заголовок `Content-Type` равным `text/html`, что позволяет почтовым программам понять, что нужно рендерить письмо как `HTML`-содержимое. По умолчанию `false`. Возвращает `this`.

&nbsp;

```js
send(): Smtp.Result
```
Запускает механизм асинхронной отправки письма. Возвращает интерфейс [`Smtp.Result`](#smtp.result).

&nbsp;

### Интерфейс Smtp.Result<a name="smtp.result"></a>
```ts
interface Smtp.Result {
}
```
Интерфейс доступа к результатам отправки письма. Он пустой.

&nbsp;

### Интерфейс Web.Builder<a name="web.builder"></a>
```ts
interface Web.Builder {
	setTo(to: string | string[]): this;
	setSubject(subject: string): this;
	setBody(body: string): this;
	send(): Web.Result;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки и отправки уведомления по протоколу [`HTTP,WS`](https://ru.wikipedia.org/wiki/SMTP https://ru.wikipedia.org/wiki/WebSocket).

&nbsp;

```js
setTo(to: string | string[]): this
```
Устанавливает адресата или адресатов. В качестве адресатов используются e-mail пользователей.<br>
Также, для упрощения рассылки сообщений в `sendTo` могут использоваться следующие строковые константы:<br>
◾️ `'%ALL_USERS%'` - все пользователи workspace<br>
◾️ `'%ALL_GENERAL_USERS%'` - обычные пользователи workspace, у которых нет привилегий `modeller`, `admin`, `service user`<br>
◾️ `'%ALL_SERVICE_USERS%'` - пользователи workspace, у которых есть привилегии `service user`<br>
◾️ `'%ALL_ADMINS%'` - пользователи workspace, у которых есть привилегии `admin`<br>
◾️ `'%ALL_MODELLERS%'` - пользователи workspace, у которых есть привилегии `modeller`<br>
◾️ `'%URGENT_NOTICE%'` - повышает важность сообщения, может быть использованно при отображении уведомления на клиенте<br>
Возвращает `this`.

&nbsp;

```js
setSubject(subject: string): this
```
Устанавливает тему уведомления (строка передаётся в кодировке `UTF-8`, длина строки ограничена 4096 символами).<br>
Возвращает `this`.

&nbsp;

```js
setBody(body: string): this
```
Устанавливает тело уведомления (строка передаётся в кодировке `UTF-8`, длина строки ограничена 262144 символами).<br>
Возвращает `this`.

&nbsp;

```js
send(): Web.Result
```
Запускает механизм асинхронной отправки уведомления. Возвращает интерфейс [`Web.Result`](#web.result).

Пример использования:

```js
const channelName = 'WEB notices';
const recepients = ['tester1@example.com','tester2@example.com','%ALL_MODELLERS%'];
const sender = om.notifications.web(channelName);

try {
    const result = sender
        .setTo(recepients)
        .setSubject('Hello from scripts!')
        .setBody('Some message')
        .send();

    console.log('Success:\n\n');
    console.log(result.messageId);
} catch (e) {
    console.log(`Error: ${e.message}`);
}
```

&nbsp;

### Интерфейс Web.Result<a name="web.result"></a>
```ts
interface Web.Result {
    messageId: string;
}
```
Интерфейс доступа к результатам отправки уведомления. Содержит строку `messageId` с идентификатором отправленного уведомления.<br>
Администраторы могут использовать идентификатор для поиска сообщения в интерфейсе управления workspace.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
