# Интерфейс Common

### Интерфейс Common<a name="Common"></a>
```ts
interface Common {
    createCellBuffer(): CellBuffer;
    requestInfo(): RequestManager;
    modelInfo(): ModelInfo;
    userInfo(): UserInfo;
    resultInfo(): ResultInfo;
    entitiesInfo(): EntitiesInfo;
    copyData(): CopyData;
}
```
Интерфейс, группирующий некоторые общие интерфейсы, не связанные друг с другом.

&nbsp;

```js
createCellBuffer(): CellBuffer
```
Возвращает ссылку на интерфейс [`CellBuffer`](#CellBuffer).

&nbsp;

```js
requestInfo(): RequestManager
```
Возвращает ссылку на интерфейс [`RequestManager`](#RequestManager).

&nbsp;


```js
modelInfo(): ModelInfo
```
Возвращает ссылку на интерфейс [`ModelInfo`](#ModelInfo).

&nbsp;

```js
userInfo(): UserInfo
```
Возвращает ссылку на интерфейс [`UserInfo`](#UserInfo).

&nbsp;

```js
resultInfo(): ResultInfo
```
Возвращает ссылку на интерфейс [`ResultInfo`](#ResultInfo).

&nbsp;

```js
entitiesInfo(): EntitiesInfo
```
Возвращает ссылку на интерфейс [`EntitiesInfo`](#EntitiesInfo).

&nbsp;

```js
copyData(): CopyData
```
Возвращает ссылку на интерфейс [`CopyData`](#CopyData).

&nbsp;

### Интерфейс RequestManager<a name="RequestManager"></a>
```ts
interface RequestManager {
    log(message: string, print?: boolean): RequestManager;
    logStatusMessage(message: string, print?: boolean): RequestManager;
    setStatusMessage(message: string): RequestManager;
}
```
Интерфейс для записи в лог (устаревший функционал) и работы со статусными сообщениями. Все функции возвращают `this`.

&nbsp;


```js
log(message: string, print?: boolean): RequestManager
```
Выводит сообщение `message` в лог, доступ к которому можно получить в админке. Если `print == true` (по умолчанию: `false`), дублирует `message` в консоль и дополнительно переносит курсор на новую строку. *Устаревшая функция.*

![Лог в админке](./pic/requestInfo.png)

&nbsp;

```js
logStatusMessage(message: string, print?: boolean): RequestManager
```
Делает то же, что и `setStatusMessage()`. Если `print == true` (по умолчанию: `false`), дублирует `message` в консоль и дополнительно переносит курсор на новую строку. *Устаревшая функция.*

&nbsp;

```js
setStatusMessage(message: string): RequestManager
```
Устанавливает статусное сообщение `message`. Имеет смысл во время длительной работы скриптов сообщать пользователю об этапах или процентах выполненных работ.

![Статусное сообщение](./pic/statusMessage.png)

&nbsp;

### Интерфейс CellBuffer<a name="CellBuffer"></a>
```ts
interface CellBuffer {
    set(cell: Cell | CubeCell, value: number | string | null): CellBuffer;
    apply(): CellBuffer;
    count(): number;
    canLoadCellsValues(value: boolean): CellBuffer;
}
```
Буфер, куда можно временно поместить значения набора ячеек, не обязательно смежных, чтобы изменить их перед отправкой на сервер.

При модификации большого количества клеток (от нескольких сотен тысяч), рекомендуется пользоваться импортом CSV.

&nbsp;

```js
set(cell: Cell | CubeCell, value: number | string | null): CellBuffer
```
Устанавливает значение `value` в клетку `cell` в буфере. Возвращает `this`.

&nbsp;

<a name="apply"></a>
```js
apply(): CellBuffer
```
Передаёт на сервер значения всех клеток для присваивания в модели и очищает буфер. Перед присваиванием сервер может их обработать и выставить другие значение, например, после установки в ячейку формата даты строки `'2019-03-01'` впоследствии из неё будет считана строка `'1 Mar 19'`. Возвращает `this`.

&nbsp;

```js
count()
```
Возвращает количество ячеек в буфере.

&nbsp;

```js
canLoadCellsValues(value: boolean): CellBuffer
```
Устанавливает значение `value`, указывающее, нужно ли перезагружать значения клеток в буфере, если они изменятся. Возвращает `this`.

По умолчанию: `true`. Однако такое поведение сохранено лишь для обратной совместимости, оно приводит к деградации производительности. Поэтому рекомендуется сразу после инициализации объекта вызывать эту функцию и передавать `false`.

&nbsp;

### Интерфейс ResultInfo ...<a name="ResultInfo"></a>
```ts
interface ResultInfo {
    addFileHash(hash: string): ResultInfo;
    actionsInfo(): ResultActionsInfo;
    setProperty(name: string, value: any): ResultInfo;
}
```

&nbsp;

<a name="ResultInfo.addFileHash"></a>
```js
addFileHash(hash: string): ResultInfo
```
Добавляет к ответу на запрос скрипта хэш `hash` файла, ранее зарегистрированного в [`глобальном реестре`](../glossary.md#globalFileRegistry). Для пользователя это приведёт к тому, что файл будет скачан в браузере. Возвращает `this`.

&nbsp;

### Интерфейс EntitiesInfo<a name="EntitiesInfo"></a>
```ts
interface EntitiesInfo {
    get(longId: number): EntityInfo | null;
    getCollection(longId: number[]): EntityInfo[];
}
```
Интерфейс для получения сущности по [`longId`](./OMviews.md#longId).

&nbsp;


```js
get(longId: number): EntityInfo | null
```
Возвращает сущность [`EntityInfo`](./OMviews.md#EntityInfo) по её [`longId`](./OMviews.md#longId).

&nbsp;

```js
getCollection(longId: number[]): EntityInfo[]
```
Возвращает массив сущностей [`EntityInfo`](./OMviews.md#EntityInfo) по массиву их[`longId`](./OMviews.md#longId).

[API Reference](API.md)

[Оглавление](../README.md)