# API Reference

В этом разделе находится техническое описание предоставляемых платформой интерфейсов. Их можно разделить на 6 групп:

* выполнение скрипта: информация об окружении и управление выводом/действиями после завершения работы (см. `Common`, `Environment`, `Optimization`);
* взаимодействие с моделью, как сущностью: создание бэкапа, пересчёт всей модели (см. `Common.ModelInfo`, `Users`);
* взаимодействие с данными и метаданными модели (см. `Multicubes`, `Times`, `Versions`, `Lists`, `Common.CopyData`);
* взаимодействие с внешним миром (см. `Common.ApiService`, `Filesystems`, `Connectors`, `Notifications`);
* административное: настройка API-сервисов (`ApiServices`), работа с аудитом (`Audit`);
* функции, напрямую не связанные с Оптимакросом, функции помощники — интерфейс `Crypto`.

1. [Интерфейс скриптов 1.0 (на языке TypeScript)](scripts.om.d.ts)
1. [Интерфейс Common](common.md)
1. [Окружение](env.md)
1. [Представления](views.md)
    1. [Измерения](dimensions.md)
    1. [Манипуляция элементами](elementsManipulator.md)
    1. [Низкоуровневый доступ к клеткам и кубам](cubeCell.md)
    1. [Синхронизация мультикубов и справочников](sync.md)
1. [Экспорт и импорт](exportImport.md)
1. [Файловые системы](fs.md)
1. [Файлы CSV](csv.md)
1. [Оптимизационные запросы](optimization.md)
1. [Коннекторы](connectors.md)
    1. [Реляционные БД](relationalDB.md)
    1. [MongoDB](mongoDB.md)
    1. [HTTP](http.md)
    1. [WinAgent](winAgent.md)
1. [Уведомление пользователя](notifications.md)
1. [Цепочки скриптов](scriptChains.md)
1. [Web API сервисы](apiService.md)
1. [Администрирование Web API сервисов](apiServicesAdministration.md)
1. [Аудит](audit.md)
1. [Криптография, хэширование и вспомогательные функции](crypto.md)
1. [Пользователи](users.md)

## Интерфейс OM<a name="om"></a>
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
	readonly variables: Variables;
	readonly apiServices: ApiServices;
	readonly audit: Audit;
	readonly crypto: Crypto;
	readonly users: Users;
}

var om: OM;
```
Интерфейс `OM` являет собой набор интерфейсов, предоставляющих API cкриптов 1.0 через глобальную переменную `om`.

&nbsp;

```js
readonly common: Common;
```
Ссылка на интерфейс [`Common`](./common.md#common).

&nbsp;

```js
readonly environment: Environment;
```
Ссылка на интерфейс [`Environment`](./env.md#environment).

&nbsp;

```js
readonly multicubes: Multicubes;
```
Ссылка на интерфейс [`Multicubes`](./views.md#multicubes).

&nbsp;

```js
readonly times: Times;
```
Ссылка на интерфейс [`Times`](./dimensions.md#times).

&nbsp;

```js
readonly versions: Versions;
```
Ссылка на интерфейс [`Versions`](./dimensions.md#versions).

&nbsp;

```js
readonly lists: Lists;
```
Ссылка на интерфейс [`Lists`](./dimensions.md#lists).

&nbsp;

```js
readonly filesystems: Filesystems;
```
Ссылка на интерфейс [`Filesystems`](./fs.md#filesystems).

&nbsp;

```js
readonly optimization: Optimization;
```
Ссылка на интерфейс [`Optimization`](./optimization.md#optimization).

&nbsp;

```js
readonly connectors: Connectors;
```
Ссылка на интерфейс [`Connectors`](./connectors.md#connectors).

&nbsp;

```js
readonly notifications: Notifications.Manager;
```
Ссылка на интерфейс [`Notifications.Manager`](./notifications.md#manager).

&nbsp;

```js
readonly variables: Variables;
```
Ссылка на интерфейс [`Variables`](./variables.md#variables).

&nbsp;

```js
readonly apiServices: ApiServices;
```
Ссылка на интерфейс [`ApiServices`](./apiServicesAdministration.md#api-services).

&nbsp;

```js
readonly audit: Audit;
```
Ссылка на интерфейс [`Audit`](./audit.md).

&nbsp;

```js
readonly crypto: Crypto;
```
Ссылка на интерфейс [`Crypto`](./crypto.md).

&nbsp;

```js
readonly users: Users;
```
Ссылка на интерфейс [`Users`](./users.md).

&nbsp;

[Оглавление](../README.md)
