# Коннекторы

1. Реляционные СУБД
1. MongoDB
1. HTTP

##Реляционные СУБД

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

&nbsp;

### Интерфейс MysqlConnectorBuilder ...<a name="MysqlConnectorBuilder"></a>
```ts
interface MysqlConnectorBuilder extends SqlConnectorBuilder {
    loadImportBuilder(): MysqlImportBuilder;
}
```

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

##MongoDB

&nbsp;

##HTTP


[API Reference](API.md)

[Оглавление](../README.md)