# API Reference

1. [Представления Optimacros](OMviews.md)
    1. Представления мультикубов, справочников, версий
    1. Экспорт из мультикубов и справочников
    1. Импорт в мультикубы и справочники
    1. Обновление клеток мультикубов через формулу
    1. Получение клеток куба с помощью формулы
    1. Копирование срезов кубов
1. [Интерфейс Common](common.md)
1. [Коннекторы](connectors.md)
    1. Реляционные СУБД
    1. MongoDB
    1. HTTP
1. [Файловые системы](fs.md)
    1. Локальная
    1. FTP
    1. Shared folder
    1. Файлы CSV
1. [Цепочки скриптов](scriptChains.md)
1. [Окружение](env.md)

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
Ссылка на интерфейс [`Times`](./OMviews.md#Times).

&nbsp;

```js
readonly versions: Versions
```
Ссылка на интерфейс [`Versions`](./OMviews.md#Versions).

&nbsp;

```js
readonly lists: Lists
```
Ссылка на интерфейс [`Lists`](./OMviews.md#Lists).

&nbsp;

```js
readonly filesystems: Filesystems
```
Ссылка на интерфейс [`Filesystems`](./fs.md#Filesystems).

&nbsp;

```js
readonly optimization: Optimization
```
Ссылка на интерфейс Optimization.

&nbsp;

```js
readonly connectors: Connectors
```
Ссылка на интерфейс [`Connectors`](./connectors.md#Connectors).


___
!!! РАЗОБРАТЬ ВСЁ, ЧТО НИЖЕ !!!

### Интерфейс CubeCell ...<a name="CubeCell"></a>
```ts
interface CubeCell {
    definitions(): number[];
    getDimensionIds(): number[];
    getDimensionItems(): EntityInfo[];
    getValue(): number | string | null | boolean;
}
```

### Интерфейс CubeCellSelector ...<a name="CubeCellSelector"></a>
```ts
interface CubeCellSelector {
    getCubeInfo(): CubeInfo;
    getCubeIdentifier(): number;
    getCubeDimensions(): EntityInfo[];
    // @ts-ignore
    generator(): IterableIterator<CubeCell>;
}
```

### Интерфейс CubeCellSelectorBuilder ...<a name="CubeCellSelectorBuilder"></a>
```ts
interface CubeCellSelectorBuilder {
    setFormula(formula: string): this;
    load(): CubeCellSelector;
}
```

### Интерфейс CubeCellUpdater ...<a name="CubeCellUpdater"></a>
```ts
interface CubeCellUpdater{
    getCount(): number;
}
```

### Интерфейс CubeCellUpdaterBuilder ...<a name="CubeCellUpdaterBuilder"></a>
```ts
interface CubeCellUpdaterBuilder {
    setConditionFormula(formula: string): this;
    setFormula(formula: string): this;
    load(): CubeCellUpdater;
}
```

### Интерфейс CubeFormatInfo ...<a name="CubeFormatInfo"></a>
```ts
interface CubeFormatInfo {
    getFormatTypeEntity(): EntityInfo;
    getDimensionEntity(): EntityInfo | null;
}
```

### Интерфейс CubeInfo ...<a name="CubeInfo"></a>
```ts
interface CubeInfo extends EntityInfo {
    getFormula(): string | null;
    getFormatInfo(): CubeFormatInfo;
    getDimensions(): EntityInfo[];
}
```


export interface ListSubsetsTab extends Tab {
    listTab(): ListTab;
}

### Интерфейс ListImporter ...<a name="ListImporter"></a>
```ts
interface ListImporter extends Importer {
    setFilePath(path: string): ListImporter;
    setObligatoryListCodes(obligatoryListCodes: boolean): ListImporter
    getObligatoryListCodes(): boolean;
    setImportToChildListOnly(importToChildListOnly: boolean): ListImporter;
    getImportToChildListOnly(): boolean;
    setUpdatedPropertiesOnParentLevels(updatedPropertiesOnParentLevels: boolean): ListImporter;
    getUpdatedPropertiesOnParentLevels(): boolean;
}
```

### Интерфейс CopyData ...<a name="CopyData"></a>
```ts
interface CopyData {
    setSourceLongId(longId: number): CopyData;
    setDestLongId(longId: number): CopyData;
    enableCopyAllCubes(): CopyData;
    enableCustomProperties(): CopyData;
    setMulticubeLongIds(longIds: number[]): CopyData;
    setMulticubeByNames(names: string[]): CopyData;
    copy(): CopyData;
}
```

### Интерфейс OptimizationRequestTab ...<a name="OptimizationRequestTab"></a>
```ts
interface OptimizationRequestTab extends Tab {
    run(name: string): { success: boolean, error: undefined | string };
}
```
`om.optimization.optimizationRequestsTab.run()` Аналогично функционалу запуска Отпимизационного запроса в интерфейсной 
части приложения. run в качестве аргумента принимает строку с именем Отпимизационного запроса

### Интерфейс Optimization ...<a name="Optimization"></a>
```ts
interface Optimization {
    optimizationRequestsTab(): OptimizationRequestTab
}
```
`om.optimization` Аналогично открытию табы Optimizer Request в интерфейсной части приложения, но без открытых мини 
табов.
`om.optimization.optimizationRequestsTab` Аналогично открытию табы Optimizer Request - Table в интерфейсной части 
приложения.



### Mongodb и его интерфейсы:
```ts
declare namespace Mongodb {
    interface CollectionCreator {
        /**
         * https://docs.mongodb.com/manual/reference/method/db.createCollection
         * @param options
         */
        setOptions(options: {
            capped: boolean,
            autoIndexId: boolean,
            size: number,
            max: number
        }): CollectionCreator;

        setName(name: string): CollectionCreator;
        create(): { ok: number, errmsg?: string };
    }

    interface InsertOneResult {
        getInsertedCount(): number;
        getInsertedId(): Types.ObjectId;
        isAcknowledged(): boolean;
    }

    interface InsertManyResult {
        getInsertedCount(): number;
        getInsertedIds(): Types.ObjectId[];
        isAcknowledged(): boolean;
    }

    interface UpdateResult {
        getMatchedCount(): number;
        getModifiedCount(): number;
        getUpsertedCount(): number;
        getUpsertedId(): Types.ObjectId;
        isAcknowledged(): boolean;
    }

    interface DeleteResult {
        getDeletedCount(): number;
        isAcknowledged(): boolean;
    }

    interface Cursor {
        all(): Object[];
        generator(): Object[];
    }

    interface FilterOptions extends Object {
        sort: Object,
        skip: number,
        limit: number,
        showRecordId: boolean,
        min: Object,
        max: Object
    }

    interface Collection {
        count(filter: Object): number;
        find(filter: Object, options?: FilterOptions): Cursor;
        findOne(filter: Object, options?: FilterOptions): Object;
        insertOne(document: Object): InsertOneResult;
        insertMany(documents: Object[]): InsertManyResult;
        updateOne(filter: Object, update: Object, options?: FilterOptions): UpdateResult;
        updateMany(filter: Object, update: Object, options?: FilterOptions): UpdateResult;
        deleteOne(filter: Object, options?: FilterOptions): DeleteResult;
        deleteMany(filter: Object, options?: FilterOptions): DeleteResult;
    }

    namespace Types {
        interface ObjectId {
            toString(): string;
        }
    }

    interface Types {
        ObjectId(id?: string): Types.ObjectId;
        regex(pattern: string, flags?: string): Object;
        date(milliseconds: number): Object;
    }

    interface Connection {
        collectionCreator(): CollectionCreator;
        dropCollection(name: string): { ok: number, errmsg?: string, nIndexesWas?: number, ns?: string };
        selectCollection(name: string): Collection;
        types(): Types;
    }

    interface ConnectorBuilder {
        setDSN(value: string): ConnectorBuilder;
        load(): Connection;
    }
}

```

### Http и его интерфейсы:
```ts
declare namespace Http {

    interface Cert {
        setPath(path: string): Cert;
        getPath(path: string): string;
        setPassphrase(passphrase: string): Cert;
    }


    interface AllowRedirects {
        setStatus(status: boolean): boolean;

        /**
         * Default is true
         */
        getStatus(): boolean;
        setMax(max: number): boolean;

        /**
         * Default is 5
         */
        getMax(): number;

        /**
         * This feature not realized
         */
        setStrict(strict: boolean): boolean;

        /**
         * Default is false
         */
        getStrict(): boolean;

        setWithReferer(withReferer: boolean): boolean;

        /**
         * Default is false
         */
        getWithReferer(): boolean;

        setProtocols(protocols: string[]): boolean;

        /**
         * Default is ["http", "https"]
         */
        getProtocols(): string[];
    }

    interface HttpAuth {
        setUser(user: string): HttpAuth;
        setPassword(password: string): HttpAuth;

        /**
         * @param type basic|digest|ntlm
         */
        setType(type: string): HttpAuth;
        setStatus(status: boolean): HttpAuth;
    }

    interface Options {
        setConnTimeout(seconds: number): boolean;
        getConnTimeout(): number;
        setReqTimeout(seconds: number): boolean;
        getReqTimeout(): number;
        setCanDecodeContent(value: boolean): boolean;
        getCanDecodeContent(): boolean;
        allowRedirects(): AllowRedirects;
        auth(): HttpAuth;

        /**
         * This feature not realized
         */
        cert(): Cert;
        verify(): Verify;
    }

    interface ResponseErrors {
        getCode(): number;
        getMessage(): string;
    }

    interface Response {
        headers(): ObjectOfStringArray;

        /**
         * Limit to first 50MB of response data
         */
        getStringData(): string;

        /**
         * Limit to parse first 50MB of response data
         */
        getStringDataLikeJson(): Object | boolean;
        getStatusCode(): number;
        isOk(): boolean;
        getErrors(): ResponseErrors;
    }

    interface Verify {
        /**
         * Default is TRUE
         * @param value
         */
        setStatus(value: boolean): boolean;

        /**
         * This feature not realized
         */
        setPath(path: string): boolean;
    }



}
```

export type ObjectOfStringArray = {
    [key: string]: string[];
}

export interface TypePeriod {
    tableTab(): Tab;
}

export interface ButtonInfoOptions {
    setLabel(label: string): ButtonInfoOptions;

    /**
     * PRIMARY|SECONDARY
     * @param style
     */
    setStyle(style: string): ButtonInfoOptions;
}

export interface ButtonInfo {
    /**
     * GENERAL|CLOSE
     * @param type
     */
    setType(type: string): ButtonInfo;
    options(): ButtonInfoOptions;
}

export interface ResultBaseAction {
    appendAfter(): this;
}

export interface EnvironmentInfo {
    set(key: string, value: any);
    get(key: string);
}

export interface ResultMacrosAction extends ResultBaseAction {
    setAutoRunTimeout(seconds: number): this;
    buttonInfo(): ButtonInfo;
    environmentInfo(): EnvironmentInfo;
}

export interface ResultOpenAction extends ResultBaseAction {
    buttonInfo(): ButtonInfo;
}

export interface ResultActionsInfo {
    makeMacrosAction(identifier: string | number): ResultMacrosAction;
    makeDashboardOpenAction(identifier: string | number): ResultOpenAction;
    makeContextTableOpenAction(identifier: string | number): ResultOpenAction;
    makeMulticubeViewOpenAction(multicube: string | number, view?: string | number | null): ResultOpenAction;
    makeListViewOpenAction(list: string | number, view?: string | number | null): ResultOpenAction;
}

export namespace WinAgent {

    export interface BaseActionResult {

    }

    export interface BaseAction {
        run(): BaseActionResult;
    }

    export interface RunMacroActionResult extends BaseActionResult {
        getFilePaths(): string[];
    }

    export interface RunMacroAction extends BaseAction {
        setMacroName(macroName: string): this;
        setMacroFilePath(macroFilePath: string): this;
        setDataFilePaths(dataFilePaths: string[]): this;
        run(): RunMacroActionResult;
    }

    export interface WinAgentBuilder {
        setCommandUrl(url: string): this;
        setDownloadUrl(url: string): this;
        auth(): Http.HttpAuth;
        makeRunMacrosAction(): RunMacroAction;
    }
}

export namespace Notifications {
    namespace Smtp {
        export interface Result {

        }

        export interface Builder {
            setTo(to: string | string[]): this;
            setSubject(subject: string): this;
            setBody(body: string): this;
            attachFiles(paths: string[]): this;
            send(): Result;
        }
    }

    export interface Manager {
        smtp(channel: string): Smtp.Builder;
    }
}




[Оглавление](../README.md)
