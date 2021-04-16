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
Возвращает ссылку на [`MulticubesTab`](#MulticubesTab). В интерфейсе Optimacros аналогично открытию вкладки "Мультикубы".

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
    rowsFilter(data: string[] | string | number | number[]): Pivot;
    columnsFilter(data: string[] | string | number | number[]): Pivot;
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
rowsFilter(data: string[] | string | number | number[]): Pivot
```
rowsFilter - аналог Hide Show, если мы хотим показать на гриде только одну строку или настроенный нами набор строк.

&nbsp;

```js
columnsFilter(data: string[] | string | number | number[]): Pivot
```
columnsFilter - аналогично с rowsFilter, но только для колонок

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
range() - нужен при получении данных для указания диапазона\области ячеек с которой и по какой мы хотим получить данные.
В качестве первого аргумента принимает позицию строки с которой мы хотим начать получать данные. В качестве второго 
аргумента, количество строк по какую мы хотим захватить в данную область(если хотим захватить неограниченную область то
указываем -1). Третий аргумент это позиция колонки с которой начинается область. Четвёртый аргумент это количество 
колонок которые войдут в область range, для указания неограниченной области колонок также указывается -1

Пример использования range: `grid.range(0, -1, 0, -1)` с нулевой строки - все строки и с нулевой колонки - все колонки, 
т.е. все ячейки грида.

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

```js
getPageSelectors(): GridPageSelector[]
```

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
Возвращает ссылку на сущность измерения.


### Интерфейс GridPageSelector<a name="GridPageSelector"></a>
```ts
interface GridPageSelector extends GridDimension {
    getSelectedEntity(): EntityInfo | null;
}
```
Интерфейс предоставляет данные о фильтре мультикуба. (Ранее фильтры назывались `Page`).

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


## Экспорт из мультикубов и справочников<a name="export"></a>
## Импорт в мультикубы и справочники<a name="import"></a>
## Обновление клеток мультикубов через формулу<a name="update"></a>
## Получение клеток куба с помощью формулы<a name="get"></a>
## Копирование срезов кубов<a name="copy"></a>




[API Reference](API_reference.md)

[Оглавление](../README.md)