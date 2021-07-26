# API Reference

1. [Интерфейс скриптов 1.0 (на языке TypeScript)](scripts.om.d.ts)
1. [Низкоуровневый доступ к клеткам и кубам](cubeCell.md)
1. [Экспорт и импорт](exportImport.md)
1. [Манипуляция элементами](elementsManipulator.md)
1. [Измерения](dimensions.md)
1. [Представления Optimacros](OMviews.md)
1. [Интерфейс Common](common.md)
1. [Коннекторы](connectors.md)
1. [Реляционные БД](relationalDB.md)
1. [MongoDB](mongoDB.md)
    1. HTTP
1. [Файловые системы](fs.md)
    1. Локальная
    1. FTP
    1. Shared folder
    1. Файлы CSV
1. [Цепочки скриптов](scriptChains.md)
1. [Окружение](env.md)
1. [Оптимизационные запросы](optimization.md)
1. [Уведомление пользователя](notifications.md)

### Интерфейс OM ...<a name="OM"></a>
```ts
interface OM {
	readonly common: Common;
	readonly environment: Environment;
	readonly multicubes: Multicubes;
	readonly times: Times;
	readonly versions: Versions;
	readonly lists: Lists;
	readonly filesystems: Filesystems;
	readonly optimization: Optimization;
	readonly connectors: Connectors;
	readonly notifications: Notifications.Manager;
}

var om: OM;
```
Интерфейс `OM` являет собой набор интерфейсов, предоставляющих API cкриптов 1.0 через глобальную переменную `om`.

&nbsp;

```js
readonly common: Common
```
Ссылка на интерфейс [`Common`](./common.md#Common).

&nbsp;

```js
readonly environment: Environment
```
Ссылка на интерфейс [`Environment`](./env.md#Environment).

&nbsp;

```js
readonly multicubes: Multicubes
```
Ссылка на интерфейс [`Multicubes`](./OMviews.md#Multicubes).

&nbsp;

```js
readonly times: Times
```
Ссылка на интерфейс [`Times`](./dimensions.md#Times).

&nbsp;

```js
readonly versions: Versions
```
Ссылка на интерфейс [`Versions`](./dimensions.md#Versions).

&nbsp;

```js
readonly lists: Lists
```
Ссылка на интерфейс [`Lists`](./dimensions.md#Lists).

&nbsp;

```js
readonly filesystems: Filesystems
```
Ссылка на интерфейс [`Filesystems`](./fs.md#Filesystems).

&nbsp;

```js
readonly optimization: Optimization
```
Ссылка на интерфейс [`Optimization`](./optimization.md#Optimization).

&nbsp;

```js
readonly connectors: Connectors
```
Ссылка на интерфейс [`Connectors`](./connectors.md#Connectors).

&nbsp;

```js
readonly notifications: Notifications.Manager
```
Ссылка на интерфейс [`Notifications.Manager`](./notifications.md#Manager).

&nbsp;

[Оглавление](../README.md)
