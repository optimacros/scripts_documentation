# Коннекторы

## Реляционные БД<a name="relationalDB"></a>
1. [MongoDB](#mongoDB)
1. [HTTP](#http)
1. [WinAgent](#WinAgent)


### Интерфейс Connectors<a name="Connectors"></a>
```ts
interface Connectors {
	mysql(): MysqlConnectorBuilder;
	postgresql(): SqlConnectorBuilder;
	sqlServer(): MicrosoftSqlConnectorBuilder;
	oracle(): OracleConnectorBuilder;
	mongodb(): Mongodb.ConnectorBuilder;
	http(): Http.HttpManager;
	winAgent(builtIn?: boolean): WinAgent.WinAgentBuilder;
}
```
Интерфейс, группирующий [`коннекторы`](../appendix/glossary.md#connector) к различным внешним системам.

&nbsp;

```js
mysql(): MysqlConnectorBuilder
```
Возвращает коннектор [`MysqlConnectorBuilder`](./relationalDB.md#MysqlConnectorBuilder) для подключения к базе данных [`MySQL`](https://ru.wikipedia.org/wiki/MySQL).

&nbsp;

```js
postgresql(): SqlConnectorBuilder
```
Возвращает коннектор [`SqlConnectorBuilder`](./relationalDB.md#SqlConnectorBuilder) для подключения к базе данных [`PostgreSQL`](https://ru.wikipedia.org/wiki/PostgreSQL).

&nbsp;

```js
sqlServer(): MicrosoftSqlConnectorBuilder
```
Возвращает коннектор [`MicrosoftSqlConnectorBuilder`](./relationalDB.md#MicrosoftSqlConnectorBuilder) для подключения к базе данных [`Microsoft SQL Server`](https://ru.wikipedia.org/wiki/Microsoft_SQL_Server).

&nbsp;

```js
oracle(): OracleConnectorBuilder
```
Возвращает коннектор [`OracleConnectorBuilder`](./relationalDB.md#OracleConnectorBuilder) для подключения к базе данных [`Oracle`](https://ru.wikipedia.org/wiki/Oracle_Database).

&nbsp;

```js
mongodb(): Mongodb.ConnectorBuilder
```
Возвращает коннектор [`Mongodb.ConnectorBuilder`](./mongoDB.md#ConnectorBuilder) для подключения к базе данных [`MongoDB`](https://ru.wikipedia.org/wiki/MongoDB).

&nbsp;

```js
http(): Http.HttpManager
```
Возвращает коннектор [`Http.HttpManager`](./http.md#HttpManager) соединения по протоколу HTTP.

&nbsp;

```js
winAgent(builtIn?: boolean): WinAgent.WinAgentBuilder
```
Возвращает коннектор [`WinAgent.WinAgentBuilder`](#WinAgentBuilder) для взаимодействия с [`WinAgent`](#WinAgent). Параметр `builtIn` указывает использовать встроенную конфигурацию воркспейса. Значение по умолчанию: `false`.

&nbsp;



## WinAgent<a name="WinAgent"></a>

WinAgent – сервис создания отчётов MS Word и Excel, работающий по протоколу [`HTTP`](https://ru.wikipedia.org/wiki/HTTP). Для его работы на выделенной машине под управлением Windows должен быть установлен сам сервис и MS Office, включающий пакеты Word и Excel. WinAgent принимает на вход отчёты из Optimacros и файл MS Word или MS Excel с макросом (расширение `docm` или `xlsm`) и запускает макрос. Макрос должен заранее знать, где будут располагаться входящие файлы. Он будет автомагически располагать в шаблоне данные этих файлов в зависимости от задачи.

Все интерфейсы этого раздела, находятся в пространстве имён `WinAgent`.

### Интерфейс WinAgentBuilder<a name="WinAgentBuilder"></a>
```js
interface WinAgentBuilder {
	setCommandUrl(url: string): this;
	setDownloadUrl(url: string): this;
	auth(): Http.HttpAuth;
	makeRunMacrosAction(): RunMacroAction;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки доступа к WinAgent.

&nbsp;

```js
setCommandUrl(url: string): this
```
Устанавливает [`URL`](https://ru.wikipedia.org/wiki/URL) агента, на который будут подаваться команды из скрипта. Возвращает `this`.

&nbsp;

```js
setDownloadUrl(url: string): this
```
Устанавливает [`URL`](https://ru.wikipedia.org/wiki/URL), по которому можно будет скачивать результирующие документы. Возвращает `this`.

&nbsp;

```js
auth(): Http.HttpAuth
```
Возвращает интерфейс [`Http.HttpAuth`](./http.md#HttpAuth) доступа к настройкам аутентификации WinAgent.

&nbsp;

```js
makeRunMacrosAction(): RunMacroAction
```
Возвращает интерфейс [`RunMacroAction`](#RunMacroAction) настройки и запуска макроса.

&nbsp;

### Интерфейс BaseAction<a name="BaseAction"></a>
```ts
interface BaseAction {
	run(): BaseActionResult;
}
```
Базовый интерфейс действия.

&nbsp;

```js
run(): BaseActionResult
```
Выполняет действие и возвращает базовый интерфейс [`BaseActionResult`](#BaseActionResult) доступа к данным его результата.

&nbsp;

### Интерфейс RunMacroAction<a name="RunMacroAction"></a>
```еs
interface RunMacroAction extends BaseAction {
	setMacroName(macroName: string): this;
	setMacroFilePath(macroFilePath: string): this;
	setDataFilePaths(dataFilePaths: string[]): this;
	run(): RunMacroActionResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки запуска макроса. Наследуется от [`BaseAction`](#BaseAction).

&nbsp;

```js
setMacroName(macroName: string): this
```
Устанавливает имя макроса. Значение по умолчанию: `'process'`. Возвращает `this`.

&nbsp;

```js
setMacroFilePath(macroFilePath: string): this
```
Устанавливает имя файла с макросом. Возвращает `this`.

&nbsp;

```js
setDataFilePaths(dataFilePaths: string[]): this
```
Задаёт массив входных файлов с данными для макроса. Возвращает `this`.

&nbsp;

```js
run(): RunMacroActionResult
```
Запускает макрос и возвращает интерфейс [`RunMacroActionResult`](#RunMacroActionResult) доступа к данным его результата.

&nbsp;

### Интерфейс BaseActionResult<a name="BaseActionResult"></a>
```ts
interface BaseActionResult {

}
```
Базовый интерфейс результата действия. Он пустой.

&nbsp;

### Интерфейс RunMacroActionResult<a name="RunMacroActionResult"></a>
```ts
interface RunMacroActionResult extends BaseActionResult {
	getFilePaths(): string[];
}
```
Интерфейс доступа к данным результата выполнения макроса. Наследуется от [`BaseActionResult`](#BaseActionResult).

&nbsp;

```js
getFilePaths(): string[]
```
Возвращает список имён результирующих файлов.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
