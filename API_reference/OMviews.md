# Представления Optimacros

1. [Представления мультикубов, справочников, версий](#views)
1. [Экспорт из мультикубов и справочников](#export)
1. [Импорт в мультикубы и справочники](#import)
1. [Обновление клеток мультикубов через формулу](#update)
1. [Получение клеток куба с помощью формулы](#get)
1. [Копирование срезов кубов](#copy)

## Представления мультикубов, справочников, версий<a name="views"></a>

### Интерфейс Multicubes
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

### Интерфейс Tab<a name="Tab"></a>
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

### Интерфейс MulticubeTab<a name="MulticubeTab"></a>
```ts
interface MulticubeTab extends Tab {
    cleanCellsData(cubesIdentifiers?: number[]): MulticubeTab;
    cubeCellSelector(identifier: string | number): CubeCellSelectorBuilder;
    cubeCellUpdater(identifier: string | number): CubeCellUpdaterBuilder;
    getCubeInfo(identifier: string | number): CubeInfo;
}
```

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

```js
rowsFilter(data: string | string[] | number | number[]): Pivot
```
Позволяет задать для отображения множество строк и скрыть остальные. Множество можно задать следующими способами:

`string` — название строки

`string[]` — массив названий строк

`number` — [`longId`](#longId) строки

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

```js
range(rowStart?: number, rowCount?: number, columnStart?: number, columnCount?: number): GridRange
```
Возвращает ссылку на объект с интерфейсом [`GridRange`](#GridRange), представляющий прямоугольный диапазон ячеек.

Параметры `rowStart` и `columnStart` задают начальные номера строки и столбца соответственно. Значения по умолчанию: `0`.
Параметры `rowCount` и `columnCount` задают количество строк и столбцов соответственно. Особое значение этих параметров `-1` означает захват всех строк/столбцов до конца таблицы. Значения по умолчанию: `-1`.

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
Интерфейс, предоставляющий метаданные об интерфейсе [`Grid`](#Grid).

&nbsp;

```js
getPageSelectors(): GridPageSelector[]
```
Возвращает массив объектов с интерфейсом [`GridPageSelector`](#GridPageSelector), представляющий метаданные о фильтрах таблицы.

&nbsp;

```js
getRowDimensions(): GridDimension[]
```
Возвращает массив объектов с интерфейсом [`GridDimension`](#GridDimension), представляющий метаданные о строках таблицы.

&nbsp;

```js
getColumnDimensions(): GridDimension[]
```
Возвращает массив объектов с интерфейсом [`GridDimension`](#GridDimension), представляющий метаданные о столбцах таблицы.

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

### Интерфейс EntityInfo (Label) <a name="EntityInfo"></a> <a name="Label"></a>
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
Интерфейс сущности.

&nbsp;

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


## Экспорт из мультикубов и справочников<a name="export"></a>
## Импорт в мультикубы и справочники<a name="import"></a>
## Обновление клеток мультикубов через формулу<a name="update"></a>
## Получение клеток куба с помощью формулы<a name="get"></a>
## Копирование срезов кубов<a name="copy"></a>




[API Reference](API_reference.md)

[Оглавление](../README.md)