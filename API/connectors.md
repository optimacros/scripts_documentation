# Коннекторы

1. Реляционные СУБД
1. MongoDB
1. HTTP

## Реляционные СУБД

### Интерфейс SqlQueryResult ...<a name="SqlQueryResult"></a>
```ts
interface SqlQueryResult {
    count(): number;
    generator(likeArray?: boolean): object[];
    all(): object[];
    first(): object;
    column(columnName: string): any[];
    cell(columnName: string, rowIndex?: number): number | string | boolean | null;
    updated(): number;
    lastId(): number;
}
```

&nbsp;

### Интерфейс SqlQueryBuilder ...<a name="SqlQueryBuilder"></a>
```ts
interface SqlQueryBuilder {
    execute(sql: string, bindings?: object): SqlQueryResult;
}
```

&nbsp;

### Интерфейс SqlConnection ...<a name="SqlConnection"></a>
```ts
interface SqlConnection {
    qb(): SqlQueryBuilder;
}
```
Интерфейс соединения с реляционной базой данных.

&nbsp;

```js
qb(): SqlQueryBuilder
```


&nbsp;

### Интерфейс SqlConnectorBuilder ...<a name="SqlConnectorBuilder"></a>
```ts
interface SqlConnectorBuilder {
    setHost(value: string): SqlConnectorBuilder;
    setPort(value: number): SqlConnectorBuilder;
    setUsername(value: string): SqlConnectorBuilder;
    setPassword(value: string): SqlConnectorBuilder;
    setDatabase(value: string): SqlConnectorBuilder;
    /**
     * https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility
     */
    loadBulkCopyBuilder(): SqlBulkCopyBuilder;
    load(): SqlConnection;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), базовый интерфейс [`коннекторов`](../glossary.md#connector) для подключения к реляционной базе данных.

&nbsp;

```js
setHost(value: string): SqlConnectorBuilder
```
Устанавливает адрес подключения. Возвращает `this`.

&nbsp;

```js
setPort(value: number): SqlConnectorBuilder
```
Устанавливает номер порта для подключения. Возвращает `this`.

```js
setUsername(value: string): SqlConnectorBuilder
```
Устанавливает имя пользователя. Возвращает `this`.

```js
setPassword(value: string): SqlConnectorBuilder
```
Устанавливает пароль. Возвращает `this`.

```js
setDatabase(value: string): SqlConnectorBuilder
```
Устанавливает имя базы данных. Возвращает `this`.

```js
loadBulkCopyBuilder(): SqlBulkCopyBuilder
```
...........

```js
load(): SqlConnection
```
Соединяется с БД и возвращает интерфейс соединения [`SqlConnection`](#SqlConnection).


### Интерфейс MysqlConnectorBuilder ...<a name="MysqlConnectorBuilder"></a>
```ts
interface MysqlConnectorBuilder extends SqlConnectorBuilder {
    loadImportBuilder(): MysqlImportBuilder;
}
```
[`Коннектор`](../glossary.md#connector) для подключения к базе данных [`MySQL`](https://ru.wikipedia.org/wiki/MySQL).

&nbsp;

```js
loadImportBuilder(): MysqlImportBuilder
```
......

&nbsp;

### Интерфейс MicrosoftSqlConnectorBuilder ...<a name="MicrosoftSqlConnectorBuilder"></a>
```ts
interface MicrosoftSqlConnectorBuilder extends SqlConnectorBuilder {
    /**
     * @param name DBLIB|ODBC|SQLSRV
     */
    setDriver(name: string | null): this;

    /**
     * https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility
     */
    loadBulkCopyBuilder(): SqlBulkCopyBuilder;
}
```


&nbsp;

### Интерфейс OracleConnectorBuilder ...<a name="OracleConnectorBuilder"></a>
```ts
export interface OracleConnectorBuilder extends SqlConnectorBuilder {
    setServiceName(value: string): this;

    setSchema(value: string): this;

    setTNS(value: string): this;
}
```


&nbsp;

### Интерфейс Connectors ...<a name="Connectors"></a>
```ts
interface Connectors {
    mysql(): MysqlConnectorBuilder;
    postgresql(): SqlConnectorBuilder;
    sqlServer(): MicrosoftSqlConnectorBuilder;
    oracle(): OracleConnectorBuilder;
    mongodb(): Mongodb.ConnectorBuilder;
    http(): Http.HttpManager;
		
    /**
     * @param builtIn Use built-in configuration if exists. Default is 'false'
     */
    winAgent(builtIn?: boolean): WinAgent.WinAgentBuilder;
}
```

&nbsp;

```js
mysql(): MysqlConnectorBuilder
```

&nbsp;

```js
postgresql(): SqlConnectorBuilder
```

&nbsp;

```js
sqlServer(): MicrosoftSqlConnectorBuilder
```

&nbsp;

```js
oracle(): OracleConnectorBuilder
```

&nbsp;

```js
mongodb(): Mongodb.ConnectorBuilder
```

&nbsp;

```js
http(): Http.HttpManager
```

&nbsp;

```js
winAgent(builtIn?: boolean): WinAgent.WinAgentBuilder
```

&nbsp;

## MongoDB

&nbsp;

## HTTP


[API Reference](API.md)

[Оглавление](../README.md)