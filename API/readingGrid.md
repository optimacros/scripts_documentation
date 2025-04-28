# Интерфейсы для чтения представления в виде таблицы

## Интерфейс GridRangeChunk<a name="grid-range-chunk"></a>
```ts
interface GridRangeChunk {
    cells(): Cells;
    rows(): Labels;
    columns(): Labels;
}
```
Интерфейс для обработки части строк [`GridRange`](./views.md#grid-range) — чанка. Содержит информацию о заголовках (возможно многоуровневых) и ячейках двумерной таблицы.

&nbsp;

```js
cells(): Cells;
```
Возвращает ссылку на набор ячеек [`Cells`](#cells) текущего чанка.

&nbsp;

```js
rows(): Labels;
```
Возвращает интерфейс [`Labels`](#labels), представляющий заголовки строк.

&nbsp;

```js
columns(): Labels;
```
Возвращает интерфейс [`Labels`](#labels), представляющий заголовки столбцов.

&nbsp;

### Интерфейс Labels<a name="labels"></a>
```ts
interface Labels {
    start(): number;
    count(): number;
    all(): LabelsGroup[];
    get(index: number): LabelsGroup | null;
    chunkInstance(): GridRangeChunk;
    findLabelByLongId(longId: number): Label | null;
}
```
Интерфейс, представляющий набор объектов [`LabelsGroup`](#labels-group), то есть набор заголовков строк/столбцов с их возможно многоуровневой структурой. Как правило, его можно получить функциями интерфейса [`GridRangeChunk`](#grid-range-chunk).

&nbsp;

```js
start(): number;
```
Возвращает номер первой строки/столбца текущего [`GridRangeChunk`](#grid-range-chunk) в таблице [`Grid`](./views.md#grid).

&nbsp;

```js
count(): number;
```
Возвращает количество строк/столбцов в наборе.

Если `this` относится к строкам, то это значение, которое было посчитано в функции [`GridRange`](./views.md#grid-range).[`generator(size)`](./views.md#generator) на основе аргумента `size`.

Если `this` относится к столбцам, то это в точности значение аргумента `columnCount` функции [`Grid`](./views.md#grid).[`range(rowStart, rowCount, columnStart, columnCount)`](./views.md#range).

&nbsp;

```js
all(): LabelsGroup[];
```
Возвращает массив объектов заголовков каждой строки/столбца [`LabelsGroup`](#labels-group).

&nbsp;

```js
get(index: number): LabelsGroup | null;
```
Аналог `all()[index]`. В случае некорректного индекса возвращает `null`.

&nbsp;

```js
chunkInstance(): GridRangeChunk;
```
Возвращает обратную ссылку на [`GridRangeChunk`](#grid-range-chunk), из которого был получен `this`.

&nbsp;

```js
findLabelByLongId(longId: number): Label | null;
```
Возвращает объект [`Label`](#label) по его [`longId`](./common.md#long-id), если он присутствует в `this`, иначе — `null`.

&nbsp;

## Интерфейс LabelsGroup<a name="labels-group"></a>
```ts
interface LabelsGroup {
    all(): Label[];
    first(): Label;
    cells(): Cells;
}
```
Интерфейс, представляющий многоуровневый набор заголовков конкретной строки или столбца.

&nbsp;

```js
all(): Label[];
```
Возвращает массив конкретных заголовков [`Label`](#label).

&nbsp;

```js
first(): Label;
```
Аналог `all()[0]`.

&nbsp;

```js
cells(): Cells;
```
Возвращает интерфейс [`Cells`](#cells), предоставляющий доступ к ячейкам данной строки или столбца.

&nbsp;

### Интерфейс Label<a name="label"></a>
```ts
interface Label = EntityInfo;
```
Интерфейс сущности, полученный при чтении грида (таблицы). Как правило, представляет собой один из заголовков строки или столбца. Должен быть идентичен интерфейсу [`EntitiesInfo`](./common.md#entities-info), но может отличаться. Поэтому рекомендуется получить [`longId`](./common.md#long-id) сущности с помощью этого интерфейса, а затем получить [`EntitiesInfo`](./common.md#entities-info) с помощью метода [`EntitiesInfo.get()`](./common.md#entities-info).

&nbsp;

### Интерфейс Cells<a name="cells"></a>
```ts
interface Cells {
    all(): Cell[];
    first(): Cell | null;
    setValue(value: number | string | boolean | null): this;
    count(): number;
    chunkInstance(): GridRangeChunk;
    getByIndexes(indexes: number[]): Cells;
}
```
Интерфейс, представляющий (как правило, прямоугольный) набор клеток таблицы.

&nbsp;

```js
all(): Cell[];
```
Возвращает одномерный массив всех клеток [`Cell`](#cell).

&nbsp;

```js
first(): Cell | null;
```
Аналог `all()[0]`. Возвращает `null`, если массив клеток пустой.

&nbsp;

<a name="cells.set-value"></a>
```js
setValue(value: number | string | boolean | null): this;
```
Устанавливает одно и то же значение для всех клеток. Отрабатывает в момент вызова и мгновенно приводит к пересчёту зависимых от них клеток. Поэтому ***не*** рекомендуется к использованию в больших мультикубах. Возвращает `this`.

&nbsp;

```js
count(): number;
```
Возвращает количество клеток в наборе.

&nbsp;

<a name="chunkInstance"></a>
```js
chunkInstance(): GridRangeChunk;
```
Возвращает обратную ссылку на [`GridRangeChunk`](#grid-range-chunk), из которого был получен `this`.

&nbsp;

```js
getByIndexes(indexes: number[]): Cells;
```
Производит выборку из одномерного представления клеток объекта `this` по индексам `indexes` и возвращает новый объект [`Cells`](#cells). В этом случае функция [`chunkInstance()`](#chunk-instance) для нового объекта будет возвращать ссылку на тот же самый объект [`GridRangeChunk`](#grid-range-chunk), что и для `this`. Это *единственный* способ создать непрямоугольный объект [`Cells`](#cells).

&nbsp;

### Интерфейс Cell<a name="cell"></a>
```ts
interface Cell {
    setValue(value: number | string | boolean | null): this;
    
    getValue(): number | string | null;
    getVisualValue(): string | null;
    getNativeValue(): number | string | null;
    getContextValue(): string | null;
    
    definitions(): number[];
    columns(): LabelsGroup | null;
    rows(): LabelsGroup | null;
    
    dropDown(): Labels;
    getFormatType(): string;
    isEditable(): boolean;
}
```
Интерфейс, представляющий клетку таблицы.

&nbsp;

<a name="cell.set-value"></a>
```js
setValue(value: number | string | boolean | null): this;
```
Устанавливает значение клетки. Отрабатывает в момент вызова и мгновенно приводит к пересчёту зависимых клеток. Поэтому ***не*** рекомендуется к использованию в больших мультикубах. Возвращает `this`.

&nbsp;

<a name="cell.get-value"></a>
```js
getValue(): number | string | null;
```
Возвращает значение клетки, которое видит пользователь. Если клетка имеет логический формат, то возвращается строковое значение `'true'` или `'false'`.

&nbsp;

```js
getVisualValue(): string | null;
```
Возвращает отображаемое значение в ячейке, если куб в формате даты или справочника, для других форматов куба возвращает `null`.

&nbsp;

<a name="cell.get-native-value"></a>
```js
getNativeValue(): number | string | null;
```
Возвращает самородное значение клетки, зависящее от формата. Если клетка имеет формат справочника, то возвращается [`longId`](./common.md#long-id). 

В противном случае возвращает то же, что и [`getValue()`](#cell.get-value).

&nbsp;

<a name="cell.get-context-value"></a>
```js
getContextValue(): string | null;
```
Если ячейка имеет формат справочника, в настройках которого задано некоторое свойство `prop` в качестве отображаемого имени (опция `Отображение`), и для этой ячейки задано значение этого свойства, то возвращает строку, состоящую из имени, двойной вертикальной черты и значения свойства `prop`, например, `'#5||Берлин'`.

В противном случае возвращает `null`.

&nbsp;

```js
definitions(): number[];
```
То же, что и [`CubeCell.definitions()`](./cubeCell.md#cube-cell.definitions).

&nbsp;

```js
columns(): LabelsGroup | null;
```
Возвращает многоуровневый набор заголовков [`LabelsGroup`](#labels-group) конкретного столбца, или `null`, если у клетки нет измерений на столбцах.

&nbsp;

```js
rows(): LabelsGroup | null;
```
Возвращает многоуровневый набор заголовков [`LabelsGroup`](#labels-group) конкретной строки, или `null`, если у клетки нет измерений на строках.

&nbsp;

```js
dropDown(): Labels;
```
Возвращает набор заголовков строк [`Labels`](#labels) выпадающего списка, который в интерфейсе пользователя Optimacros можно получить кликом по треугольнику внутри ячейки. Эта функция считается неэффективной, так как выгружает справочник целиком. Лучше зайти в нужный справочник и итерироваться по нему.

&nbsp;

```js
getFormatType(): string;
```
Возвращает строку с форматом клетки. Возможные значения: `'NUMBER'`, `'BOOLEAN'`, 
`'ENTITY'`, `'TIME_ENTITY'`, `'LINE_ITEM_SUBSET'`, `'VERSION'`, `'TEXT'`, `'DATE'`, `'NONE'`.

&nbsp;

```js
isEditable(): boolean;
```
Возвращает признак возможности редактирования ячейки пользователем.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
