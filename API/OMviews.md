# Представления Optimacros

1. [Представления мультикубов, справочников, версий](#views)
1. [Экспорт из мультикубов и справочников](#export)
1. [Импорт в мультикубы и справочники](#import)
1. [Обновление клеток куба по формуле](#update)
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

&nbsp;

### Интерфейс MulticubesTab<a name="MulticubesTab"></a>
```ts
interface MulticubesTab extends Tab {
    open(name: string): MulticubeTab;
}
```
Интерфейс для получения ссылки на [`MulticubeTab`](#MulticubeTab). Интерфейс наследуется от [`Tab`](#Tab).

&nbsp;

```js
open(name: string): MulticubeTab
```
Возвращает ссылку на [`MulticubeTab`](#MulticubeTab) куба `name`. В интерфейсе Optimacros аналогично открытию вкладки мультикуба `name`.

&nbsp;

### Интерфейс Tab<a name="Tab"></a>
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

<a name="Tab.pivot"></a>
```js
pivot(viewName?: string): Pivot
```
Возвращает ссылку на объект [`Pivot`](#Pivot) представления `viewName` текущего мультикуба. Если `viewName` не задано, используется представление по умолчанию. Эта функция — ***единственный*** способ получить доступ к представлению мультикуба в скриптах 1.0. Возможность программно задать строки, колонки и фильтры для создания представления мультикуба [*отсутствует*](../appendix/constraints.md#pivot), поэтому для работы с нужным представлением через скрипт необходимо заранее создать и сохранить его вручную.

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

&nbsp;

```js
importer(): Importer
```
Возвращает ссылку на базовый интерфейс импорта [`Importer`](#Importer).

&nbsp;

```js
storageImporter(): StorageImporter
```
Возвращает ссылку на быстрый интерфейс импорта [`StorageImporter`](#StorageImporter).

&nbsp;

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

&nbsp;

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
Интерфейс позволяет добавить заданное количество элементов в заданную позицию таблицы. Аналог кнопки "Добавить элементы" в интерфейсе Optimacros. Перед созданием элементов необходимо указать их количество (нет значения по умолчанию) и позицию добавления (по умолчанию: в конец).

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
Устанавливает позицию добавления в конец, это поведение по умолчанию. Возвращает `this`.

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

&nbsp;

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

&nbsp;

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

&nbsp;

### Интерфейс MulticubeTab ...<a name="MulticubeTab"></a>
```ts
interface MulticubeTab extends Tab {
	cleanCellsData(cubesIdentifiers?: number[]): MulticubeTab;
	cubeCellSelector(identifier: string | number): CubeCellSelectorBuilder;
	cubeCellUpdater(identifier: string | number): CubeCellUpdaterBuilder;
	getCubeInfo(identifier: string | number): CubeInfo;
}
```
Вкладка мультикуба. Интерфейс наследуется от [`Tab`](#Tab).

&nbsp;

```js
cleanCellsData(cubesIdentifiers?: number[]): MulticubeTab
```

&nbsp;

```js
cubeCellSelector(identifier: string | number): CubeCellSelectorBuilder
```

&nbsp;

```js
cubeCellUpdater(identifier: string | number): CubeCellUpdaterBuilder
```
Возвращает интерфейс [`CubeCellUpdaterBuilder`](#CubeCellUpdaterBuilder) обновления клеток куба с именем или идентификатором `identifier` по формуле.

&nbsp;

```js
getCubeInfo(identifier: string | number): CubeInfo
```

&nbsp;

### Интерфейс Pivot<a name="Pivot"></a>
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
Устанавливает признак загрузки с сервера данных о мультикубе без значений ячеек. В этом случае функции интерфейса [`Cell`](#Cell) [`getValue()`](#getValue), [`getNativeValue()`](#getNativeValue) и [`getContextValue()`](#getContextValue) будут возвращать `null`, однако функции [`Cell`](#Cell).[`setValue()`](#Cell.setValue), [`Cells`](#Cells).[`setValue()`](#Cells.setValue) и [`CellBuffer`](./common.md#CellBuffer).[`apply()`](#apply) не теряют свою магическую силу. Возвращает `this`.

Эта функция существенно ускоряет работу с мультикубами в тех случаях, когда нужно записать данные, но не читать их.

&nbsp;

```js
addDependentContext(identifier: number): Pivot
```
Добавляет в фильтр по строкам весь зависимый контекст переданного [`longId`](#longId) `identifier`: материнские и дочерние элементы всех уровней.

Если эта функция многократно вызывается с аргументами, один из которых является потомком остальных (порядок вызовов не имеет значения), то это считается уточнением запроса, и результат будет равносилен однократному вызову с этим аргументом.

Возвращает `this`.

&nbsp;

### Интерфейс Grid<a name="Grid"></a>
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

Пример: `grid.range(0, -1, 0, -1)` означает захват всех ячеек таблицы.

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
Возвращает ссылку на интерфейс [`Exporter`](#Exporter) базового экспорта таблицы.

&nbsp;

```js
storageExporter(): StorageExporter
```
Возвращает ссылку на интерфейс [`StorageExporter`](#StorageExporter) быстрого экспорта таблицы.

&nbsp;

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

&nbsp;

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

&nbsp;

### Интерфейс GridPageSelector<a name="GridPageSelector"></a>
```ts
interface GridPageSelector extends GridDimension {
    getSelectedEntity(): EntityInfo | null;
}
```
Интерфейс предоставляет данные о фильтре мультикуба. (Ранее фильтры назывались `Page`). Интерфейс наследуется от [`GridDimension`](#GridDimension).

&nbsp;

```js
getSelectedEntity(): EntityInfo | null
```
Возвращает ссылку на [`EntityInfo`](#EntityInfo) выбранного элемента фильтра или `null`.

&nbsp;

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

Значение аргумента `size` ограничено снизу значением `500` и сверху значением `5000`, поэтому в скриптах 1.0 [`невозможно`](../appendix/constraints.md#generator) работать с `GridRange` с б*О*льшим количеством столбцов. Значение по умолчанию: `500`.

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

&nbsp;

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

&nbsp;

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

&nbsp;

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

&nbsp;

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

В случае плоской таблицы [`возвращает`](../appendix/constraints.md#flatTable) `null`.

&nbsp;

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

&nbsp;

### Интерфейс Cells<a name="Cells"></a>
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

<a name="chunkInstance"></a>
```js
chunkInstance(): GridRangeChunk
```
Возвращает обратную ссылку на [`GridRangeChunk`](#GridRangeChunk), из которого был получен `this`.

&nbsp;

```js
getByIndexes(indexes: number[]): Cells | null
```
Производит выборку из одномерного представления клеток объекта `this` по индексам `indexes` и возвращает новый объект [`Cells`](#Cells). В этом случае функция [`chunkInstance()`](#chunkInstance) для нового объекта будет возвращать ссылку на тот же самый объект [`GridRangeChunk`](#GridRangeChunk), что и для `this`. Это *единственный* способ создать объект непрямоугольный объект [`Cells`](#Cells).

&nbsp;

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

&nbsp;

### Интерфейс ListsTab<a name="ListsTab"></a>
```ts
interface ListsTab extends Tab {
	open(name: string): ListTab;
}
```
Интерфейс для получения ссылки на [`ListTab`](#ListTab). Интерфейс наследуется от [`Tab`](#Tab).

&nbsp;

```js
open(name: string): ListTab
```
Возвращает ссылку на [`ListTab`](#ListTab) справочника `name`. В интерфейсе Optimacros аналогично открытию вкладки справочника `name`.

&nbsp;

### Интерфейс ListTab<a name="ListTab"></a>
```ts
interface ListTab extends Tab {
	listSubsetTab(): ListSubsetsTab;
	importer(): ListImporter;
}
```
Вкладка справочника. Интерфейс наследуется от [`Tab`](#Tab).

&nbsp;

```js
listSubsetTab(): ListSubsetsTab
```
Возвращает ссылку на интерфейс [`ListSubsetsTab`](#ListSubsetsTab). В интерфейсе Optimacros аналогично открытию вкладки `Выборки` справочника `name`.

&nbsp;

```js
importer(): ListImporter
```
Возвращает интерфейс [`ListImporter`](#ListImporter) для импорта данных в справочник.

&nbsp;

### Интерфейс ListSubsetsTab<a name="ListSubsetsTab"></a>

```ts
interface ListSubsetsTab extends Tab {
	listTab(): ListTab;
}
```
Вкладка `Выборки` справочника. Интерфейс наследуется от [`Tab`](#Tab). В отличие от аналогичной вкладки в интерфейсе Optimacros, её [`Grid`](#Grid) не имеет ни измерений на столбцах, ни ячеек; доступ можно получить только к заголовкам строк, являющихся названиями выборок справочника.

&nbsp;

```js
listTab(): ListTab
```
Возвращает интерфейс [`ListTab`](#ListTab) вкладки того справочника, чьи выборки представляет собой `this`.

&nbsp;

### Интерфейс ListImporter<a name="ListImporter"></a>
```ts
interface ListImporter extends Importer {
	setFilePath(path: string): ListImporter;
	setObligatoryListCodes(obligatoryListCodes: boolean): ListImporter;
	getObligatoryListCodes(): boolean;
	setImportToChildListOnly(importToChildListOnly: boolean): ListImporter;
	getImportToChildListOnly(): boolean;
	setUpdatedPropertiesOnParentLevels(updatedPropertiesOnParentLevels: boolean): ListImporter;
	getUpdatedPropertiesOnParentLevels(): boolean;
}
```
Интерфейс импорта в справочник. Интерфейс наследуется от [`Importer`](#Importer).

&nbsp;

```js
setFilePath(path: string): ListImporter
```
Устанавливает имя импортируемого файла. Возвращает `this`.

&nbsp;

```js
setObligatoryListCodes(obligatoryListCodes: boolean): ListImporter
```
Устанавливает режим обязательных кодов: если столбец `Code` у элемента пустой, то несуществуещие элементы не будут создаваться, но уже существующие тем не менее будут обновлены. Значение по умолчанию: `false`. Возвращает `this`.

&nbsp;

```js
getObligatoryListCodes(): boolean
```
Возвращает признак режима обязательных кодов.

&nbsp;

```js
setImportToChildListOnly(importToChildListOnly: boolean): ListImporter
```
Устанавливает режим обновления свойств `Parent` и `Code` для элементов только текущего справочника. Если аргумент `importToChildListOnly === false`, эти свойства будут обновляться также и у родительских справочников любого уровня. Значение по умолчанию: `false`. Возвращает `this`.

&nbsp;

```js
getImportToChildListOnly(): boolean
```
Возвращает признак режима обновления свойств `Parent` и `Code` для элементов только текущего справочника.

&nbsp;

```js
setUpdatedPropertiesOnParentLevels(updatedPropertiesOnParentLevels: boolean): ListImporter
```
Устанавливает режим обновления собственных свойств для элементов родительских справочников. Значение по умолчанию: `true`. Возвращает `this`.

&nbsp;

```js
getUpdatedPropertiesOnParentLevels(): boolean
```
Возвращает признак режима обновления собственных свойств для элементов родительских справочников.

&nbsp;

### Интерфейс Versions<a name="Versions"></a>
```ts
interface Versions {
    versionsTab(): VersionsTab
}
```
Интерфейс для получения ссылки на [`VersionsTab`](#VersionsTab).

&nbsp;

```js
versionsTab(): VersionsTab
```
Возвращает ссылку на вкладку [`VersionsTab`](#VersionsTab) настроек версий. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Версии`.

&nbsp;

### Интерфейс VersionsTab<a name="VersionsTab"></a>
```ts
interface VersionsTab extends Tab {
    copyVersion(from: string, to: string): Object;
}
```
Вкладка `Версии`. Интерфейс наследуется от [`Tab`](#Tab). Для работы не требует открытия.

&nbsp;

```js
copyVersion(from: string, to: string): Object
```
Копирует срез по версии `from` в срез по версии `to` во всех мультикубах модели, которые имеют измерение версий, включающее обе эти версии. Возвращает объект вида `{"success": true}`.

&nbsp;

### Интерфейс Times<a name="Times"></a>
```ts
interface Times {
    optionsTab(): TimeOptionsTab;
}
```
Интерфейс для получения ссылки на [`TimeOptionsTab`](#TimeOptionsTab).

&nbsp;

```js
optionsTab(): TimeOptionsTab
```
Возвращает ссылку на вкладку [`TimeOptionsTab`](#TimeOptionsTab) настроек времени. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Время`.

&nbsp;

### Интерфейс TimeOptionsTab<a name="TimeOptionsTab"></a>
```ts
interface TimeOptionsTab {
    resetForm(): Object;
    applyForm(): Object;
}
```
Вкладка `Время`. Для работы не требует открытия. Является [`плоской таблицей`](../appendix/constraints.md#flatTable). Кроме того, является формой, аналогичной форме HTML: после изменения значений ячейки/ячеек требуется ещё вызвать функцию `applyForm()` для применения новых данных к модели.

&nbsp;

```js
resetForm(): Object
```
Сбрасывает все изменения данных во вкладке. Возвращает объект вида `{"success": true}`.

&nbsp;

```js
applyForm(): Object
```
Применяет все изменения данных. Возвращает объект вида `{"success": true}`.

&nbsp;

## Экспорт из мультикубов и справочников<a name="export"></a>

### Интерфейс Exporter<a name="Exporter"></a>
```ts
interface Exporter {
    setEncoding(encoding: string): Exporter;
    setFormat(format: string): Exporter;
    setOmitSummaryRows(omitSummaryRows: boolean): Exporter;
    setOmitEmptyRows(omitEmptyRows: boolean): Exporter;
    setIncludeCodes(includeCodes: boolean): Exporter;
    setMappingForFlexibleImport(mappingForFlexibleImport: boolean): Exporter;
    setMappingForAdvancedImport(mappingForAdvancedImport: boolean): Exporter;
    setFileName(fileName: string): Exporter;
    setDelimiter(delimiter: string): Exporter;
    setEnclosure(enclosure: string): Exporter;
    setEscape(escape: string): Exporter;
    setShowAliasesWithoutNames(showAliasesWithoutNames: boolean): Exporter;
    setUseCodeLikeLabels(useCodeLikeLabels: boolean): Exporter;
    export(): ExportResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), позволяет сформировать и вызвать запрос на базовый экспорт таблицы. Доступен для всех [`Grid`](#Grid). Все функции, кроме [`export()`](#Exporter.export), возвращают `this`.

&nbsp;

```js
setEncoding(encoding: string): Exporter
```
Устанавливает кодировку экспортируемого файла. Допустимые значения: 
`'win' ,'WIN', 'windows-1251', 'WINDOWS-1251', 'utf', 'UTF', 'utf-8', 'UTF-8'`. По умолчанию: `'UTF-8'`.

&nbsp;

```js
setFormat(format: string): Exporter
```
Устанавливает формат экспортируемого файла. Допустимые значения: `'csv', 'xls', 'xlsx', 'txt'`. По умолчанию: `'xlsx'`.

&nbsp;

```js
setOmitSummaryRows(omitSummaryRows: boolean): Exporter
```
Устанавливает флаг пропуска итоговых строк. По умолчанию: `false`.

&nbsp;

```js
setOmitEmptyRows(omitEmptyRows: boolean): Exporter
```
Устанавливает флаг пропуска пустых строк. По умолчанию: `false`.

&nbsp;

```js
setIncludeCodes(includeCodes: boolean): Exporter
```
Устанавливает флаг включения кодов для каждого измерения на строках. По умолчанию: `false`.

&nbsp;

```js
setMappingForFlexibleImport(mappingForFlexibleImport: boolean): Exporter
```
Устанавливает мэппинг для настраиваемого импорта. По умолчанию: `false`.

&nbsp;

```js
setMappingForAdvancedImport(mappingForAdvancedImport: boolean): Exporter
```
Устанавливает мэппинг для расширенного импорта. По умолчанию: `false`.

&nbsp;

```js
setFileName(fileName: string): Exporter
```
Устанавливает начальную часть имени экспортируемого файла. По умолчанию: `'view'`. Итоговое имя файла будет иметь вид `'{fileName}--YYYY.MM.DD--HH.mm.{format}'`.

&nbsp;

<a name="setDelimiter"></a>
```js
setDelimiter(delimiter: string): Exporter
```
Устанавливает разделитель полей. Допустимые значения: `,`, `;`, `\t`.  По умолчанию: `;`.

&nbsp;

<a name="setEnclosure"></a>
```js
setEnclosure(enclosure: string): Exporter
```
Устанавливает обрамляющий символ, которым будет обрамляться текстовое поле, если в нём содержится разделитель полей. Допустимые значения: `'` и `"`. По умолчанию: `"`.

&nbsp;

<a name="setEscape"></a>
```js
setEscape(escape: string): Exporter
```
Устанавливает символ для экранирования обрамляющего символа, если встретится в строке ещё и он, и символа переноса строки. Допустимые значения: `\` и `"`. По умолчанию равен обрамляющему символу.

&nbsp;

```js
setShowAliasesWithoutNames(showAliasesWithoutNames: boolean): Exporter
```
Устанавливает флаг показа псевдонимов без имён. Применимо только для значений справочников. По умолчанию: `false`.

&nbsp;

```js
setUseCodeLikeLabels(useCodeLikeLabels: boolean): Exporter
```
Устанавливает флаг показа кода вместо имён для тех элементов, у которых есть код. По умолчанию: `false`.

&nbsp;

<a name="Exporter.export"></a>
```js
export(): ExportResult
```
Производит экспорт представления в соответствии с настройками, регистрирует файл в [`глобальном реестре`](../appendix/glossary.md#globalFileRegistry) и возвращает ссылку на [`ExportResult`](#ExportResult).

&nbsp;

### Интерфейс StorageExporter<a name="StorageExporter"></a>

```ts
interface StorageExporter extends Exporter {
    setFormat(format: string): StorageExporter;
    setLineDelimiter(lineDelimiter: string): StorageExporter;
    setFilterFormula(filterFormula: string): StorageExporter;
    setDecimalSeparator(decimalSeparator: string): StorageExporter;
    setDateFormat(dateFormat: string): StorageExporter;
    setBooleanCubeIdentifier(booleanCubeIdentifier: number): StorageExporter;
}
```
Интерфейс быстрого экспорта. Доступен только в мультикубах. Интерфейс наследуется от [`Exporter`](#Exporter). В отличие от базового, формат выгрузки фиксирован и отличается от представления таблицы: в столбцах находятся измерения и кубы. Кроме того, вместо псевдонимов экспортируются только их имена. Все функции, кроме [`export()`](#Exporter.export), возвращают `this`.

&nbsp;

```js
setFormat(format: string): StorageExporter
```
Устанавливает формат экспортируемого файла. Допустимые значения: `'csv', 'txt', 'gz', 'zip'`. По умолчанию: `'csv'`.

&nbsp;

<a name="setLineDelimiter"></a>
```js
setLineDelimiter(lineDelimiter: string): StorageExporter
```
Устанавливает разделитель строк. По умолчанию: `\n`.

&nbsp;

```js
setFilterFormula(filterFormula: string): StorageExporter
```
Устанавливает булеву формулу, которая будет применяться в качестве аналога [`setBooleanCubeIdentifier()`](#setBooleanCubeIdentifier), но без создания булева куба.

&nbsp;

```js
setDecimalSeparator(decimalSeparator: string): StorageExporter
```
Устанавливает десятичный разделитель. Допустимые значения: `,`, `.`.  По умолчанию: `.`.

&nbsp;

<a name="StorageExporter.setDateFormat"></a>
```js
setDateFormat(dateFormat: string): StorageExporter
```
Устанавливает формат даты. Синтаксис формата такой же, как и в функции C++ [`std::put_time()`](https://en.cppreference.com/w/cpp/io/manip/put_time). Значение по умолчанию: `'%d.%m.%Y'`.

&nbsp;

<a name="setBooleanCubeIdentifier"></a>
```js
setBooleanCubeIdentifier(booleanCubeIdentifier: number): StorageExporter
```
Устанавливает идентификатор булева куба, который будет использоваться в качестве логического фильтра.

&nbsp;

### Интерфейс ExportResult<a name="ExportResult"></a>
```ts
interface ExportResult {
    mergeToExternalExcelSheet(toFile: string, toSheet: string, fromSheet?: string): ExportResult;
    getHash(): string | null;
    copyToLocal(path: string): ExportResult;
    moveToLocal(path: string): ExportResult;
}
```
Интерфейс для работы с результатом экспорта.

&nbsp;

```js
mergeToExternalExcelSheet(toFile: string, toSheet: string, fromSheet?: string): ExportResult
```
Если экспорт был в формате `'xls'` или `'xlsx'`, создаёт в файле Excel `toFile` новый лист `toSheet` и помещает в него результат экспорта.  Данные берутся с листа `fromSheet`, по умолчанию – с первого листа. Возращает `this`.

&nbsp;

```js
getHash(): string | null
```
Возвращает идентификатор файла в [`глобальном реестре`](../appendix/glossary.md#globalFileRegistry), или `null`, если файл там отсутствует. Как правило, используется для передачи в функцию [`ResultInfo.addFileHash()`](./common.md#ResultInfo.addFileHash).

&nbsp;


```js
copyToLocal(path: string): ExportResult
```
Копирует экспортированный файл в путь `path` в [`рабочей директории скрипта`](../appendix/glossary.md#scriptDir). Возвращает `this`.

&nbsp;

```js
moveToLocal(path: string): ExportResult
```
Перемещает экспортированный файл в путь `path` в [`рабочей директории скрипта`](../appendix/glossary.md#scriptDir) и убирает его из [`глобального реестра`](../appendix/glossary.md#globalFileRegistry). Возвращает `this`.

&nbsp;

## Импорт в мультикубы и справочники<a name="import"></a>

### Интерфейс CSVParams<a name="CSVParams"></a>
```ts
interface CSVParams {
    setDelimiter(delimiter: string): CSVParams;
    getDelimiter(): string;
    setEnclosure(enclosure: string): CSVParams;
    getEnclosure(): string;
    setEscape(escape: string): CSVParams;
    getEscape(): string;
    setLineDelimiter(escape: string): CSVParams;
    getLineDelimiter(): string;
}
```
Интерфейс настроек импорта из файла [`CSV`](https://ru.wikipedia.org/wiki/CSV).

&nbsp;

```js
setDelimiter(delimiter: string): CSVParams
```
Устанавливает разделитель полей. Аналогично `Exporter`.[`setDelimiter()`](#setDelimiter). Возвращает `this`.

&nbsp;

```js
getDelimiter(): string
```
Возвращает разделитель полей.

&nbsp;

```js
setEnclosure(enclosure: string): CSVParams
```
Устанавливает обрамляющий символ. Аналогично `Exporter`.[`setEnclosure()`](#setEnclosure). Возвращает `this`.

&nbsp;

```js
getEnclosure(): string
```
Возвращает обрамляющий символ.

&nbsp;

```js
setEscape(escape: string): CSVParams
```
Устанавливает символ для экранирования обрамляющего символа. Аналогично `Exporter`.[`setEscape()`](#setEscape). Возвращает `this`.

&nbsp;

```js
getEscape(): string
```
Возвращает символ для экранирования обрамляющего символа.

&nbsp;

```js
setLineDelimiter(escape: string): CSVParams
```
Устанавливает разделитель строк. Аналогично `StorageExporter`.[`setLineDelimiter()`](#setLineDelimiter). Возвращает `this`.

&nbsp;

```js
getLineDelimiter(): string
```
Возвращает разделитель строк.

&nbsp;

### Интерфейс Importer<a name="Importer"></a>
```ts
interface Importer {
    csv(): CSVParams;
    setFilePath(path: string): Importer;
    getFilePath(): string;
    getReportFilePath(): string | null;
    import(): Importer;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), позволяет сформировать и вызвать запрос на базовый импорт таблицы [`Grid`](#Grid). Доступен в мультикубах и в справочниках. Результатом импорта является файл отчёта.

&nbsp;

```js
csv(): CSVParams
```
Возвращает ссылку на интерфейс [`CSVParams`](#CSVParams), предоставляющий доступ к настройкам CSV. В случае импорта из Excel не имеет смысла.

&nbsp;

```js
setFilePath(path: string): Importer
```
Устанавливает имя импортируемого файла. Возвращает `this`.

&nbsp;

```js
getFilePath(): string
```
Возвращает имя импортируемого файла.

&nbsp;

```js
getReportFilePath(): string | null
```
Возвращает путь к файлу отчёта.

&nbsp;

```js
import(): Importer
```
Производит импорт в [`Grid`](#Grid) в соответствии с настройками. Возвращает `this`.

&nbsp;

### Интерфейс StorageImporter<a name="StorageImporter"></a>
```ts
interface StorageImporter extends Importer {
    setMaxFailures(maxFailures: number): StorageImporter;
    setIsCompressed(isCompressed: boolean): StorageImporter;
    setEncoding(encoding: string): StorageImporter;
    setDateFormat(dateFormat: string): StorageImporter;
}
```
Интерфейс быстрого импорта. Доступен только в мультикубах. Интерфейс наследуется от [`StorageImporter`](#StorageImporter). В отличие от базового, формат выгрузки фиксирован и отличается от представления таблицы: в столбцах находятся измерения и кубы. Кроме того, вместо псевдонимов экспортируются только их имена. Все функции возвращают `this`.

&nbsp;

```js
setMaxFailures(maxFailures: number): StorageImporter
```
Устанавливает количество ошибок, после которых попытка импорта прекращается. Уже импортированные значения при этом сохранятся. Значение по умолчанию: `0` (т. е. бесконечность).

&nbsp;

```js
setIsCompressed(isCompressed: boolean): StorageImporter
```
Устанавливает флаг `isCompressed`. Если он равен `true`, во время импорта будет происходить поточная деархивация упакованного в ZIP файла. Значение по умолчанию: `false`.

&nbsp;

```js
setEncoding(encoding: string): StorageImporter
```
Устанавливает кодировку. По умолчанию: `'UTF-8'`.

&nbsp;

```js
setDateFormat(dateFormat: string): StorageImporter
```
Устанавливает формат дат. Аналогично функции [`StorageExporter.setDateFormat()`](#StorageExporter.setDateFormat).

&nbsp;

## Обновление клеток куба по формуле<a name="update"></a>

### Интерфейс CubeCellUpdaterBuilder<a name="CubeCellUpdaterBuilder"></a>
```ts
interface CubeCellUpdaterBuilder {
	setConditionFormula(formula: string): this;
	setFormula(formula: string): this;
	load(): CubeCellUpdater;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для обновления клеток куба по формуле Optimacros.

&nbsp;

```js
setConditionFormula(formula: string): this
```
Устанавливает условную формулу, которая будет применяться к каждой клетке куба, и возвращать значение типа `Boolean`. Значение по умолчанию: `'TRUE'`. Возвращает `this`.

&nbsp;

```js
setFormula(formula: string): this
```
Устанавливает формулу в формате Optimacros, которая будет применяться к тем клеткам куба, на которых условная формула вернула значение `'TRUE'`, и возвращать для них значение, тип которого должен соответствовать формату куба. Значение по умолчанию отсутствует. Возвращает `this`.

&nbsp;

```js
load(): CubeCellUpdater
```
Устанавливает значения в клетках куба в соответствии с формулой и условной формулой, возвращает интерфейс [`CubeCellUpdater`](#CubeCellUpdater).

&nbsp;

### Интерфейс CubeCellUpdater<a name="CubeCellUpdater"></a>

```ts
interface CubeCellUpdater {
	getCount(): number;
}
```
Интерфейс получения результатов об обновлении клеток куба по формуле.

&nbsp;

```js
getCount(): number
```
Должна возвращать количество ячеек, модифицированных применением формулы. ***Не реализовано; возвращает `-1`.***

&nbsp;

## Получение клеток куба с помощью формулы<a name="get"></a>

&nbsp;

## Копирование срезов кубов<a name="copy"></a>




[API Reference](API.md)

[Оглавление](../README.md)
