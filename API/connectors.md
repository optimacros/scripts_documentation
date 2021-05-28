# Коннекторы

1. Реляционные СУБД
1. MongoDB
1. HTTP

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
Интерфейс, группирующий [`коннекторы`](../glossary.md#connector) к различным внешним системам.

&nbsp;

```js
mysql(): MysqlConnectorBuilder
```
Возвращает коннектор [`MysqlConnectorBuilder`](#MysqlConnectorBuilder) для подключения к базе данных [`MySQL`](https://ru.wikipedia.org/wiki/MySQL).

&nbsp;

```js
postgresql(): SqlConnectorBuilder
```
Возвращает коннектор [`SqlConnectorBuilder`](#SqlConnectorBuilder) для подключения к базе данных [`PostgreSQL`](https://ru.wikipedia.org/wiki/PostgreSQL).

&nbsp;

```js
sqlServer(): MicrosoftSqlConnectorBuilder
```
Возвращает коннектор [`MicrosoftSqlConnectorBuilder`](#MicrosoftSqlConnectorBuilder) для подключения к базе данных [`Microsoft SQL Server`](https://ru.wikipedia.org/wiki/Microsoft_SQL_Server).

&nbsp;

```js
oracle(): OracleConnectorBuilder
```
Возвращает коннектор [`OracleConnectorBuilder`](#OracleConnectorBuilder) для подключения к базе данных [`Oracle`](https://ru.wikipedia.org/wiki/Oracle_Database).

&nbsp;

```js
mongodb(): Mongodb.ConnectorBuilder
```
Возвращает коннектор [`Mongodb.ConnectorBuilder`](#Mongodb.ConnectorBuilder) ...................... для подключения к базе данных [`MongoDB`](https://ru.wikipedia.org/wiki/MongoDB).

&nbsp;

```js
http(): Http.HttpManager
```

&nbsp;

```js
winAgent(builtIn?: boolean): WinAgent.WinAgentBuilder
```

&nbsp;

## Реляционные СУБД

### Интерфейс SqlQueryResult<a name="SqlQueryResult"></a>
```ts
interface SqlQueryResult {
    count(): number;
    generator(likeArray?: boolean): object[] | string[][];
    all(): object[];
    first(): object | null;
    column(columnName: string): string[];
    cell(columnName: string, rowIndex?: number): number | string | boolean | null;
    updated(): number;
    lastId(): number;
}
```
Интерфейс доступа к результатам запроса. Функции `generator()`, `all()`, `first()`, `column()` и `cell()` работают с одним и тем же внутренним итератором по строкам ответа на SQL-запрос, поэтому каждая из них начинает чтение с первой ещё не прочитанной строки ответа.

&nbsp;

```js
count(): number
```
Возвращает количество обработанных строк. Реализация зависит от СУБД и от драйвера.

&nbsp;

```js
generator(likeArray?: boolean): object[] | string[][]
```
Возвращает генератор для работы со строками запроса. Если `likeArray == true`, на каждой итерации генератор возвращает очередную строку запроса в виде массива полей `string[]`, иначе в виде `object`, где ключами выступают названия столбцов, значениями – данные; по умолчанию `likeArray == false`.

&nbsp;

```js
all(): object[]
```
Аналог вызову `generator(false)` с тем отличием, что возвращает все оставшиеся данные в виде массива.

&nbsp;

```js
first(): object | null
```
Возвращает ***следующую*** строку запроса, ***несмотря на название***.

&nbsp;

```js
column(columnName: string): string[]
```
Выбирает и возвращает в виде массива значения столбца `columnName` у всех оставшихся строк ответа.

&nbsp;

```js
cell(columnName: string, rowIndex?: number): number | string | boolean | null
```
Пропускает в итераторе ответа `rowIndex` (по умолчанию: `0`) строк и возвращает значение столбца `columnName` из очередной строки. Внутренний итератор переходит на следующую строку.

&nbsp;

```js
updated(): number
```
Возвращает количество изменённых строк. Если SQL-запрос был не на изменение, возвращаемое значение зависит от реализации.

&nbsp;

```js
lastId(): number
```
Функция работает только с запросом `INSERT`. Возвращает `id` последней вставленной строки.

&nbsp;

### Интерфейс SqlQueryBuilder<a name="SqlQueryBuilder"></a>
```ts
interface SqlQueryBuilder {
    execute(sql: string, bindings?: (string | number | boolean | null)[] | object): SqlQueryResult;
}
```
Интерфейс построения запроса к базе данных.

&nbsp;

```js
execute(sql: string, bindings?: (string | number | boolean | null)[] | object): SqlQueryResult
```
Конструирует SQL-запрос из строки `sql`, используя параметры привязки `bindings`, передаёт его на исполнение в СУБД и возвращает интерфейс [`SqlQueryResult`](#SqlQueryResult) доступа к результатам запроса.

Для конструирования запроса в параметре `sql` заполнители `'?'` последовательно заменяются элементами массива `bindings`. Пример:

```js
const sqlQuery = "INSERT INTO `city` (`name`, `country_id`, `population`) VALUES (?, ?, ?)";

const queryResult = mySqlConn.qb().execute(sqlQuery, ['Хабаровск', 7, 610305]);
```

Если запрос делается к СУБД MySQL, допускается ещё один вариант: заполнители состоят из двоеточия и имени, `bindings` является объектом, в процессе конструирования запроса подстановка происходит по ключу имени. Пример:

```js
const sqlQuery = "SELECT SUM(`price`) as summary FROM `sells` WHERE price > :price";

const queryResult = mySqlConn.qb().execute(sqlQuery, { price: 100 });
```

&nbsp;

### Интерфейс SqlConnection<a name="SqlConnection"></a>
```ts
interface SqlConnection {
    qb(): SqlQueryBuilder;
}
```
Объект соединения с реляционной базой данных.

&nbsp;

```js
qb(): SqlQueryBuilder
```
Возвращает интерфейс [`SqlQueryBuilder`](#SqlQueryBuilder) построения запроса к базе данных.

&nbsp;

### Интерфейс SqlConnectorBuilder<a name="SqlConnectorBuilder"></a>
```ts
interface SqlConnectorBuilder {
    setHost(value: string): SqlConnectorBuilder;
    setPort(value: number): SqlConnectorBuilder;
    setUsername(value: string): SqlConnectorBuilder;
    setPassword(value: string): SqlConnectorBuilder;
    setDatabase(value: string): SqlConnectorBuilder;
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

&nbsp;

```js
setUsername(value: string): SqlConnectorBuilder
```
Устанавливает имя пользователя. Возвращает `this`.

&nbsp;

```js
setPassword(value: string): SqlConnectorBuilder
```
Устанавливает пароль. Возвращает `this`.

&nbsp;

```js
setDatabase(value: string): SqlConnectorBuilder
```
Устанавливает имя базы данных. Возвращает `this`.

&nbsp;

```js
load(): SqlConnection
```
Соединяется с БД и возвращает объект соединения [`SqlConnection`](#SqlConnection).

&nbsp;

### Интерфейс MysqlConnectorBuilder<a name="MysqlConnectorBuilder"></a>
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
Возвращает ссылку на интерфейс [`MysqlImportBuilder`](#MysqlImportBuilder) импорта из файла CSV.

&nbsp;

### Интерфейс MicrosoftSqlConnectorBuilder ...<a name="MicrosoftSqlConnectorBuilder"></a>
```ts
interface MicrosoftSqlConnectorBuilder extends SqlConnectorBuilder {
    setDriver(name: string | null): MicrosoftSqlConnectorBuilder;
    loadBulkCopyBuilder(): SqlBulkCopyBuilder;
}
```

&nbsp;

```js
setDriver(name: string | null): MicrosoftSqlConnectorBuilder
```
Устанавливает драйвер взаимодействия с MS SQL Server. Допустимые значения: `DBLIB`, `ODBC`, `SQLSRV`. Значение по умолчанию: `DBLIB`. Возвращает `this`.

Для подключения к серверу с помощью `DBLIB` в случае аутентификации по протоколу [NTLMv2](https://ru.wikipedia.org/wiki/NTLMv2) необходимо настроить SQL-соединение в манифесте администратора воркспейса. Если это невозможно, рекомендуется использовать драйвер `SQLSRV`.

Драйвер `ODBC` считается устаревшим.

Для работы драйвера `SQLSRV` используется библиотека [`MS SQL для Linux`](https://docs.microsoft.com/ru-ru/sql/linux/sql-server-linux-overview). Её особенностью является подстановка параметров на стороне сервера, в связи с чем в его настройках установлено ограничение на максимальное их количество, по умолчанию: `1000`.

&nbsp;

```js
loadBulkCopyBuilder(): SqlBulkCopyBuilder
```
Возвращает ссылку на интерфейс [`SqlBulkCopyBuilder`](#SqlBulkCopyBuilder) импорта из файла CSV.................

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

### Интерфейс MysqlImportBuilder<a name="MysqlImportBuilder"></a>

```js
interface MysqlImportBuilder {
    setTable(name: string): MysqlImportBuilder;
    setDelimiter(delimiter: string): MysqlImportBuilder;
    setLineDelimiter(delimiter: string): MysqlImportBuilder;
    setEnclosure(enclosure: string): MysqlImportBuilder;
    setEscape(escape: string): MysqlImportBuilder;
    setThreads(threads: number): MysqlImportBuilder;
    setVerbose(verbose: boolean): MysqlImportBuilder;
    setFirstIgnoreLines(count: number): MysqlImportBuilder;
    setLockTable(status: boolean): MysqlImportBuilder;
    setForce(status: boolean): MysqlImportBuilder;
    setDeleteAllRows(status: boolean): MysqlImportBuilder;
    setCompress(status: boolean): MysqlImportBuilder;
    setIgnoreDuplicates(status: boolean): MysqlImportBuilder;
    setReplace(status: boolean): MysqlImportBuilder;
    setColumns(names: string[]): MysqlImportBuilder;
    setFilePath(path: string): MysqlImportBuilder;
    import(): MysqlImportResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для импорта в СУБД MySQL из файла CSV с помощью утилиты [*mysqlimport*](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html). Все функции, кроме `import()`, возвращают `this`.

&nbsp;

```js
setTable(name: string): MysqlImportBuilder;
```
Устанавливает таблицу, из которой будет производиться импорт.

&nbsp;

```js
setDelimiter(delimiter: string): MysqlImportBuilder;
```
Устанавливает разделитель полей. По умолчанию: `;`.

&nbsp;

```js
setLineDelimiter(delimiter: string): MysqlImportBuilder;
```
Устанавливает разделитель строк. По умолчанию: `\n`.

&nbsp;

```js
setEnclosure(enclosure: string): MysqlImportBuilder;
```
Устанавливает обрамляющий символ, которым будет обрамляться текстовое поле, если в нём содержится разделитель полей. По умолчанию: `"`.

&nbsp;

```js
setEscape(escape: string): MysqlImportBuilder;
```
Устанавливает символ для экранирования обрамляющего символа, если встретится в строке ещё и он, и символа переноса строки. По умолчанию равен обрамляющему символу.

&nbsp;

```js
setThreads(threads: number): MysqlImportBuilder;
```
Устанавливает количество [`потоков`](https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%82%D0%BE%D0%BA_%D0%B2%D1%8B%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F) импорта; опция *mysqlimport*: *--use-threads*. Задать можно не более `8` потоков. По умолчанию: `1`. 

&nbsp;

```js
setVerbose(verbose: boolean): MysqlImportBuilder;
```
Устанавливает флаг расширенного вывода; опция *mysqlimport*: *--verbose*. По умолчанию: `false`.

&nbsp;

```js
setFirstIgnoreLines(count: number): MysqlImportBuilder;
```
Устанавливает количество первых строк, которые будут проигнорированы; опция *mysqlimport*: *--ignore-lines*. По умолчанию: `0`.

&nbsp;

```js
setLockTable(status: boolean): MysqlImportBuilder;
```
Устанавливает флаг блокировки таблицы во время импорта; опция *mysqlimport*: *--lock-tables*. По умолчанию: `false`.

&nbsp;

```js
setForce(status: boolean): MysqlImportBuilder;
```
Устанавливает флаг игнорирования критических ошибок; опция *mysqlimport*: *--force*. По умолчанию: `false`.

&nbsp;

```js
setDeleteAllRows(status: boolean): MysqlImportBuilder;
```
Устанавливает флаг предварительного выполнения команды [`TRUNCATE`](https://ru.wikipedia.org/wiki/Truncate_(SQL)), что требует прав на эту команду; опция *mysqlimport*: *--delete*. По умолчанию: `false`.

&nbsp;

```js
setCompress(status: boolean): MysqlImportBuilder;
```
Устанавливает флаг компрессии; опция *mysqlimport*: *--compress*. По умолчанию: `false`.

&nbsp;

```js
setIgnoreDuplicates(status: boolean): MysqlImportBuilder;
```
Устанавливает флаг игнорирования строк с одинаковым уникальным ключом; опция *mysqlimport*: *--ignore*. По умолчанию: `false`.

&nbsp;

```js
setReplace(status: boolean): MysqlImportBuilder;
```
Устанавливает флаг замены строк с одинаковым уникальным ключом; опция *mysqlimport*: *--replace*. По умолчанию: `false`.

&nbsp;

```js
setColumns(names: string[]): MysqlImportBuilder;
```
Задаёт порядок столбцов таблицы, в которые будут записываться данные из файла CSV; опция *mysqlimport*: *--columns*. По умолчанию импорт будет производиться в столбцы таблицы последовательно.

&nbsp;

```js
setFilePath(path: string): MysqlImportBuilder;
```
Устанавливает путь к файлу в [`рабочей директории скрипта`](../glossary.md#scriptDir).

&nbsp;

<a name="MysqlImportBuilder.import"></a>
```js
import(): MysqlImportResult;
```
Формирует из флагов команду на вызов *mysqlimport*, дожидается завершения импорта и возвращает ссылку на [`MysqlImportResult`](#MysqlImportResult).

&nbsp;

### Интерфейс MysqlImportResult<a name="MysqlImportResult"></a>

```js
interface MysqlImportResult {
    hasErrors(): boolean;
    getErrorOutput(): string;
    getOutput(): string;
    getCommand(): string;
    getConfig(): string;
    getStats(): object;
}
```
Интерфейс просмотра результатов импорта, осуществлённого с помощью [`MysqlImportBuilder`](#MysqlImportBuilder).

&nbsp;

```js
hasErrors(): boolean
```
Возвращает `getErrorOutput() != ''`.

&nbsp;

```js
getErrorOutput(): string
```
Возвращает вывод команды *mysqlimport* в `stderr`.

&nbsp;

```js
getOutput(): string
```
Возвращает вывод команды *mysqlimport* в `stdout`.

&nbsp;

```js
getCommand(): string
```
Возвращает сформированную команду на вызов *mysqlimport*, которая была выполнена в момент вызова [`MysqlImportBuilder.import()`](#MysqlImportBuilder.import). Параметры будут сохранены в конфигурационном файле, доступ к которому можно получить функцией `getConfig()`.

&nbsp;

```js
getConfig(): string
```
Возвращает содержимое конфигурационного файла с параметрами импорта.

&nbsp;

```js
getStats(): object
```
Если импорт завершён без ошибок, возвращает объект вида `{"records": 3, "deleted": 0, "skipped": 0, "warnings": 0}`.

&nbsp;

### Интерфейс SqlBulkCopyBuilder ...<a name="SqlBulkCopyBuilder"></a>
```ts
interface SqlBulkCopyBuilder {
    setServerName(value: string): SqlBulkCopyBuilder;
    setPort(value: number): SqlBulkCopyBuilder;
    setUsername(value: string): SqlBulkCopyBuilder;
    setPassword(value: string): SqlBulkCopyBuilder;
    setDatabase(value: string): SqlBulkCopyBuilder;
    setQuery(value: string): SqlBulkCopyBuilder;
    setPacketSize(size: number): SqlBulkCopyBuilder;
    setBatchSize(size: number): SqlBulkCopyBuilder;
    setCharacterTypesMode(status: boolean): SqlBulkCopyBuilder;
    setCodePage(code: string): SqlBulkCopyBuilder;
    setDsnMode(status: boolean): SqlBulkCopyBuilder;
    setErrorFile(path: string): SqlBulkCopyBuilder;
    setKeepIdentityValuesMode(status: boolean): SqlBulkCopyBuilder;
    setFormatFile(path: string): SqlBulkCopyBuilder;
    setFirstRow(index: number): SqlBulkCopyBuilder;
    setHint(hint: string): SqlBulkCopyBuilder;
    setStandardInputFile(path: string): SqlBulkCopyBuilder;
    setKeepNullValuesMode(status: boolean): SqlBulkCopyBuilder;
    setLoginTimeout(timeout: number): SqlBulkCopyBuilder;
    setLastRow(index: number): SqlBulkCopyBuilder;
    setMaxErrors(size: number): SqlBulkCopyBuilder;
    setNativeTypesMode(status: boolean): SqlBulkCopyBuilder;
    setKeepNonTextNativeValuesMode(status: boolean): SqlBulkCopyBuilder;
    setOutputFile(path: string): SqlBulkCopyBuilder;
    setQuotedIdentifiersMode(status: boolean): SqlBulkCopyBuilder;
    setRowTerm(term: string): SqlBulkCopyBuilder;
    setRegionalMode(status: boolean): SqlBulkCopyBuilder;
    setFieldTerm(term: string): SqlBulkCopyBuilder;
    setTrustedConnectionMode(status: boolean): SqlBulkCopyBuilder;
    setWideCharacterTypesMode(status: boolean): SqlBulkCopyBuilder;

    import(path: string): SqlBulkCopyResult;

    export(path: string): SqlBulkCopyResult;

    /**
     * @param path
     * @param xml Default is true
     */
    format(path: string, xml: boolean): SqlBulkCopyResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для импорта в СУБД MS SQL из файла CSV с помощью утилиты [*bcp*](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility). Все функции, начинающиеся с `set...()`, возвращают `this`.

&nbsp;

<a name="setServerName"></a>
```js
setServerName(value: string): SqlBulkCopyBuilder
```
Устанавливает экземпляр SQL Server, к которому устанавливается подключение; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#S) *bcp*: *-S*.

&nbsp;

```js
setPort(value: number): SqlBulkCopyBuilder
```
Устанавливает номер порта соединения. По умолчанию: `1433`.

&nbsp;

```js
setUsername(value: string): SqlBulkCopyBuilder
```
Устанавливает имя пользователя; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#U) *bcp*: *-U*.

&nbsp;
```js
setPassword(value: string): SqlBulkCopyBuilder
```
Устанавливает имя пользователя; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#P) *bcp*: *-P*.

&nbsp;

```js
setDatabase(value: string): SqlBulkCopyBuilder
```
Устанавливает имя БД, к которой произойдёт подключение; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#d) *bcp*: *-d*.

&nbsp;

```js
setQuery(value: string): SqlBulkCopyBuilder
```
Устанавливает ***имя таблицы***, в которую будет произведён импорт, ***несмотря на название***.

&nbsp;

```js
setPacketSize(size: number): SqlBulkCopyBuilder
```
Устанавливает число байтов в каждом сетевом пакете; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#a) *bcp*: *-a*. Значение может находиться в пределах от `4096` до `65535` байт, значение по умолчанию: `4096`.

&nbsp;

```js
setBatchSize(size: number): SqlBulkCopyBuilder
```
Устанавливает количество строк в каждом пакете импортированных данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#b) *bcp*: *-b*. Каждый пакет импортируется и регистрируется как отдельная транзакция, которая фиксируется после выполнения импорта всего пакета. По умолчанию импорт всех строк в файле данных выполняется в одном пакете. 

&nbsp;

```js
setCharacterTypesMode(status: boolean): SqlBulkCopyBuilder
```
Устанавливает символьный тип данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#c) *bcp*: *-c*. Подробное описание [`здесь`](https://docs.microsoft.com/ru-ru/sql/relational-databases/import-export/use-character-format-to-import-or-export-data-sql-server?view=sql-server-ver15).

&nbsp;

```js
setCodePage(code: string): SqlBulkCopyBuilder
```
Устанавливает кодовую страницу данных в файле данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#C) *bcp*: *-C*. Значение по умолчанию: `OEM`.

&nbsp;

```js
setDsnMode(status: boolean): SqlBulkCopyBuilder
```
Устанавливает режим, в котором значение, передаваемое в функцию [`setServerName()`](#setServerName) интерпретируется как имя источника данных (DSN); [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#D) *bcp*: *-D*.

&nbsp;

```js
setErrorFile(path: string): SqlBulkCopyBuilder
```
Устанавливает полный путь к файлу ошибок, используемому для хранения строк, которые `bcp` не может передать из файла в базу данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#e) *bcp*: *-e*.

&nbsp;

```js
setKeepIdentityValuesMode(status: boolean): SqlBulkCopyBuilder
```
Указывает, что значение или значения идентификаторов в файле импортированных данных будут использоваться для столбца идентификаторов; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#E) *bcp*: *-E*.

&nbsp;

```js
setFormatFile(path: string): SqlBulkCopyBuilder
```
Устанавливает путь к файлу формата; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#f) *bcp*: *-f*. ***Этот функционал содержит баг в утилите bcp и не рекомендуется к использованию!***

&nbsp;

```js
setFirstRow(index: number): SqlBulkCopyBuilder
```
Устанавливает номер первой строки для импорта из файла данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#F) *bcp*: *-F*.

&nbsp;

```js
setHint(hint: string): SqlBulkCopyBuilder
```
Устанавливает одно или несколько указаний для использования во время массового импорта; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#h) *bcp*: *-h*.

&nbsp;

```js
setStandardInputFile(path: string): SqlBulkCopyBuilder
```
Устанавливает имя файла ответов, содержащего ответы на вопросы командной строки для каждого поля данных при выполнении массового копирования в интерактивном режиме; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#i) *bcp*: *-i*.

&nbsp;

```js
setKeepNullValuesMode(status: boolean): SqlBulkCopyBuilder
```
Указывает, что пустые столбцы во время данной операции должны сохранить значение NULL вместо любых вставляемых значений столбцов по умолчанию; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#k) *bcp*: *-k*.

&nbsp;

```js
setLoginTimeout(timeout: number): SqlBulkCopyBuilder
```
Устанавливает время ожидания входа в секундах; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#l) *bcp*: *-l*. Значение по умолчанию: `15`.

&nbsp;

```js
setLastRow(index: number): SqlBulkCopyBuilder
```
Устанавливает номер последней строки для импорта из файла данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#L) *bcp*: *-L*.

&nbsp;

```js
setMaxErrors(size: number): SqlBulkCopyBuilder
```
Устанавливает максимальное количество ошибок, которые могут произойти до отмены импорта; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#m) *bcp*: *-m*. Значение по умолчанию: ``....................................

&nbsp;

```js
setNativeTypesMode(status: boolean): SqlBulkCopyBuilder
```
Устанавливает признак использования собственных типов данных (базы данных). Этот параметр не запрашивает тип данных для каждого поля, он использует собственные значения; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#n) *bcp*: *-n*.

&nbsp;

```js
setKeepNonTextNativeValuesMode(status: boolean): SqlBulkCopyBuilder
```
Устанавливает признак использования собственных типов данных (базы данных) для несимвольных данных и символы Юникода для символьных данных. Этот параметр не запрашивает тип данных для каждого поля, он использует собственные значения; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#N) *bcp*: *-N*.

&nbsp;

```js
setOutputFile(path: string): SqlBulkCopyBuilder
```
Устанавливает имя файла, который принимает перенаправленные из командной строки выходные данные; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#o) *bcp*: *-o*.

&nbsp;

```js
setQuotedIdentifiersMode(status: boolean): SqlBulkCopyBuilder
```
Выполняет инструкцию `SET QUOTED_IDENTIFIERS ON` в соединении между служебной программой `bcp` и экземпляром `SQL Server`; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#q) *bcp*: *-q*.

&nbsp;

```js
setRowTerm(term: string): SqlBulkCopyBuilder
```
Устанавливает признак конца строки; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#r) *bcp*: *-r*.

&nbsp;

setRegionalMode(status: boolean): SqlBulkCopyBuilder
Устанавливает признак импорта данных в денежном формате, в формате даты и времени с помощью регионального формата, определённого настройками локали клиентского компьютера; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#R) *bcp*: *-R*. Значение по умолчанию: `false`.

&nbsp;

```js
setFieldTerm(term: string): SqlBulkCopyBuilder
```
Устанавливает признак конца поля; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#t) *bcp*: *-t*. Значение по умолчанию: `\t`.

&nbsp;
 
```js
setTrustedConnectionMode(status: boolean): SqlBulkCopyBuilder
```
Указывает, что программа `bcp` устанавливает доверительное соединение с `SQL Server` с использованием встроенной безопасности; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#T) *bcp*: *-T*. Не требуются учётные данные безопасности для сетевого пользователя.

&nbsp;

```js
setWideCharacterTypesMode(status: boolean): SqlBulkCopyBuilder
```
Устанавливает признак использования символов Юникода; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#w) *bcp*: *-w*. При использовании этого параметра не запрашивается тип данных каждого поля, для хранения данных используется тип `nchar`, отсутствуют префиксы, в качестве разделителя полей используется символ табуляции `\t`, а в качестве признака конца строки — символ новой строки `\n`.

&nbsp;

```js
import(path: string): SqlBulkCopyResult
```
Формирует из флагов команду на вызов *bcp*, дожидается завершения импорта из файла `path` и возвращает ссылку на [`SqlBulkCopyResult`](#SqlBulkCopyResult).

&nbsp;

```js
export(path: string): SqlBulkCopyResult
```
Формирует из флагов команду на вызов *bcp*, дожидается завершения экспорта в файл `path` и возвращает ссылку на [`SqlBulkCopyResult`](#SqlBulkCopyResult).

&nbsp;

/**
* @param path
* @param xml Default is true
*/
```js
format(path: string, xml: boolean): SqlBulkCopyResult
```
Устанавливает формат импорта `path`. Если указан флаг `xml`, 
***Этот функционал содержит баг в утилите bcp и не рекомендуется к использованию!***

&nbsp;

### Интерфейс SqlBulkCopyResult ...<a name="SqlBulkCopyResult"></a>
```ts
interface SqlBulkCopyResult {
    hasErrors(): boolean;
    getErrorOutput(): string;
    getOutput(): string;
    getCommand(): string;
}
```

&nbsp;

```js
hasErrors(): boolean
```

&nbsp;

```js
getErrorOutput(): string
```

&nbsp;

```js
getOutput(): string
```

&nbsp;

```js
getCommand(): string
```

&nbsp;

## MongoDB

&nbsp;

## HTTP


[API Reference](API.md)

[Оглавление](../README.md)