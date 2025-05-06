## Манипуляция элементами

### Интерфейс ElementsCreator<a name="elements-creator"></a>
```ts
interface ElementsCreator {
	numeric(): NumericElementsCreator;
	named(): NamedElementsCreator;
}
```
Абстрактный интерфейс, предоставляющий конкретные интерфейсы с различными возможностями добавления элементов.

&nbsp;

```js
numeric(): NumericElementsCreator;
```
Возращает ссылку на [`NumericElementsCreator`](#numeric-elements-creator).

&nbsp;

```js
named(): NamedElementsCreator;
```
Возращает ссылку на [`NamedElementsCreator`](#named-elements-creator).

&nbsp;

### Интерфейс BaseElementsCreator<a name="base-elements-creator"></a>
```ts
interface BaseElementsCreator {
	setPositionAfter(relativeLongId: number): this;
	setPositionBefore(relativeLongId: number): this;
	setPositionStart(): this;
	setPositionEnd(): this;
	setPositionChildOf(parentLongId: number): this;
	create(): number[];
}
```
Базовый интерфейс для добавления новых элементов.

&nbsp;

```js
setPositionAfter(relativeLongId: number): this;
```
Устанавливает позицию добавления после [`relativeLongId`](./common.md#long-id). Возвращает `this`.

&nbsp; 

```js
setPositionBefore(relativeLongId: number): this;
```
Устанавливает позицию добавления до [`relativeLongId`](./common.md#long-id). Возвращает `this`.

&nbsp;

```js
setPositionStart(): this;
```
Устанавливает позицию добавления в начало. Возвращает `this`.

&nbsp;

```js
setPositionEnd(): this;
```
Устанавливает позицию добавления в конец, это поведение по умолчанию. Этот вариант наиболее эффективный с точки зрения производительности. Возвращает `this`.

&nbsp;

<a name="base-elements-creator.set-position-child-of"></a>
```js
setPositionChildOf(parentLongId: number): this;
```
Устанавливает позицию добавления элемента как дочернего для [`parentLongId`](./common.md#long-id). Возвращает `this`.

&nbsp;

```js
create(): number[];
```
Добавляет элементы и возвращает массив их [`longId`](./common.md#long-id).

&nbsp;

### Интерфейс NumericElementsCreator<a name="numeric-elements-creator"></a>
```ts
interface NumericElementsCreator extends BaseElementsCreator {
	setCount(count: number): this;
}
```
Интерфейс позволяет добавить заданное количество элементов в заданную позицию таблицы. Аналог кнопки "Добавить элементы" в интерфейсе Optimacros. Перед созданием элементов необходимо указать их количество (нет значения по умолчанию) и позицию добавления (по умолчанию в конец). Интерфейс наследуется от [`BaseElementsCreator`](#base-elements-creator).

&nbsp;

```js
setCount(count: number): this;
```
Устанавливает количество добавляемых элементов. Возвращает `this`.

&nbsp;

### Интерфейс NamedElementsCreator<a name="named-elements-creator"></a>
```ts
interface NamedElementsCreator extends BaseElementsCreator {
	setElementNames(names: string[]): this;
}
```
Интерфейс позволяет добавить заданное количество элементов с именами в заданную позицию таблицы. Аналог кнопки "Добавить элементы с именами" в интерфейсе Optimacros. Перед созданием элементов необходимо указать список имён элементов и позицию добавления (по умолчанию в конец). Интерфейс наследуется от [`BaseElementsCreator`](#base-elements-creator).

&nbsp;

```js
setElementNames(names: string[]): this;
```
Устанавливает список имён `names` добавляемых элементов. Имена должны быть уникальны. В случае добавления в справочник имена вдобавок не должны совпадать с названиями его свойств. Возвращает `this`.

&nbsp;

### Интерфейс ElementsDeleter<a name="elements-deleter"></a>
```ts
interface ElementsDeleter {
	appendIdentifier(identifier: number): this;
	delete(): this;
}
```
Интерфейс позволяет удалить элементы таблицы. Аналог кнопки "Удалить" в интерфейсе Optimacros.

&nbsp;

```js
appendIdentifier(identifier: number): this;
```
Добавляет в буфер элемент, чей [`longId`](./common.md#long-id) равен `identifier`. Повторное добавление элемента в очередь **не** приводит к ошибкам. Возращает `this`.

&nbsp;

```js
delete(): this;
```
Фактически удаляет все элементы в буфере из таблицы. Возвращает `this`.

&nbsp;

### Интерфейс ElementsReorder<a name="elements-reorder"></a>
```ts
interface ElementsReorder {
	append(longId: number, relativeLongId?: number, position?: string): this;
	reorder(): this;
	count(): number;
	reverse(): this;
}
```
Интерфейс позволяет перетасовать элементы и доступен только для элементов справочников. Во время работы хранит очередь элементов, которые функцией [`reorder()`](#reorder) будут переданы на сервер для перепозиционирования в порядке этой очереди.

Аналог кнопки "Переместить" в интерфейсе Optimacros. Но в отличие от интерфейса пользователя, в скриптах 1.0 изменение позиции элемента возможно только в пределах элементов с тем же родительским элементом. Поэтому для постановки элемента в конкретную позицию среди элементов с другим родительским элементом, нужно сначала сменить родителя. Именно так и организован интерфейс пользователя: в таком случае он отправляет на сервер две команды.

&nbsp;

```js
append(longId: number, relativeLongId?: number, position?: string): this;
```
Добавляет в очередь данные о [`longId`](./common.md#long-id) элемента, который впоследствии будет позиционирован относительно элемента `relativeLongId` (значение по умолчанию: `-1`). Возвращает `this`. Способ позиционирования задаёт аргумент `position` (регистр имеет значение):

`'Before'` — непосредственно перед `relativeLongId`;

`'After'` — сразу за `relativeLongId`;

`'Start'` — в начало (необходимо указать `relativeLongId === -1`);

`'End'` — в конец (необходимо указать `relativeLongId === -1`), это значение по умолчанию.

&nbsp;

<a name="reorder"></a>
```js
reorder(): this;
```
Передаёт на сервер данные для фактического перемещения их в модели и очищает буфер. Возвращает `this`.

&nbsp;

```js
count(): number;
```
Возвращает количество элементов в очереди.

&nbsp;

```js
reverse(): this;
```
Переворачивает очередь. Возвращает `this`.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)