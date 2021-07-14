# Коннекторы

1. [Реляционные СУБД](#relationalDB)
1. [MongoDB](#mongoDB)
1. [HTTP](#http)

## Реляционные СУБД<a name="relationalDB"></a>

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
Интерфейс, группирующий [`коннекторы`](../appendix/glossary.md#connector) к различным внешним системам.

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
Возвращает коннектор [`Mongodb.ConnectorBuilder`](#ConnectorBuilder) для подключения к базе данных [`MongoDB`](https://ru.wikipedia.org/wiki/MongoDB).

&nbsp;

```js
http(): Http.HttpManager
```
Возвращает коннектор [`Http.HttpManager`](#HttpManager) соединения по протоколу HTTP.

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
	generator(likeArray?: boolean): Object[] | string[][];
	all(): Object[];
	first(): Object | null;
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
generator(likeArray?: boolean): Object[] | string[][]
```
Возвращает генератор для работы со строками запроса. Если `likeArray == true`, на каждой итерации генератор возвращает очередную строку запроса в виде массива полей `string[]`, иначе в виде `Object`, где ключами выступают названия столбцов, значениями – данные; по умолчанию `likeArray == false`.

&nbsp;

```js
all(): Object[]
```
Аналог вызову `generator(false)` с тем отличием, что возвращает все оставшиеся данные в виде массива.

&nbsp;

```js
first(): Object | null
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
	execute(sql: string, bindings?: (string | number | boolean | null)[] | Object): SqlQueryResult;
}
```
Интерфейс построения запроса к базе данных.

&nbsp;

```js
execute(sql: string, bindings?: (string | number | boolean | null)[] | Object): SqlQueryResult
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
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), базовый интерфейс [`коннекторов`](../appendix/glossary.md#connector) для подключения к реляционной базе данных.

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
[`Коннектор`](../appendix/glossary.md#connector) для подключения к базе данных [`MySQL`](https://ru.wikipedia.org/wiki/MySQL).

&nbsp;

```js
loadImportBuilder(): MysqlImportBuilder
```
Возвращает ссылку на интерфейс [`MysqlImportBuilder`](#MysqlImportBuilder) импорта из файла CSV.

&nbsp;

### Интерфейс MicrosoftSqlConnectorBuilder<a name="MicrosoftSqlConnectorBuilder"></a>
```ts
interface MicrosoftSqlConnectorBuilder extends SqlConnectorBuilder {
	setDriver(name: string | null): MicrosoftSqlConnectorBuilder;
	loadBulkCopyBuilder(): SqlBulkCopyBuilder;
}
```
[`Коннектор`](../appendix/glossary.md#connector) для подключения к базе данных [`Microsoft SQL Server`](https://ru.wikipedia.org/wiki/Microsoft_SQL_Server).

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
Возвращает ссылку на интерфейс [`SqlBulkCopyBuilder`](#SqlBulkCopyBuilder) импорта/экспорта через файл CSV.

&nbsp;

### Интерфейс OracleConnectorBuilder<a name="OracleConnectorBuilder"></a>
```ts
export interface OracleConnectorBuilder extends SqlConnectorBuilder {
	setServiceName(value: string): OracleConnectorBuilder;
	setSchema(value: string): OracleConnectorBuilder;
	setTNS(value: string): OracleConnectorBuilder;
}
```
[`Коннектор`](../appendix/glossary.md#connector) для подключения к базе данных [`Oracle`](https://ru.wikipedia.org/wiki/Oracle_Database). Все функции возвращают `this`.

&nbsp;

```js
setServiceName(value: string): OracleConnectorBuilder
```
Устанавливает имя службы (SERVICE_NAME). SERVICE_NAME определяет одно или ряд имен для подключения к одному экземпляру базы данных. Возможные значения SERVICE_NAME указываются в сетевых установках Oracle и регистрируются в качестве службы БД процессом listener.

&nbsp;

```js
setSchema(value: string): OracleConnectorBuilder
```
Устанавливает [`схему`](https://docs.oracle.com/cd/E11882_01/server.112/e10897/schema.htm).

&nbsp;

```js
setTNS(value: string): OracleConnectorBuilder
```
Устанавливает имя службы TNS. Протокол TNS (Transparent Network Substrate) — уровень связи, используемый базами данных Oracle. Имя службы TNS — это имя, с которым экземпляр базы данных Oracle представлен в сети. Имя службы TNS назначается при настройке подключений к базе данных Oracle. 

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
setTable(name: string): MysqlImportBuilder
```
Устанавливает таблицу, из которой будет производиться импорт.

&nbsp;

```js
setDelimiter(delimiter: string): MysqlImportBuilder
```
Устанавливает разделитель полей. По умолчанию: `;`.

&nbsp;

```js
setLineDelimiter(delimiter: string): MysqlImportBuilder
```
Устанавливает разделитель строк. По умолчанию: `\n`.

&nbsp;

```js
setEnclosure(enclosure: string): MysqlImportBuilder
```
Устанавливает обрамляющий символ, которым будет обрамляться текстовое поле, если в нём содержится разделитель полей. По умолчанию: `"`.

&nbsp;

```js
setEscape(escape: string): MysqlImportBuilder
```
Устанавливает символ для экранирования обрамляющего символа, если встретится в строке ещё и он, и символа переноса строки. По умолчанию равен обрамляющему символу.

&nbsp;

```js
setThreads(threads: number): MysqlImportBuilder
```
Устанавливает количество [`потоков`](https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%82%D0%BE%D0%BA_%D0%B2%D1%8B%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F) импорта; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_use-threads) *mysqlimport*: *--use-threads*. Задать можно не более `8` потоков. По умолчанию: `1`. 

&nbsp;

```js
setVerbose(verbose: boolean): MysqlImportBuilder
```
Устанавливает флаг расширенного вывода; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_verbose) *mysqlimport*: *--verbose*. По умолчанию: `false`.

&nbsp;

```js
setFirstIgnoreLines(count: number): MysqlImportBuilder
```
Устанавливает количество первых строк, которые будут проигнорированы; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_ignore-lines) *mysqlimport*: *--ignore-lines*. По умолчанию: `0`.

&nbsp;

```js
setLockTable(status: boolean): MysqlImportBuilder
```
Устанавливает флаг блокировки таблицы во время импорта; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_lock-tables) *mysqlimport*: *--lock-tables*. По умолчанию: `false`.

&nbsp;

```js
setForce(status: boolean): MysqlImportBuilder
```
Устанавливает флаг игнорирования критических ошибок; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_force) *mysqlimport*: *--force*. По умолчанию: `false`.

&nbsp;

```js
setDeleteAllRows(status: boolean): MysqlImportBuilder
```
Устанавливает флаг предварительного выполнения команды [`TRUNCATE`](https://ru.wikipedia.org/wiki/Truncate_(SQL)), что требует прав на эту команду; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_delete) *mysqlimport*: *--delete*. По умолчанию: `false`.

&nbsp;

```js
setCompress(status: boolean): MysqlImportBuilder
```
Устанавливает флаг компрессии; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_compress) *mysqlimport*: *--compress*. По умолчанию: `false`.

&nbsp;

```js
setIgnoreDuplicates(status: boolean): MysqlImportBuilder
```
Устанавливает флаг игнорирования строк с одинаковым уникальным ключом; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_ignore) *mysqlimport*: *--ignore*. По умолчанию: `false`.

&nbsp;

```js
setReplace(status: boolean): MysqlImportBuilder
```
Устанавливает флаг замены строк с одинаковым уникальным ключом; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_replace) *mysqlimport*: *--replace*. По умолчанию: `false`.

&nbsp;

```js
setColumns(names: string[]): MysqlImportBuilder
```
Задаёт порядок столбцов таблицы, в которые будут записываться данные из файла CSV; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_columns) *mysqlimport*: *--columns*. По умолчанию импорт будет производиться в столбцы таблицы последовательно.

&nbsp;

```js
setFilePath(path: string): MysqlImportBuilder
```
Устанавливает путь к файлу в [`рабочей директории скрипта`](../appendix/glossary.md#scriptDir).

&nbsp;

<a name="MysqlImportBuilder.import"></a>
```js
import(): MysqlImportResult
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
	getStats(): Object;
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
getStats(): Object
```
Если импорт завершён без ошибок, возвращает объект вида `{"records": 3, "deleted": 0, "skipped": 0, "warnings": 0}`.

&nbsp;

### Интерфейс SqlBulkCopyBuilder<a name="SqlBulkCopyBuilder"></a>
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
	format(path: string, xml: boolean): SqlBulkCopyResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для импорта в СУБД MS SQL из файла CSV с помощью утилиты [*bcp*](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility). Все функции, начинающиеся с `set...()`, возвращают `this`.

Порядок полей в файле CSV и таблице должен строго совпадать, даже при импорте в таблицу с полем [`IDENTITY`](https://docs.microsoft.com/ru-ru/sql/t-sql/statements/create-table-transact-sql-identity-property), так как в утилите *bcp* имеется баг, из-за которого работоспособность функций [`setFormatFile()`](#SqlBulkCopyBuilder.setFormatFile) и [`format()`](#SqlBulkCopyBuilder.format) не гарантирована.

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

<a name="SqlBulkCopyBuilder.setFormatFile"></a>
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
Устанавливает максимальное количество ошибок, которые могут произойти до отмены импорта; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#m) *bcp*: *-m*. Значение по умолчанию: `10`.

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

```js
setRegionalMode(status: boolean): SqlBulkCopyBuilder
```
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
Указывает, что программа `bcp` устанавливает доверительное соединение с `MS SQL Server` с использованием встроенной безопасности; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#T) *bcp*: *-T*. Не требуются учётные данные безопасности для сетевого пользователя.

&nbsp;

```js
setWideCharacterTypesMode(status: boolean): SqlBulkCopyBuilder
```
Устанавливает признак использования символов Юникода; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#w) *bcp*: *-w*. При использовании этого параметра не запрашивается тип данных каждого поля, для хранения данных используется тип `nchar`, отсутствуют префиксы, в качестве разделителя полей используется символ табуляции `\t`, а в качестве признака конца строки — символ новой строки `\n`.

&nbsp;

<a name="SqlBulkCopyBuilder.import"></a>
```js
import(path: string): SqlBulkCopyResult
```
Формирует из флагов команду на вызов *bcp*, дожидается завершения импорта из файла `path` и возвращает ссылку на [`SqlBulkCopyResult`](#SqlBulkCopyResult).

&nbsp;

<a name="SqlBulkCopyBuilder.export"></a>
```js
export(path: string): SqlBulkCopyResult
```
Формирует из флагов команду на вызов *bcp*, дожидается завершения экспорта в файл `path` и возвращает ссылку на [`SqlBulkCopyResult`](#SqlBulkCopyResult).

&nbsp;

<a name="SqlBulkCopyBuilder.format"></a>
```js
format(path: string, xml: boolean): SqlBulkCopyResult
```
Формирует из флагов команду на вызов *bcp [`format`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#format)*, которая создаёт файл форматирования `path`, основанный на указанных параметрах, дожидается завершения и возвращает ссылку на [`SqlBulkCopyResult`](#SqlBulkCopyResult). Если указан флаг `xml` ([`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#x) *bcp*: *-x*), файл форматирования будет создан на основе [`XML`](https://ru.wikipedia.org/wiki/XML); по умолчанию: `true`.

Файл форматирования можно использовать для последующего экспорта/импорта при вызове функции [`setFormatFile()`](#SqlBulkCopyBuilder.setFormatFile).

&nbsp;

### Интерфейс SqlBulkCopyResult<a name="SqlBulkCopyResult"></a>
```ts
interface SqlBulkCopyResult {
	hasErrors(): boolean;
	getErrorOutput(): string;
	getOutput(): string;
	getCommand(): string;
}
```
Интерфейс просмотра результатов импорта/экспорта, осуществлённого с помощью [`SqlBulkCopyBuilder`](#SqlBulkCopyBuilder).

&nbsp;

```js
hasErrors(): boolean
```
Возвращает `getErrorOutput() != ''`.

&nbsp;

```js
getErrorOutput(): string
```
Возвращает вывод команды *bcp* в `stderr`.

&nbsp;

```js
getOutput(): string
```
Возвращает вывод команды *bcp* в `stdout`.

&nbsp;

```js
getCommand(): string
```
Возвращает сформированную команду на вызов *bcp*, которая была выполнена в момент вызова одной из функций [`SqlBulkCopyBuilder.import()`](#SqlBulkCopyBuilder.import), [`SqlBulkCopyBuilder.export()`](#SqlBulkCopyBuilder.export), [`SqlBulkCopyBuilder.format()`](#SqlBulkCopyBuilder.format).

&nbsp;

## MongoDB<a name="mongoDB"></a>

Все интерфейсы этого раздела находятся в пространстве имён `Mongodb`.

&nbsp;

### Интерфейс ConnectorBuilder<a name="ConnectorBuilder"></a>
```ts
interface ConnectorBuilder {
	setDSN(value: string): ConnectorBuilder;
	load(): Connection;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки подключения к [`MongoDB`](https://ru.wikipedia.org/wiki/MongoDB).

&nbsp;

```js
setDSN(value: string): ConnectorBuilder
```
Устанавливает [`DSN`](https://docs.mongodb.com/bi-connector/master/tutorial/create-system-dsn/) для подключения.

&nbsp;

```js
load(): Connection
```
Создаёт соединение с БД и возвращает его интерфейс [`Connection`](#Connection).

&nbsp;

### Интерфейс Connection...<a name="Connection"></a>
```ts
interface Connection {
	collectionCreator(): CollectionCreator;
	dropCollection(name: string): { ok: number, errmsg?: string, nIndexesWas?: number, ns?: string };
	selectCollection(name: string): Collection;
	types(): Types;
}
```

&nbsp;

```js
collectionCreator(): CollectionCreator
```

&nbsp;

```js
dropCollection(name: string): { ok: number, errmsg?: string, nIndexesWas?: number, ns?: string }
```

&nbsp;

```js
selectCollection(name: string): Collection
```

&nbsp;

```js
types(): Types
```

&nbsp;

### Интерфейс CollectionCreator...<a name="CollectionCreator"></a>
```ts
interface CollectionCreator {
	/**
	* https://docs.mongodb.com/manual/reference/method/db.createCollection
	* @param options
	*/
	setOptions(options: {
		capped: boolean,
		autoIndexId: boolean,
		size: number,
		max: number
	}): CollectionCreator;

	setName(name: string): CollectionCreator;
	create(): { ok: number, errmsg?: string };
}
```

&nbsp;

	/**
	* https://docs.mongodb.com/manual/reference/method/db.createCollection
	* @param options
	*/
```js
setOptions(options: { 
	capped: boolean,
	autoIndexId: boolean,
	size: number,
	max: number
}): CollectionCreator
```

&nbsp;

```js
setName(name: string): CollectionCreator
```

&nbsp;

```js
create(): { ok: number, errmsg?: string }
```

&nbsp;

### Интерфейс Collection...<a name="Collection"></a>
```ts
interface Collection {
	count(filter: Object): number;
	find(filter: Object, options?: FilterOptions): Cursor;
	findOne(filter: Object, options?: FilterOptions): Object;
	insertOne(document: Object): InsertOneResult;
	insertMany(documents: Object[]): InsertManyResult;
	updateOne(filter: Object, update: Object, options?: FilterOptions): UpdateResult;
	updateMany(filter: Object, update: Object, options?: FilterOptions): UpdateResult;
	deleteOne(filter: Object, options?: FilterOptions): DeleteResult;
	deleteMany(filter: Object, options?: FilterOptions): DeleteResult;
}
```

&nbsp;

```js
count(filter: Object): number
```

&nbsp;

```js
find(filter: Object, options?: FilterOptions): Cursor
```

&nbsp;

```js
findOne(filter: Object, options?: FilterOptions): Object
```

&nbsp;

```js
insertOne(document: Object): InsertOneResult
```

&nbsp;

```js
insertMany(documents: Object[]): InsertManyResult
```

&nbsp;

```js
updateOne(filter: Object, update: Object, options?: FilterOptions): UpdateResult
```

&nbsp;

```js
updateMany(filter: Object, update: Object, options?: FilterOptions): UpdateResult
```

&nbsp;

```js
deleteOne(filter: Object, options?: FilterOptions): DeleteResult
```

&nbsp;

```js
deleteMany(filter: Object, options?: FilterOptions): DeleteResult
```

&nbsp;

### Интерфейс InsertOneResult...<a name="InsertOneResult"></a>
```ts
interface InsertOneResult {
	getInsertedCount(): number;
	getInsertedId(): Types.ObjectId;
	isAcknowledged(): boolean;
}
```

&nbsp;

```js
getInsertedCount(): number
```

&nbsp;

```js
getInsertedId(): Types.ObjectId
```

&nbsp;

```js
isAcknowledged(): boolean
```

&nbsp;

### Интерфейс InsertManyResult...<a name="InsertManyResult"></a>
```ts
interface InsertManyResult {
	getInsertedCount(): number;
	getInsertedIds(): Types.ObjectId[];
	isAcknowledged(): boolean;
}
```

&nbsp;

```js
getInsertedCount(): number
```

&nbsp;

```js
getInsertedIds(): Types.ObjectId[]
```

&nbsp;

```js
isAcknowledged(): boolean
```

&nbsp;

### Интерфейс UpdateResult...<a name="UpdateResult"></a>
```ts
interface UpdateResult {
	getMatchedCount(): number;
	getModifiedCount(): number;
	getUpsertedCount(): number;
	getUpsertedId(): Types.ObjectId;
	isAcknowledged(): boolean;
}
```

&nbsp;

```js
getMatchedCount(): number
```

&nbsp;

```js
getModifiedCount(): number
```

&nbsp;

```js
getUpsertedCount(): number
```

&nbsp;

```js
getUpsertedId(): Types.ObjectId
```

&nbsp;

```js
isAcknowledged(): boolean
```

&nbsp;

### Интерфейс DeleteResult...<a name="DeleteResult"></a>
```ts
interface DeleteResult {
	getDeletedCount(): number;
	isAcknowledged(): boolean;
}
```

&nbsp;

```js
getDeletedCount(): number
```

&nbsp;

```js
isAcknowledged(): boolean
```

&nbsp;

### Интерфейс Cursor...<a name="Cursor"></a>
```ts
interface Cursor {
	all(): Object[];
	generator(): Object[];
}
```

&nbsp;

```js
all(): Object[]
```

&nbsp;

```js
generator(): Object[]
```

&nbsp;

### Интерфейс FilterOptions...<a name="FilterOptions"></a>
```ts
interface FilterOptions extends Object {
	sort: Object,
	skip: number,
	limit: number,
	showRecordId: boolean,
	min: Object,
	max: Object
}
```
### Интерфейс Types...<a name="Types"></a>
```ts
interface Types {
	ObjectId(id?: string): Types.ObjectId;
	regex(pattern: string, flags?: string): Object;
	date(milliseconds: number): Object;
}
```

&nbsp;


```js
ObjectId(id?: string): Types.ObjectId
```

&nbsp;

```js
regex(pattern: string, flags?: string): Object
```

&nbsp;

```js
date(milliseconds: number): Object
```

&nbsp;

### Интерфейс Types.ObjectId...<a name="Types.ObjectId"></a>
```ts
namespace Types {
	interface ObjectId {
		toString(): string;
	}
}
```

&nbsp;

```js
toString(): string
```

&nbsp;

## HTTP<a name="http"></a>

Все интерфейсы этого раздела, кроме `ObjectOfStringArray`, находятся в пространстве имён `Http`.

### Интерфейс Params<a name="Params"></a>
```ts
interface Params {
	getAll(): Object;
	setAll(pairs: Object): boolean;
	get(name: string): any;
	set(name: string, value: any): boolean;
	del(name: string): boolean;
	has(name: string): boolean;
	clear(): boolean;
}
```
Интерфейс, представляющий набор параметров и их значений.

&nbsp;

```js
getAll(): Object
```
Возвращает все параметры в виде [`Object`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object).

&nbsp;

```js
setAll(pairs: Object): boolean
```
Не работает.

&nbsp;

```js
get(name: string): any
```
Возвращает значение параметра `name`.

&nbsp;

```js
set(name: string, value: any): boolean
```
Устанавливает значение параметра `name`. Возвращает `true`.

&nbsp;

```js
del(name: string): boolean
```
Удаляет параметр `name`. Возвращает `true`.

&nbsp;

```js
has(name: string): boolean
```
Возвращает признак наличия параметра `name`.

&nbsp;

```js
clear(): boolean
```
Удаляет все параметры. Возвращает `true`.

&nbsp;

### Интерфейс UrlParams<a name="UrlParams"></a>
```ts
interface UrlParams extends Params {
	stringify(): string;
	setEncodingType(type: string): UrlParams;
	getEncodingType(): string;
}
```
Интерфейс, представляющий набор параметров и их значений для передачи их в [`Url`](#Url).

&nbsp;

```js
stringify(): string
```
Возвращает строковое представление значений параметров вида `paramOne=5&paramTwo=hello&paramThree=world`.

&nbsp;

```js
setEncodingType(type: string): UrlParams
```
Устанавливает стандарт кодировки параметров URL. Допустимые значения: `NONE`, `RFC1738`, `RFC3986`. Значение по умолчанию: `RFC1738`. Возвращает `this`.

&nbsp;

```js
getEncodingType(): string
```
Возвращает стандарт кодировки параметров URL.

&nbsp;

### Интерфейс JsonRequestBody<a name="JsonRequestBody"></a>
```ts
interface JsonRequestBody {
	setJson(value: string | Object): boolean;
}
```
Интерфейс генерации тела запроса для отправки в нём [`JSON`](https://ru.wikipedia.org/wiki/JSON).

&nbsp;

```js
setJson(value: string | Object): boolean
```
Устанавливает в тело запроса переданный JSON. Если передаётся строка, она предварительно конвертируется в JSON с помощью [`JSON.parse()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse). Возвращает `true`. ***Передача в функцию `value` типа `Object` работает некорректно.***

&nbsp;

### Интерфейс StringRequestBody<a name="StringRequestBody"></a>
```ts
interface StringRequestBody {
	setBody(value: string): boolean;
}
```
Интерфейс генерации тела запроса для отправки в нём строки.

&nbsp;

```js
	setBody(value: string): boolean
```
Устанавливает переданную строку в тело запроса. Возвращает `true`.

&nbsp;

### Интерфейс FormRequestBody<a name="FormRequestBody"></a>
```ts
interface FormRequestBody {
	params(): Params;
}
```
Интерфейс генерации тела запроса для отправки в нём параметров [`формы`](https://ru.wikipedia.org/wiki/%D0%A4%D0%BE%D1%80%D0%BC%D0%B0_(HTML)).

&nbsp;

```js
	params(): Params
```
Возвращает объект [`Params`](#Params) для установки значений параметров.

&nbsp;

### Интерфейс RequestBody<a name="RequestBody"></a>
```ts
interface RequestBody {
	jsonBody(): JsonRequestBody;
	stringBody(): StringRequestBody;
	formBody(): FormRequestBody;
}
```
Интерфейс генерации тела запроса [`POST`](https://ru.wikipedia.org/wiki/POST_(HTTP)). Все функции перезаписывают тело запроса до отправки, поэтому следует выбрать одну из них.

&nbsp;

```js
jsonBody(): JsonRequestBody
```
Устанавливает значение [`заголовка HTTP`](https://ru.wikipedia.org/wiki/Список_заголовков_HTTP) `Content-Type: application/json`, возвращает интерфейс [`JsonRequestBody`](#JsonRequestBody) для отправки [`JSON`](https://ru.wikipedia.org/wiki/JSON) в теле запроса.

&nbsp;

```js
stringBody(): StringRequestBody
```
*Не* устанавливает [`заголовок HTTP`](https://ru.wikipedia.org/wiki/Список_заголовков_HTTP) `Content-Type`, возвращает интерфейс [`StringRequestBody`](#StringRequestBody) для отправки строки в теле запроса.

&nbsp;

```js
formBody(): FormRequestBody
```
Устанавливает значение [`заголовка HTTP`](https://ru.wikipedia.org/wiki/Список_заголовков_HTTP) `Content-Type: application/x-www-form-urlencoded`, возвращает интерфейс [`FormRequestBody`](#FormRequestBody) для отправки формы в теле запроса.

&nbsp;

### Интерфейс Url<a name="Url"></a>
```ts
interface Url {
	setUrl(url: string): boolean;
	getUrl(): string;
	setUrlPath(path: string): boolean;
	getUrlPath(): string;
	setUrlScheme(scheme: string): boolean;
	getUrlScheme(): string;
	setHost(host: string): boolean;
	getHost(): string;
	setPort(port: number | string): boolean;
	getPort(): number | null;
	setUser(user: string): boolean;
	getUser(): string;
	setPassword(password: string): boolean;
	getPassword(): string | null;
	setFragment(fragment: string): boolean;
	getFragment(): string | null;
	params(): UrlParams;
}
```
Интерфейс построения [`URL`](https://ru.wikipedia.org/wiki/URL).

&nbsp;

```js
setUrl(url: string): boolean
```
Устанавливает URL целиком. Возвращает `true`.

&nbsp;

```js
getUrl(): string
```
Возвращает URL.

&nbsp;

```js
setUrlPath(path: string): boolean
```
Устанавливает путь на сервере. Возвращает `true`.

&nbsp;

```js
getUrlPath(): string
```
Возвращает путь на сервере.

&nbsp;

```js
setUrlScheme(scheme: string): boolean
```
Устанавливает схему URL (протокол). Возвращает `true`.

&nbsp;

```js
getUrlScheme(): string
```
Возвращает схему URL (протокол).

&nbsp;

```js
setHost(host: string): boolean
```
Устанавливает имя или адрес хоста. Возвращает `true`.

&nbsp;

```js
getHost(): string
```
Возвращает имя или адрес хоста, установленное в URL.

&nbsp;

```js
setPort(port: number | string): boolean
```
Устанавливает номер порта. Возвращает `true`.

&nbsp;

```js
getPort(): number | null
```
Возвращает номер порта.

&nbsp;

```js
setUser(user: string): boolean
```
Устанавливает имя пользователя. Возвращает `true`.

&nbsp;

```js
getUser(): string
```
Возвращает имя пользователя.

&nbsp;

```js
setPassword(password: string): boolean
```
Устанавливает пароль. Возвращает `true`.

&nbsp;

```js
getPassword(): string | null
```
Возвращает пароль.

&nbsp;

```js
setFragment(fragment: string): boolean
```
Устанавливает идентификатор якоря.  Возвращает `true`.

&nbsp;

```js
getFragment(): string | null
```
Возвращает идентификатор якоря.

&nbsp;

```js
params(): UrlParams
```
Возвращает интерфейс доступа [`UrlParams`](#UrlParams) к параметрам URL.

&nbsp;

### Интерфейс AllowRedirects<a name="AllowRedirects"></a>
```ts
interface AllowRedirects {
	setStatus(status: boolean): boolean;
	getStatus(): boolean;

	setMax(max: number): boolean;
	getMax(): number;

	setStrict(strict: boolean): boolean;
	getStrict(): boolean;

	setWithReferer(withReferer: boolean): boolean;
	getWithReferer(): boolean;

	setProtocols(protocols: string[]): boolean;
	getProtocols(): string[];
}
```
Интерфейс настроек разрешения [`перенаправления HTTP-запросов`](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP#%D0%9F%D0%B5%D1%80%D0%B5%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5).

&nbsp;

```js
setStatus(status: boolean): boolean
```
Устанавливает флаг разрешения перенаправлений HTTP-запросов. Значение по умолчанию: `true`. Возвращает `true`.

&nbsp;

```js
getStatus(): boolean
```
Возвращает флаг разрешения перенаправлений HTTP-запросов.

&nbsp;

```js
setMax(max: number): boolean
```
Устанавливает максимальное количество перенаправлений. Значение по умолчанию: `5`. Возвращает `true`.

&nbsp;

```js
getMax(): number
```
Возвращает максимальное количество перенаправлений.

&nbsp;

```js
setStrict(strict: boolean): boolean
```
Не реализовано.

&nbsp;

```js
getStrict(): boolean
```
Не реализовано.

&nbsp;

```js
setWithReferer(withReferer: boolean): boolean
```
Устанавливает флаг передачи [`HTTP referer`](https://ru.wikipedia.org/wiki/HTTP_referer) в заголовке запроса. Значение по умолчанию: `false`. Возвращает `true`.

&nbsp;

```js
getWithReferer(): boolean
```
Возвращает флаг передачи [`HTTP referer`](https://ru.wikipedia.org/wiki/HTTP_referer) в заголовке запроса.

&nbsp;

```js
setProtocols(protocols: string[]): boolean
```
Устанавливает список протоколов, для которых разрешены перенаправления. Значение по умолчанию: `['http', 'https']`. Возвращает `true`.

&nbsp;

```js
getProtocols(): string[]
```
Возвращает список протоколов, для которых разрешены перенаправления.

&nbsp;

### Интерфейс HttpAuth<a name="HttpAuth"></a>
```ts
interface HttpAuth {
	setUser(user: string): HttpAuth;
	setPassword(password: string): HttpAuth;
	setType(type: string): HttpAuth;
	setStatus(status: boolean): HttpAuth;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настроек аутентификации HTTP. Все функции возвращают `this`.

&nbsp;

```js
setUser(user: string): HttpAuth
```
Устанавливает имя пользователя.

&nbsp;

```js
setPassword(password: string): HttpAuth
```
Устанавливает пароль.

&nbsp;

```js
setType(type: string): HttpAuth
```
Устанавливает тип аутентификации. Допустимые значения: [`basic`](https://ru.wikipedia.org/wiki/%D0%90%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F_%D0%B2_%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82%D0%B5#%D0%91%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D1%8F_%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F), [`digest`](https://ru.wikipedia.org/wiki/%D0%94%D0%B0%D0%B9%D0%B4%D0%B6%D0%B5%D1%81%D1%82-%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F), [`ntlm`](https://ru.wikipedia.org/wiki/NTLM).

&nbsp;

```js
setStatus(status: boolean): HttpAuth
```
Устанавливает флаг аутентификации HTTP. Значение по умолчанию: `false`.

&nbsp;

### Интерфейс Cert<a name="Cert"></a>
```ts
interface Cert {
	setPath(path: string): Cert;
	getPath(path: string): string;
	setPassphrase(passphrase: string): Cert;
}
```
Интерфейс настройки сертификата аутентификации HTTP. ***Не реализован.***

&nbsp;

```js
setPath(path: string): Cert
```
Устанавливает путь к файлу сертификата. Возвращает `this`.

&nbsp;

```js
getPath(path: string): string
```
Возвращает путь к файлу сертификата.

&nbsp;

```js
setPassphrase(passphrase: string): Cert
```
Устанавливает парольную фразу. Возвращает `this`.

&nbsp;

### Интерфейс Verify<a name="Verify"></a>
```ts
interface Verify {
	setStatus(value: boolean): boolean;
	setPath(path: string): boolean;
}
```
Интерфейс верификации сертификатов [`SSL`](https://ru.wikipedia.org/wiki/SSL).

```js
setStatus(value: boolean): boolean
```
Устанавливает признак верификации сертификата SSL. Значение по умолчанию: `true`. Возвращает `true`.

&nbsp;

```js
setPath(path: string): boolean
```
Не реализовано.

&nbsp;

### Интерфейс Options<a name="Options"></a>
```ts
interface Options {
	setConnTimeout(seconds: number): boolean;
	getConnTimeout(): number;
	setReqTimeout(seconds: number): boolean;
	getReqTimeout(): number;
	setCanDecodeContent(value: boolean): boolean;
	getCanDecodeContent(): boolean;
	allowRedirects(): AllowRedirects;
	auth(): HttpAuth;
	cert(): Cert;
	verify(): Verify;
}
```

Интерфейс настройки опций соединения.

&nbsp;

```js
setConnTimeout(seconds: number): boolean
```
Устанавливает тайм-аут соединения в секундах. Значение по умолчанию: `10`, максимальное значение: `60`. Возвращает `true`.

&nbsp;

```js
getConnTimeout(): number
```
Возвращает тайм-аут соединения.

&nbsp;

```js
setReqTimeout(seconds: number): boolean
```
Устанавливает тайм-аут ожидания ответа в секундах. Значение по умолчанию: `30`, максимальное значение: `300`. Возвращает `true`.

&nbsp;

```js
getReqTimeout(): number
```
Возвращает тайм-аут ожидания ответа.

&nbsp;

```js
setCanDecodeContent(value: boolean): boolean
```
Устанавливает признак распаковки тела ответа сервера. В случае `true` архивированное тело ответа будет деархивироваться, в случае `false` – нет. Значение по умолчанию: `true`. Возвращает `true`.

&nbsp;

```js
getCanDecodeContent(): boolean
```
Возвращает признак распаковки тела ответа сервера.

&nbsp;

```js
allowRedirects(): AllowRedirects
```
Возвращает интерфейс [`AllowRedirects`](#AllowRedirects) доступа к настройкам перенаправлений HTTP.

&nbsp;

```js
auth(): HttpAuth
```
Возвращает интерфейс [`HttpAuth`](#HttpAuth) доступа к настройкам аутентификации HTTP.

&nbsp;

```js
cert(): Cert
```
Возвращает интерфейс [`Cert`](#Cert) для настройки аутентификации по сертификату. ***Не реализовано.***

&nbsp;

```js
verify(): Verify
```
Возвращает интерфейс [`Verify`](#Verify) проверки сертификатов SSL.

&nbsp;

### Интерфейс RequestBuilder<a name="RequestBuilder"></a>
```ts
interface RequestBuilder {
	url(): Url;
	setMethod(type: string): boolean;
	getMethod(): string;
	body(): RequestBody;
	options(): Options;
	cookies(): Params;
	headers(): Params;
	send(): Response;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки и отправки запроса по протоколу [`HTTP`](https://ru.wikipedia.org/wiki/HTTP).

&nbsp;

```js
url(): Url
```
Возвращает объект [`Url`](#Url) построения URL.

&nbsp;

```js
setMethod(type: string): boolean
```
Устанавливает [`метод HTTP `](https://ru.wikipedia.org/wiki/HTTP#%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%D1%8B). Доступные значения: `GET`, `POST`, `DELETE`, `PUT`, `HEAD`, `OPTIONS`. Значение по умолчанию: `GET`. Возвращает `true`.

&nbsp;

```js
getMethod(): string
```
Возвращает [`метод HTTP `](https://ru.wikipedia.org/wiki/HTTP#%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%D1%8B). 

&nbsp;

```js
body(): RequestBody
```
Возвращает интерфейс [`RequestBody`](#RequestBody) формирования тела запроса.

&nbsp;

```js
options(): Options
```
Возвращает интерфейс [`Options`](#Options) настройки опций соединения.

&nbsp;

```js
cookies(): Params
```
Возвращает интерфейс [`Params`](#Params) для доступа к [`cookies`](https://ru.wikipedia.org/wiki/Cookie).

&nbsp;

```js
headers(): Params
```
Возвращает интерфейс [`Params`](#Params) для формирования [`HTTP-заголовков`](https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BA%D0%B8_HTTP) запроса.

&nbsp;

```js
send(): Response
```
Отправляет HTTP-запрос, дожидается ответа и возвращает интерфейс [`Response`](#Response) доступа к данным ответа сервера.

&nbsp;

### Интерфейс HttpManager<a name="HttpManager"></a>
```ts
interface HttpManager {
	requestBuilder(): RequestBuilder;
	urlEncode(value: string): string;
	urlDecode(value: string): string;
	base64Encode(value: string): string;
	base64Decode(value: string): string | boolean;
}
```
Коннектор для подключения к серверу по протоколу [`HTTP`](https://ru.wikipedia.org/wiki/HTTP).

&nbsp;

```js
requestBuilder(): RequestBuilder
```
Возвращает объект [`RequestBuilder`](#RequestBuilder) построения запроса.

&nbsp;

```js
urlEncode(value: string): string
```
Возвращает строку `value`, закодированную в соответствии с правилами [`кодировки URL`](https://ru.wikipedia.org/wiki/URL#%D0%9A%D0%BE%D0%B4%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_URL).

&nbsp;

```js
urlDecode(value: string): string
```
Возвращает строку `value`, раскодированную в соответствии с правилами [`кодировки URL`](https://ru.wikipedia.org/wiki/URL#%D0%9A%D0%BE%D0%B4%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_URL).

&nbsp;

```js
base64Encode(value: string): string
```
Возвращает строку `value`, закодированную по схеме [`base64 `](https://ru.wikipedia.org/wiki/Base64).


&nbsp;

```js
base64Decode(value: string): string | boolean
```
Возвращает строку `value`, раскодированную по схеме [`base64 `](https://ru.wikipedia.org/wiki/Base64), или `false` в случае ошибки.

&nbsp;

### Тип ObjectOfStringArray<a name="ObjectOfStringArray"></a>
```ts
type ObjectOfStringArray = {
	[key: string]: string[];
}
```
Специализированный тип объекта, в котором значения могут быть только списками строк.

&nbsp;

### Интерфейс ResponseErrors<a name="ResponseErrors"></a>
```ts
interface ResponseErrors {
	getCode(): number;
	getMessage(): string;
}
```
Интерфейс доступа к [`ошибке`](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP) транспортного уровня HTTP.

&nbsp;

```js
getCode(): number
```
Возвращает код ошибки.

&nbsp;

```js
getMessage(): string
```
Возвращает текст ошибки.

&nbsp;

### Интерфейс Response<a name="Response"></a>
```ts
interface Response {
	headers(): ObjectOfStringArray;
	getStringData(): string;
	getStringDataLikeJson(): Object | boolean;
	getStatusCode(): number;
	isOk(): boolean;
	getErrors(): ResponseErrors;
}
```
Интерфейс ответа HTTP-сервера.

&nbsp;

```js
headers(): ObjectOfStringArray
```
Возвращает заголовки ответа в виде [`ObjectOfStringArray`](#ObjectOfStringArray).

&nbsp;

```js
getStringData(): string
```
Возвращает первые `50 Мбайт` тела ответа.

&nbsp;

```js
getStringDataLikeJson(): Object | boolean
```
Получает первые `50 Мбайт` тела ответа, прогоняет их через функцию [`JSON.parse()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) и возвращает её результат или `false` в случае ошибки.

&nbsp;

```js
getStatusCode(): number
```
Возвращает [`код состояния HTTP`](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP).

&nbsp;

```js
isOk(): boolean
```
Возвращает признак того, что код состояния HTTP [`успешный`](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP#%D0%A3%D1%81%D0%BF%D0%B5%D1%85), то есть `getStatusCode() == 200`.

&nbsp;

```js
getErrors(): ResponseErrors
```
Возвращает интерфейс [`ResponseErrors`](#ResponseErrors) доступа к ошибкам HTTP.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
