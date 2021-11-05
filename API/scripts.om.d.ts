/* eslint-disable */

export type ObjectOfStringArray = {
    [key: string]: string[];
}

export interface Cell {
    setValue(value: number | string | null | boolean);

    getValue(): number | string | null | boolean;

    getNativeValue(): number | string | null | boolean;

    //2.0 only
    getTextValue(): number | string | null;

    getContextValue(): string | null;

    definitions(): number[];

    columns(): LabelsGroup;

    rows(): LabelsGroup;

    dropDown(): Labels;

    getFormatType(): string;

    //2.0 only
    isEditable(): boolean;
}

export interface Cells {
    all(): Cell[];

    first(): Cell;

    setValue(value: number | string | null);

    count(): number;

    chunkInstance(): GridRangeChunk;

    getByIndexes(indexes: number[]): Cells | null;
}

export interface Label {
    longId(): number;

    name(): string;

    code(): string;

    alias(): string | null;

    label(): string | null;

    parentLongId(): number;
}

export interface LabelsGroup {
    all(): Label[];

    first(): Label;

    cells(): Cells;
}

export interface Labels {
    start(): number;

    count(): number;

    all(): LabelsGroup[];

    get(index: number): LabelsGroup | null;

    chunkInstance(): GridRangeChunk;

    findLabelByLongId(longId: number): Label | null;
}

export interface GridRangeChunk {
    cells(): Cells;

    rows(): Labels;

    columns(): Labels;
}

export interface GridRange {
    rowStart(): number;

    rowCount(): number;

    columnStart(): number;

    columnCount(): number;

    cellCount(): number;

    generator(size?: number): GridRangeChunk[];
}

export interface GridDimension {
    getDimensionEntity(): EntityInfo;
}

export interface GridPageSelector extends GridDimension {
    getSelectedEntity(): EntityInfo | null;
}

export interface GridDefinitionInfo {
    getPageSelectors(): GridPageSelector[];

    getRowDimensions(): GridDimension[];

    getColumnDimensions(): GridDimension[];
}

export interface Grid {
    range(rowStart?: number, rowCount?: number, columnStart?: number, columnCount?: number): GridRange;

    rowCount(): number;

    columnCount(): number;

    cellCount(): number;

    getDefinitionInfo(): GridDefinitionInfo;

    exporter(): Exporter;

    storageExporter(): StorageExporter;
}

export interface ExportResult {
    mergeToExternalExcelSheet(toFile: string, toSheet: string, fromSheet?: string): this;

    getHash(): string | null;

    copyToLocal(path: string): this;

    moveToLocal(path: string): this;
}

export interface Exporter {
    setEncoding(encoding: ExporterEncoding): this;

    setFormat(extension: ExporterFileExtension): this;

    setOmitSummaryRows(omitSummaryRows: boolean): this;

    setOmitEmptyRows(omitEmptyRows: boolean): this;

    setIncludeCodes(includeCodes: boolean): this;

    setMappingForFlexibleImport(mappingForFlexibleImport: boolean): this;

    setMappingForAdvancedImport(mappingForAdvancedImport: boolean): this;

    setFileName(fileName: string): this;

    setDelimiter(delimiter: ExporterCsvDelimiter): this;

    setEnclosure(enclosure: ExporterCsvEnclosure): this;

    setEscape(escape: ExporterCsvEscape): this;

    setShowAliasesWithoutNames(showAliasesWithoutNames: boolean): this;

    setUseCodeLikeLabels(useCodeLikeLabels: boolean): this;

    export(): ExportResult;
}

export interface Pivot {
    create(): Grid;

    rowsFilter(data: string[] | string | number | number[]): Pivot;

    columnsFilter(data: string[] | string | number | number[]): Pivot;

    withoutValues(): Pivot;

    addDependentContext(identifier: number): Pivot
}

export interface NumericElementsCreator {
    setCount(count: number): NumericElementsCreator;

    setPositionAfter(relativeLongId: number): NumericElementsCreator;

    setPositionBefore(relativeLongId: number): NumericElementsCreator;

    setPositionStart(): NumericElementsCreator;

    setPositionEnd(): NumericElementsCreator;

    setPositionChildOf(parentLongId: number): NumericElementsCreator;

    create(): number[];
}

export interface ElementsCreator {
    numeric(): NumericElementsCreator;
}

export interface ElementsDeleter {
    appendIdentifier(identifier: number): ElementsDeleter;

    delete(): ElementsDeleter;
}

export interface ElementsReorder {
    append(longId: number, relativeLongId: number, position: string): ElementsReorder;

    reorder(): ElementsReorder;

    count(): number;

    reverse(): ElementsReorder;
}

export interface Tab {
    pivot(viewName?: string): Pivot;

    open(name: string): Tab;

    elementsCreator(): ElementsCreator;

    elementsDeleter(): ElementsDeleter;

    elementsReorder(): ElementsReorder;

    importer(): Importer;

    storageImporter(): StorageImporter;
}

export interface Environment {
    load(name: string): Environment;
    
    loadFromMulticube(name: string, view?: string | null): Environment;

    get(key: string, def?: any): any;

    set(name: string, value: unknown): Environment;
}

export interface CubeCell {
    definitions(): number[];

    getDimensionIds(): number[];

    getDimensionItems(): EntityInfo[];

    getValue(): number | string | null | boolean;
}

export interface CubeCellSelector {
    getCubeInfo(): CubeInfo;

    getCubeIdentifier(): number;

    getCubeDimensions(): EntityInfo[];

    // @ts-ignore
    generator(): IterableIterator<CubeCell>;
}

export interface CubeCellSelectorBuilder {
    setFormula(formula: string): this;

    load(): CubeCellSelector;
}

export interface CubeCellUpdater {
    getCount(): number;
}

export interface CubeCellUpdaterBuilder {
    setConditionFormula(formula: string): this;

    setFormula(formula: string): this;

    load(): CubeCellUpdater;
}

export interface CubeFormatInfo {
    getFormatTypeEntity(): EntityInfo;

    getDimensionEntity(): EntityInfo | null;
}

export interface CubeInfo extends EntityInfo {
    getFormula(): string | null;

    getFormatInfo(): CubeFormatInfo;

    getDimensions(): EntityInfo[];
}

export interface StorageExporter extends Exporter {
    setLineDelimiter(lineDelimiter: string): Exporter;

    setFilterFormula(filterFormula: string): this;

    setDecimalSeparator(decimalSeparator: string): this;

    setDateFormat(dateFormat: string): this;

    setBooleanCubeIdentifier(booleanCubeIdentifier: number): this;
}

interface SyncResult {
    getReportPath(): string;
}

interface SyncBuilder {
    /**
     * @param modelId Source model string identifier or name
     */
    setSrcModelId(modelId: string): SyncBuilder;

    /**
     * @param modelId Destination model string identifier or name
     */
    setDestModelId(modelId: string): SyncBuilder;

    /**
     * @param entityId Source entity identifier
     */
    setSrcEntityId(entityId: number): SyncBuilder;

    /**
     * @param entityId Destination entity identifier
     */
    setDestEntityId(entityId: number): SyncBuilder;

    setFilters(filters: Record<string, string[]>): SyncBuilder;

    sync(): SyncResult;
}

interface SyncMulticubeBuilder extends SyncBuilder {
    setOmitEmptyRows(status: boolean): SyncMulticubeBuilder;

    setOmitSummaryRows(status: boolean): SyncMulticubeBuilder;

    setUseCodeInsteadLabel(status: boolean): SyncMulticubeBuilder;
}

interface SyncListBuilder extends SyncBuilder {
    setViewId(viewId: number): SyncListBuilder;

    setSrcToDesListMap(map: {
        srcId: number,
        destId: number,
    }[]): SyncListBuilder;

    setProxySrcColumnDataMap(map: {
        fromName: string;
        toName: string;
    }[]): SyncListBuilder;

    /**
     * @param format Values: XLSX|CSV, Default: CSV
     */
    setReportFileFormat(format: string): SyncListBuilder;
}

interface CubesTab extends Tab {

}

export interface MulticubeTab extends Tab {
    cleanCellsData(cubesIdentifiers?: number[]): MulticubeTab;

    cubeCellSelector(identifier: string | number): CubeCellSelectorBuilder;

    cubeCellUpdater(identifier: string | number): CubeCellUpdaterBuilder;

    getCubeInfo(identifier: string | number): CubeInfo;
    
    cubesTab(): CubesTab;
}

export interface MulticubesTab extends Tab {
    open(name: string): MulticubeTab;
}

export interface Multicubes {
    multicubesTab(): MulticubesTab;
    
    syncMulticube(): SyncMulticubeBuilder;
}

export interface TypePeriod {
    tableTab(): Tab;
}

export interface Times {
    optionsTab(): TimeOptionsTab;

    typePeriod(identifier: string | number): TypePeriod;
}

export interface TimeOptionsTab extends Tab {
    resetForm(): any;

    applyForm(): any;
}

export interface VersionsTab extends Tab {
    copyVersion(from: string, to: string): any;
}

export interface Versions {
    versionsTab(): VersionsTab
}

export interface CSVParams {
    setDelimiter(delimiter: string): CSVParams;

    getDelimiter(): string;

    setEnclosure(enclosure: string): CSVParams;

    getEnclosure(): string;

    setEscape(escape: string): CSVParams;

    getEscape(): string;

    setLineDelimiter(escape: string): CSVParams;

    getLineDelimiter(): string;
}

export interface Importer {
    csv(): CSVParams;

    setFilePath(path: string): this;

    getFilePath(): string;

    getReportFilePath(): string | null;

    import(): this;
}

export interface StorageImporter extends Importer {
    setMaxFailures(maxFailures: number): this;

    setIsCompressed(isCompressed: boolean): this;

    setEncoding(encoding: string): this;

    setDateFormat(dateFormat: string): this;
}

export interface ListImporter extends Importer {
    setFilePath(path: string): this;

    setObligatoryListCodes(obligatoryListCodes: boolean): this

    getObligatoryListCodes(): boolean;

    setImportToChildListOnly(importToChildListOnly: boolean): this;

    getImportToChildListOnly(): boolean;

    setUpdatedPropertiesOnParentLevels(updatedPropertiesOnParentLevels: boolean): this;

    getUpdatedPropertiesOnParentLevels(): boolean;
}

interface CustomPropertiesTab extends Tab {

}

export interface ListTab extends Tab {
    listSubsetTab(): ListSubsetsTab;
    
    customPropertiesTab(): CustomPropertiesTab;

    importer(): ListImporter;
}

export interface ListSubsetsTab extends Tab {
    listTab(): ListTab;
}

export interface ListsTab extends Tab {
    open(name: string): ListTab;
}

export interface Lists {
    listsTab(): ListsTab;
    
    syncList(): SyncListBuilder;
}

export interface CellBuffer {
    set(cell: Cell | CubeCell, value: number | string | null): CellBuffer;

    apply(): CellBuffer;

    count(): number;

    canLoadCellsValues(value: boolean): CellBuffer;
}

export interface RequestManager {
    log(message: string, print?: boolean): RequestManager;

    logStatusMessage(message: string, print?: boolean): RequestManager;

    setStatusMessage(message: string): RequestManager;
}

export interface UserInfo {
    getEntity(): EntityInfo;

    getEmail(): string;

    getFirstName(): string;

    getLastName(): string;

    getRole(): EntityInfo;
}

interface ExportObfuscationState {
    setPath(path: string): ExportObfuscationState;

    setEmailWhiteList(emailWhiteList: string[]): ExportObfuscationState;

    /**
     * Default: BIN
     * @param type TXT|BIN
     */
    setDataArchiveType(type: string): ExportObfuscationState;

    export(): boolean;
}

export interface ModelInfo {
    id(): string;

    name(): string;

    lastSyncDate(): number;

    autoCalcStatus(): boolean;

    setModelCalculationMode(status: boolean): boolean;

    repair(): boolean;

    recalculate(): boolean;

    backup(path: string): boolean;
    
    exportObfuscationState(): ExportObfuscationState;
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
    
    /**
     * @param modelId Model string identifier or name
     */
    setModelId(modelId: string): this;
}

export interface EnvironmentInfo {
    set(key: string, value: any): EnvironmentInfo;

    get(key: string): any;
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

export interface ResultInfo {
    addFileHash(hash: string): this;

    actionsInfo(): ResultActionsInfo;

    setProperty(name: string, value: any): this;
}

export type EntityInfo = Label

export interface EntitiesInfo {
    get(longId: number): EntityInfo | null;

    getCollection(longId: number[]): EntityInfo[];
}

export interface CopyData {
    setSourceLongId(longId: number): CopyData;

    setDestLongId(longId: number): CopyData;

    enableCopyAllCubes(): CopyData;

    enableCustomProperties(): CopyData;

    setMulticubeLongIds(longIds: number[]): CopyData;

    setMulticubeByNames(names: string[]): CopyData;

    copy(): CopyData;
}

export interface Common {
    createCellBuffer(): CellBuffer;

    requestInfo(): RequestManager;

    modelInfo(): ModelInfo;

    userInfo(): UserInfo;

    resultInfo(): ResultInfo;

    entitiesInfo(): EntitiesInfo;

    copyData(): CopyData;
}

export interface FileMeta {
    type: string;
    path: string;
    visibility: string;
    size: number;
    dirname: string;
    basename: string;
    extension: string;
    filename: string;
    timestamp: number;
}

export interface Filesystem {
    has(path: string): boolean;

    read(path: string): string;

    readAndDelete(path: string): string;

    write(path: string, contents: string): boolean;

    delete(path: string): boolean;

    rename(from: string, to: string): boolean;

    copy(from: string, to: string): boolean;

    getTimestamp(path: string): number;

    getSize(path: string): number | false;

    createDir(path: string): boolean;

    deleteDir(path: string): boolean;

    listContents(path: string, recursive: boolean): FileMeta[];

    getMetadata(path: string): object;

    upload(from: string, to: string): boolean;

    download(from: string, to: string): boolean;

    makeGlobalFile(name: string, extension: string, path: string, copy?: boolean): string;

    getPathObj(path: string): PathObj;
}

export interface PathObj {
    getSystem(): Filesystem;

    getPath(): string;
}

export interface BaseAdapter {
    load(): Filesystem;
}

export interface FTPAdapter extends BaseAdapter {
    setHost(host: string): FTPAdapter;

    getHost(): string;

    setPort(port: number): FTPAdapter;

    getPort(): number;

    setUsername(username: string): FTPAdapter;

    getUsername(): string;

    setPassword(password: string): FTPAdapter;

    getPassword(): string;

    setRoot(root: string): FTPAdapter;

    getRoot(): string;

    setPassive(passive: boolean): FTPAdapter;

    getPassive(): boolean;

    setSsl(ssl: boolean): FTPAdapter;

    getSsl(): boolean;

    setTimeout(timeout: number): FTPAdapter;

    getTimeout(): number;

    setUseListOptions(useListOptions: boolean): FTPAdapter;

    getUseListOptions(): boolean;
}

export interface CsvReader {
    params(): CSVParams;

    /**
     * UTF-8, WINDOWS-1251
     * @param charset
     */
    changeFileCharset(charset: string): CsvReader;

    generator(): string[][];
}

export interface CsvWriter {
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

export interface BaseConverter {
    setSource(path: string): this;

    convert(): string;
}

export interface ExcelToCsvConverter extends BaseConverter {
    setSheetIdentifier(identifier: string | number): this;
}

export interface ConverterManager {
    excelToCsv(): ExcelToCsvConverter
}

export interface FilesDataManager {
    csvWriter(): CsvWriter;

    csvReader(path: PathObj): CsvReader;

    converterManager(): ConverterManager;
}

export interface Filesystems {
    ftp(): FTPAdapter;

    local(): Filesystem;

    sharedFolder(id: string): Filesystem;

    filesDataManager(): FilesDataManager;
}

export interface OptimizationRequestTab extends Tab {
    run(name: string): { success: boolean, error: undefined | string };
}

export interface Optimization {
    optimizationRequestsTab(): OptimizationRequestTab
}

export interface SqlQueryResult {
    count(): number;

    generator(likeArray?: boolean): object[] | string[][];

    all(): object[];

    first(): object | null;

    column(columnName: string): string[];

    cell(columnName: string, rowIndex?: number): string | null;

    updated(): number;

    lastId(): number | string;
}

export interface SqlQueryBuilder {
    execute(sql: string, bindings?: object | (string | number | boolean | null)[]): SqlQueryResult;
}

export interface SqlConnection {
    qb(): SqlQueryBuilder;
}

export interface SqlConnectorBuilder {
    setHost(value: string): this;

    setPort(value: number): this;

    setUsername(value: string): this;

    setPassword(value: string): this;

    setDatabase(value: string): this;

    load(): SqlConnection;
}

export interface SqlBulkCopyResult {
    hasErrors(): boolean;

    getErrorOutput(): string;

    getOutput(): string;

    getCommand(): string;
}

export interface SqlBulkCopyBuilder {
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

export interface OracleConnectorBuilder extends SqlConnectorBuilder {
    setServiceName(value: string): this;

    setSchema(value: string): this;

    setTNS(value: string): this;
}

export interface MicrosoftSqlConnectorBuilder extends SqlConnectorBuilder {
    /**
     * @param name DBLIB|ODBC|SQLSRV
     */
    setDriver(name: string): this;

    /**
     * https://docs.microsoft.com/ru-ru/sql/tools/bcp-utility
     */
    loadBulkCopyBuilder(): SqlBulkCopyBuilder;
}

export namespace Mongodb {

    export interface CollectionCreator {
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

    export interface InsertOneResult {
        getInsertedCount(): number;

        getInsertedId(): Types.ObjectId;

        isAcknowledged(): boolean;
    }

    export interface InsertManyResult {
        getInsertedCount(): number;

        getInsertedIds(): Types.ObjectId[];

        isAcknowledged(): boolean;
    }

    export interface UpdateResult {
        getMatchedCount(): number;

        getModifiedCount(): number;

        getUpsertedCount(): number;

        getUpsertedId(): Types.ObjectId;

        isAcknowledged(): boolean;
    }

    export interface DeleteResult {
        getDeletedCount(): number;

        isAcknowledged(): boolean;
    }

    export interface Cursor {
        all(): object[];

        generator(): object[];
    }

    export interface FilterOptions extends Object {
        sort: object,
        skip: number,
        limit: number,
        showRecordId: boolean,
        min: number,
        max: number
    }

    export interface Collection {
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

    export namespace Types {
        export interface ObjectId {
            toString(): string;
        }
    }

    export interface Types {
        objectId(id?: string): Types.ObjectId;

        regex(pattern: string, flags?: string): object;

        date(milliseconds: number): object;
    }

    export interface Connection {
        collectionCreator(): CollectionCreator;

        dropCollection(name: string): { ok: number, errmsg?: string, nIndexesWas?: number, ns?: string };

        selectCollection(name: string): Collection;

        types(): Types;
    }

    export interface ConnectorBuilder {
        setDSN(value: string): ConnectorBuilder;

        load(): Connection;
    }
}

export namespace Http {

    export interface Params {
        getAll(): object;

        setAll(pairs: object): boolean;

        get(name: string): any;

        set(name: string, value: any): boolean;

        del(name: string): boolean;

        has(name: string): boolean;

        clear(): boolean;
    }
    export interface UrlParams extends Params {
        // NONE|RFC1738|RFC3986
        setEncodingType(type: string): UrlParams;

        getEncodingType(): string;

        stringify(): string;
    }

    export interface JsonRequestBody {
        setJson(value: string | object): boolean;
    }

    export interface StringRequestBody {
        setBody(value: string): boolean;
    }

    export interface FormRequestBody {
        params(): Params;
    }

    export interface RequestBody {
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

    export interface Cert {
        setPath(path: string): Cert;

        getPath(path: string): string;

        setPassphrase(passphrase: string): Cert;
    }

    export interface Url {
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

    export interface AllowRedirects {
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

    export interface HttpAuth {
        setUser(user: string): HttpAuth;

        setPassword(password: string): HttpAuth;

        /**
         * @param type basic|digest|ntlm
         */
        setType(type: string): HttpAuth;

        setStatus(status: boolean): HttpAuth;
    }

    export interface Options {
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

    export interface ResponseErrors {
        getCode(): number;

        getMessage(): string;
    }

    export interface Response {
        headers(): ObjectOfStringArray;

        /**
         * Limit to first 50MB of response data
         * @param length Default 100MB
         * @param catchEof Default true
         */
        getStringData(length?: number, catchEof?: boolean): string;

        /**
         * Limit to parse first 50MB of response data
         */
        getStringDataLikeJson(): object | boolean;

        /**
         * @param length Default 1MB
         */
        getStringDataGenerator(length?: number): null | string;

        /**
         * @param length Default 1MB
         */
        getBinaryDataGenerator(length?: number): null | string;

        getStatusCode(): number;

        isOk(): boolean;

        getErrors(): ResponseErrors;
    }

    export interface Verify {
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

    export interface RequestBuilder {
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

    export interface HttpManager {
        requestBuilder(): RequestBuilder;

        urlEncode(value: string): string | boolean;

        urlDecode(value: string): string | boolean;

        base64Encode(value: string): string | boolean;

        base64Decode(value: string): string | boolean;
    }
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
        
        /**
         * @param sec Default value is 10 sec
         */
        setConnectTimeout(sec: number): this;

        /**
         * @param sec Default value is 600 sec
         */
        setRequestTimeout(sec: number): this;

        /**
         * @param sec Default value is 150 sec
         */
        setOperationTimeout(sec: number): this;

        makeRunMacrosAction(): RunMacroAction;
    }
}

interface MysqlImportResult {
    hasErrors(): boolean;

    getErrorOutput(): string;

    getOutput(): string;

    getCommand(): string;

    getConfig(): string;

    getStats(): object;
}

interface MysqlImportBuilder {
    setTable(name: string): MysqlImportBuilder;

    setDelimiter(delimiter: string): MysqlImportBuilder;

    setLineDelimiter(delimiter: string): MysqlImportBuilder;

    setEnclosure(enclosure: string): MysqlImportBuilder;

    setEscape(escape: string): MysqlImportBuilder;

    setThreads(threads: number): MysqlImportBuilder;

    setVerbose(verbose: boolean): MysqlImportBuilder;

    setFirstIgnoreLines(count: number): MysqlImportBuilder;

    setLockTable(status: boolean): MysqlImportBuilder;

    setForce(status: boolean): MysqlImportBuilder;

    setDeleteAllRows(status: boolean): MysqlImportBuilder;

    setCompress(status: boolean): MysqlImportBuilder;

    setIgnoreDuplicates(status: boolean): MysqlImportBuilder;

    setReplace(status: boolean): MysqlImportBuilder;

    setColumns(names: string[]): MysqlImportBuilder;

    setFilePath(path: string): MysqlImportBuilder;

    import(): MysqlImportResult;
}

interface MysqlConnectorBuilder extends SqlConnectorBuilder {
    loadImportBuilder(): MysqlImportBuilder;
}

export interface Connectors {
    mysql(): MysqlConnectorBuilder;

    postgresql(): SqlConnectorBuilder;

    sqlServer(): MicrosoftSqlConnectorBuilder;

    oracle(): OracleConnectorBuilder;

    mongodb(): Mongodb.ConnectorBuilder;

    http(): Http.HttpManager;

    /**
     * @param builtIn Use built-in configuration if exists. Default is 'false'
     */
    winAgent(builtIn?: boolean): WinAgent.WinAgentBuilder;
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

export interface OM {
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

export var om: OM;
