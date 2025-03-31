# Clickhouse

## Интерфейс ClickhouseConnectorBuilder<a name="clickhouse-connector-builder"></a>
```ts
interface ClickhouseConnectorBuilder {
  setHost(value: string): this;
  setPort(value: number): this;
  setUsername(value: string): this;
  setPassword(value: string): this;
  setDatabase(value: string): this;
  setHttps(value: boolean): this;
  load(): ClickhouseConnection;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), базовый интерфейс [`коннекторов`](../appendix/glossary.md#connector) для настройки подключения к [`Clickhouse`](https://ru.wikipedia.org/wiki/ClickHouse).

&nbsp;

```js
setHost(value: string): this;
```
Устанавливает адрес подключения. Возвращает `this`.

&nbsp;

```js
setPort(value: number): this;
```
Устанавливает номер порта для подключения. Возвращает `this`.

&nbsp;

```js
setUsername(value: string): this;
```
Устанавливает имя пользователя. Возвращает `this`.

&nbsp;

```js
setPassword(value: string): this;
```
Устанавливает пароль. Возвращает `this`.

&nbsp;

```js
setDatabase(value: string): this;
```
Устанавливает имя базы данных. Возвращает `this`.

&nbsp;

```js
setHttps(value: boolean): this;
```
Устанавливает флаг https: выполнять подключение по https или http. Возвращает `this`.

&nbsp;

```js
load(): ClickhouseConnection;
```
Соединяется с БД и возвращает объект соединения [`ClickhouseConnection`](#clickhouse-connection).

&nbsp;

## Интерфейс ClickhouseConnection<a name="clickhouse-connection"></a>
```ts
interface ClickhouseConnection {
  qb(): ClickhouseQueryBuilder;
}
```
Объект соединения с [`Clickhouse`](https://ru.wikipedia.org/wiki/ClickHouse).

&nbsp;

```js
qb(): ClickhouseQueryBuilder;
```
Возвращает интерфейс [`ClickhouseQueryBuilder`](#clickhosue-query-builder) построения запроса к базе данных.

&nbsp;

## Интерфейс ClickhouseQueryBuilder<a name="clickhouse-query-builder"></a>
```ts
interface SqlQueryBuilder {
  select(columns: string[]): this;
  addSelect(column: string): this;
  addSelectRaw(expression: string): this;
  distinct(columns: string[]): this;
  setFrom(table: string, alias: string | null): this;
  setTable(table: string, alias: string | null): this;
  where(column: string, operator: string | null, value: any[] | any, concatOperator: string): this;
  orWhere(column: string, operator: string | null, value: any[] | any): this;
  whereIn(column: string, values: any[], concatOperator: string, not: boolean): this;
  whereBetween(column: string, minValue: string|number, maxValue: string|number, concatOperator: string, not: boolean): this;
  orWhereBetween(column: string, minValue: string|number, maxValue: string|number): this;
  groupBy(column: string): this;
  orderBy(column: string, direction: string): this;
  orderByDesc(column: string): this;
  offset(value: number): this;
  limit(value: number): this;
  exists(): boolean;
  count(): number;
  sum(column: string): number;
  insert(values: Object[] | Object): boolean;
  get(): ClickhouseQueryResult;
}
```
Интерфейс построения запроса к базе данных.

&nbsp;

```js
select(columns: string[]): this;
```
Устанавливает к выборке набор колонок `columns`, возвращает `this`. Заменяет установленные ранее колонки/выражения.
Значение `columns` по умолчанию - `['*']` - выбрать все колонки.

&nbsp;

```js
addSelect(column: string): this;
```
Добавляет к выборке колонку `column`, возвращает `this`.

&nbsp;

```js
addSelectRaw(expression: string): this;
```
Добавляет к выборке выражение `expression`, полезно для использования функций. Возвращает `this`. 

&nbsp;

```js
distinct(columns: string[]): this;
```
Позволяет выбрать только уникальные строки для указанных колонок. Заменяет собой установленные ранее колонки вызовом метода `select`, возможно добавление колонок к выборке через `addSelect` или `addSelectRaw`. Возвращает `this`.

&nbsp;

```js
setFrom(table: string, alias: string | null): this;
```
Устанавливает таблицу, из которой будет производиться выборка. Для создания псевдонима используется `alias` Возвращает `this`.

Вызов `setFrom('table1', 't1)` в запросе будет преобразован в `table1 AS t1`.

&nbsp;

```js
setTable(table: string, alias: string | null): this;
```
Алиас для метода `setFrom`.

&nbsp;

```js
where(column: string, operator: string | null, value: any[] | any, concatOperator: string): this;
```
Добавляет условие вида `column operator value`.

Например, для вызова `where('columnName', '=', 5)` будет сформировано условие `columnName = 5`.

Возможные значения `concatOprator`: `AND`, `OR`. По умолчанию `AND`.

&nbsp;

```js
orWhere(column: string, operator: string | null, value: any[] | any): this;
```
Аналогично вызову `where(column, operator, value, 'OR')`

&nbsp;

```js
whereIn(column: string, values: any[], concatOperator: string, not: boolean): this;
```
Добавляет условие с оператором `IN` вида `column IN (values[0], values[1], ...)`. Возвращает `this`.

Возможные значения `concatOprator`: `AND`, `OR`. По умолчанию `AND`.

Флаг `not` - отрицание операции, если `not=true`, то получим условие вида `column NOT IN (values[0], values[1], ...)`. По умолчанию `false`.

&nbsp;

```js
whereBetween(column: string, minValue: string|number, maxValue: string|number, concatOperator: string, not: boolean): this;
```
Добавляет условия с оператором `BETWEEN` вида `column BETWEEN minValue AND maxValue`. Возвращает `this`.

Возможные значения `concatOprator`: `AND`, `OR`. По умолчанию `AND`.

Флаг `not` - отрицание операции, если `not=true`, то получим условие вида `column NOT BETWEEN minValue AND maxValue`. По умолчанию `false`.

&nbsp;

```js
orWhereBetween(column: string, minValue: string|number, maxValue: string|number): this;
```
Аналогично вызову `whereBetween(column, minValue, maxValue, 'OR')`.

&nbsp;

```js
groupBy(column: string): this;
```
Устанавливает группировку по колонке `column`, возвращает `this`.

&nbsp;

```js
orderBy(column: string, direction: string): this;
```
Устанавливает сортировку по колонке `column`, направление задается аргументом `direction`, по умолчанию `ASC`, возвращает `this`.

Возможные значения `direction`: `ASC`, `DESC`.

&nbsp;

```js
orderByDesc(column: string): this;
```
Устанавливает сортировку по убыванию по колонке `column`, возвращает `this`.

&nbsp;

```js
offset(value: number): this;
```
Устанавливает количество строк, которое надо пропустить, прежде чем начать выборку, возвращает `this`.

&nbsp;

```js
limit(value: number): this;
```
Устанавливает максимальное количество строк, которое надо выбрать, возвращает `this`.

&nbsp;

```js
exists(): boolean;
```
Проверяет наличие строк для сформированного запроса и возвращает `true`, если результат непустой, иначе `false`;

&nbsp;

```js
count(): number;
```
Возвращает количество найденных строк для сформированного запроса.

&nbsp;

```js
sum(column: string): number;
```
Суммирует значения колонки `column` и возвращает полученную сумму.

&nbsp;

```js
insert(values: Object[] | Object): boolean;
```
Вставляет значения `values` в таблицу, заданную методом `setFrom` или `setTable`. В случае успешности операции возвращает `true`, иначе `false`.

Значения могут быть переданы в виде объекта:
```js
insert({id: 1, name: 'Apple', cnt: 10})
```
Или массива объектов:
```js
insert([
    {id: 1, name: 'Apple', cnt: 10},
    {id: 2, name: 'Orange', cnt: 15},
    {id: 3, name: 'Banana', cnt: 18},
    {id: 4, name: 'Peach', cnt: 12},
    {id: 5, name: 'Lemon', cnt: 15},
])
```


&nbsp;

```js
get(): ClickhouseQueryResult;
```
Конструирует SQL-запрос, передаёт его на исполнение в СУБД и возвращает интерфейс [`ClickhouseQueryResult`](#clickhouse-query-result) доступа к результатам запроса.

&nbsp;

## Интерфейс ClickhouseQueryResult<a name="clickhouse-query-result"></a>
```ts
interface ClickhouseQueryResult {
  count(): number;
  generator(): Object[];
  all(): Object[];
  first(): Object | null;
  column(columnName: string): any[];
}
```
Интерфейс доступа к результатам запроса.

&nbsp;

```js
count(): number;
```
Возвращает количество выбранных строк.

&nbsp;

```js
generator(): Object[];
```
Возвращает генератор для работы со строками запроса.

&nbsp;

```js
all(): Object[];
```
Возвращает все выбранные строки.

&nbsp;

```js
first(): Object | null;
```
Возвращает первую строку запроса.

&nbsp;

```js
column(columnName: string): any[];
```
Выбирает и возвращает в виде массива значения столбца `columnName`.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
