# WinAgent

&nbsp;

**Deprecation warning! Данный интерфейс более не развивается и будет удален в будущих версиях приложения. Если вы его используете, вам необходимо реализовать взаимодействие через коннектор `http`**

&nbsp;

WinAgent – сервис создания отчётов MS Word и Excel, работающий по протоколу [`HTTP`](https://ru.wikipedia.org/wiki/HTTP). Для его работы на выделенной машине под управлением Windows должен быть установлен сам сервис и MS Office, включающий пакеты Word и Excel. WinAgent принимает на вход отчёты из Optimacros и файл MS Word или MS Excel с макросом (расширение `docm` или `xlsm`) и запускает макрос. Макрос должен заранее знать, где будут располагаться входящие файлы. Он будет автомагически располагать в шаблоне данные этих файлов в зависимости от задачи.

Все интерфейсы этого раздела находятся в пространстве имён `WinAgent`.

## Интерфейс WinAgentBuilder<a name="win-agent-builder"></a>
```js
interface WinAgentBuilder {
	setCommandUrl(url: string | SecretValue): this;
	setDownloadUrl(url: string | SecretValue): this;
	auth(): Http.HttpAuth;
	setConnectTimeout(sec: number): this;
	setRequestTimeout(sec: number): this;
	setOperationTimeout(sec: number): this;
	makeRunMacrosAction(): RunMacroAction;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки доступа к WinAgent. Функции для установки параметров подключения поддерживают [секреты](./secrets.md).

&nbsp;

```js
setCommandUrl(url: string | SecretValue): this;
```
Устанавливает [`URL`](https://ru.wikipedia.org/wiki/URL) агента, на который будут подаваться команды из скрипта. Возвращает `this`.

&nbsp;

```js
setDownloadUrl(url: string | SecretValue): this;
```
Устанавливает [`URL`](https://ru.wikipedia.org/wiki/URL), по которому можно будет скачивать результирующие документы. Возвращает `this`.

&nbsp;

```js
auth(): Http.HttpAuth;
```
Возвращает интерфейс [`Http.HttpAuth`](./http.md#http-auth) доступа к настройкам аутентификации WinAgent.

&nbsp;

```js
setConnectTimeout(sec: number): this;
```
Устанавливает таймаут ожидания соединения по HTTP в секундах. Значение по умолчанию: `10`. Возвращает `this`.

&nbsp;

```js
setRequestTimeout(sec: number): this;
```
Устанавливает таймаут ожидания ответа от внешнего ресурса в секундах. Значение по умолчанию: `600`. Возвращает `this`.

&nbsp;

```js
setOperationTimeout(sec: number): this;
```
Устанавливает таймаут ожидания WinAgent'ом исполнения макроса VBA в секундах. Значение по умолчанию: `150`. Возвращает `this`.


&nbsp;

```js
makeRunMacrosAction(): RunMacroAction;
```
Возвращает интерфейс [`RunMacroAction`](#run-macro-action) настройки и запуска макроса.

&nbsp;

### Интерфейс BaseAction<a name="base-action"></a>
```ts
interface BaseAction {
	run(): BaseActionResult;
}
```
Базовый интерфейс действия.

&nbsp;

```js
run(): BaseActionResult;
```
Выполняет действие и возвращает базовый интерфейс [`BaseActionResult`](#base-action-result) доступа к данным его результата.

&nbsp;

### Интерфейс RunMacroAction<a name="run-macro-action"></a>
```еs
interface RunMacroAction extends BaseAction {
	setMacroName(macroName: string): this;
	setMacroFilePath(macroFilePath: string): this;
	setDataFilePaths(dataFilePaths: string[]): this;
	run(): RunMacroActionResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки запуска макроса. Наследуется от [`BaseAction`](#base-action).

&nbsp;

```js
setMacroName(macroName: string): this;
```
Устанавливает имя макроса. Значение по умолчанию: `'process'`. Возвращает `this`.

&nbsp;

```js
setMacroFilePath(macroFilePath: string): this;
```
Устанавливает имя файла с макросом. Возвращает `this`.

&nbsp;

```js
setDataFilePaths(dataFilePaths: string[]): this;
```
Задаёт массив входных файлов с данными для макроса. Возвращает `this`.

&nbsp;

```js
run(): RunMacroActionResult;
```
Запускает макрос и возвращает интерфейс [`RunMacroActionResult`](#run-macro-action-result) доступа к данным его результата.

&nbsp;

### Интерфейс BaseActionResult<a name="base-action-result"></a>
```ts
interface BaseActionResult {
}
```
Базовый интерфейс результата действия. Он пустой.

&nbsp;

### Интерфейс RunMacroActionResult<a name="run-macro-action-result"></a>
```ts
interface RunMacroActionResult extends BaseActionResult {
	getFilePaths(): string[];
}
```
Интерфейс доступа к данным результата выполнения макроса. Наследуется от [`BaseActionResult`](#base-action-result).

&nbsp;

```js
getFilePaths(): string[];
```
Возвращает список имён результирующих файлов.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)