# Представления

## Интерфейс Multicubes<a name="Multicubes"></a>
```ts
interface Multicubes {
	multicubesTab(): MulticubesTab;
	syncMulticube(): SyncMulticubeBuilder;
}
```
Интерфейс работы с мультикубами.

&nbsp;

```js
multicubesTab(): MulticubesTab
```
Возвращает ссылку на интерфейс [`MulticubesTab`](#MulticubesTab). В интерфейсе Optimacros аналогично открытию вкладки `Данные` -> `Мультикубы`.

&nbsp;

```js
syncMulticube(): SyncMulticubeBuilder
```
Возвращает интерфейс [`SyncMulticubeBuilder`](./sync.md#SyncMulticubeBuilder) синхронизации мультикубов.

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
Возвращает ссылку на [`MulticubeTab`](#MulticubeTab) куба `name`. Если такой мультикуб отсутствует, бросает исключение. В интерфейсе Optimacros аналогично открытию вкладки мультикуба `name`.

&nbsp;

## Интерфейс Tab<a name="Tab"></a>
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
Возвращает ссылку на [`Tab`](#Tab) по имени `name`. В интерфейсе Optimacros аналогично открытию вкладки `name`.

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
Возвращает ссылку на [`ElementsCreator`](./elementsManipulator.md#ElementsCreator) для добавления элементов.

&nbsp;

```js
elementsDeleter(): ElementsDeleter
```
Возвращает ссылку на [`ElementsDeleter`](./elementsManipulator.md#ElementsDeleter) для удаления элементов.

&nbsp;

```js
elementsReorder(): ElementsReorder
```
Возвращает ссылку на [`ElementsReorder`](./elementsManipulator.md#ElementsReorder) для тасования элементов.

&nbsp;

```js
importer(): Importer
```
Возвращает ссылку на базовый интерфейс импорта [`Importer`](./exportImport.md#Importer).

&nbsp;

```js
storageImporter(): StorageImporter
```
Возвращает ссылку на быстрый интерфейс импорта [`StorageImporter`](./exportImport.md#StorageImporter).

&nbsp;

### Интерфейс MulticubeTab<a name="MulticubeTab"></a>
```ts
interface MulticubeTab extends Tab {
	cleanCellsData(cubesIdentifiers?: number[]): MulticubeTab;
	cubeCellSelector(identifier: string | number): CubeCellSelectorBuilder;
	cubeCellUpdater(identifier: string | number): CubeCellUpdaterBuilder;
	getCubeInfo(identifier: string | number): CubeInfo;
	cubesTab(): CubesTab;
}
```
Вкладка мультикуба. Интерфейс наследуется от [`Tab`](#Tab).

&nbsp;

```js
cleanCellsData(cubesIdentifiers?: number[]): MulticubeTab
```
Очищает всё содержимое кубов `cubesIdentifiers` или весь мультикуб при вызове без параметров. Возвращает `this`.

&nbsp;

```js
cubeCellSelector(identifier: string | number): CubeCellSelectorBuilder
```
Возвращает интерфейс [`CubeCellSelectorBuilder`](./cubeCell.md#CubeCellSelectorBuilder) выборки клеток для куба `identifier`.

&nbsp;

```js
cubeCellUpdater(identifier: string | number): CubeCellUpdaterBuilder
```
Возвращает интерфейс [`CubeCellUpdaterBuilder`](./cubeCell.md#CubeCellUpdaterBuilder) обновления клеток куба с именем или идентификатором `identifier` по формуле.

&nbsp;

```js
getCubeInfo(identifier: string | number): CubeInfo
```
Возвращает интерфейс [`CubeInfo`](./cubeCell.md#CubeInfo) для получения информации о кубе `identifier`.

&nbsp;
```js
cubesTab(): CubesTab
```
Возвращает интерфейс [`CubesTab`](#CubesTab) доступа к режиму редактирования мультикуба.

&nbsp;

### Интерфейс CubesTab<a name="CubesTab"></a>
```ts
interface CubesTab extends Tab {
}
```
Интерфейс доступа к кубам мультикуба. В интерфейсе Optimacros аналогично открытию вкладки `Режим редактирования` мультикуба. Наследуется от интерфейса [`Tab`](#Tab). Реализован только метод [`pivot()`](#Tab.pivot), с помощью которого можно получить доступ на чтение и запись ячеек, но не на добавление/удаление/перемещение кубов.

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
Устанавливает признак загрузки с сервера данных о мультикубе без значений ячеек. В этом случае функции интерфейса [`Cell`](#Cell) [`getValue()`](#Cell.getValue), [`getNativeValue()`](#Cell.getNativeValue) и [`getContextValue()`](#getContextValue) будут возвращать `null`, однако функции [`Cell`](#Cell).[`setValue()`](#Cell.setValue), [`Cells`](#Cells).[`setValue()`](#Cells.setValue) и [`CellBuffer`](./common.md#CellBuffer).[`apply()`](#apply) не теряют свою магическую силу. Возвращает `this`.

Эта функция существенно ускоряет работу с мультикубами в тех случаях, когда нужно записать данные, но не читать их.

&nbsp;

```js
addDependentContext(identifier: number): Pivot
```
Добавляет в фильтр по строкам весь зависимый контекст переданного [`longId`](#longId) `identifier`: материнские и дочерние элементы всех уровней.

Если эта функция многократно вызывается с аргументами, один из которых является потомком остальных (порядок вызовов не имеет значения), то это считается уточнением запроса, и результат будет равносилен однократному вызову с этим аргументом.

Возвращает `this`.

&nbsp;

## Интерфейс Grid<a name="Grid"></a>
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
Возвращает ссылку на интерфейс [`Exporter`](./exportImport.md#Exporter) базового экспорта таблицы.

&nbsp;

```js
storageExporter(): StorageExporter
```
Возвращает ссылку на интерфейс [`StorageExporter`](./exportImport.md#StorageExporter) быстрого экспорта таблицы.

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

<a name="GridDefinitionInfo.getRowDimensions"></a>
```js
getRowDimensions(): GridDimension[]
```
Возвращает массив объектов с интерфейсом [`GridDimension`](#GridDimension), которые представляют метаданные о строках таблицы.

&nbsp;

<a name="GridDefinitionInfo.getColumnDimensions"></a>
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

Каждый возвращаемый [`GridRangeChunk`](#GridRangeChunk) содержит целое количество строк, т. е. все колонки `GridRange`, а количество строк в нём определяется по формуле `size / columnCount()`. Здесь используется целочисленное деление. Например, если в таблице `7` столбцов, а параметр `size` равен `100`, то генератор вернёт [`GridRangeChunk`](#GridRangeChunk) из `100 / 7 = 14` строк, в котором будет `7 * 14 = 98` ячеек.

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

## Интерфейс LabelsGroup<a name="LabelsGroup"></a>
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
Возвращает одномерный массив всех клеток [`Cell`](#Cell).

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

### Интерфейс Cell<a name="Cell"></a>
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
	isEditable(): boolean;
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

<a name="Cell.getValue"></a>
```js
getValue(): number | string | null
```
Возвращает значение клетки, которое видит пользователь.

&nbsp;

<a name="Cell.getNativeValue"></a>
```js
getNativeValue(): number | string | null
```
Возвращает самородное значение клетки, зависящее от формата. Если клетка имеет формат справочника, то возвращается [`longId`](#longId). 

В противном случае возвращает то же, что и [`getValue()`](#Cell.getValue).

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
То же, что и [`CubeCell.definitions()`](./cubeCell.md#CubeCell.definitions).

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
Возвращает строку с форматом клетки. Возможные значения: `'NUMBER'`, `'BOOLEAN'`, 
`'ENTITY'`, `'TIME_ENTITY'`, `'LINE_ITEM_SUBSET'`, `'VERSION'`, `'TEXT'`, `'DATE'`, `'NONE'`.

&nbsp;

```js
isEditable(): boolean
```
Возвращает признак возможности редактирования ячейки пользователем.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
