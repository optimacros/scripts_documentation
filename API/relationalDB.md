# Реляционные БД

## Общие интерфейсы<a name="general"></a>

### Интерфейс SqlQueryResult<a name="sql-query-result"></a>
```ts
interface SqlQueryResult {
	count(): number;
	generator(likeArray?: boolean): Object[] | string[][];
	all(): Object[];
	first(): Object | null;
	column(columnName: string): (number | string | boolean | null)[];
	cell(columnName: string, rowIndex?: number): number | string | boolean | null;
	updated(): number;
	lastId(): number;
}
```
Интерфейс доступа к результатам запроса. Функции `generator()`, `all()`, `first()`, `column()` и `cell()` работают с одним и тем же внутренним итератором по строкам ответа на SQL-запрос, поэтому каждая из них начинает чтение с первой ещё не прочитанной строки ответа.

&nbsp;

```js
count(): number;
```
Возвращает количество обработанных строк. Реализация зависит от СУБД и от драйвера.

&nbsp;

```js
generator(likeArray?: boolean): Object[] | string[][];
```
Возвращает генератор для работы со строками запроса. Если `likeArray === true`, на каждой итерации генератор возвращает очередную строку запроса в виде массива полей `string[]`, иначе в виде `Object`, где ключами выступают названия столбцов, значениями – данные; по умолчанию `likeArray === false`.

&nbsp;

```js
all(): Object[];
```
Аналог вызову `generator(false)` с тем отличием, что возвращает все оставшиеся данные в виде массива.

&nbsp;

```js
first(): Object | null;
```
Возвращает ***следующую*** строку запроса, ***несмотря на название***.

&nbsp;

```js
column(columnName: string): (number | string | boolean | null)[];
```
Выбирает и возвращает в виде массива значения столбца `columnName` у всех оставшихся строк ответа.

&nbsp;

```js
cell(columnName: string, rowIndex?: number): number | string | boolean | null;
```
Пропускает в итераторе ответа `rowIndex` (по умолчанию: `0`) строк и возвращает значение столбца `columnName` из очередной строки. Внутренний итератор переходит на следующую строку.

&nbsp;

```js
updated(): number;
```
Возвращает количество изменённых строк. Если SQL-запрос был не на изменение, возвращаемое значение зависит от реализации.

&nbsp;

```js
lastId(): number;
```
Функция работает только с запросом `INSERT`. Возвращает `id` последней вставленной строки.

&nbsp;

### Интерфейс SqlQueryBuilder<a name="sql-query-builder"></a>
```ts
interface SqlQueryBuilder {
	execute(sql: string, bindings?: (string | number | boolean | null)[] | Object): SqlQueryResult;
}
```
Интерфейс построения запроса к базе данных.

&nbsp;

```js
execute(sql: string, bindings?: (string | number | boolean | null)[] | Object): SqlQueryResult;
```
Конструирует SQL-запрос из строки `sql`, используя параметры привязки `bindings`, передаёт его на исполнение в СУБД и возвращает интерфейс [`SqlQueryResult`](#sql-query-result) доступа к результатам запроса.

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

### Интерфейс SqlConnection<a name="sql-connection"></a>
```ts
interface SqlConnection {
	qb(): SqlQueryBuilder;
}
```
Объект соединения с реляционной базой данных.

&nbsp;

```js
qb(): SqlQueryBuilder;
```
Возвращает интерфейс [`SqlQueryBuilder`](#sql-query-builder) построения запроса к базе данных.

&nbsp;

## Соединение с конкретными БД<a name="connectors-builders"></a>

### Интерфейс SqlConnectorBuilder<a name="sql-connector-builder"></a>
```ts
interface SqlConnectorBuilder {
	setHost(value: string | SecretValue): this;
	setPort(value: number | SecretValue): this;
	setUsername(value: string | SecretValue): this;
	setPassword(value: string | SecretValue): this;
	setDatabase(value: string | SecretValue): this;
	load(): SqlConnection;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), базовый интерфейс [`коннекторов`](../appendix/glossary.md#connector) для подключения к реляционной базе данных. Функции для установки параметров подключения поддерживают [секреты](./secrets.md).

&nbsp;

```js
setHost(value: string | SecretValue): this;
```
Устанавливает адрес подключения. Возвращает `this`.

&nbsp;

```js
setPort(value: number | SecretValue): this;
```
Устанавливает номер порта для подключения. Возвращает `this`.

&nbsp;

```js
setUsername(value: string | SecretValue): this;
```
Устанавливает имя пользователя. Возвращает `this`.

&nbsp;

```js
setPassword(value: string | SecretValue): this;
```
Устанавливает пароль. Возвращает `this`.

&nbsp;

```js
setDatabase(value: string | SecretValue): this;
```
Устанавливает имя базы данных. Возвращает `this`.

&nbsp;

```js
load(): SqlConnection;
```
Соединяется с БД и возвращает объект соединения [`SqlConnection`](#sql-connection).

&nbsp;

### Интерфейс MysqlConnectorBuilder<a name="mysql-connector-builder"></a>
```ts
interface MysqlConnectorBuilder extends SqlConnectorBuilder {
	loadImportBuilder(): MysqlImportBuilder;
}
```
[`Коннектор`](../appendix/glossary.md#connector) для подключения к базе данных [`MySQL`](https://ru.wikipedia.org/wiki/MySQL). Интерфейс наследуется от [`SqlConnectorBuilder`](#sql-connector-builder).

&nbsp;

```js
loadImportBuilder(): MysqlImportBuilder;
```
Возвращает ссылку на интерфейс [`MysqlImportBuilder`](#mysql-import-builder) импорта из файла CSV.

&nbsp;

### Интерфейс PostgresqlConnectorBuilder<a name="postgresql-connector-builder"></a>
```ts
interface PostgresqlConnectorBuilder extends SqlConnectorBuilder {
	loadImportBuilder(): PostgresqlImportBuilder;
}
```
[`Коннектор`](../appendix/glossary.md#connector) для подключения к базе данных [`Postgresql`](https://ru.wikipedia.org/wiki/PostgreSQL). Интерфейс наследуется от [`SqlConnectorBuilder`](#sql-connector-builder).

&nbsp;

```js
loadImportBuilder(): PostgresqlImportBuilder;
```
Возвращает ссылку на интерфейс [`PostgresqlImportBuilder`](#postgresql-import-builder) импорта из файла CSV.

&nbsp;

### Интерфейс MicrosoftSqlConnectorBuilder<a name="microsoft-sql-connector-builder"></a>
```ts
interface MicrosoftSqlConnectorBuilder extends SqlConnectorBuilder {
	setDriver(name: string | null): this;
	setScrollType(scrollType: string | null): this;
	setRequestTimeout(timeout: number): this;
	loadBulkCopyBuilder(): SqlBulkCopyBuilder;
}
```
[`Коннектор`](../appendix/glossary.md#connector) для подключения к базе данных [`Microsoft SQL Server`](https://ru.wikipedia.org/wiki/Microsoft_SQL_Server). Интерфейс наследуется от [`SqlConnectorBuilder`](#sql-connector-builder).

&nbsp;

```js
setDriver(name: string | null): this;
```
Устанавливает драйвер взаимодействия с MS SQL Server. Допустимые значения: `DBLIB`, `ODBC`, `SQLSRV`. Значение по умолчанию: `DBLIB`. Возвращает `this`.

Для подключения к серверу с помощью `DBLIB` в случае аутентификации по протоколу [NTLMv2](https://ru.wikipedia.org/wiki/NTLMv2) необходимо настроить SQL-соединение в манифесте администратора воркспейса. Если это невозможно, рекомендуется использовать драйвер `SQLSRV`. `DBLIB` **не позволяет** использовать `setScrollType`, но запросы с `WITH`, `DECLARE` и т.д. работают и без него. Он **позволяет** использовать доменную аутентификацию `DOMAIN\username` и `username@domain.zone`.

Драйвер `ODBC` считается устаревшим.

Для работы драйвера `SQLSRV` используется библиотека [`MS SQL для Linux`](https://docs.microsoft.com/ru-ru/sql/linux/sql-server-linux-overview). Её особенностью является подстановка параметров на стороне сервера, в связи с чем в его настройках установлено ограничение на максимальное их количество, по умолчанию: `1000`. **Позволяет** использовать `setScrollType` (что нужно для работы запросов в `WITH`, `DECLARE` и т.д.), но **не позволяет** использовать доменную аутентификацию.

&nbsp;

```js
setScrollType(scrollType: string | null): this;
```
**Для работы нужно использовать драйвер `SQLSRV`**

Позволяет создавать прокручиваемые результаты с помощью курсоров. Допустимые значения: `KEYSET`, `DYNAMIC`, `STATIC`, `BUFFERED`. Возвращает `this`.

- `KEYSEY` - создает серверный курсор набора ключей. Курсор набора ключей не обновляет количество строк, если строка удаляется из таблицы (удаленная строка возвращается без значений).

- `DYNAMIC` - создает серверный (без буферизации) динамический курсор, который позволяет осуществлять доступ к строкам в любом порядке и будет отражать изменения в базе данных.

- `STATIC` - создает серверный статический курсор, который позволяет осуществлять доступ к строкам в любом порядке, но не будет отражать изменения в базе данных.

- `BUFFERED` - создает клиентский (буферизованный) статический курсор, который помещает результирующий набор в память на клиентском компьютере.


Подробнее о работе курсоров можно прочитать в статье [`Типы курсоров (драйвер PDO_SQLSRV)`](https://learn.microsoft.com/ru-ru/sql/connect/php/cursor-types-pdo-sqlsrv-driver)

&nbsp;

```js
setRequestTimeout(timeout: number): this;
```
Устанавливает таймаут запроса в секундах. По умолчанию таймаут равен 30 секундам. Значение 0 задает бесконечный таймаут. Отрицательные и дробные значения не допускаются.

&nbsp;

```js
loadBulkCopyBuilder(): SqlBulkCopyBuilder;
```
Возвращает ссылку на интерфейс [`SqlBulkCopyBuilder`](#sql-bulk-copy-builder) импорта/экспорта через файл CSV.

&nbsp;

### Интерфейс OracleConnectorBuilder<a name="oracle-connector-builder"></a>
```ts
interface OracleConnectorBuilder extends SqlConnectorBuilder {
	setServiceName(value: string | SecretValue): this;
	setSchema(value: string | SecretValue): this;
	setTNS(value: string | SecretValue): this;
	loadImportBuilder(): OracleImportBuilder;
}
```
[`Коннектор`](../appendix/glossary.md#connector) для подключения к базе данных [`Oracle`](https://ru.wikipedia.org/wiki/Oracle_Database). Все функции возвращают `this`. Интерфейс наследуется от [`SqlConnectorBuilder`](#sql-connector-builder). Функции для установки параметров подключения поддерживают [секреты](./secrets.md).

&nbsp;

```js
setServiceName(value: string | SecretValue): this;
```
Устанавливает имя службы (SERVICE_NAME). SERVICE_NAME определяет одно или ряд имен для подключения к одному экземпляру базы данных. Возможные значения SERVICE_NAME указываются в сетевых установках Oracle и регистрируются в качестве службы БД процессом listener.

&nbsp;

```js
setSchema(value: string | SecretValue): this;
```
Устанавливает [`схему`](https://docs.oracle.com/cd/E11882_01/server.112/e10897/schema.htm).

&nbsp;

```js
setTNS(value: string | SecretValue): this;
```
Устанавливает имя службы TNS. Протокол TNS (Transparent Network Substrate) — уровень связи, используемый базами данных Oracle. Имя службы TNS — это имя, с которым экземпляр базы данных Oracle представлен в сети. Имя службы TNS назначается при настройке подключений к базе данных Oracle. 

&nbsp;

```js
loadImportBuilder(): OracleImportBuilder;
```
Возвращает ссылку на интерфейс [`OracleImportBuilder`](#oracle-import-builder) импорта из файла CSV.

&nbsp;

### Интерфейс SnowflakeConnectorBuilder<a name="snowflake-connector-builder"></a>
```ts
interface SnowflakeConnectorBuilder extends SqlConnectorBuilder {
	setAccount(account: string | SecretValue): this;
	setRegion(region: string | SecretValue): this;
	setInsecure(insecure: boolean): this;
	setWarehouse(warehouse: string | SecretValue): this;
	setSchema(schema: string | SecretValue): this;
	setRole(role: string | SecretValue): this;
	setProtocol(protocol: string): this;
}
```
[`Коннектор`](../appendix/glossary.md#connector) для подключения к базе данных [`Snowflake`](https://en.wikipedia.org/wiki/Snowflake_Inc%2E) (для подключения используется [PHP PDO Driver](https://docs.snowflake.com/en/user-guide/php-pdo-driver.html)). Все функции возвращают `this`. Интерфейс наследуется от [`SqlConnectorBuilder`](#sql-connector-builder). Функции поддерживают [секреты](./secrets.md).

&nbsp;

```js
setAccount(account: string | SecretValue): this;
```
Устанавливает [`имя аккаунта`](https://docs.snowflake.com/en/sql-reference/account-usage.html).

&nbsp;

```js
setRegion(region: string | SecretValue): this;
```
Устанавливает [`имя региона`](https://docs.snowflake.com/en/user-guide/admin-account-identifier.html). Опциональный.

&nbsp;

```js
setInsecure(insecure: boolean): this;
```
Устанавливает [`флаг проверки сертификата`](https://docs.snowflake.com/en/user-guide/snowsql-config.html#insecure-mode). По умолчанию `false`

&nbsp;

```js
setWarehouse(warehouse: string | SecretValue): this;
```
Устанавливает [`название хранилища`](https://docs.snowflake.com/en/user-guide/warehouses-overview.html). Опциональный.

&nbsp;

```js
setSchema(value: string | SecretValue): this;
```
Устанавливает [`схему`](https://docs.snowflake.com/en/sql-reference/info-schema.html). Опциональный, по умолчанию `public`.

&nbsp;

```js
setRole(role: string | SecretValue): this;
```
Устанавливает [`имя роли`](https://docs.snowflake.com/en/user-guide/security-access-control-overview.html#roles). Опциональный.

&nbsp;

```js
setProtocol(protocol: string): this;
```
Устанавливает название протокола. Опциональный.

&nbsp;

### Интерфейс PgsqlDrivenVerticaConnectorBuilder<a name="vertica-connector-builder"></a>
```ts
interface PgsqlDrivenVerticaConnectorBuilder extends PostgresqlConnectorBuilder {
}
```
[`Коннектор`](../appendix/glossary.md#connector) для подключения к базе данных [`Vertica`](https://en.wikipedia.org/wiki/Vertica). Интерфейс наследуется от [`PostgresqlConnectorBuilder`](#postgresql-connector-builder).

&nbsp;

## Импорт<a name="db-import"></a>

### Интерфейс MysqlImportBuilder<a name="mysql-import-builder"></a>
```js
interface MysqlImportBuilder {
	setTable(name: string): this;
	setDelimiter(delimiter: string): this;
	setLineDelimiter(delimiter: string): this;
	setEnclosure(enclosure: string): this;
	setEscape(escape: string): this;
	setThreads(threads: number): this;
	setVerbose(verbose: boolean): this;
	setFirstIgnoreLines(count: number): this;
	setLockTable(status: boolean): this;
	setForce(status: boolean): this;
	setDeleteAllRows(status: boolean): this;
	setCompress(status: boolean): this;
	setIgnoreDuplicates(status: boolean): this;
	setReplace(status: boolean): this;
	setColumns(names: string[]): this;
	setFilePath(path: string): this;
	import(): MysqlImportResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для импорта в СУБД MySQL из файла CSV с помощью утилиты [*mysqlimport*](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html). Все функции, кроме `import()`, возвращают `this`.

&nbsp;

```js
setTable(name: string): this;
```
Устанавливает таблицу, из которой будет производиться импорт.

&nbsp;

```js
setDelimiter(delimiter: string): this;
```
Устанавливает разделитель полей. По умолчанию: `;`.

&nbsp;

```js
setLineDelimiter(delimiter: string): this;
```
Устанавливает разделитель строк. По умолчанию: `\n`.

&nbsp;

```js
setEnclosure(enclosure: string): this;
```
Устанавливает обрамляющий символ, которым будет обрамляться текстовое поле, если в нём содержится разделитель полей. По умолчанию: `"`.

&nbsp;

```js
setEscape(escape: string): this;
```
Устанавливает символ для экранирования обрамляющего символа, если встретится в строке ещё и он, и символа переноса строки. По умолчанию равен обрамляющему символу.

&nbsp;

```js
setThreads(threads: number): this;
```
Устанавливает количество [`потоков`](https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D1%82%D0%BE%D0%BA_%D0%B2%D1%8B%D0%BF%D0%BE%D0%BB%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F) импорта; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_use-threads) *mysqlimport*: *--use-threads*. Задать можно не более `8` потоков. По умолчанию: `1`. 

&nbsp;

```js
setVerbose(verbose: boolean): this;
```
Устанавливает флаг расширенного вывода; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_verbose) *mysqlimport*: *--verbose*. По умолчанию: `false`.

&nbsp;

```js
setFirstIgnoreLines(count: number): this;
```
Устанавливает количество первых строк, которые будут проигнорированы; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_ignore-lines) *mysqlimport*: *--ignore-lines*. По умолчанию: `0`.

&nbsp;

```js
setLockTable(status: boolean): this;
```
Устанавливает флаг блокировки таблицы во время импорта; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_lock-tables) *mysqlimport*: *--lock-tables*. По умолчанию: `false`.

&nbsp;

```js
setForce(status: boolean): this;
```
Устанавливает флаг игнорирования критических ошибок; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_force) *mysqlimport*: *--force*. По умолчанию: `false`.

&nbsp;

```js
setDeleteAllRows(status: boolean): this;
```
Устанавливает флаг предварительного выполнения команды [`TRUNCATE`](https://ru.wikipedia.org/wiki/Truncate_(SQL)), что требует прав на эту команду; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_delete) *mysqlimport*: *--delete*. По умолчанию: `false`.

&nbsp;

```js
setCompress(status: boolean): this;
```
Устанавливает флаг компрессии; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_compress) *mysqlimport*: *--compress*. По умолчанию: `false`.

&nbsp;

```js
setIgnoreDuplicates(status: boolean): this;
```
Устанавливает флаг игнорирования строк с одинаковым уникальным ключом; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_ignore) *mysqlimport*: *--ignore*. По умолчанию: `false`.

&nbsp;

```js
setReplace(status: boolean): this;
```
Устанавливает флаг замены строк с одинаковым уникальным ключом; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_replace) *mysqlimport*: *--replace*. По умолчанию: `false`.

&nbsp;

```js
setColumns(names: string[]): this;
```
Задаёт порядок столбцов таблицы, в которые будут записываться данные из файла CSV; [`опция`](https://dev.mysql.com/doc/refman/8.0/en/mysqlimport.html#option_mysqlimport_columns) *mysqlimport*: *--columns*. По умолчанию импорт будет производиться в столбцы таблицы последовательно.

&nbsp;

```js
setFilePath(path: string): this;
```
Устанавливает путь к файлу в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir).

&nbsp;

<a name="mysql-import-builder.import"></a>
```js
import(): MysqlImportResult;
```
Формирует из флагов команду на вызов *mysqlimport*, дожидается завершения импорта и возвращает ссылку на [`MysqlImportResult`](#mysql-import-result).

&nbsp;

### Интерфейс MysqlImportResult<a name="mysql-import-result"></a>
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
Интерфейс просмотра результатов импорта, осуществлённого с помощью [`MysqlImportBuilder`](#mysql-import-builder).

&nbsp;

```js
hasErrors(): boolean;
```
Возвращает `getErrorOutput() != ''`.

&nbsp;

```js
getErrorOutput(): string;
```
Возвращает вывод команды *mysqlimport* в `stderr`.

&nbsp;

```js
getOutput(): string;
```
Возвращает вывод команды *mysqlimport* в `stdout`.

&nbsp;

```js
getCommand(): string;
```
Возвращает сформированную команду на вызов *mysqlimport*, которая была выполнена в момент вызова [`MysqlImportBuilder.import()`](#mysql-import-builder.import). Параметры будут сохранены в конфигурационном файле, доступ к которому можно получить функцией `getConfig()`.

&nbsp;

```js
getConfig(): string;
```
Возвращает содержимое конфигурационного файла с параметрами импорта.

&nbsp;

```js
getStats(): Object;
```
Если импорт завершён без ошибок, возвращает объект вида `{"records": 3, "deleted": 0, "skipped": 0, "warnings": 0}`.

&nbsp;

### Интерфейс PostgresqlImportBuilder<a name="postgresql-import-builder"></a>
```js
interface PostgresqlImportBuilder {
	setTable(name: string): this;
	setSchema(name: string | SecretValue): this;
	setDelimiter(delimiter: string): this;
	setEnclosure(enclosure: string): this;
	setEscape(escape: string): this;
	setIgnoreHeader(ignoreHeader: boolean): this;
	setColumns(names: string[]): this;
	setFilePath(path: string): this;
	import(): PostgresqlImportResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для импорта в СУБД Postgresql из файла CSV с помощью команды `\copy`. Все функции, кроме `import()`, возвращают `this`.

&nbsp;

```js
setTable(name: string): this;
```
Устанавливает таблицу, в которую будет производиться импорт.

&nbsp;

```js
setSchema(name: string | SecretValue): this;
```
Устанавливает [схему](https://www.postgresql.org/docs/current/ddl-schemas.html). Поддерживает [секреты](./secrets.md).

&nbsp;

```js
setDelimiter(delimiter: string): this;
```
Устанавливает разделитель полей. По умолчанию: `;`.

&nbsp;

```js
setEnclosure(enclosure: string): this;
```
Устанавливает обрамляющий символ, которым будет обрамляться текстовое поле, если в нём содержится разделитель полей или строк. По умолчанию: `"`

&nbsp;

```js
setEscape(escape: string): this;
```
Устанавливает символ для экранирования обрамляющего символа, если он встретится в текстовом поле. По умолчанию равен обрамляющему символу.

&nbsp;

```js
setIgnoreHeader(ignoreHeader: boolean): this;
```
Устанавливает флаг игнорирования заголовка. По умолчанию: `false`.

&nbsp;

```js
setColumns(names: string[]): this;
```
Задаёт порядок столбцов таблицы, в которые будут записываться данные из файла CSV. По умолчанию импорт будет производиться в столбцы таблицы последовательно.

&nbsp;

```js
setFilePath(path: string): this;
```
Устанавливает путь к файлу в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir).

&nbsp;

<a name="postgresql-import-builder.import"></a>
```js
import(): PostgresqlImportResult;
```
Формирует из флагов команду импорт, дожидается завершения импорта и возвращает ссылку на [`PostgresqlImportResult`](#postgresql-import-result).

&nbsp;

### Интерфейс PostgresqlImportResult<a name="postgresql-import-result"></a>
```js
interface PostgresqlImportResult {
	hasErrors(): boolean;
	getErrorOutput(): string;
	getCommand(): string;
}
```
Интерфейс просмотра результатов импорта, осуществлённого с помощью [`PostgresqlImportBuilder`](#postgresql-import-builder).

&nbsp;

```js
hasErrors(): boolean;
```
Возвращает `getErrorOutput() != ''`.

&nbsp;

```js
getErrorOutput(): string;
```
Возвращает вывод команды `\copy` в `stderr`.

&nbsp;

```js
getCommand(): string;
```
Возвращает сформированную команду на вызов `\copy`, которая была выполнена в момент вызова [`PostgresqlImportBuilder.import()`](#postgresql-import-builder.import).

&nbsp;

### Интерфейс SqlBulkCopyBuilder<a name="sql-bulk-copy-builder"></a>
```ts
interface SqlBulkCopyBuilder {
	setServerName(value: string | SecretValue): this;
	setPort(value: number | SecretValue): this;
	setUsername(value: string | SecretValue): this;
	setPassword(value: string | SecretValue): this;
	setDatabase(value: string | SecretValue): this;
	setQuery(value: string): this;
	setPacketSize(size: number): this;
	setBatchSize(size: number): this;
	setCharacterTypesMode(status: boolean): this;
	setCodePage(code: string): this;
	setDsnMode(status: boolean): this;
	setErrorFile(path: string): this;
	setKeepIdentityValuesMode(status: boolean): this;
	setFormatFile(path: string): this;
	setFirstRow(index: number): this;
	setHint(hint: string): this;
	setStandardInputFile(path: string): this;
	setKeepNullValuesMode(status: boolean): this;
	setLoginTimeout(timeout: number): this;
	setLastRow(index: number): this;
	setMaxErrors(size: number): this;
	setNativeTypesMode(status: boolean): this;
	setKeepNonTextNativeValuesMode(status: boolean): this;
	setOutputFile(path: string): this;
	setQuotedIdentifiersMode(status: boolean): this;
	setRowTerm(term: string): this;
	setRegionalMode(status: boolean): this;
	setFieldTerm(term: string): this;
	setTrustedConnectionMode(status: boolean): this;
	setWideCharacterTypesMode(status: boolean): this;

	import(path: string): SqlBulkCopyResult;
	export(path: string): SqlBulkCopyResult;
	format(path: string, xml: boolean): SqlBulkCopyResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для импорта в СУБД MS SQL из файла CSV с помощью утилиты [*bcp*](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility). Все функции, начинающиеся с `set...()`, возвращают `this`. Функции для установки параметров подключения поддерживают [секреты](./secrets.md).

Порядок полей в файле CSV и таблице должен строго совпадать, даже при импорте в таблицу с полем [`IDENTITY`](https://docs.microsoft.com/ru-ru/sql/t-sql/statements/create-table-transact-sql-identity-property), так как в утилите *bcp* имеется баг, из-за которого работоспособность функций [`setFormatFile()`](#sql-bulk-copy-builder.set-format-file) и [`format()`](#sql-bulk-copy-builder.format) не гарантирована.

&nbsp;

<a name="set-server-name"></a>
```js
setServerName(value: string | SecretValue): this;
```
Устанавливает экземпляр SQL Server, к которому устанавливается подключение; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#S) *bcp*: *-S*.

&nbsp;

```js
setPort(value: number | SecretValue): this;
```
Устанавливает номер порта соединения. По умолчанию: `1433`.

&nbsp;

```js
setUsername(value: string | SecretValue): this;
```
Устанавливает имя пользователя; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#U) *bcp*: *-U*.

&nbsp;
```js
setPassword(value: string | SecretValue): this;
```
Устанавливает пароль пользователя; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#P) *bcp*: *-P*.

&nbsp;

```js
setDatabase(value: string | SecretValue): this;
```
Устанавливает имя БД, к которой произойдёт подключение; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#d) *bcp*: *-d*.

&nbsp;

```js
setQuery(value: string): this;
```
Устанавливает ***имя таблицы***, в которую будет произведён импорт, ***несмотря на название***.

&nbsp;

```js
setPacketSize(size: number): this;
```
Устанавливает число байтов в каждом сетевом пакете; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#a) *bcp*: *-a*. Значение может находиться в пределах от `4096` до `65535` байт, значение по умолчанию: `4096`.

&nbsp;

```js
setBatchSize(size: number): this;
```
Устанавливает количество строк в каждом пакете импортированных данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#b) *bcp*: *-b*. Каждый пакет импортируется и регистрируется как отдельная транзакция, которая фиксируется после выполнения импорта всего пакета. По умолчанию импорт всех строк в файле данных выполняется в одном пакете. 

&nbsp;

```js
setCharacterTypesMode(status: boolean): this;
```
Устанавливает символьный тип данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#c) *bcp*: *-c*. Подробное описание [`здесь`](https://docs.microsoft.com/ru-ru/sql/relational-databases/import-export/use-character-format-to-import-or-export-data-sql-server?view=sql-server-ver15).

&nbsp;

```js
setCodePage(code: string): this;
```
Устанавливает кодовую страницу данных в файле данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#C) *bcp*: *-C*. Значение по умолчанию: `OEM`.

&nbsp;

```js
setDsnMode(status: boolean): this;
```
Устанавливает режим, в котором значение, передаваемое в функцию [`setServerName()`](#set-server-name) интерпретируется как имя источника данных (DSN); [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#D) *bcp*: *-D*.

&nbsp;

```js
setErrorFile(path: string): this;
```
Устанавливает полный путь к файлу ошибок, используемому для хранения строк, которые `bcp` не может передать из файла в базу данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#e) *bcp*: *-e*.

&nbsp;

```js
setKeepIdentityValuesMode(status: boolean): this;
```
Указывает, что значение или значения идентификаторов в файле импортированных данных будут использоваться для столбца идентификаторов; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#E) *bcp*: *-E*.

&nbsp;

<a name="sql-bulk-copy-builder.set-format-file"></a>
```js
setFormatFile(path: string): this;
```
Устанавливает путь к файлу формата; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#f) *bcp*: *-f*. ***Этот функционал содержит баг в утилите bcp и не рекомендуется к использованию!***

&nbsp;

```js
setFirstRow(index: number): this;
```
Устанавливает номер первой строки для импорта из файла данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#F) *bcp*: *-F*.

&nbsp;

```js
setHint(hint: string): this;
```
Устанавливает одно или несколько указаний для использования во время массового импорта; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#h) *bcp*: *-h*.

&nbsp;

```js
setStandardInputFile(path: string): this;
```
Устанавливает имя файла ответов, содержащего ответы на вопросы командной строки для каждого поля данных при выполнении массового копирования в интерактивном режиме; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#i) *bcp*: *-i*.

&nbsp;

```js
setKeepNullValuesMode(status: boolean): this;
```
Указывает, что пустые столбцы во время данной операции должны сохранить значение NULL вместо любых вставляемых значений столбцов по умолчанию; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#k) *bcp*: *-k*.

&nbsp;

```js
setLoginTimeout(timeout: number): this;
```
Устанавливает время ожидания входа в секундах; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#l) *bcp*: *-l*. Значение по умолчанию: `15`.

&nbsp;

```js
setLastRow(index: number): this;
```
Устанавливает номер последней строки для импорта из файла данных; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#L) *bcp*: *-L*.

&nbsp;

```js
setMaxErrors(size: number): this;
```
Устанавливает максимальное количество ошибок, которые могут произойти до отмены импорта; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#m) *bcp*: *-m*. Значение по умолчанию: `10`.

&nbsp;

```js
setNativeTypesMode(status: boolean): this;
```
Устанавливает признак использования собственных типов данных (базы данных). Этот параметр не запрашивает тип данных для каждого поля, он использует собственные значения; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#n) *bcp*: *-n*.

&nbsp;

```js
setKeepNonTextNativeValuesMode(status: boolean): this;
```
Устанавливает признак использования собственных типов данных (базы данных) для не символьных данных и символы Юникода для символьных данных. Этот параметр не запрашивает тип данных для каждого поля, он использует собственные значения; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#N) *bcp*: *-N*.

&nbsp;

```js
setOutputFile(path: string): this;
```
Устанавливает имя файла, который принимает перенаправленные из командной строки выходные данные; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#o) *bcp*: *-o*.

&nbsp;

```js
setQuotedIdentifiersMode(status: boolean): this;
```
Выполняет инструкцию `SET QUOTED_IDENTIFIERS ON` в соединении между служебной программой `bcp` и экземпляром `SQL Server`; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#q) *bcp*: *-q*.

&nbsp;

```js
setRowTerm(term: string): this;
```
Устанавливает признак конца строки; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#r) *bcp*: *-r*.

&nbsp;

```js
setRegionalMode(status: boolean): this;
```
Устанавливает признак импорта данных в денежном формате, в формате даты и времени с помощью регионального формата, определённого настройками локали клиентского компьютера; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#R) *bcp*: *-R*. Значение по умолчанию: `false`.

&nbsp;

```js
setFieldTerm(term: string): this;
```
Устанавливает признак конца поля; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#t) *bcp*: *-t*. Значение по умолчанию: `\t`.

&nbsp;

```js
setTrustedConnectionMode(status: boolean): this;
```
Указывает, что программа `bcp` устанавливает доверительное соединение с `MS SQL Server` с использованием встроенной безопасности; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#T) *bcp*: *-T*. Не требуются учётные данные безопасности для сетевого пользователя.

&nbsp;

```js
setWideCharacterTypesMode(status: boolean): this;
```
Устанавливает признак использования символов Юникода; [`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#w) *bcp*: *-w*. При использовании этого параметра не запрашивается тип данных каждого поля, для хранения данных используется тип `nchar`, отсутствуют префиксы, в качестве разделителя полей используется символ табуляции `\t`, а в качестве признака конца строки — символ новой строки `\n`.

&nbsp;

<a name="sql-bulk-copy-builder.import"></a>
```js
import(path: string): SqlBulkCopyResult;
```
Формирует из флагов команду на вызов *bcp*, дожидается завершения импорта из файла `path` и возвращает ссылку на [`SqlBulkCopyResult`](#sql-bulk-copy-result).

&nbsp;

<a name="sql-bulk-copy-builder.export"></a>
```js
export(path: string): SqlBulkCopyResult;
```
Формирует из флагов команду на вызов *bcp*, дожидается завершения экспорта в файл `path` и возвращает ссылку на [`SqlBulkCopyResult`](#sql-bulk-copy-result).

&nbsp;

<a name="sql-bulk-copy-builder.format"></a>
```js
format(path: string, xml: boolean): SqlBulkCopyResult;
```
Формирует из флагов команду на вызов *bcp [`format`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#format)*, которая создаёт файл форматирования `path`, основанный на указанных параметрах, дожидается завершения и возвращает ссылку на [`SqlBulkCopyResult`](#sql-bulk-copy-result). Если указан флаг `xml` ([`опция`](https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility#x) *bcp*: *-x*), файл форматирования будет создан на основе [`XML`](https://ru.wikipedia.org/wiki/XML); по умолчанию: `true`.

Файл форматирования можно использовать для последующего экспорта/импорта при вызове функции [`setFormatFile()`](#sql-bulk-copy-builder.set-format-file).

&nbsp;

### Интерфейс SqlBulkCopyResult<a name="sql-bulk-copy-result"></a>
```ts
interface SqlBulkCopyResult {
	hasErrors(): boolean;
	getErrorOutput(): string;
	getOutput(): string;
	getCommand(): string;
}
```
Интерфейс просмотра результатов импорта/экспорта, осуществлённого с помощью [`SqlBulkCopyBuilder`](#sql-bulk-copy-builder).

&nbsp;

```js
hasErrors(): boolean;
```
Возвращает `getErrorOutput() != ''`.

&nbsp;

```js
getErrorOutput(): string;
```
Возвращает вывод команды *bcp* в `stderr`.

&nbsp;

```js
getOutput(): string;
```
Возвращает вывод команды *bcp* в `stdout`.

&nbsp;

```js
getCommand(): string;
```
Возвращает сформированную команду на вызов *bcp*, которая была выполнена в момент вызова одной из функций [`SqlBulkCopyBuilder.import()`](#sql-bulk-copy-builder.import), [`SqlBulkCopyBuilder.export()`](#sql-bulk-copy-builder.export), [`SqlBulkCopyBuilder.format()`](#sql-bulk-copy-builder.format).

&nbsp;

### Интерфейс OracleImportBuilder<a name="oracle-import-builder"></a>
```js
interface OracleImportBuilder {
	setTable(name: string): this;
	setDelimiter(delimiter: string): this;
	setColumns(names: string[]): this;
	setFilePath(path: string): this;
	setFirstIgnoreLines(count: number): this;
	setDirect(value: boolean): this;
	setUserBadFileFileLink(fileLink: string): this;
	
	import(): OracleImportResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для импорта в СУБД Oracle из файла `CSV` с помощью утилиты [`sqlldr`](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-sql-loader.html). Все функции, кроме `import()`, возвращают `this`.

&nbsp;

```js
setTable(name: string): this;
```
Устанавливает таблицу, в которую будет производиться импорт.

&nbsp;

```js
setDelimiter(delimiter: string): this;
```
Устанавливает разделитель полей. По умолчанию `;`.

&nbsp;

```js
setFirstIgnoreLines(count: number): this;
```
Устанавливает количество первых строк, которые будут пропущены; [Опция](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-sql-loader-control-file-contents.html#GUID-2BB41EA6-C94D-41C1-94DE-966B291943E6) `sqlldr`: `skip=n`. По умолчанию `0`.

&nbsp;

```js
setColumns(names: string[]): this;
```
Задаёт порядок столбцов таблицы, в которые будут записываться данные из файла `CSV`; [Опция](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-sql-loader-control-file-contents.html#GUID-413DEE17-FA16-4AD7-A5E6-0A6D8BFE0057) `sqlldr` `control file`. По умолчанию импорт будет производиться в столбцы таблицы последовательно.

&nbsp;

```js
setFilePath(path: string): this;
```
Устанавливает путь к файлу в формате `CSV`, содержащему строки для импорта, в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir).

&nbsp;

```js
setDirect(value: boolean): this;
```
Параметр, определяющий, будет ли импорт осуществляться с помощью `INSERT`-запросов (значение `false`) или напрямую в файлы базы данных (значение `true`). Второй способ обычно намного быстрее. [Опция](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/oracle-sql-loader-conventional-and-direct-loads.html#GUID-26686C49-D768-4F55-8AED-771B9A8C6552) `sqlldr`: `direct=true|false`. По умолчанию `false`.

&nbsp;

```js
setUserBadFileFileLink(fileLink: string): this;
```
Метод, позволяющий установить путь к файлу, который будет содержать информацию о пропущенных строках при импорте.

&nbsp;

<a name="oracle-import-builder.import"></a>
```js
import(): OracleImportResult;
```
Формирует из флагов команду на вызов `sqlldr`, дожидается завершения импорта и возвращает ссылку на [`OracleImportResult`](#oracle-import-result).

&nbsp;

### Интерфейс OracleImportResult<a name="oracle-import-result"></a>
```js
interface OracleImportResult {
	hasErrors(): boolean;
	getErrorOutput(): string;
	getStats(): OracleImportStats;
	getBadFileLink(): string;
}
```
Интерфейс просмотра результатов импорта, осуществлённого с помощью [`OracleImportBuilder`](#oracle-import-builder).

&nbsp;

```js
hasErrors(): boolean;
```
Возвращает `getErrorOutput() != ''`.

&nbsp;

```js
getErrorOutput(): string;
```
Возвращает вывод команды *sqlldr* в `stderr`.

&nbsp;

```js
getStats(): OracleImportStats;
```
Если импорт завершён без ошибок, возвращает ссылку на [`OracleImportStats`](#oracle-import-stats), содержащий информацию о пропущенных строках.

&nbsp;

```js
getBadFileLink(): string;
```
Возвращает путь к файлу, содержащему все пропущенные при импорте строки.

&nbsp;

### Интерфейс OracleImportStats<a name="oracle-import-stats"></a>
```js
interface OracleImportStats {
	getIgnored(): number;
}
```
Интерфейс просмотра статистики импорта, осуществлённого с помощью [`OracleImportBuilder`](#oracle-import-builder).

&nbsp;

```js
getIgnored(): number;
```
Возвращает количество строк, которое не удалось импортировать.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
