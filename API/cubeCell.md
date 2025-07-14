# Низкоуровневый доступ к клеткам и кубам

1. [Доступ к клеткам и кубам](#lowlevel)
1. [Получение клеток куба с помощью формулы](#select)
1. [Обновление клеток куба по формуле](#update)

## Доступ к клеткам и кубам<a name="lowlevel"></a>

### Интерфейс CubeCell<a name="cube-cell"></a>
```ts
interface CubeCell {
	definitions(): number[];
	getDimensionIds(): number[];
	getDimensionItems(): EntityInfo[];
	getValue(): number | string | boolean | null;
}
```
Низкоуровневый интерфейс доступа к данным клетки куба.

&nbsp;

<a name="cube-cell.definitions"></a>
```js
definitions(): number[];
```
Возвращает такой же массив идентификаторов, что и `getDimensionIds()`. Однако дополнительно первым элементом является идентификатор самого куба.

&nbsp;

```js
getDimensionIds(): number[];
```
Возвращает массив идентификаторов тех элементов измерений куба, которыми определена клетка.  Порядок измерений фиксирован и соответствует порядку, в котором их же возвращает функция [`CubeInfo.getDimensions()`](#cube-info.get-dimensions).

&nbsp;

```js
getDimensionItems(): EntityInfo[];
```
Возвращает массив [`EntityInfo`](./common.md#entity-info) элементов измерений куба, которыми определена клетка. Порядок измерений фиксирован и соответствует порядку, в котором их же возвращает функция [`CubeInfo.getDimensions()`](#cube-info.get-dimensions).

&nbsp;

```js
getValue(): number | string | boolean | null;
```
Возвращает значение клетки. Если формат клетки – справочник или дата, возвращает идентификатор элемента.

&nbsp;

### Интерфейс CubeInfo<a name="cube-info"></a>
```ts
interface CubeInfo extends EntityInfo {
	getFormula(): string | null;
	getFormatInfo(): CubeFormatInfo;
	getDimensions(): EntityInfo[];
}
```
Интерфейс информации о кубе. Интерфейс наследуется от [`EntityInfo`](./common.md#entity-info).

&nbsp;

```js
getFormula(): string | null;
```
Возвращает формулу Optimacros, заданную для куба, или `null`, если её нет.

&nbsp;

```js
getFormatInfo(): CubeFormatInfo;
```
Возвращает интерфейс [`CubeFormatInfo`](#cube-format-info) для получения информации о формате куба.

&nbsp;

<a name="cube-info.get-dimensions"></a>
```js
getDimensions(): EntityInfo[];
```
Возвращает массив [`EntityInfo`](./common.md#entity-info) измерений куба.

&nbsp;

### Интерфейс CubeFormatInfo<a name="cube-format-info"></a>
```ts
interface CubeFormatInfo {
	getFormatTypeEntity(): EntityInfo;
	getDimensionEntity(): EntityInfo | null;
}
```
Интерфейс информации о формате куба.

&nbsp;

```js
getFormatTypeEntity(): EntityInfo;
```
Возвращает сущность [`EntityInfo`](./common.md#entity-info) формата куба. Возможные форматы: `'Number'`, `'Text'`, `'Boolean'`, `'Date'`, `'Entity'`, `'Time Entity'`, `'Version'`, `'Line Item Subset'`, `'None'`.

&nbsp;

```js
getDimensionEntity(): EntityInfo | null;
```
Возвращает идентификатор измерения, выбранного в качестве формата, если формат – один из `List`, `Time`, `Version`, `CubeSubset`, и `null` в противном случае.
***Не работает.***

&nbsp;

## Получение клеток куба с помощью формулы<a name="select"></a>

### Интерфейс CubeCellSelectorBuilder<a name="cube-cell-selector-builder"></a>
```ts
interface CubeCellSelectorBuilder {
	setFormula(formula: string): this;
	setStartCell(longIds: number[]): this;
	setMaxCount(count: number): this;
	load(): CubeCellSelector;
}
```
Простой интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для выборки клеток куба по формуле.

&nbsp;

```js
setFormula(formula: string): this;
```
Устанавливает формулу выбора.

&nbsp;

```js
setStartCell(longIds: number[]): this;
```
Устанавливает клетку, начиная с которой будет выполняться выбор. В качестве аргумента передается массив идентификаторов тех элементов измерений куба, которыми определена клетка. Массив идентификаторов можно получить с помощью метода `getDimensionIds()` интерфейса [`CubeCell`](#cube-cell).

&nbsp;

```js
setMaxCount(count: number): this;
```
Устанавливает максимальное количество выбранных клеток. Если это значение не устанавливать, будет лимит `500 000` клеток. Верхняя граница параметра `count` не определена, поэтому стабильность не гарантируется и возможно возникновение ошибки. Рекомендуется перебирать большие кубы чанками.

&nbsp;

```js
load(): CubeCellSelector;
```
Производит выбор клеток и возвращает интерфейс [`CubeCellSelector`](#cube-cell-selector).

&nbsp;

### Интерфейс CubeCellSelector<a name="cube-cell-selector"></a>
```ts
interface CubeCellSelector {
	getCubeInfo(): CubeInfo;
	getCubeIdentifier(): number;
	getCubeDimensions(): EntityInfo[];
	generator(): IterableIterator<CubeCell>;
}
```
Интерфейс прямого взаимодействия с хранилищем данных.

&nbsp;

```js
getCubeInfo(): CubeInfo;
```
Возвращает интерфейс [`CubeInfo`](#cube-info) для получения информации о кубе.

&nbsp;

```js
getCubeIdentifier(): number;
```
Возвращает идентификатор куба.

&nbsp;

```js
getCubeDimensions(): EntityInfo[];
```
То же, что и [`CubeInfo.getDimensions()`](#cube-info.get-dimensions).

&nbsp;

```js
generator(): IterableIterator<CubeCell>;
```
Возвращает генератор, при каждом обращении возвращающий интерфейс [`CubeCell`](#cube-cell) очередной полученной в выборке клетки куба.

&nbsp;

## Обновление клеток куба по формуле<a name="update"></a>

### Интерфейс CubeCellUpdaterBuilder<a name="cube-cell-updater-builder"></a>
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
setConditionFormula(formula: string): this;
```
Устанавливает условную формулу, которая будет применяться к каждой клетке куба, и возвращать значение типа `Boolean`. Значение по умолчанию: `'TRUE'`. Возвращает `this`.

&nbsp;

```js
setFormula(formula: string): this;
```
Устанавливает формулу в формате Optimacros, которая будет применяться к тем клеткам куба, на которых условная формула вернула значение `'TRUE'`, и возвращать для них значение, тип которого должен соответствовать формату куба. Значение по умолчанию отсутствует. Возвращает `this`.

&nbsp;

```js
load(): CubeCellUpdater;
```
Устанавливает значения в клетках куба в соответствии с формулой и условной формулой, возвращает интерфейс [`CubeCellUpdater`](#cube-cell-updater).

&nbsp;

### Интерфейс CubeCellUpdater<a name="cube-cell-updater"></a>
```ts
interface CubeCellUpdater {
	getCount(): number;
}
```
Интерфейс получения результатов об обновлении клеток куба по формуле.

&nbsp;

```js
getCount(): number;
```
Должна возвращать количество ячеек, модифицированных применением формулы. ***Не реализовано; возвращает `-1`.***

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
