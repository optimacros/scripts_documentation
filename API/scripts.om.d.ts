/* eslint-disable */

export type ObjectOfStringArray = {
    [key: string]: string[];
}

export type StringMap = {
    [key: string]: string;
};

export interface Cell {
    setValue(value: number | string | boolean | null);

    /**
     * returns {number | string | null} boolean cube values are returned as strings 'true'/'false'
     */
    getValue(): number | string | null;

    getNativeValue(): number | string | null;

    //2.0 only
    getTextValue(): number | string | null;

    getContextValue(): string | null;

    definitions(): number[];

    columns(): LabelsGroup | undefined;

    rows(): LabelsGroup | undefined;

    dropDown(): Labels;

    getFormatType(): string;

    isEditable(): boolean;
}

export interface Cells {
    all(): Cell[];

    first(): Cell | undefined;

    setValue(value: number | string | null);

    count(): number;

    chunkInstance(): GridRangeChunk;

    getByIndexes(indexes: number[]): Cells | null;
}

export interface Label {
    longId(): number;

    name(): string | null;

    code(): string | null;

    alias(): string | null;

    label(): string | null;

    parentLongId(): number;

    hierarchyLongId(): number;
}

export interface LabelsGroup {
    all(): Label[];

    first(): Label;

    cells(): Cells;
}

export interface Labels {
    start(): number;

    count(): number;

    all(): (LabelsGroup | undefined)[];

    get(index: number): LabelsGroup | undefined;

    chunkInstance(): GridRangeChunk;

    findLabelByLongId(longId: number): Label | undefined;
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
    getDimensionEntity(): EntityInfo | undefined;
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

    getHash(): string;

    copyToLocal(path: string): this;

    moveToLocal(path: string): this;
}

export const enum ExporterEncoding {
    UTF = 'utf',
    WINDOWS1251 = 'win'
}

export const enum ExporterFileExtension {
    CSV = 'csv',
    XLS = 'xls',
    XLSX = 'xlsx',
    TXT = 'txt',
    ZIP = 'zip'
}

export const enum ExporterCsvDelimiter {
    COMMA = ',',
    SEMICOLON = ';',
    TAB = '\t'
}

export const enum ExporterCsvEnclosure {
    DOUBLE_QUOTE = '"',
    SINGLE_QUOTE = "'"
}

export const enum ExporterCsvEscape {
    BACKSLASH = '\\',
    DOUBLE_QUOTE = '"'
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

    rowsFilter(data: string | string[] | number | number[]): Pivot;
    
    columnsFilter(data: string | string[] | number | number[]): Pivot;

    withoutValues(): Pivot;

    addDependentContext(identifier: number): Pivot
}

export interface BaseElementsCreator {
    setPositionAfter(relativeLongId: number): this;

    setPositionBefore(relativeLongId: number): this;

    setPositionStart(): this;

    setPositionEnd(): this;

    setPositionChildOf(parentLongId: number): this;

    create(): number[];
}

export interface NumericElementsCreator extends BaseElementsCreator {
    setCount(count: number): this;
}

export interface NamedElementsCreator extends BaseElementsCreator {
    setElementNames(names: string[]): this;
}

export interface ElementsCreator {
    numeric(): NumericElementsCreator;
    named(): NamedElementsCreator;
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

    open(name: string): Tab | undefined;

    elementsCreator(): ElementsCreator;

    elementsDeleter(): ElementsDeleter;

    elementsReorder(): ElementsReorder;

    importer(): Importer;

    storageImporter(): StorageImporter;
}

export interface Environment {
    load(name: string): this;
    
    loadFromMulticube(name: string, view?: string | null): this;

    get(key: string, def?: any): any;

    set(name: string, value: unknown): this;
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

    setStartCell(longIds: number[]): this;

    setMaxCount(count: number): this;

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
    getFormatTypeEntity(): EntityInfo | undefined;

    getDimensionEntity(): EntityInfo | undefined;
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

export interface SyncResult {
    getReportPath(): string;
}

export interface SyncBuilder {
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

    setMappings(mappings: ImportMappings): SyncBuilder;

    sync(): SyncResult;
}

export interface ImportMappings {
    dimensionMapping?: SimpleMapping[];
    cubeMapping?: SimpleMapping[];
    namespaceMapping?: SimpleMapping[];
    additionalDimensionMapping?: AdditionalDimensionMapping[];
    dimensionItemMapping?: DimensionItemMapping[];
}

export interface SimpleMapping {
    from: string;
    to: string;
}

export interface AdditionalDimensionMapping {
    dimensionName: string;
    dimensionItemName: string;
}

export interface DimensionItemMapping {
    dimensionName: string;
    dimensionItemMap: StringMap;
}

export interface SyncMulticubeBuilder extends SyncBuilder {
    setOmitEmptyRows(status: boolean): SyncMulticubeBuilder;

    setOmitSummaryRows(status: boolean): SyncMulticubeBuilder;

    setUseCodeInsteadLabel(status: boolean): SyncMulticubeBuilder;
}

export interface SyncListBuilder extends SyncBuilder {
    setViewId(viewId: number): SyncListBuilder;

    setSrcToDesListMap(map: {
        sourceListLongId: number,
        destinationListLongId: number,
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

export interface CubesTab extends Tab {
    elementsCreator(): ElementsCreator;
    elementsDeleter(): ElementsDeleter;
    elementsReorder(): ElementsReorder;
}

export interface MulticubeTab extends Tab {
    cleanCellsData(cubesIdentifiers?: number[]): MulticubeTab;

    cubeCellSelector(identifier: string | number): CubeCellSelectorBuilder;

    cubeCellUpdater(identifier: string | number): CubeCellUpdaterBuilder;

    getCubeInfo(identifier: string | number): CubeInfo;
    
    cubesTab(): CubesTab;
}

export interface MulticubesTab extends Tab {
    open(name: string): MulticubeTab | undefined;
    elementsCreator(): ElementsCreator;
    elementsDeleter(): ElementsDeleter;
    elementsReorder(): ElementsReorder;
}

export interface Multicubes {
    multicubesTab(): MulticubesTab;
    
    syncMulticube(): SyncMulticubeBuilder;
}

export interface TimePeriodSubsetTab extends Tab {
    elementsCreator(): ElementsCreator;
    elementsDeleter(): ElementsDeleter;
    elementsReorder(): ElementsReorder;
}

export interface TimePeriodTab extends Tab {
    subsetsTab(): TimePeriodSubsetTab;
    importer(): TimePeriodImporter;
}

export interface TypePeriod {
    tableTab(): Tab;
}

export interface Times {
    optionsTab(): TimeOptionsTab;

    //v1.0 only
    typePeriod(identifier: string | number): TypePeriod;
    
    //v2.0 only
    timePeriodTab(identifier: string | number): TimePeriodTab;
}

export interface TimeOptionsTab extends Tab {
    resetForm(): any;

    applyForm(): any;
}

export interface VersionsTab extends Tab {
    copyVersion(from: string, to: string): any;
    elementsCreator(): ElementsCreator;
    elementsDeleter(): ElementsDeleter;
    elementsReorder(): ElementsReorder;
    importer(): VersionsImporter;
}

export interface VersionSubsetsTab extends Tab {
    elementsCreator(): ElementsCreator;
    elementsDeleter(): ElementsDeleter;
    elementsReorder(): ElementsReorder;
}

export interface Versions {
    versionsTab(): VersionsTab;
    versionSubsetsTab(): VersionSubsetsTab;
}

export interface CSVParams {
    setDelimiter(delimiter: string): CSVParams;

    getDelimiter(): string;

    setEnclosure(enclosure: string): CSVParams;

    getEnclosure(): string;

    setEscape(escape: string): CSVParams;

    getEscape(): string;

    setLineDelimiter(lineDelimiter: string): CSVParams;

    getLineDelimiter(): string;
}

export interface Importer {
    csv(): CSVParams;

    setFilePath(path: string): this;

    getFilePath(): string | undefined;

    getReportFilePath(): string | undefined;

    import(): this;
}

export interface StorageImporter extends Importer {
    setMaxFailures(maxFailures: number): this;

    setIsCompressed(isCompressed: boolean): this;

    setEncoding(encoding: string): this;

    setDateFormat(dateFormat: string): this;
    
    setMappings(mappings: object): this;
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

export interface MulticubeImporter extends Importer {

}

export interface VersionsImporter extends Importer {

}

export interface TimePeriodImporter extends Importer {

}

export interface CustomPropertiesTab extends Tab {
    elementsCreator(): ElementsCreator;
    elementsDeleter(): ElementsDeleter;
    elementsReorder(): ElementsReorder;
}

export interface ListUserAccessTab extends Tab {

}

export interface ListTab extends Tab {
    listSubsetTab(): ListSubsetsTab; //OBSOLETE in favor of subsetTab()
    
    subsetTab(): ListSubsetsTab;
    
    propertiesTab(): ListPropertiesTab;
    
    customPropertiesTab(): CustomPropertiesTab;
    
    uamTab(): ListUserAccessTab;

    elementsCreator(): ElementsCreator;

    elementsDeleter(): ElementsDeleter;

    elementsReorder(): ElementsReorder;

    importer(): ListImporter;
}

export interface ListChildTab extends Tab {
    listTab(): ListTab;
    elementsCreator(): ElementsCreator;
    elementsDeleter(): ElementsDeleter;
    elementsReorder(): ElementsReorder;
}

export type ListSubsetsTab = ListChildTab;
export type ListPropertiesTab = ListChildTab;

export interface ListsTab extends Tab {
    open(name: string): ListTab | undefined;
    elementsCreator(): ElementsCreator;
    elementsDeleter(): ElementsDeleter;
    elementsReorder(): ElementsReorder;
}

export interface Lists {
    listsTab(): ListsTab;
    
    syncList(): SyncListBuilder;
}

export interface CellBuffer {
    set(cell: Cell | CubeCell, value: number | string | boolean | null): this;

    apply(): this;

    count(): number;

    canLoadCellsValues(value: boolean): this;
}

export namespace ApiService {
    export interface RequestFileInfo {
        getName(): string;

        getFileName(): string;

        getFileSize(): number;

        copyToLocal(path: string): this;
    }

    export interface RequestFileInfos {
        get(key: string): RequestFileInfo | null;

        getAll(): RequestFileInfo[];
    }

    export interface ParamInfo {
        getName(): string;

        getValue(): string | null;
    }

    export interface ParamInfos {
        get(key: string): ParamInfo | null;

        getAll(): ParamInfo[];
    }

    export interface ResponseCookieInfos {
        append(name: string, value: string, ttl: number): this;
    }

    export interface ResponseHeaderInfos {
        append(name: string, value: string): this;
    }

    export interface ResponseFileInfos {
        append(fileId: string): this;
    }

    export interface ResponseBodyParamInfos {
        append(name: string, value: number | string | boolean | object): this;
    }

    export interface ResponseInfo {
        getCookieInfos(): ResponseCookieInfos;

        getFileInfos(): ResponseFileInfos;

        getBodyParamInfos(): ResponseBodyParamInfos;
    }

    export interface ClientInfo {
        getAgent(): string;

        getIp(): string;
    }

    export interface RequestInfo {
        getMethod(): string;

        getClientInfo(): ClientInfo;

        getCookieInfos(): ParamInfos;

        getHeaderInfos(): ParamInfos;

        getUrlParamInfos(): ParamInfos;

        getFileInfos(): RequestFileInfos;

        getBodyParamInfos(): ParamInfos;

        getResponseInfo(): ResponseInfo;
    }
}

export interface RequestManager {
    log(message: string, print?: boolean): this;

    logStatusMessage(message: string, print?: boolean): this;

    setStatusMessage(message: string): this;
}

export interface UserInfo {
    getEntity(): EntityInfo;

    getEmail(): string;

    getFirstName(): string;

    getLastName(): string;

    getRole(): EntityInfo;
}

export interface EnterpriseLicenseManager {
    getWorkspaceLicenseStatus(): boolean;

    getWorkspaceLicenseInfo(): object;

    createKey(password: string): string;

    validateKey(password: string, key: string): boolean;

    validateLicenseJson(jsonStr: string): boolean;

    createLicense(password: string, key: string, jsonStr: string): string;

    validateLicense(password: string, key: string, licenseData: string, id?: string | null): object;
}

export type MetricData = {
    name(): string;
    value(): number;
    tags(): string;
};

export interface MetricsManager {
    getAllMetrics(): MetricData[];

    setMetricValue(name: string, value: number, tags?: StringMap[]): this;

    getMetricValue(name: string, tags?: StringMap[]): number | null;
}

export interface ExportObfuscationState {
    setPath(path: string): this;

    setEmailWhiteList(emailWhiteList: string[]): this;

    /**
     * Default: BIN
     * @param type TXT|BIN
     */
    setDataArchiveType(type: string): this;

    export(): boolean;
}

export type UpdateInputCellsViaFormulaRequest = {
    cubeLongId: number;
    valueFormula: string;
    conditionFormula?: string;
}

export interface ModelInfo {
    id(): string;
    name(): string;
    lastSyncDate(): number;

    autoCalcStatus(): boolean;
    setModelCalculationMode(status: boolean): boolean;

    repair(): boolean;
    recalculate(): boolean;
    backup(path?: string): EntityInfo | boolean;

    export(path: string): boolean;
    exportObfuscationState(): ExportObfuscationState;

    useUniqueLock(): this;
    useSharedLock(): this;
    hasSharedLock(): boolean;
    hasUniqueLock(): boolean;
    unlock(): this;

    recalculateIfManualCalculable(identifiers: number[]): boolean;

    /**
     * @param requests
     * @param sortByDependenciesValueFormula Default is true
     * @param sortByDependenciesConditionFormula Default is true
     */
    batchUpdateInputCellsViaFormula(requests: UpdateInputCellsViaFormulaRequest[], sortByDependenciesValueFormula?: boolean, sortByDependenciesConditionFormula?: boolean): boolean;

    getStorageInstancePriority(): number;
    setStorageInstancePriority(priority: number): number;

    /**
     * Default: CONSISTENT_READ
     * @param type CONSISTENT_READ|FAST_READ|FAST_READ_METADATA
     */
    setModelStorageReadMode(type: string): boolean;
    /**
     * Default: CONSISTENT_WRITE
     * @param type CONSISTENT_WRITE|FAST_WRITE
     */
    setModelStorageWriteMode(type: string): boolean;
    getStorageReadMode(): string;
    getStorageWriteMode(): string;

    /**
     * @param type CONSISTENT_READ|FAST_READ|FAST_READ_METADATA
     */
    setMacrosStorageReadMode(type: string): boolean;
    getMacrosStorageReadMode(): string;

    recalculateCubes(identifiers: number[]): boolean;
    recalculateCubesWithTheirSources(identifiers: number[]): boolean;
    recalculateCubesWithTheirDestinations(identifiers: number[]): boolean;
    recalculateCubesWithLinkedCubes(identifiers: number[]): boolean;
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
    set(key: string, value: unknown): this;

    get(key: string): unknown;
}

export interface BaseCodeExecutionAction extends ResultBaseAction {
    /**
     * @param value CUSTOM|SHARED|UNIQUE
     * Default is UNIQUE
     */
    setLockMode(value: string): this;

    setAutoRunTimeout(seconds: number): this;

    buttonInfo(): ButtonInfo;

    environmentInfo(): EnvironmentInfo;

    withPromise(withPromise: boolean): this;

    setTaskDescription(description: string): this;

    run(): TaskPromise|null;
}

export interface ResultMacrosAction extends BaseCodeExecutionAction {

}

export interface TaskPromise {
    getStatus(): string|null;

    wait(wait: number): TaskPromiseResult|null;
}

export interface TaskPromiseResult {
    getOutput(): string;

    getDescription(): string;

    getEnvironmentInfo(): EnvironmentInfo
}

export interface CodeExecutionAction extends BaseCodeExecutionAction {
    setMemoryLimit(value: number): this;

    setTimeLimit(value: number): this;
}

export interface ResultOpenAction extends ResultBaseAction {
    buttonInfo(): ButtonInfo;
}

export interface ResultActionsInfo {
    makeMacrosAction(identifier: string | number): ResultMacrosAction;

    makeCodeExecutionAction(code: string): CodeExecutionAction;Zz

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
    setSourceLongId(longId: number): this;

    setDestLongId(longId: number): this;

    enableCopyAllCubes(): this;

    enableCustomProperties(): this;

    setMulticubeLongIds(longIds: number[]): this;

    setMulticubeByNames(names: string[]): this;

    copy(): this;
}

export interface BinaryData {
    getAsRawString(): string;
}

export interface Crypto {
    sha1(data: string): string;

    /**
     * 
     * @param algo available values can be retrieved by getHashAlgorithms()
     * @param binary defaults to false
     */
    hash(algo: string, data: string, binary?: boolean): string | BinaryData;
    /**
     * 
     * @param algo available values can be retrieved by getHmacHashAlgorithms()
     * @param binary defaults to false
     */
    hmac(algo: string, data: string, key: string | BinaryData, binary?: boolean): string | BinaryData;

    getHashAlgorithms(): string[];

    getHmacAlgorithms(): string[];
}

export interface Common {
    createCellBuffer(): CellBuffer;

    requestInfo(): RequestManager;

    modelInfo(): ModelInfo;

    userInfo(): UserInfo;

    resultInfo(): ResultInfo;

    entitiesInfo(): EntitiesInfo;

    copyData(): CopyData;
    
    apiServiceRequestInfo(): ApiService.RequestInfo | null;

    enterpriseLicenseManager(): EnterpriseLicenseManager;

    metricsManager(): MetricsManager;

    /**
     * @param type CONSISTENT_READ|FAST_READ|FAST_READ_METADATA
     */
    setCurrentMacrosStorageReadMode(type: string): boolean;

    getCurrentMacrosStorageReadMode(): string;
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

    getSize(path: string): number;

    createDir(path: string): boolean;

    deleteDir(path: string): boolean;

    listContents(path: string, recursive: boolean): FileMeta[];

    getMetadata(path: string): object;

    upload(from: string, to: string): boolean;

    download(from: string, to: string): boolean;
    
    //2.0 only
    makeLocalFile(hash: string, path?: string): string;

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

    getHost(): string | undefined;

    setPort(port: number): FTPAdapter;

    getPort(): number | undefined;

    setUsername(username: string): FTPAdapter;

    getUsername(): string | undefined;

    setPassword(password: string): FTPAdapter;

    getPassword(): string | undefined;

    setRoot(root: string): FTPAdapter;

    getRoot(): string;

    setPassive(passive: boolean): FTPAdapter;

    getPassive(): boolean | undefined;

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

    generator(): IterableIterator<string[]>;
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
    
    first(): object | undefined;
    
    column(columnName: string): unknown[];
    
    cell(columnName: string, rowIndex?: number): unknown;
    
    updated(): number | undefined;
    
    lastId(): number | string | undefined;
}

export interface SqlQueryBuilder {
    execute(sql: string, bindings?: object): SqlQueryResult;
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

export interface OracleImportStats {
    getIgnored(): number;
}

export interface OracleImportResult {
    hasErrors(): boolean;

    getErrorOutput(): string;

    getStats(): OracleImportStats;

    getBadFileLink(): string;
}

export interface OracleImportBuilder {
    setTable(name: string): this;

    setDelimiter(delimiter: string): this;

    setColumns(names: string[]): this;

    setFilePath(path: string): this;

    setFirstIgnoreLines(count: number): this;

    setDirect(value: boolean): this;

    setUserBadFileFileLink(fileLink: string): this;

    import(): OracleImportResult;
}

export interface OracleConnectorBuilder extends SqlConnectorBuilder {
    setServiceName(value: string): this;

    setSchema(value: string): this;

    setTNS(value: string): this;

    loadImportBuilder(): OracleImportBuilder;
}

export interface MicrosoftSqlConnectorBuilder extends SqlConnectorBuilder {
    /**
     * @param name DBLIB|ODBC|SQLSRV
     */
    setDriver(name: string | null): this;

    /**
     * @param scrollType KEYSET|DYNAMIC|STATIC|BUFFERED
     */
    setScrollType(scrollType: string | null): this;

    setRequestTimeout(timeout: number): this;
    
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
            capped?: boolean,
            autoIndexId?: boolean,
            size?: number,
            max?: number
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

        findOne(filter: object, options?: FilterOptions): object | undefined;

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

        setDatabase(value: string): ConnectorBuilder;

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
        appendFile(fieldName: string, fileName: string, filePath: string): FormRequestBody;
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

        getPort(): number | undefined;

        setPort(port: number | string): boolean;

        setUser(user: string): boolean;

        getUser(): string;

        setPassword(password: string): boolean;

        getPassword(): string | undefined;

        setFragment(fragment: string): boolean;

        getFragment(): string | undefined;

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

        getConnTimeout(): number | undefined;

        setReqTimeout(seconds: number): boolean;

        getReqTimeout(): number | undefined;

        setCanDecodeContent(value: boolean): boolean;

        getCanDecodeContent(): boolean | undefined;

        allowRedirects(): AllowRedirects;

        auth(): HttpAuth;

        /**
         * This feature not realized
         */
        cert(): Cert;

        verify(): Verify;
    }

    export interface DownloadFileParams {
        setPath(path: string): DownloadFileParams;
    }

    export interface SizeLimitParams {
        setContentLengthLimit(lengthInBytes: number): SizeLimitParams;
    }

    export interface ResponseErrors {
        getCode(): number;

        getMessage(): string;
    }

    export interface Response {
        headers(): ObjectOfStringArray;

        /**
         * Limit to first 100MB of response data
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
        getStringDataGenerator(length?: number): string[];

        /**
         * @param length Default 1MB
         */
        getBinaryDataGenerator(length?: number): string[];

        getStatusCode(): number;

        isOk(): boolean;

        getErrors(): ResponseErrors | undefined;
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

        downloadFileParams(): DownloadFileParams;

        sizeLimitParams(): SizeLimitParams;
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

export interface MysqlImportResult {
    hasErrors(): boolean;

    getErrorOutput(): string;

    getOutput(): string;

    getCommand(): string;

    getConfig(): string;

    getStats(): object;
}

export interface PostgresqlImportResult {
    hasErrors(): boolean;

    getErrorOutput(): string;

    getCommand(): string;
}

export interface MysqlImportBuilder {
    setTable(name: string): this;

    setDelimiter(delimiter: string): this;

    setLineDelimiter(delimiter: string): this;

    setEnclosure(enclosure: string): this;

    setEscape(escape: string): this;

    setThreads(threads: number): this;

    setVerbose(verbose: boolean): this;

    setFirstIgnoreLines(count: number): this;

    setLockTable(status: boolean): this;

    setForce(status: boolean): this;

    setDeleteAllRows(status: boolean): this;

    setCompress(status: boolean): this;

    setIgnoreDuplicates(status: boolean): this;

    setReplace(status: boolean): this;

    setColumns(names: string[]): this;

    setFilePath(path: string): this;

    import(): MysqlImportResult;
}

export interface PostgresqlImportBuilder {
    setTable(name: string): PostgresqlImportBuilder;

    setSchema(name: string): PostgresqlImportBuilder;

    setDelimiter(delimiter: string): PostgresqlImportBuilder;

    setEnclosure(quote: string): PostgresqlImportBuilder;

    setEscape(escape: string): PostgresqlImportBuilder;

    setIgnoreHeader(ignoreHeader: boolean): PostgresqlImportBuilder;

    setColumns(names: string[]): PostgresqlImportBuilder;

    setFilePath(path: string): PostgresqlImportBuilder;

    import(): PostgresqlImportResult;
}

export interface MysqlConnectorBuilder extends SqlConnectorBuilder {
    loadImportBuilder(): this;
}

export interface PostgresqlConnectorBuilder extends SqlConnectorBuilder {
    loadImportBuilder(): PostgresqlImportBuilder;
}

export interface SnowflakeConnectorBuilder extends SqlConnectorBuilder {
    setAccount(account: string): this;

    setRegion(region: string): this;

    /**
     * Configuring OCSP Checking
     * Default is false
     * @param insecure
     */
    setInsecure(insecure: boolean): this;

    setWarehouse(warehouse: string): this;

    setSchema(schema: string): this;

    setRole(role: string): this;

    setProtocol(protocol: string): this;
}

export interface Connectors {
    mysql(): MysqlConnectorBuilder;

    postgresql(): PostgresqlConnectorBuilder;

    sqlServer(): MicrosoftSqlConnectorBuilder;

    oracle(): OracleConnectorBuilder;
    
    snowflake(): SnowflakeConnectorBuilder;

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

export interface Variable {
    isEntity(): boolean;

    getValue(): number | string | null | boolean | EntityInfo;
}

export interface Variables {
    get(varName: string): Variable;
}

export interface ApiServices {
    apiServicesTab(): ApiServicesTab;
}

export interface ApiServicesTab extends Tab {
    
}

export interface Audit {
    auditTab(): AuditTab;
}

export interface AuditTab extends Tab {
    pivot(viewName?: string): AuditPivot;
}

export interface AuditPivot extends Pivot {
    eventTypeFilter(data: string | number | (string | number)[]): AuditPivot;

    dateFilter(beginAt?: string | number | undefined | null, endAt?:  string | number | undefined | null): AuditPivot;

    statusFilter(status: number): AuditPivot;

    authorFilter(name: string): AuditPivot;

    detailsFilter(details4: string): AuditPivot;
}

export interface Users {
    modelUsersTab(): ModelUsersTab;
    workspaceUsersTab(): WorkspaceUsersTab;
}

export interface WorkspaceUsersTab extends Tab {

}

export interface ModelUsersTab extends Tab {

}

export interface Users {
    modelUsersTab(): ModelUsersTab;
    workspaceUsersTab(): WorkspaceUsersTab;
}

export interface WorkspaceUsersTab extends Tab {

}

export interface ModelUsersTab extends Tab {

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
    readonly variables: Variables;
    readonly apiServices: ApiServices;
    readonly audit: Audit;
    readonly crypto: Crypto;
    readonly users: Users;
}

export var om: OM;
