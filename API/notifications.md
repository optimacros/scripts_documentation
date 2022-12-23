# Уведомление пользователя

Все интерфейсы этого раздела находятся в пространстве имён `Notifications`.

### Интерфейс Manager<a name="manager"></a>
```ts
interface Manager {
	smtp(channel: string): Smtp.Builder;
}
```
Интерфейс, объединяющий каналы уведомлений пользователя.

&nbsp;

```js
smtp(channel: string): Smtp.Builder
```
Возвращает интерфейс [`Smtp.Builder`](#smtp.builder) канала с именем `channel` уведомления пользователя по протоколу [`SMTP`](https://ru.wikipedia.org/wiki/SMTP).

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

[API Reference](API.md)

[Оглавление](../README.md)
