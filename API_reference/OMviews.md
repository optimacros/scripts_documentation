# Представления Optimacros

1. [Представления мультикубов, справочников, версий](#views)
1. [Экспорт из мультикубов и справочников](#export)
1. [Импорт в мультикубы и справочники](#import)
1. [Обновление клеток мультикубов через формулу](#update)
1. [Получение клеток куба с помощью формулы](#get)
1. [Копирование срезов кубов](#copy)

## Представления мультикубов, справочников, версий<a name="views"></a>

### Интерфейс Multicubes<a name="Multicubes"></a>
```ts
interface Multicubes {
    multicubesTab(): MulticubesTab;
}
```
Интерфейс для получения ссылки на [`MulticubesTab`](#MulticubesTab).

&nbsp;

```js
multicubesTab(): MulticubesTab
```
Возвращает ссылку на интерфейс [`MulticubesTab`](#MulticubesTab). В интерфейсе Optimacros аналогично открытию вкладки "Мультикубы".

### Интерфейс MulticubesTab<a name="MulticubesTab"></a>
```ts
interface MulticubesTab extends Tab {
    open(name: string): MulticubeTab;
}
```
Интерфейс для получения ссылки на [`MulticubeTab`](#MulticubeTab).

&nbsp;

```js
open(name: string): MulticubeTab
```
Возвращает ссылку на [`MulticubeTab`](#MulticubeTab) куба `name`. В интерфейсе Optimacros аналогично открытию вкладки мультикуба `name`.

### Интерфейс Tab ...<a name="Tab"></a>
```ts
interface Tab {
    open(name: string): Tab;
    pivot(viewName?: string): Pivot;
		
    elementsCreator(): ElementsCreator;
    elementsDeleter(): ElementsDeleter;
    elementsReorder(): ElementsReorder;
		
    importer(): Importer;
    storageImporter(): StorageImporter;
}
```
Базовый интерфейс для вкладок.

&nbsp;

```js
open(name: string): Tab
```
Абстрактная функция. Реализация в потомках.

&nbsp;

```js
pivot(viewName?: string): Pivot
```
Возвращает ссылку на объект [`Pivot`](#Pivot) представления `viewName` текущего мультикуба. Если `viewName` не задано, используется представление по умолчанию. Эта функция — ***единственный*** способ получить доступ к представлению мультикуба в скриптах 1.0. Возможность программно задать строки, колонки и фильтры для создания представления мультикуба в скриптах 1.0 [*отсутствует*](../appendix/constraints.md), поэтому для работы с нужным представлением через скрипт необходимо заранее создать и сохранить его вручную.

&nbsp;

```js
elementsCreator(): ElementsCreator
```
Возвращает ссылку на [`ElementsCreator`](#ElementsCreator) для добавления элементов.

&nbsp;

```js
elementsDeleter(): ElementsDeleter
```
Возвращает ссылку на [`ElementsDeleter`](#ElementsDeleter) для удаления элементов.

&nbsp;

```js
elementsReorder(): ElementsReorder
```
Возвращает ссылку на [`ElementsReorder`](#ElementsReorder) для тасования элементов.

### Интерфейс ElementsCreator<a name="ElementsCreator"></a>
```ts
interface ElementsCreator {
    numeric(): NumericElementsCreator;
}
```
Абстрактный интерфейс, предоставляющий конкретные интерфейсы с различными возможностями добавления элементов.

&nbsp;

```js
numeric(): NumericElementsCreator
```
Возращает ссылку на [`NumericElementsCreator`](#NumericElementsCreator).

### Интерфейс NumericElementsCreator<a name="NumericElementsCreator"></a>
```ts
interface NumericElementsCreator {
    setCount(count: number): NumericElementsCreator;
    setPositionAfter(relativeLongId: number): NumericElementsCreator;
    setPositionBefore(relativeLongId: number): NumericElementsCreator;
    setPositionStart(): NumericElementsCreator;
    setPositionEnd(): NumericElementsCreator;
    setPositionChildOf(parentLongId: number): NumericElementsCreator;
    create(): number[];
}
```
Интерфейс позволяет добавить заданное количество элементов в заданную позицию таблицы. Аналог кнопки "Добавить элементы" в интерфейсе Optimacros.

&nbsp;

```js
setCount(count: number): NumericElementsCreator
```
Устанавливает количество добавляемых элементов. Возвращает `this`.

&nbsp;

```js
setPositionAfter(relativeLongId: number): NumericElementsCreator
```
Устанавливает позицию добавления после [`relativeLongId`](#longId). Возвращает `this`.

&nbsp; 

```js
setPositionBefore(relativeLongId: number): NumericElementsCreator
```
Устанавливает позицию добавления до [`relativeLongId`](#longId). Возвращает `this`.

&nbsp;

```js
setPositionStart(): NumericElementsCreator
```
Устанавливает позицию добавления в начало. Возвращает `this`.

&nbsp;

```js
setPositionEnd(): NumericElementsCreator
```
Устанавливает позицию добавления в конец. Возвращает `this`.

&nbsp;

```js
setPositionChildOf(parentLongId: number): NumericElementsCreator
```
Устанавливает позицию добавления дочерней для [`parentLongId`](#longId). Возвращает `this`.

&nbsp;

```js
create(): number[]
```
Добавляет элементы и возвращает массив их [`longId`](#longId).

### Интерфейс ElementsDeleter<a name="ElementsDeleter"></a>
```ts
interface ElementsDeleter {
    appendIdentifier(identifier: number): ElementsDeleter;
    delete(): ElementsDeleter;
}
```
Интерфейс позволяет удалить элементы таблицы. Аналог кнопки "Удалить" в интерфейсе Optimacros.

&nbsp;

```js
appendIdentifier(identifier: number): ElementsDeleter
```
Добавляет в буфер элемент, чей [`longId`](#longId) равен `identifier`. Возращает `this`.

&nbsp;

```js
delete(): ElementsDeleter
```
Фактически удаляет все элементы в буфере из таблицы. Возвращает `this`.

### Интерфейс ElementsReorder<a name="ElementsReorder"></a>
```ts
interface ElementsReorder {
    append(longId: number, relativeLongId: number, position: string): ElementsReorder;
    reorder(): ElementsReorder;
    count(): number;
    reverse(): ElementsReorder;
}
```
Интерфейс позволяет перетасовать элементы и доступен только для элементов справочников. Во время работы хранит очередь элементов, которые функцией [`reorder()`](#reorder) будут переданы на сервер для перепозиционирования в порядке этой очереди.

Аналог кнопки "Переместить" в интерфейсе Optimacros. Но в отличие от интерфейса пользователя, в скриптах 1.0 изменение позиции элемента возможно только в пределах элементов с тем же родительским элементом. Поэтому для постановки элемента в конкретную позицию среди элементов с другим родительским, нужно сначала сменить родителя. Именно так и организован интерфейс пользователя: в таком случае он отправляет на сервер две команды.

&nbsp;

```js
append(longId: number, relativeLongId: number, position: string): ElementsReorder
```
Добавляет в очередь данные о [`longId`](#longId) элемента, который впоследствии будет позиционирован относительно элемента `relativeLongId`. Возвращает `this`. Способ позиционирования задаёт аргумент `position` (регистр имеет значение):

`'Before'` — непосредственно перед `relativeLongId`;

`'After'` — сразу за `relativeLongId`;

`'Start'` — в начало (значение `relativeLongId` нерелевантно);

`'End'` — в конец (значение `relativeLongId` нерелевантно).

&nbsp;

<a name="reorder"></a>
```js
reorder(): ElementsReorder
```
Передаёт на сервер данные для фактического перемещения их в модели и очищает буфер. Возвращает `this`.

&nbsp;

```js
count(): number
```
Возвращает количество элементов в очереди.

&nbsp;

```js
reverse(): ElementsReorder
```
Переворачивает очередь. Возвращает `this`.

### Интерфейс MulticubeTab ...<a name="MulticubeTab"></a>
```ts
interface MulticubeTab extends Tab {
    cleanCellsData(cubesIdentifiers?: number[]): MulticubeTab;
    cubeCellSelector(identifier: string | number): CubeCellSelectorBuilder;
    cubeCellUpdater(identifier: string | number): CubeCellUpdaterBuilder;
    getCubeInfo(identifier: string | number): CubeInfo;
}
```

### Интерфейс Pivot ...<a name="Pivot"></a>
```ts
interface Pivot {
    create(): Grid;
    rowsFilter(data: string | string[] | number | number[]): Pivot;
    columnsFilter(data: string | string[] | number | number[]): Pivot;
    withoutValues(): Pivot;
    addDependentContext(identifier: number): Pivot;
}
```
Интерфейс представления (сводной таблицы) мутилькуба. Функции интерфейса настраивают будущее отображение таблицы и ***не*** запрашивают данные мультикуба.

&nbsp;

```js
create(): Grid
```
Возвращает ссылку на [`Grid`](#Grid) настроенного представления мультикуба.

&nbsp;

<a name="rowsFilter"></a>
```js
rowsFilter(data: string | string[] | number | number[]): Pivot
```
Позволяет задать для отображения множество строк и скрыть остальные. Множество можно задать следующими способами:

`string` — название строки;

`string[]` — массив названий строк;

`number` — [`longId`](#longId) строки;

`number[]` — массив [`longId`](#longId) строк.

Возвращает `this`.

&nbsp;

```js
columnsFilter(data: string | string[] | number | number[]): Pivot
```
Аналог [`rowsFilter()`](#rowsFilter) для столбцов.

&nbsp;

```js
withoutValues(): Pivot
```
Устанавливает признак загрузки с сервера данных о мультикубе без значений ячеек. В этом случае функции интерфейса [`Cell`](#Cell) [`getValue()`](#getValue), [`getNativeValue()`](#getNativeValue) и [`getContextValue()`](#getContextValue) будут возвращать `null`, а функции [`Cell`](#Cell).[`setValue()`](#Cell.setValue), [`Cells`](#Cells).[`setValue()`](#Cells.setValue) и [`CellBuffer`](#CellBuffer).[`apply()`](#apply) не выполнять действий и не выдавать ошибок. Возвращает `this`.

&nbsp;

```js
addDependentContext(identifier: number): Pivot
```
Включает в фильтр по строкам весь зависимый контекст переданного [`longId`](#longId) `identifier`: материнские и дочерние элементы всех уровней. Возвращает `this`.

### Интерфейс Grid ...<a name="Grid"></a>
```ts
interface Grid {
    range(rowStart?: number, rowCount?: number, columnStart?: number, columnCount?: number): GridRange;

    rowCount(): number;
    columnCount(): number;
    cellCount(): number;

    getDefinitionInfo(): GridDefinitionInfo;
    exporter(): Exporter;
    storageExporter(): StorageExporter;
}
```
Интерфейс таблицы.

&nbsp;

<a name="range"></a>
```js
range(rowStart?: number, rowCount?: number, columnStart?: number, columnCount?: number): GridRange
```
Возвращает ссылку на объект с интерфейсом [`GridRange`](#GridRange), представляющий прямоугольный диапазон ячеек.

Аргументы `rowStart` и `columnStart` задают начальные номера строки и столбца соответственно. Значения по умолчанию: `0`.
Аргументы `rowCount` и `columnCount` задают количество строк и столбцов соответственно. Особое значение этих аргументов `-1` означает захват всех строк/столбцов до конца таблицы. Значения по умолчанию: `-1`.

Пример: `grid.range(0, -1, 0, -1)` означает захват всех ячеек таблицы в объект [`GridRange`](#GridRange).

&nbsp;

```js
rowCount(): number
```
Возвращает количество строк в таблице.

&nbsp;

```js
columnCount(): number
```
Возвращает количество колонок в таблице.

&nbsp;

```js
cellCount(): number
```
Возвращает количество ячеек в таблице. Эквивалентно `rowCount() * columnCount()`.

&nbsp;

```js
getDefinitionInfo(): GridDefinitionInfo
```
Возвращает ссылку на интерфейс [`GridDefinitionInfo`](#GridDefinitionInfo).

&nbsp;

```js
exporter(): Exporter
```
exporter() - нужен для того чтобы автоматически проитерироваться по этому гриду и проитерированные данные будут 
сохранены в файл

&nbsp;

```js
storageExporter(): StorageExporter
```

### Интерфейс GridDefinitionInfo<a name="GridDefinitionInfo"></a>
```ts
interface GridDefinitionInfo {
    getPageSelectors(): GridPageSelector[];
    getRowDimensions(): GridDimension[];
    getColumnDimensions(): GridDimension[];
}
```
Интерфейс, предоставляющий метаданные о таблице [`Grid`](#Grid).

&nbsp;

```js
getPageSelectors(): GridPageSelector[]
```
Возвращает массив объектов с интерфейсом [`GridPageSelector`](#GridPageSelector), которые представляют метаданные о фильтрах таблицы.

&nbsp;

```js
getRowDimensions(): GridDimension[]
```
Возвращает массив объектов с интерфейсом [`GridDimension`](#GridDimension), которые представляют метаданные о строках таблицы.

&nbsp;

```js
getColumnDimensions(): GridDimension[]
```
Возвращает массив объектов с интерфейсом [`GridDimension`](#GridDimension), которые представляют метаданные о столбцах таблицы.

### Интерфейс GridDimension<a name="GridDimension"></a>
```ts
interface GridDimension {
    getDimensionEntity(): EntityInfo;
}
```
Интерфейс предоставляет данные об измерении мультикуба.

&nbsp;

```js
getDimensionEntity(): EntityInfo
```
Возвращает ссылку на сущность [`EntityInfo`](#EntityInfo) измерения мультикуба.

### Интерфейс GridPageSelector<a name="GridPageSelector"></a>
```ts
interface GridPageSelector extends GridDimension {
    getSelectedEntity(): EntityInfo | null;
}
```
Интерфейс предоставляет данные о фильтре мультикуба. (Ранее фильтры назывались `Page`).

&nbsp;

```js
getSelectedEntity(): EntityInfo | null
```
Возвращает ссылку на [`EntityInfo`](#EntityInfo) выбранного элемента фильтра или `null`.

### Интерфейс GridRange<a name="GridRange"></a>
```ts
interface GridRange {
    rowStart(): number;
    rowCount(): number;

    columnStart(): number;
    columnCount(): number;

    cellCount(): number;

    generator(size?: number): GridRangeChunk[];
}
```
Интерфейс, представляющий прямоугольный диапазон ячеек в таблице [`Grid`](#Grid).

&nbsp;

```js
rowStart(): number
```
Возвращает номер первой строки.

&nbsp;

```js
rowCount(): number
```
Возвращает количество строк.

&nbsp;

```js
columnStart(): number
```
Возвращает номер первого столбца.

&nbsp;

<a name="GridRange.columnCount"></a>
```js
columnCount(): number
```
Возвращает количество столбцов.

&nbsp;

```js
cellCount(): number
```
Возвращает количество ячеек. Эквивалентно `rowCount() * columnCount()`.

&nbsp;

<a name="generator"></a>
```js
generator(size?: number): GridRangeChunk[]
```
Возвращает генератор, при каждом обращении возвращающий интерфейс [`GridRangeChunk`](#GridRangeChunk) размером *не более* `size` ячеек, позволяющий обрабатывать `GridRange` покусочно.

Каждый возвращаемый [`GridRangeChunk`](#GridRangeChunk) содержит целое количество строк, т. е. все колонки `GridRange`, а количество строк в нём определяется по формуле `size / columnCount()`.

Значение аргумента `size` ограничено снизу значением `500` и сверху значением `5000`, поэтому в скриптах 1.0 [`невозможно`](../appendix/constraints.md) работать с `GridRange` с б*О*льшим количеством столбцов. Значение по умолчанию: `500`.

Типичный пример использования:

```js
let rowIndex = 0;

for (const chunk of range.generator(1000)) {
    chunk.rows().all().forEach(labelGroup => {
        const rowLabels = [];
        labelGroup.all().forEach(label => {
            rowLabels.push(label.label());
        });

        console.log(`Row index ${rowIndex} (${rowLabels.join(', ')})\n`);
        rowIndex++;
    });
}
```

### Интерфейс GridRangeChunk<a name="GridRangeChunk"></a>
```ts
interface GridRangeChunk {
    cells(): Cells;
    rows(): Labels;
    columns(): Labels;
}
```
Интерфейс для обработки куска [`GridRange`](#GridRange).

&nbsp;

```js
cells(): Cells
```
Возвращает ссылку на набор ячеек [`Cells`](#Cells) текущего куска.

&nbsp;

```js
rows(): Labels
```
Возвращает интерфейс [`Labels`](#Labels), представляющий заголовки строк.

&nbsp;

```js
columns(): Labels
```
Возвращает интерфейс [`Labels`](#Labels), представляющий заголовки столбцов.


### Интерфейс EntityInfo (Label)<a name="EntityInfo"></a> <a name="Label"></a>
```ts
interface Label {
    longId(): number;
    name(): string;
    code(): string | null;
    alias(): string | null;
    label(): string | null;
    parentLongId(): number;
}

interface EntityInfo = Label;
```
Интерфейс сущности. Как правило, представляет собой один из заголовков строки или столбца.

&nbsp;

<a name="longId"></a>
```js
longId(): number
```
Возвращает внутренний идентификатор сущности в системе, уникальный в пределах модели.

&nbsp;

<a name="Label.name"></a>
```js
name(): string
```
Возвращает имя сущности.

&nbsp;

```js
code(): string
```
Возвращает код сущности. В Optimacros всего две сущности могут иметь код: элементы справочников и кубы.

&nbsp;

<a name="alias"></a>
```js
alias(): string | null
```
Возвращает отображаемое имя.

Если `this` является сущностью элемента справочника, в настройках которого задано некоторое свойство в качестве отображаемого имени (опция `Отображение`), и для этой сущности задано значение этого свойства, то возвращает значение этого свойства.

Иначе возвращает [`name()`](#Label.name).

&nbsp;

```js
label(): string | null
```
То же, что и [`alias()`](#alias).

&nbsp;

```js
parentLongId(): number
```
Если сущность является элементом, у которого есть родительский элемент, то возвращает [`longId`](#longId) сущности родителя.

Если родительской сущности нет, возвращает `-1`.

### Интерфейс Labels<a name="Labels"></a>
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
Интерфейс, представляющий набор объектов [`LabelsGroup`](#LabelsGroup), то есть набор заголовков строк/столбцов с их возможно многоуровневой структурой. Как правило, его можно получить функциями интерфейса [`GridRangeChunk`](#GridRangeChunk).

&nbsp;

```js
start(): number
```
Возвращает номер первой строки/столбца текущего [`GridRangeChunk`](#GridRangeChunk) в таблице [`Grid`](#Grid).

&nbsp;

```js
count(): number
```
Возвращает количество строк/столбцов в наборе.

Если `this` относится к строкам, то это значение, которое было посчитано в функции [`GridRange`](#GridRange).[`generator(size)`](#generator) на основе аргумента `size`.

Если `this` относится к столбцам, то это в точности значение аргумента `columnCount` функции [`Grid`](#Grid).[`range(rowStart, rowCount, columnStart, columnCount)`](#range).

&nbsp;

```js
all(): LabelsGroup[]
```
Возвращает набор объектов заголовков каждой строки/столбца[`LabelsGroup`](#LabelsGroup) в виде массива.

&nbsp;


```js
get(index: number): LabelsGroup | null
```
Аналог `all()[index]`.

&nbsp;

```js
chunkInstance(): GridRangeChunk
```
Возвращает обратную ссылку на [`GridRangeChunk`](#GridRangeChunk), из которого был получен `this`.

&nbsp;

```js
findLabelByLongId(longId: number): Label | null
```
Возвращает объект [`Label`](#Label) по его [`longId`](#longId), если он присутствует в `this`, иначе — `null`.

### Интерфейс LabelsGroup<a name="LabelsGroup"></a>
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
all(): Label[]
```
Возвращает массив конкретных заголовков [`Label`](#Label).

&nbsp;

```js
first(): Label
```
Аналог `all()[0]`.

&nbsp;

```js
cells(): Cells
```
Возвращает интерфейс [`Cells`](#Cells), предоставляющий доступ к ячейкам данной строки или столбца.

### Интерфейс Cell ...<a name="Cell"></a>
```ts
interface Cell {
    setValue(value: number | string | null);
    getValue(): number | string | null;
    getNativeValue(): number | string | null;
    getContextValue(): string | null;

    definitions(): number[];
    columns(): LabelsGroup;
    rows(): LabelsGroup;
    dropDown(): Labels;
    getFormatType(): string;
}
```
Интерфейс, представляющий клетку таблицы.

&nbsp;

<a name="Cell.setValue"></a>
```js
setValue(value: number | string | null)
```
Устанавливает значение клетки. Отрабатывает в момент вызова и мгновенно приводит к пересчёту зависимых клеток. Поэтому ***не*** рекомендуется к использованию в больших мультикубах.

&nbsp;

<a name="getValue"></a>
```js
getValue(): number | string | null
```
Возвращает значение клетки, которое видит пользователь.

&nbsp;

<a name="getNativeValue"></a>
```js
getNativeValue(): number | string | null
```
Возвращает самородное значение клетки, зависящее от формата. Если клетка имеет формат справочника, то возвращается [`longId`](#longId). 

В противном случае возвращает то же, что и [`getValue()`](#getValue).

&nbsp;

<a name="getContextValue"></a>
```js
getContextValue(): string | null
```
Если ячейка имеет формат справочника, в настройках которого задано некоторое свойство `prop` в качестве отображаемого имени (опция `Отображение`), и для этой ячейки задано значение этого свойства, то возвращает строку, состоящую из имени, двойной вертикальной черты и значения свойства `prop`, например, `'#5||Берлин'`.

В противном случае возвращает `null`.

&nbsp;

```js
definitions(): number[]
```

&nbsp;

```js
columns(): LabelsGroup
```
Возвращает многоуровневый набор заголовков [`LabelsGroup`](#LabelsGroup) конкретного столбца.

&nbsp;

```js
rows(): LabelsGroup
```
Возвращает многоуровневый набор заголовков [`LabelsGroup`](#LabelsGroup) конкретной строки.

&nbsp;

```js
dropDown(): Labels
```
Возвращает набор заголовков строк [`Labels`](#Labels) выпадающего списка, который в интерфейсе пользователя Optimacros можно получить кликом по треугольнику внутри ячейки. Эта функция считается неэффективной, так как выгружает справочник целиком. Лучше зайти в нужный справочник и итерироваться по нему.

&nbsp;

```js
getFormatType(): string
```

### Интерфейс Cells ...<a name="Cells"></a>
```ts
interface Cells {
    all(): Cell[];
    first(): Cell;
    setValue(value: number | string | null);
    count(): number;
    chunkInstance(): GridRangeChunk;
    getByIndexes(indexes: number[]): Cells | null;
}
```
Интерфейс, представляющий (как правило, прямоугольный) набор клеток таблицы.

&nbsp;

```js
all(): Cell[]
```
Возвращает одномерный массив всех клеток.

&nbsp;

```js
first(): Cell
```
Аналог `all()[0]`.

&nbsp;

<a name="Cells.setValue"></a>
```js
setValue(value: number | string | null)
```
Устанавливает одно и то же значение для всех клеток. Отрабатывает в момент вызова и мгновенно приводит к пересчёту зависимых от них клеток. Поэтому ***не*** рекомендуется к использованию в больших мультикубах.

&nbsp;

```js
count(): number
```
Возвращает количество клеток в наборе.

&nbsp;

```js
chunkInstance(): GridRangeChunk
```
Возвращает обратную ссылку на [`GridRangeChunk`](#GridRangeChunk), из которого был получен `this`.

&nbsp;

```js
getByIndexes(indexes: number[]): Cells | null
```
Производит выборку из одномерного представления клеток объекта `this` по индексам `indexes` и возвращает новый объект [`Cells`](#Cells). Это *единственный* способ создать объект непрямоугольный объект [`Cells`](#Cells).

### Интерфейс CellBuffer ...<a name="CellBuffer"></a>
```ts
interface CellBuffer {
    set(cell: Cell | CubeCell, value: number | string | null): CellBuffer;
    apply(): CellBuffer;
    count(): number;
    canLoadCellsValues(value: boolean): CellBuffer;
}
```
Буфер, куда можно временно поместить значения набора ячеек, не обязательно смежных, чтобы изменить их перед отправкой на сервер.

При модификации большого количества клеток (от нескольких сотен тысяч), рекомендуется пользоваться импортом CSV.

&nbsp;

```js
set(cell: Cell | CubeCell, value: number | string | null): CellBuffer
```
Устанавливает значение `value` в клетку `cell` в буфере. Возвращает `this`.

&nbsp;

<a name="apply"></a>
```js
apply(): CellBuffer
```
Передаёт на сервер значения всех клеток для присваивания в модели и очищает буфер. Перед присваиванием сервер может их обработать и выставить другие значение, например, после установки в ячейку формата даты строки `'2019-03-01'` впоследствии из неё будет считана строка `'1 Mar 19'`. Возвращает `this`.

&nbsp;

```js
count()
```
Возвращает количество ячеек в буфере.

&nbsp;

```js
canLoadCellsValues(value: boolean): CellBuffer
```
Устанавливает значение `value`, указывающее, нужно ли перезагружать значения клеток в буфере, если они изменятся. Возвращает `this`.

По умолчанию: `true`. Однако такое поведение сохранено лишь для обратной совместимости, оно приводит к деградации производительности. Поэтому рекомендуется сразу после инициализации объекта вызывать эту функцию и передавать `false`.

### Интерфейс Lists<a name="Lists"></a>
```ts
interface Lists {
    listsTab(): ListsTab
}
```
Интерфейс для получения ссылки на [`ListsTab`](#ListsTab).

&nbsp;

```js
listsTab(): ListsTab
```
Возвращает ссылку на интерфейс [`ListsTab`](#ListsTab). В интерфейсе Optimacros аналогично открытию вкладки "Справочники".

### Интерфейс ListsTab<a name="ListsTab"></a>
```ts
interface ListsTab extends Tab {
    open(name: string): ListTab;
}
```
Возвращает ссылку на [`ListTab`](#ListTab) справочника `name`. В интерфейсе Optimacros аналогично открытию вкладки справочника `name`.

### Интерфейс ListTab ...<a name="ListTab"></a>
```ts
interface ListTab extends Tab {
    listSubsetTab(): ListSubsetsTab
    importer(): ListImporter;
}
```

## Экспорт из мультикубов и справочников<a name="export"></a>

## Импорт в мультикубы и справочники<a name="import"></a>

## Обновление клеток мультикубов через формулу<a name="update"></a>

## Получение клеток куба с помощью формулы<a name="get"></a>

## Копирование срезов кубов<a name="copy"></a>




[API Reference](API_reference.md)

[Оглавление](../README.md)
