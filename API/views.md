# Представления

## Интерфейс Multicubes<a name="multicubes"></a>
```ts
interface Multicubes {
	multicubesTab(): MulticubesTab;
	syncMulticube(): SyncMulticubeBuilder;
}
```
Интерфейс работы с мультикубами.

&nbsp;

```js
multicubesTab(): MulticubesTab;
```
Возвращает ссылку на интерфейс [`MulticubesTab`](#multicubes-tab). В интерфейсе Optimacros аналогично открытию вкладки `Данные` -> `Мультикубы`.

&nbsp;

```js
syncMulticube(): SyncMulticubeBuilder;
```
Возвращает интерфейс [`SyncMulticubeBuilder`](./sync.md#sync-multicube-builder) синхронизации мультикубов.

&nbsp;

### Интерфейс MulticubesTab<a name="multicubes-tab"></a>
```ts
interface MulticubesTab extends Tab {
	open(name: string): MulticubeTab;

	elementsCreator(): ElementsCreator;
	elementsDeleter(): ElementsDeleter;
	elementsReorder(): ElementsReorder;
}
```
Вкладка `Мультикубы`. Интерфейс наследуется от [`Tab`](#tab).

&nbsp;

```js
open(name: string): MulticubeTab;
```
Возвращает ссылку на [`MulticubeTab`](#multicube-tab) мультикуба `name`. Если такой мультикуб отсутствует, бросает исключение. В интерфейсе Optimacros аналогично открытию вкладки мультикуба `name`.

&nbsp;

```js
elementsCreator(): ElementsCreator;
```
Возвращает ссылку на [`ElementsCreator`](./elementsManipulator.md#elements-creator) для добавления мультикубов.

&nbsp;

```js
elementsDeleter(): ElementsDeleter;
```
Возвращает ссылку на [`ElementsDeleter`](./elementsManipulator.md#elements-deleter) для удаления мультикубов.

&nbsp;

```js
elementsReorder(): ElementsReorder;
```
Возвращает ссылку на [`ElementsReorder`](./elementsManipulator.md#elements-reorder) для тасования мультикубов.

&nbsp;

## Интерфейс Tab<a name="tab"></a>
```ts
interface Tab {
	pivot(viewName?: string): Pivot;
}
```
Базовый интерфейс для вкладок.

&nbsp;

<a name="tab.pivot"></a>
```js
pivot(viewName?: string): Pivot;
```
Возвращает ссылку на объект [`Pivot`](#pivot) представления `viewName`. Если `viewName` не задано, используется представление по умолчанию. Эта функция — ***единственный*** способ получить доступ к представлению мультикуба или справочника в скриптах 1.0. Возможность программно задать строки, колонки и фильтры для создания представления мультикуба [*отсутствует*](../appendix/constraints.md#pivot), поэтому для работы с нужным представлением через скрипт необходимо заранее создать и сохранить его вручную.

&nbsp;

### Интерфейс MulticubeTab<a name="multicube-tab"></a>
```ts
interface MulticubeTab extends Tab {
	cleanCellsData(cubesIdentifiers?: number[]): this;
	cubeCellSelector(identifier: string | number): CubeCellSelectorBuilder;
	cubeCellUpdater(identifier: string | number): CubeCellUpdaterBuilder;

	getCubeInfo(identifier: string | number): CubeInfo;
	cubesTab(): CubesTab;

	importer(): MulticubeImporter;
	storageImporter(): StorageImporter;
}
```
Вкладка мультикуба. Интерфейс наследуется от [`Tab`](#tab).

&nbsp;

```js
cleanCellsData(cubesIdentifiers?: number[]): this;
```
Очищает всё содержимое кубов `cubesIdentifiers` или весь мультикуб при вызове без параметров. Возвращает `this`.

&nbsp;

```js
cubeCellSelector(identifier: string | number): CubeCellSelectorBuilder;
```
Возвращает интерфейс [`CubeCellSelectorBuilder`](./cubeCell.md#cube-cell-selector-builder) выборки клеток для куба `identifier`. `identifier` должен быть именем или [`longId`](./readingGrid.md#long-id) куба. При указании некорректного `identifier` выбрасывается исключение.

&nbsp;

```js
cubeCellUpdater(identifier: string | number): CubeCellUpdaterBuilder;
```

Возвращает интерфейс [`CubeCellUpdaterBuilder`](./cubeCell.md#cube-cell-updater-builder) обновления клеток куба с именем или идентификатором `identifier` по формуле. `identifier` должен быть именем или [`longId`](./readingGrid.md#long-id) куба. При указании некорректного `identifier` выбрасывается исключение.

&nbsp;

```js
getCubeInfo(identifier: string | number): CubeInfo;
```
Возвращает интерфейс [`CubeInfo`](./cubeCell.md#cube-info) для получения информации о кубе `identifier`. `identifier` должен быть именем или [`longId`](./readingGrid.md#long-id) куба. При указании некорректного `identifier` выбрасывается исключение.

&nbsp;

```js
cubesTab(): CubesTab;
```
Возвращает интерфейс [`CubesTab`](#cubes-tab) доступа к режиму редактирования мультикуба.

&nbsp;

```js
importer(): MulticubeImporter;
```
Возвращает интерфейс [`MulticubeImporter`](./exportImport.md#multicube-importer) для импорта данных в мультикуб.

&nbsp;

```js
storageImporter(): StorageImporter;
```
Возвращает интерфейс [`storageImporter`](./exportImport.md#storage-importer) для быстрого импорта данных в мультикуб.

&nbsp;

### Интерфейс CubesTab<a name="cubes-tab"></a>
```ts
interface CubesTab extends Tab {
	elementsCreator(): ElementsCreator;
	elementsDeleter(): ElementsDeleter;
	elementsReorder(): ElementsReorder;
}
```
Интерфейс доступа к кубам мультикуба. В интерфейсе Optimacros аналогично открытию вкладки `Режим редактирования` мультикуба. Наследуется от интерфейса [`Tab`](#tab).

&nbsp;

```js
elementsCreator(): ElementsCreator;
```
Возвращает ссылку на [`ElementsCreator`](./elementsManipulator.md#elements-creator) для добавления кубов.

&nbsp;

```js
elementsDeleter(): ElementsDeleter;
```
Возвращает ссылку на [`ElementsDeleter`](./elementsManipulator.md#elements-deleter) для удаления кубов.

&nbsp;

```js
elementsReorder(): ElementsReorder;
```
Возвращает ссылку на [`ElementsReorder`](./elementsManipulator.md#elements-reorder) для тасования кубов.

&nbsp;

### Интерфейс Pivot<a name="pivot"></a>
```ts
interface Pivot {
	create(): Grid;
	rowsFilter(data: string | string[] | number | number[]): this;
	columnsFilter(data: string | string[] | number | number[]): this;
	withoutValues(): this;
	addDependentContext(identifier: number): this;
}
```
Интерфейс представления (сводной таблицы). Функции интерфейса настраивают будущее отображение таблицы и ***не*** запрашивают данные.

&nbsp;

```js
create(): Grid;
```
Возвращает ссылку на [`Grid`](#grid) настроенного представления.

&nbsp;

<a name="rows-filter"></a>
```js
rowsFilter(data: string | string[] | number | number[]): this;
```
Функция работает, если в представлении на строках присутствует только одно измерение. Позволяет задать для отображения множество строк и скрыть остальные. Множество можно задать следующими способами:

`string` — название строки;

`string[]` — массив названий строк;

`number` — [`longId`](./readingGrid.md#long-id) строки;

`number[]` — массив [`longId`](./readingGrid.md#long-id) строк.

Возвращает `this`.

&nbsp;

```js
columnsFilter(data: string | string[] | number | number[]): this;
```
Аналог [`rowsFilter()`](#rows-filter) для столбцов.

&nbsp;

```js
withoutValues(): this;
```
Устанавливает признак загрузки с сервера данных без значений ячеек. В этом случае функции интерфейса [`Cell`](./readingGrid.md#cell) [`getValue()`](./readingGrid.md#cell.get-value), [`getNativeValue()`](./readingGrid.md#cell.get-native-value) и [`getContextValue()`](./readingGrid.md#get-context-value) будут возвращать `null`, однако функции [`Cell`](./readingGrid.md#cell).[`setValue()`](./readingGrid.md#cell.set-value), [`Cells`](./readingGrid.md#cells).[`setValue()`](./readingGrid.md#cells.set-value) и [`CellBuffer`](./common.md#cell-buffer).[`apply()`](./common.md#cell-buffer.apply) не теряют свою магическую силу. Возвращает `this`.

Эта функция существенно ускоряет работу в тех случаях, когда нужно записать данные, но не читать их.

&nbsp;

<a name="add-dependent-context"></a>
```js
addDependentContext(identifier: number): this;
```
Добавляет в фильтр по строкам весь зависимый контекст переданного [`longId`](./readingGrid.md#long-id) `identifier`: материнские и дочерние элементы всех уровней.

Если эта функция многократно вызывается с аргументами, один из которых является потомком остальных (порядок вызовов не имеет значения), то это считается уточнением запроса, и результат будет равносилен однократному вызову с этим аргументом.

Если для полученного [`Grid`](#grid) установлен фильтр [`GridPageSelector`](#grid-page-selector) (или несколько), а `identifier` — это [`longId`](./readingGrid.md#long-id) элемента измерения одного из этих фильтров, то в соответствующем фильтре будет программно установлен этот элемент.

Возвращает `this`.

&nbsp;

## Интерфейс Grid<a name="grid"></a>
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
range(rowStart?: number, rowCount?: number, columnStart?: number, columnCount?: number): GridRange;
```
Возвращает ссылку на объект с интерфейсом [`GridRange`](#grid-range), представляющий прямоугольный диапазон ячеек.

Аргументы `rowStart` и `columnStart` задают начальные номера строки и столбца соответственно. Значения по умолчанию: `0`.
Аргументы `rowCount` и `columnCount` задают количество строк и столбцов соответственно. Особое значение этих аргументов `-1` означает захват всех строк/столбцов до конца таблицы. Значения по умолчанию: `-1`.

Пример: `grid.range(0, -1, 0, -1)` означает захват всех ячеек таблицы.

&nbsp;

```js
rowCount(): number;
```
Возвращает количество строк в таблице.

&nbsp;

```js
columnCount(): number;
```
Возвращает количество колонок в таблице.

&nbsp;

```js
cellCount(): number;
```
Возвращает количество ячеек в таблице. Эквивалентно `rowCount() * columnCount()`.

&nbsp;

```js
getDefinitionInfo(): GridDefinitionInfo;
```
Возвращает ссылку на интерфейс [`GridDefinitionInfo`](#grid-definition-info).

&nbsp;

```js
exporter(): Exporter;
```
Возвращает ссылку на интерфейс [`Exporter`](./exportImport.md#exporter) базового экспорта таблицы.

&nbsp;

```js
storageExporter(): StorageExporter;
```
Возвращает ссылку на интерфейс [`StorageExporter`](./exportImport.md#storage-exporter) быстрого экспорта таблицы.

&nbsp;

### Интерфейс GridDefinitionInfo<a name="grid-definition-info"></a>
```ts
interface GridDefinitionInfo {
	getPageSelectors(): GridPageSelector[];
	getRowDimensions(): GridDimension[];
	getColumnDimensions(): GridDimension[];
}
```
Интерфейс, предоставляющий метаданные о таблице [`Grid`](#grid).

&nbsp;

```js
getPageSelectors(): GridPageSelector[];
```
Возвращает массив объектов с интерфейсом [`GridPageSelector`](#grid-page-selector), которые представляют метаданные о фильтрах таблицы.

&nbsp;

<a name="grid-definition-info.get-row-dimensions"></a>
```js
getRowDimensions(): GridDimension[];
```
Возвращает массив объектов с интерфейсом [`GridDimension`](#grid-dimension), которые представляют метаданные о строках таблицы.

&nbsp;

<a name="grid-definition-info.get-column-dimensions"></a>
```js
getColumnDimensions(): GridDimension[];
```
Возвращает массив объектов с интерфейсом [`GridDimension`](#grid-dimension), которые представляют метаданные о столбцах таблицы.

&nbsp;

### Интерфейс GridDimension<a name="grid-dimension"></a>
```ts
interface GridDimension {
	getDimensionEntity(): EntityInfo;
}
```
Интерфейс предоставляет данные об измерении мультикуба.

&nbsp;

```js
getDimensionEntity(): EntityInfo;
```
Возвращает ссылку на сущность [`EntityInfo`](#entity-info) измерения мультикуба.

&nbsp;

### Интерфейс GridPageSelector<a name="grid-page-selector"></a>
```ts
interface GridPageSelector extends GridDimension {
	getSelectedEntity(): EntityInfo | null;
}
```
Интерфейс предоставляет данные о фильтре мультикуба. (Ранее фильтры назывались `Page`). Интерфейс наследуется от [`GridDimension`](#grid-dimension). Программно задать значение фильтра позволяет функция [`Pivot`](#pivot).[`addDependentContext()`](#add-dependent-context).

&nbsp;

```js
getSelectedEntity(): EntityInfo | null;
```
Возвращает ссылку на [`EntityInfo`](#entity-info) выбранного элемента фильтра или `null`.

&nbsp;

### Интерфейс GridRange<a name="grid-range"></a>
```ts
interface GridRange {
	rowStart(): number;
	rowCount(): number;

	columnStart(): number;
	columnCount(): number;

	cellCount(): number;

	generator(size?: number): IterableIterator<GridRangeChunk>;
}
```
Интерфейс, представляющий прямоугольный диапазон ячеек в таблице [`Grid`](#grid).

&nbsp;

```js
rowStart(): number;
```
Возвращает номер первой строки.

&nbsp;

```js
rowCount(): number;
```
Возвращает количество строк.

&nbsp;

```js
columnStart(): number;
```
Возвращает номер первого столбца.

&nbsp;

<a name="grid-range.column-count"></a>
```js
columnCount(): number;
```
Возвращает количество столбцов.

&nbsp;

```js
cellCount(): number;
```
Возвращает количество ячеек. Эквивалентно `rowCount() * columnCount()`.

&nbsp;

<a name="generator"></a>
```js
generator(size?: number): IterableIterator<GridRangeChunk>;
```
Возвращает генератор, при каждом обращении возвращающий интерфейс [`GridRangeChunk`](#grid-range-chunk) размером *не более* `size` ячеек, позволяющий обрабатывать `GridRange` покусочно.

Каждый возвращаемый [`GridRangeChunk`](#grid-range-chunk) содержит целое количество строк, т. е. все колонки `GridRange`, а количество строк в нём определяется по формуле `size / columnCount()`. Здесь используется целочисленное деление с округлением в большую сторону. Например, если в таблице `14` столбцов, а параметр `size` равен `1500`, то генератор вернёт [`GridRangeChunk`](#grid-range-chunk) из `1500 / 14 = 107.14 ≈ 108` строк, в котором будет `14 * 108 = 1512` ячеек.

Значение аргумента `size` ограничено снизу значением `500` и сверху значением `5000`, поэтому в скриптах 1.0 [`невозможно`](../appendix/constraints.md#generator) работать с `GridRange` с б*О*льшим количеством столбцов. Значение по умолчанию: `1500`.

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

[API Reference](API.md)

[Оглавление](../README.md)
