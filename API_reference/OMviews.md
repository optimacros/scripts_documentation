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
    pivot(viewName?: string): Pivot;
    open(name: string): Tab;
		
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
pivot(viewName?: string): Pivot
```
Возвращает ссылку на объект [`Pivot`](#Pivot) представления `viewName` текущего мультикуба. Если `viewName` не задано, используется представление по умолчанию. Эта функция — ***единственный*** способ получить доступ к представлению мультикуба в скриптах 1.0. Возможность программно задать строки, колонки и фильтры для создания представления мультикуба в скриптах 1.0 [*отсутствует*](../appendix/constraints.md), поэтому для работы с нужным представлением через скрипт необходимо заранее создать и сохранить его вручную.

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

Функция возвращает `this`.

&nbsp;

```js
columnsFilter(data: string | string[] | number | number[]): Pivot
```
Аналог [`rowsFilter`](#rowsFilter) для столбцов.

&nbsp;

```js
withoutValues(): Pivot
```
withoutValues - загружает представление мультикуба без данных

&nbsp;

```js
addDependentContext(identifier: number): Pivot
```
addDependentContext - передача контекста

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

### Интерфейс GridPageSelector ...<a name="GridPageSelector"></a>
```ts
interface GridPageSelector extends GridDimension {
    getSelectedEntity(): EntityInfo | null;
}
```
Интерфейс предоставляет данные о фильтре мультикуба. (Ранее фильтры назывались `Page`).

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

### Интерфейс GridRangeChunk ...<a name="GridRangeChunk"></a>
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

&nbsp;

```js
rows(): Labels
```
Возвращает интерфейс [`Labels`](#Labels), представляющий заголовки строк.

&nbsp;

```js
columns(): Labels
```


### Интерфейс EntityInfo ... (Label) <a name="EntityInfo"></a> <a name="Label"></a>
```ts
interface Label {
    longId(): number;
    name(): string;
    code(): string;
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
Возвращает интерфейс [`Cells`](#Cells), предоставляющий доступ к ячейкам одной строки или одного столбца.

### Интерфейс Cell ...<a name="Cell"></a>
```ts
interface Cell {
    setValue(value: number | string | null);
    getValue(): number | string | null;
    getNativeValue(): number | string | null;
    getTextValue(): number | string | null;
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

```js
setValue(value: number | string | null)
```
Устанавливает значение для клетки. Не рекомендуется к использованию в больших мультикубах.

&nbsp;

<a name="getValue"></a>
```js
getValue(): number | string | null
```
Возвращает значение клетки, которое видит пользователь.

&nbsp;

```js
getNativeValue(): number | string | null
```
Возвращает значение ....

&nbsp;

```js
getTextValue(): number | string | null
```
Синоним [`getValue()`](#getValue). Устаревшая функция.

&nbsp;

```js
getContextValue(): string | null
```


&nbsp;

```js
definitions(): number[]
```

&nbsp;

```js
columns(): LabelsGroup
```

&nbsp;

```js
rows(): LabelsGroup
```

&nbsp;

```js
dropDown(): Labels
```

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
Интерфейс, представляющий группу клеток таблицы....

&nbsp;

```js
all(): Cell[]
```
Возвращает массив всех клеток.

&nbsp;

```js
first(): Cell
```
Возвращает первую клетку.

&nbsp;

```js
setValue(value: number | string | null)
```
Устанавливает одно и то же значение для всех клеток таблицы. ***Лучше не пользоваться*** .....

&nbsp;

```js
count(): number
```

&nbsp;

```js
chunkInstance(): GridRangeChunk
```

&nbsp;

```js
getByIndexes(indexes: number[]): Cells | null
```


## Экспорт из мультикубов и справочников<a name="export"></a>
## Импорт в мультикубы и справочники<a name="import"></a>
## Обновление клеток мультикубов через формулу<a name="update"></a>
## Получение клеток куба с помощью формулы<a name="get"></a>
## Копирование срезов кубов<a name="copy"></a>




[API Reference](API_reference.md)

[Оглавление](../README.md)