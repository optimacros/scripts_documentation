# Интерфейс Common


### Интерфейс Common ...<a name="Common"></a>
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
Возвращает ссылку на интерфейс [`CellBuffer`](./OMviews.md#CellBuffer).

&nbsp;

```js
requestInfo(): RequestManager
```
Возвращает ссылку на интерфейс [`RequestManager`](./reqStatusChange.md#RequestManager).

&nbsp;


```js
modelInfo(): ModelInfo
```

&nbsp;

```js
userInfo(): UserInfo
```

&nbsp;

```js
resultInfo(): ResultInfo
```

&nbsp;

```js
entitiesInfo(): EntitiesInfo
```
Возвращает ссылку на интерфейс [`EntitiesInfo`](#EntitiesInfo).

&nbsp;

```js
copyData(): CopyData
```

### Интерфейс ResultInfo ...<a name="ResultInfo"></a>
```ts
interface ResultInfo {
    addFileHash(hash: string): ResultInfo;
    actionsInfo(): ResultActionsInfo;
    setProperty(name: string, value: any): ResultInfo;
}
```

&nbsp;

```js
addFileHash(hash: string): ResultInfo
```
Добавляет к HTML-ответу скрипта хэш `hash` файла, тем самым предотвращая его удаление из [`глобального реестра файлов`](../glossary.md#globalFileRegistry) по завершении скрипта.


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