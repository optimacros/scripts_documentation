# Коннекторы

### Интерфейс Connectors<a name="Connectors"></a>
```ts
interface Connectors {
	mysql(): MysqlConnectorBuilder;
	postgresql(): SqlConnectorBuilder;
	sqlServer(): MicrosoftSqlConnectorBuilder;
	oracle(): OracleConnectorBuilder;
	snowflake(): SnowflakeConnectorBuilder;
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
snowflake(): SnowflakeConnectorBuilder;
```
Возвращает коннектор [`SnowflakeConnectorBuilder`](./relationalDB.md#SnowflakeConnectorBuilder) для подключения к базе данных [`Snowflake`](https://habr.com/ru/company/lifestreet/blog/270167/).

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
Возвращает коннектор [`WinAgent.WinAgentBuilder`](./winAgent.md#WinAgentBuilder) для взаимодействия с [`WinAgent`](./winAgent.md). Параметр `builtIn` указывает использовать встроенную конфигурацию воркспейса. Значение по умолчанию: `false`.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
