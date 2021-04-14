# API Reference

1. [Представления Optimacros](OMviews.md)
    1. Представления мультикубов, справочников, версий
    1. Экспорт из мультикубов и справочников
    1. Импорт в мультикубы и справочники
    1. Обновление клеток мультикубов через формулу
    1. Получение клеток куба с помощью формулы
    1. Копирование срезов кубов
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
1. [Текущая модель](currentModel.md)
1. [Текущий пользователь](currentUser.md)
1. [Нотификация пользователей](userNotification.md)
    1. SMTP
1. [Изменение статуса текущего запроса](reqStatusChange.md)

## Интерфейс Cell:
```ts
interface Cell {
    setValue(value: number | string | null);

    getValue(): number | string | null;

    getNativeValue(): number | string | null;

    getTextValue(): number | string | null;

    getContextValue(): string | null;

    definitions(): number[];

    columns(): LabelsGroup;

    rows(): LabelsGroup;

    dropDown(): Labels;

    getFormatType(): string;

    isEditable(): boolean;
}
```
***
## Интерфейс Cells:
```ts
interface Cells {
    all(): Cell[];

    first(): Cell;

    setValue(value: number | string | null);

    count(): number;

    chunkInstance(): GridRangeChunk;

    getByIndexes(indexes: number[]): Cells | null;
}
```
***
## Интерфейс Label:
```ts
interface Label {
    longId(): number;

    name(): string;

    code(): string;

    alias(): string | null;

    label(): string | null;

    parentLongId(): number;
}
```
***
## Интерфейс LabelsGroup:
```ts
interface LabelsGroup {
    all(): Label[];

    first(): Label;

    cells(): Cells;
}
```
***
## Интерфейс Labels:
```ts
interface Labels {
    start(): number;

    count(): number;

    all(): LabelsGroup[];

    get(index: number): LabelsGroup | null;

    chunkInstance(): GridRangeChunk;

    findLabelByLongId(longId: number): Label | null;
}
```
***
## Интерфейс GridRangeChunk:
```ts
interface GridRangeChunk {
    cells(): Cells;

    rows(): Labels;

    columns(): Labels;
}
```
***
## Интерфейс GridRange:
```ts
interface GridRange {
    rowStart(): number;

    rowCount(): number;

    columnStart(): number;

    columnCount(): number;

    cellCount(): number;

    generator(size?: number): GridRangeChunk[];
}
```

описывается в разделе: `Grid.range()` т.к. является парент интерфейсом
***
## Интерфейс GridDimension:
```ts
interface GridDimension {
    getDimensionEntity(): EntityInfo;
}
```
***
## Интерфейс GridDefinitionInfo:
```ts
interface GridDefinitionInfo {
    getPageSelectors(): GridPageSelector[];

    getRowDimensions(): GridDimension[];

    getColumnDimensions(): GridDimension[];
}
```
***
## Интерфейс Grid:
```ts
interface Grid {
    range(rowStart?: number, rowCount?: number, columnStart?: number, columnCount?: number): GridRange;

    rowCount(): number;

    columnCount(): number;

    cellCount(): number;

    getDefinitionInfo(): GridDefinitionInfo;

    exporter(): Exporter;

    storageExporter(): StorageExporter;
}
```
cellCount() - возвращает количество клеток в гриде

columnCount() - возвращает количество колонок в гриде

rowCount() - возвращает количество строк в гриде

exporter() - нужен для того чтобы автоматически проитерироваться по этому гриду и проитерированные данные будут 
сохранены в файл

range() - нужен при получении данных для указания диапазона\области ячеек с которой и по какой мы хотим получить данные.
В качестве первого аргумента принимает позицию строки с которой мы хотим начать получать данные. В качестве второго 
аргумента, количество строк по какую мы хотим захватить в данную область(если хотим захватить неограниченную область то
указываем -1). Третий аргумент это позиция колонки с которой начинается область. Четвёртый аргумент это количество 
колонок которые войдут в область range, для указания неограниченной области колонок также указывается -1

Пример использования range: `grid.range(0, -1, 0, -1)` с нулевой строки - все строки и с нулевой колонки - все колонки, 
т.е. все ячейки грида.
***
## Интерфейс ExportResult:
```ts
interface ExportResult {
    mergeToExternalExcelSheet(toFile: string, toSheet: string, fromSheet?: string): ExportResult

    getHash(): string;

    copyToLocal(path: string): this;

    moveToLocal(path: string): this;
}
```
***
## Интерфейс Exporter:
```ts
interface Exporter {
    setEncoding(encoding: string): Exporter;

    setExtension(extension: string): Exporter;

    setOmitSummaryRows(omitSummaryRows: boolean): Exporter;

    setOmitEmptyRows(omitEmptyRows: boolean): Exporter;

    setIncludeCodes(includeCodes: boolean): Exporter;

    setMappingForFlexibleImport(mappingForFlexibleImport: boolean): Exporter;

    setMappingForAdvancedImport(mappingForAdvancedImport: boolean): Exporter;

    setFileName(fileName: string): Exporter;

    setDelimiter(delimiter: string): Exporter;

    setEnclosure(enclosure: string): Exporter;

    setEscape(escape: string): Exporter;

    setShowAliasesWithoutNames(showAliasesWithoutNames: boolean): Exporter;

    setUseCodeLikeLabels(useCodeLikeLabels: boolean): Exporter;

    export(): ExportResult;
}
```
***
## Интерфейс Pivot:
```ts
interface Pivot {
    create(): Grid;

    rowsFilter(data: string[] | string | number | number[]): Pivot;

    columnsFilter(data: string[] | string | number | number[]): Pivot;

    withoutValues(): Pivot;

    addDependentContext(identifier: number): Pivot
}
```

Интерфейс скриптов не позволяет перекручивать пивотку принимает строку с названием вьюхи, которую мы выкручиваем как нам
 необходимо. Если передаётся null, то получим дефолтное отображение мультикуба.
 
create - загружает сам грид переданного представления мультикуба

withoutValues - загружает представление мультикуба без данных

rowsFilter - аналог Hide Show, если мы хотим показать на гриде только одну строку или настроенный нами набор строк.

columnsFilter - аналогично с rowsFilter, но только для колонок

addDependentContext - передача контекста

***
## Интерфейс NumericElementsCreator:
```ts
interface NumericElementsCreator {
    setCount(count: number): NumericElementsCreator;

    setPositionAfter(relativeLongId: number): NumericElementsCreator;

    setPositionBefore(relativeLongId: number): NumericElementsCreator;

    setPositionStart(): NumericElementsCreator;

    setPositionEnd(): NumericElementsCreator;

    setPositionChildOf(parentLongId: number): NumericElementsCreator;

    create(): number[];
}
```
Аналогия интерфейсного функционала Insert на гриде
***
## Интерфейс ElementsCreator:
```ts
interface ElementsCreator {
    numeric(): NumericElementsCreator;
}
```
Аналогия интерфейсного функционала Insert на гриде
***
## Интерфейс ElementsDeleter:
```ts
interface ElementsDeleter {
    appendIdentifier(identifier: number): ElementsDeleter;

    delete(): ElementsDeleter;
}
```
Аналогия интерфейсного функционала delete на гриде
***
## Интерфейс ElementsReorder:
```ts
interface ElementsReorder {
    append(longId: number, relativeLongId: number, position: string): ElementsReorder;

    reorder(): ElementsReorder;

    count(): number;

    reverse(): ElementsReorder;
}
```
Аналогия интерфейсного функционала Reorder на гриде
***
## Интерфейс Tab:
```ts
interface Tab {
    pivot(viewName?: string): Pivot;

    open(name: string): Tab;

    elementsCreator(): ElementsCreator;

    elementsDeleter(): ElementsDeleter;

    elementsReorder(): ElementsReorder;

    importer(): Importer;

    storageImporter(): StorageImporter;
}
```
***
## Интерфейс Environment:
```ts
interface Environment {
    load(name: string): Environment;

    get(key: string, def?: any): any;

    set(name: string, value: number | string | null): Environment;
}
```

load() Принимает имя в виде строки
***
## Интерфейс CubeCell:
```ts
interface CubeCell {
    definitions(): number[];

    getDimensionIds(): number[];

    getDimensionItems(): EntityInfo[];

    getValue(): number | string | null | boolean;
}
```
***
## Интерфейс CubeCellSelector:
```ts
interface CubeCellSelector {
    getCubeInfo(): CubeInfo;

    getCubeIdentifier(): number;

    getCubeDimensions(): EntityInfo[];

    // @ts-ignore
    generator(): IterableIterator<CubeCell>;
}
```
***
## Интерфейс CubeCellSelectorBuilder:
```ts
interface CubeCellSelectorBuilder {
    setFormula(formula: string): this;

    load(): CubeCellSelector;
}
```
***
## Интерфейс CubeCellUpdater:
```ts
interface CubeCellUpdater{
    getCount(): number;
}
```
***
## Интерфейс CubeCellUpdaterBuilder:
```ts
interface CubeCellUpdaterBuilder {
    setConditionFormula(formula: string): this;

    setFormula(formula: string): this;

    load(): CubeCellUpdater;
}
```
***
## Интерфейс CubeFormatInfo:
```ts
interface CubeFormatInfo {
    getFormatTypeEntity(): EntityInfo;

    getDimensionEntity(): EntityInfo | null;
}
```
***
## Интерфейс CubeInfo:
```ts
interface CubeInfo extends EntityInfo {
    getFormula(): string | null;

    getFormatInfo(): CubeFormatInfo;

    getDimensions(): EntityInfo[];
}
```
***
## Интерфейс MulticubeTab:
```ts
interface MulticubeTab extends Tab {
    cleanCellsData(cubesIdentifiers?: number[]): MulticubeTab;

    cubeCellSelector(identifier: string | number): CubeCellSelectorBuilder;

    cubeCellUpdater(identifier: string | number): CubeCellUpdaterBuilder;

    getCubeInfo(identifier: string | number): CubeInfo;
}
```
***
## Интерфейс MulticubesTab:
```ts
interface MulticubesTab extends Tab {
    open(name: string): MulticubeTab;
}
```
обращение типа: `om.multicubes.multicubesTab()` будет равносильна открытию таб Multicubes, где multicubesTab это минитаб 
Table в интерфейсной, части приложения. А обращение к методу `open()` с переданным строковым значением содержащим имя 
мультикуба в модели, будет равносильно открытому мультикубу с данным именем (открытый таб без грида).
***
## Интерфейс Multicubes:
```ts
interface Multicubes {
    multicubesTab(): MulticubesTab;
}
```
`om.multicubes` Аналогично открытию табы Multicubes в интерфейсной части приложения, но без открытых мини табов.

***
## Интерфейс Times:
```ts
interface Times {
    optionsTab(): Tab

    typePeriod(identifier: string | number): TypePeriod;

    resetForm(): any;

    applyForm(): any;
}
```
***
## Интерфейс VersionsTab:
```ts
interface VersionsTab {
    copyVersion(from: string, to: string): any;
}
```
`om.versions.versionsTab` Аналогично открытию табы Version - Table в интерфейсной части приложения.

copyVersion - использование функционала копирования версий, принимает в качестве первого аргумента имя версии, которую
 копируем. В качестве второго аргумента имя версии в которую копируем.

***
## Интерфейс Versions:
```ts
interface Versions {
    versionsTab(): VersionsTab
}
```
`om.versions` Аналогично открытию табы Version в интерфейсной части приложения, но без открытых мини табов.
`om.versions.versionsTab` Аналогично открытию табы Version - Table в интерфейсной части приложения
***
## Интерфейс CSVParams:
```ts
interface CSVParams {
    setDelimiter(delimiter: string): CSVParams;

    getDelimiter(): string;

    setEnclosure(enclosure: string): CSVParams;

    getEnclosure(): string;

    setEscape(escape: string): CSVParams;

    getEscape(): string;

    setLineDelimiter(escape: string): CSVParams;

    getLineDelimiter(): string;
}
```
***
## Интерфейс Importer:
```ts
interface Importer {
    csv(): CSVParams;

    setFilePath(path: string): Importer;

    getFilePath(): string;

    getReportFilePath(): string

    import(): Importer;
}
```
***
## Интерфейс ListImporter:
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
***
## Интерфейс ListTab:
```ts
interface ListTab extends Tab {
    listSubsetTab(): ListSubsetsTab;

    importer(): ListImporter;
}
```
***
## Интерфейс ListSubsetsTab:
```ts
interface ListSubsetsTab extends Tab {
    listTab(): ListTab;
}
```
`om.lists.ListSubsetsTab.listTab.open()` Аналогично открытию справочника на минитабе Subsets. open() в качестве 
аргумента принимает строку с именем справочника, который мы хоти открыть.
***
## Интерфейс ListsTab:
```ts
interface ListsTab extends Tab {
    open(name: string): ListTab;
}
```
`om.lists.listsTab.open()` Аналогично функционалу Open (открытию справочника) выбранного в гриде Lists - Table в 
интерфейсной части приложения. В качестве аргумента принимает строку с именем справочника, который мы хоти открыть.
***
## Интерфейс Lists:
```ts
interface Lists {
    listsTab(): ListsTab
}
```
`om.lists` Аналогично открытию табы Lists в интерфейсной части приложения, но без открытых мини 
табов.
`om.lists.listsTab` Аналогично открытию табы Lists - Table в интерфейсной части 
приложения.
***
## Интерфейс CellBuffer:
```ts
interface CellBuffer {
    set(cell: Cell | CubeCell, value: number | string | null): CellBuffer;

    apply(): CellBuffer;

    count(): number;

    canLoadCellsValues(value: boolean): CellBuffer;
}
```
### CellBuffer общее понятие:
CellBuffer - это абстрактный буфер обмена, куда можно было бы временно поместить например значения ячеек, чтобы затем 
что-то в них изменить, перед тем как отправить на сервер. На данный момент скрипт 1D иерархии является апофеозом 
использования cellBuffer без, которого в нём не обойтись. Пример использования такой: CellBuffer используется чтобы 
редактировать клетки, а редактировать клетки можно только лишь тогда, когда у нас есть объект нужной клетки в памяти. 
Иными словами, на практике: Чтобы работать с CellBuffer нам нужно работать с гридом, это неотъемлемая часть его 
использования. Читая грид слева направо, сверху вниз, мы выбираем клетки, которые нам нужно редактировать и помещаем их 
в CellBuffer. CellBuffer является накопителем клеток грида.

set() - даёт возможность установить значение в клетку. Первый аргумент это клетка, второй аргумент это значение.

apply() - применяет значения из буфера и одновременно его очищает.

count() - даёт возможность получить количество.

canLoadCellsValues() - обязательный интерфейс, который принимает булевое значение (true, false) нужнен для того, чтобы 
указать нужно ли перезагружать значение в буфер в случае если они изменятся.
***
## Интерфейс RequestManager:
```ts
interface RequestManager {
    log(message: string, print?: boolean): RequestManager;

    logStatusMessage(message: string, print?: boolean): RequestManager;

    setStatusMessage(message: string): RequestManager;
}
```
***
## Интерфейс UserInfo:
```ts
interface UserInfo {
    getEntity(): EntityInfo;

    getEmail(): string;

    getFirstName(): string;

    getLastName(): string;

    getRole(): EntityInfo;
}
```
***
## Интерфейс ModelInfo:
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
***
## Интерфейс ResultInfo:
```ts
interface ResultInfo {
    addFileHash(hash: string): this;

    actionsInfo(): ResultActionsInfo;

    setProperty(name: string, value: any): this;
}

```
***
## Интерфейс EntityInfo:
```ts
interface EntityInfo = Label
```
***
## Интерфейс EntitiesInfo:
```ts
interface EntitiesInfo {
    get(longId: number): EntityInfo | null;

    getCollection(longId: number[]): EntityInfo[];
}
```
***
## Интерфейс CopyData:
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
***
## Интерфейс Common:
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
***
## Интерфейс FileMeta:
```ts
interface FileMeta {
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
```
***
## Интерфейс Filesystem:
```ts
interface Filesystem {
    has(path: string): boolean;

    read(path: string): string;

    readAndDelete(path: string): string;

    write(path: string, contents: string): boolean;

    delete(path: string): boolean;

    rename(from: string, to: string): boolean;

    copy(from: string, to: string): boolean;

    getTimestamp(path: string): string;

    getSize(path: string): number;

    createDir(path: string): boolean;

    deleteDir(path: string): boolean;

    listContents(path: string, recursive: boolean): Array<FileMeta>;

    getMetadata(path: string): object;

    upload(from: string, to: string): boolean;

    download(from: string, to: string): boolean;

    makeGlobalFile(name: string, extension: string, path: string, copy?: boolean): string;

    getPathObj(path: string): PathObj;
}
```
***
## Интерфейс PathObj:
```ts
interface PathObj {
    getSystem(): Filesystem;

    getPath(): string;
}
```
***
## Интерфейс BaseAdapter:
```ts
interface BaseAdapter {
    load(): Filesystem;
}
```
***
## Интерфейс FTPAdapter:
```ts
interface FTPAdapter extends BaseAdapter {
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
```
***
## Интерфейс CsvReader:
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
***
## Интерфейс CsvWriter:
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
***
## Интерфейс BaseConverter:
```ts
interface BaseConverter {
    setSource(path: string): this;

    convert(): string;
}
```
***
## Интерфейс ExcelToCsvConverter:
```ts
interface ExcelToCsvConverter extends BaseConverter {
    setSheetIdentifier(identifier: string | number): this;
}
```
***
## Интерфейс ConverterManager:
```ts
interface ConverterManager {
    excelToCsv(): ExcelToCsvConverter
}
```
***
## Интерфейс FilesDataManager:
```ts
interface FilesDataManager {
    csvWriter(): CsvWriter;

    csvReader(path: PathObj): CsvReader;

    converterManager(): ConverterManager;
}
```
***
## Интерфейс Filesystems:
```ts
interface Filesystems {
    ftp(): FTPAdapter;

    local(): Filesystem;

    sharedFolder(id: string): Filesystem;

    filesDataManager(): FilesDataManager;
}
```
***
## Интерфейс OptimizationRequestTab:
```ts
interface OptimizationRequestTab extends Tab {
    run(name: string): { success: boolean, error: undefined | string };
}
```
`om.optimization.optimizationRequestsTab.run()` Аналогично функционалу запуска Отпимизационного запроса в интерфейсной 
части приложения. run в качестве аргумента принимает строку с именем Отпимизационного запроса
***
## Интерфейс Optimization:
```ts
interface Optimization {
    optimizationRequestsTab(): OptimizationRequestTab
}
```
`om.optimization` Аналогично открытию табы Optimizer Request в интерфейсной части приложения, но без открытых мини 
табов.
`om.optimization.optimizationRequestsTab` Аналогично открытию табы Optimizer Request - Table в интерфейсной части 
приложения.

***
## Интерфейс SqlQueryResult:
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
***
## Интерфейс SqlQueryBuilder:
```ts
interface SqlQueryBuilder {
    execute(sql: string, bindings?: object): SqlQueryResult;
}
```
***
## Интерфейс SqlConnection:
```ts
interface SqlConnection {
    qb(): SqlQueryBuilder;
}
```
***
## Интерфейс SqlConnectorBuilder:
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
***
## Интерфейс SqlBulkCopyResult:
```ts
interface SqlBulkCopyResult {
    hasErrors(): boolean;

    getErrorOutput(): string;

    getOutput(): string;

    getCommand(): string;
}
```
***
## Интерфейс SqlBulkCopyBuilder:
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
***
## Mongodb и его интерфейсы:
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
***
## Http и его интерфейсы:
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
***
## Интерфейс Connectors:
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
***
## Интерфейс OM:
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
```
***

export type ObjectOfStringArray = {
    [key: string]: string[];
}



export interface GridPageSelector extends GridDimension
{
    getSelectedEntity(): EntityInfo | null;
}

export interface StorageExporter extends Exporter {
    setLineDelimiter(lineDelimiter: string): Exporter;

    setFilterFormula(filterFormula: string): this;

    setDecimalSeparator(decimalSeparator: string): this;

    setDateFormat(dateFormat: string): this;

    setBooleanCubeIdentifier(booleanCubeIdentifier: number): this;
}

export interface TypePeriod {
    tableTab(): Tab;
}

export interface StorageImporter extends Importer {
    setMaxFailures(maxFailures: number): this;

    setIsCompressed(isCompressed: boolean): this;

    setEncoding(encoding: string): this;

    setDateFormat(dateFormat: string): this;
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

export var om: OM;

***

[Оглавление](../README.md)
