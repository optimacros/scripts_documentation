# Коннекторы

## Интерфейс Connectors<a name="connectors"></a>
```ts
interface Connectors {
	mysql(): MysqlConnectorBuilder;
	postgresql(): PostgresqlConnectorBuilder;
	sqlServer(): MicrosoftSqlConnectorBuilder;
	oracle(): OracleConnectorBuilder;
	snowflake(): SnowflakeConnectorBuilder;
	mongodb(): Mongodb.ConnectorBuilder;
	http(): Http.HttpManager;
	winAgent(builtIn?: boolean): WinAgent.WinAgentBuilder;
	verticaViaPgsqlDriver(): PgsqlDrivenVerticaConnectorBuilder;
	clickhouse(): ClickhouseConnectorBuilder;
}
```
Интерфейс, группирующий [`коннекторы`](../appendix/glossary.md#connector) к различным внешним системам.

&nbsp;

```js
mysql(): MysqlConnectorBuilder;
```
Возвращает коннектор [`MysqlConnectorBuilder`](./relationalDB.md#mysql-connector-builder) для подключения к базе данных [`MySQL`](https://ru.wikipedia.org/wiki/MySQL).

&nbsp;

```js
postgresql(): PostgresqlConnectorBuilder;
```
Возвращает коннектор [`PostgresqlConnectorBuilder`](./relationalDB.md#postgresql-connector-builder) для подключения к базе данных [`PostgreSQL`](https://ru.wikipedia.org/wiki/PostgreSQL).

&nbsp;

```js
sqlServer(): MicrosoftSqlConnectorBuilder;
```
Возвращает коннектор [`MicrosoftSqlConnectorBuilder`](./relationalDB.md#microsoft-sql-connector-builder) для подключения к базе данных [`Microsoft SQL Server`](https://ru.wikipedia.org/wiki/Microsoft_SQL_Server).

&nbsp;

```js
oracle(): OracleConnectorBuilder;
```
Возвращает коннектор [`OracleConnectorBuilder`](./relationalDB.md#oracle-connector-builder) для подключения к базе данных [`Oracle`](https://ru.wikipedia.org/wiki/Oracle_Database).

&nbsp;

```js
snowflake(): SnowflakeConnectorBuilder;
```
Возвращает коннектор [`SnowflakeConnectorBuilder`](./relationalDB.md#snowflake-connector-builder) для подключения к базе данных [`Snowflake`](https://en.wikipedia.org/wiki/Snowflake_Inc%2E).

&nbsp;

```js
mongodb(): Mongodb.ConnectorBuilder;
```
Возвращает коннектор [`Mongodb.ConnectorBuilder`](./mongoDB.md#connector-builder) для подключения к базе данных [`MongoDB`](https://ru.wikipedia.org/wiki/MongoDB).

&nbsp;

```js
http(): Http.HttpManager;
```
Возвращает коннектор [`Http.HttpManager`](./http.md#http-manager) соединения по протоколу HTTP.

&nbsp;

```js
winAgent(builtIn?: boolean): WinAgent.WinAgentBuilder;
```

**Deprecation warning! Данный интерфейс более не развивается и будет удален в будущих версиях приложения. Если вы его используете, вам необходимо реализовать взаимодействие через коннектор `http`**

Возвращает коннектор [`WinAgent.WinAgentBuilder`](./winAgent.md#win-agent-builder) для взаимодействия с [`WinAgent`](./winAgent.md). Параметр `builtIn` указывает использовать встроенную конфигурацию воркспейса. Значение по умолчанию: `false`.

&nbsp;

```js
verticaViaPgsqlDriver(): PgsqlDrivenVerticaConnectorBuilder;
```
Возвращает коннектор [`PgsqlDrivenVerticaConnectorBuilder`](./relationalDB.md#vertica-connector-builder) для подключения к базе данных [`Vertica`](https://en.wikipedia.org/wiki/Vertica).

&nbsp;

```js
clickhouse(): ClickhouseConnectorBuilder;
```
Возвращает коннектор [`ClickhouseConnectorBuilder`](./clickhouse.md#clickhouse-connector-builder) для подключения к базе данных [`Clickhouse`](https://ru.wikipedia.org/wiki/ClickHouse).

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
