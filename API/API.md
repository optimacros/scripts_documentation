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
1. [Окружение, модель, пользователь](env.md)
1. [Нотификация пользователей](userNotification.md)
    1. SMTP

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
Ссылка на интерфейс Connectors.


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

### Интерфейс UserInfo ...<a name="UserInfo"></a>
```ts
interface UserInfo {
    getEntity(): EntityInfo;
    getEmail(): string;
    getFirstName(): string;
    getLastName(): string;
    getRole(): EntityInfo;
}
```

### Интерфейс ModelInfo ...<a name="ModelInfo"></a>
```ts
interface ModelInfo {
    id(): number;
    name(): string;
    lastSyncDate(): number;
    autoCalcStatus(): boolean;
    setModelCalculationMode(status: boolean): boolean;
    repair(): boolean;
    recalculate(): boolean;
    backup(path: string): boolean;
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

### Интерфейс CsvReader ...<a name="CsvReader"></a>
```ts
interface CsvReader {
    params(): CSVParams;

    /**
     * UTF-8, WINDOWS-1251
     * @param charset
     */
    changeFileCharset(charset: string): CsvReader;

    generator(): [][];
}
```

### Интерфейс CsvWriter ...<a name="CsvWriter"></a>
```ts
interface CsvWriter {
    params(): CSVParams;
    writeRow(row: string[]): CsvWriter;
    writeRows(rows: string[][]): CsvWriter;

    /**
     *
     * @param name
     * @param charset UTF-8, WINDOWS-1251
     */
    save(name: string, charset?: string): string;
}
```

### Интерфейс BaseConverter ...<a name="BaseConverter"></a>
```ts
interface BaseConverter {
    setSource(path: string): this;
    convert(): string;
}
```

### Интерфейс ExcelToCsvConverter ...<a name="ExcelToCsvConverter"></a>
```ts
interface ExcelToCsvConverter extends BaseConverter {
    setSheetIdentifier(identifier: string | number): this;
}
```

### Интерфейс ConverterManager ...<a name="ConverterManager"></a>
```ts
interface ConverterManager {
    excelToCsv(): ExcelToCsvConverter
}
```

### Интерфейс FilesDataManager ...<a name="FilesDataManager"></a>
```ts
interface FilesDataManager {
    csvWriter(): CsvWriter;
    csvReader(path: PathObj): CsvReader;
    converterManager(): ConverterManager;
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


### Интерфейс SqlQueryResult ...<a name="SqlQueryResult"></a>
```ts
interface SqlQueryResult {
    count(): number;
    generator(likeArray?: boolean): object[];
    all(): object[];
    first(): object;
    column(columnName: string): any[];
    cell(columnName: string, rowIndex?: number): number | string | boolean | null;
    updated(): number;
    lastId(): number;
}
```

### Интерфейс SqlQueryBuilder ...<a name="SqlQueryBuilder"></a>
```ts
interface SqlQueryBuilder {
    execute(sql: string, bindings?: object): SqlQueryResult;
}
```

### Интерфейс SqlConnection ...<a name="SqlConnection"></a>
```ts
interface SqlConnection {
    qb(): SqlQueryBuilder;
}
```

### Интерфейс SqlConnectorBuilder ...<a name="SqlConnectorBuilder"></a>
```ts
interface SqlConnectorBuilder {
    setHost(value: string): this;
    setPort(value: number): this;
    setUsername(value: string): this;
    setPassword(value: string): this;
    setDatabase(value: string): this;
    /**
     * https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility
     */
    loadBulkCopyBuilder(): SqlBulkCopyBuilder;
    load(): SqlConnection;
}
```

### Интерфейс SqlBulkCopyResult ...<a name="SqlBulkCopyResult"></a>
```ts
interface SqlBulkCopyResult {
    hasErrors(): boolean;
    getErrorOutput(): string;
    getOutput(): string;
    getCommand(): string;
}
```

### Интерфейс SqlBulkCopyBuilder ...<a name="SqlBulkCopyBuilder"></a>
```ts
interface SqlBulkCopyBuilder {
    /**
     * -S
     * @param value
     */
    setServerName(value: string): this;

    /**
     * Port is part of server name
     * @param value
     */
    setPort(value: number): this;

    /**
     * -U
     * @param value
     */
    setUsername(value: string): this;

    /**
     * -P
     * @param value
     */
    setPassword(value: string): this;

    /**
     * -d
     * @param value
     */
    setDatabase(value: string): this;

    /**
     * Query for export or table query string for import
     * @param value
     */
    setQuery(value: string): this;

    /**
     * -a
     * @param size
     */
    setPacketSize(size: number): this;

    /**
     * -b
     * @param size
     */
    setBatchSize(size: number): this;

    /**
     * -c
     * @param status
     */
    setCharacterTypesMode(status: boolean): this;

    /**
     * -C
     * @param code
     */
    setCodePage(code: string): this;

    /**
     * -D
     * @param status
     */
    setDsnMode(status: boolean): this;

    /**
     * -e
     * @param path
     */
    setErrorFile(path: string): this;

    /**
     * -E
     * @param status
     */
    setKeepIdentityValuesMode(status: boolean): this;

    /**
     * -f
     * @param path
     */
    setFormatFile(path: string): this;

    /**
     * -F
     * @param index
     */
    setFirstRow(index: number): this;

    /**
     * -h
     * @param hint
     */
    setHint(hint: string): this;

    /**
     * -i
     * @param path
     */
    setStandardInputFile(path: string): this;

    /**
     * -k
     * @param status
     */
    setKeepNullValuesMode(status: boolean): this;

    /**
     * -l
     * @param timeout
     */
    setLoginTimeout(timeout: number): this;

    /**
     * -L
     * @param index
     */
    setLastRow(index: number): this;

    /**
     * -m
     * @param size
     */
    setMaxErrors(size: number): this;

    /**
     * -n
     * @param status
     */
    setNativeTypesMode(status: boolean): this;

    /**
     * -N
     * @param status
     */
    setKeepNonTextNativeValuesMode(status: boolean): this;

    /**
     * -o
     * @param path
     */
    setOutputFile(path: string): this;

    /**
     * -q
     * @param status
     */
    setQuotedIdentifiersMode(status: boolean): this;

    /**
     * -r
     * @param term
     */
    setRowTerm(term: string): this;

    /**
     * -R
     * @param status
     */
    setRegionalMode(status: boolean): this;

    /**
     * -t
     * @param term
     */
    setFieldTerm(term: string): this;

    /**
     * -T
     * @param status
     */
    setTrustedConnectionMode(status: boolean): this;

    /**
     * -w
     * @param status
     */
    setWideCharacterTypesMode(status: boolean): this;

    import(path: string): SqlBulkCopyResult;

    export(path: string): SqlBulkCopyResult;

    /**
     * @param path
     * @param xml Default is true
     */
    format(path: string, xml: boolean): SqlBulkCopyResult;
}
```

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
        all(): object[];
        generator(): object[];
    }

    interface FilterOptions extends Object {
        sort: object,
        skip: number,
        limit: number,
        showRecordId: boolean,
        min: object,
        max: object
    }

    interface Collection {
        count(filter: object): number;
        find(filter: object, options?: FilterOptions): Cursor;
        findOne(filter: object, options?: FilterOptions): object;
        insertOne(document: object): InsertOneResult;
        insertMany(documents: object[]): InsertManyResult;
        updateOne(filter: object, update: object, options?: FilterOptions): UpdateResult;
        updateMany(filter: object, update: object, options?: FilterOptions): UpdateResult;
        deleteOne(filter: object, options?: FilterOptions): DeleteResult;
        deleteMany(filter: object, options?: FilterOptions): DeleteResult;
    }

    namespace Types {
        interface ObjectId {
            toString(): string;
        }
    }

    interface Types {
        objectId(id?: string): Types.ObjectId;
        regex(pattern: string, flags?: string): object;
        date(milliseconds: number): object;
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
    interface Params {
        getAll(): object;
        setAll(pairs: object): boolean;
        get(name: string): any;
        set(name: string, value: any): boolean;
        del(name: string): boolean;
        has(name: string): boolean;
        clear(): boolean;
    }

    interface UrlParams extends Params {
        stringify(): string;
    }

    interface JsonRequestBody {
        setJson(value: string | object): boolean;
    }

    interface StringRequestBody {
        setBody(value: string): boolean;
    }

    interface FormRequestBody {
        params(): Params;
    }

    interface RequestBody {
        /**
         * Content-Type: application/json
         */
        jsonBody(): JsonRequestBody;

        /**
         * Content-Type: application/x-www-form-urlencoded
         */
        formBody(): FormRequestBody;
        stringBody(): StringRequestBody;
    }

    interface Cert {
        setPath(path: string): Cert;
        getPath(path: string): string;
        setPassphrase(passphrase: string): Cert;
    }

    interface Url {
        setUrl(url: string): boolean;
        getUrl(): string;
        setUrlPath(path: string): boolean;
        getUrlPath(): string;
        getUrlScheme(): string;
        setUrlScheme(scheme: string): boolean;
        getHost(): string;
        setHost(host: string): boolean;
        getPort(): number | null;
        setPort(port: number | string): boolean;
        setUser(user: string): boolean;
        getUser(): string;
        setPassword(password: string): boolean;
        getPassword(): string | null;
        setFragment(fragment: string): boolean;
        getFragment(): string | null;
        params(): UrlParams;
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
        getStringDataLikeJson(): object | boolean;
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

    interface RequestBuilder {
        url(): Url;

        /**
         *
         * @param type GET|POST|DELETE|PUT|HEAD|OPTIONS
         */
        setMethod(type: string): boolean;
        getMethod(): string;
        body(): RequestBody;
        options(): Options;
        cookies(): Params;
        headers(): Params;
        send(): Response;
    }

    interface HttpManager {
        requestBuilder(): RequestBuilder;
        urlEncode(value: string): string | boolean;
        urlDecode(value: string): string | boolean;
        base64Encode(value: string): string | boolean;
        base64Decode(value: string): string | boolean;
    }
}
```

### Интерфейс Connectors ...<a name="Connectors"></a>
```ts
interface Connectors {
    mysql(): SqlConnectorBuilder;
    postgresql(): SqlConnectorBuilder;
    sqlServer(): SqlConnectorBuilder;
    oracle(): OracleConnectorBuilder;
    mongodb(): Mongodb.ConnectorBuilder;
    http(): Http.HttpManager;
		
    /**
     * @param builtIn Use built-in configuration if exists. Default is 'false'
     */
    winAgent(builtIn?: boolean): WinAgent.WinAgentBuilder;
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

export interface OracleConnectorBuilder extends SqlConnectorBuilder {
    setServiceName(value: string): this;
    setSchema(value: string): this;
    setTNS(value: string): this;
}

export interface MicrosoftSqlConnectorBuilder extends SqlConnectorBuilder {
    /**
     * @param name DBLIB|ODBC|SQLSRV
     */
    setDriver(name: string | null): this;

    /**
     * https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility
     */
    loadBulkCopyBuilder(): SqlBulkCopyBuilder;
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
