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
Интерфейс для получения ссылки на `MulticubesTab`.

&nbsp;

```js
multicubesTab(): MulticubesTab
```
Возвращает ссылку на `MulticubesTab`. В интерфейсе Optimacros аналогично открытию таба "Мультикубы".

### Интерфейс MulticubesTab
```ts
interface MulticubesTab extends Tab {
    open(name: string): MulticubeTab;
}
```
Интерфейс для получения ссылки на `MulticubeTab`.

&nbsp;

```js
open(name: string): MulticubeTab
```
Возвращает ссылку на `MulticubeTab` куба `name`. В интерфейсе Optimacros аналогично открытию таба мультикуба `name`.

### Интерфейс Tab
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
Возвращает ссылку на объект `Pivot` представления `viewName` текущего мультикуба. Если `viewName` не задано, используется представление по умолчанию. Эта функция — ***единственный*** способ получить доступ к представлению мультикуба в скриптах 1.0. Возможность программно задать строки, колонки и фильтры для создания представления мультикуба в скриптах 1.0 [*отсутствует*](../appendix/constraints.md), поэтому для работы с нужным представлением через скрипт необходимо заранее создать и сохранить его вручную.

### Интерфейс Pivot
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
Возвращает ссылку на `Grid` настроенного представления мультикуба.

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

### Интерфейс Grid
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

cellCount() - возвращает количество клеток в гриде

&nbsp;

```js
columnCount(): number
```
Возвращает количество колонок в таблице.

&nbsp;

```js
rowCount(): number
```
Возвращает количество строк в таблице.

&nbsp;

exporter() - нужен для того чтобы автоматически проитерироваться по этому гриду и проитерированные данные будут 
сохранены в файл

range() - нужен при получении данных для указания диапазона\области ячеек с которой и по какой мы хотим получить данные.
В качестве первого аргумента принимает позицию строки с которой мы хотим начать получать данные. В качестве второго 
аргумента, количество строк по какую мы хотим захватить в данную область(если хотим захватить неограниченную область то
указываем -1). Третий аргумент это позиция колонки с которой начинается область. Четвёртый аргумент это количество 
колонок которые войдут в область range, для указания неограниченной области колонок также указывается -1

Пример использования range: `grid.range(0, -1, 0, -1)` с нулевой строки - все строки и с нулевой колонки - все колонки, 
т.е. все ячейки грида.

## Экспорт из мультикубов и справочников<a name="export"></a>
## Импорт в мультикубы и справочники<a name="import"></a>
## Обновление клеток мультикубов через формулу<a name="update"></a>
## Получение клеток куба с помощью формулы<a name="get"></a>
## Копирование срезов кубов<a name="copy"></a>




[API Reference](API_reference.md)

[Оглавление](../README.md)