# Экспорт и импорт

1. [Экспорт из мультикубов и справочников](#export)
1. [Импорт в мультикубы, справочники и системные измерения](#import)
1. [Быстрый импорт в мультикубы](#om-import)

## Экспорт из мультикубов и справочников<a name="export"></a>

### Интерфейс Exporter<a name="exporter"></a>
```ts
interface Exporter {
	setEncoding(encoding: string): Exporter;
	setFormat(format: string): Exporter;
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
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), позволяет сформировать и вызвать запрос на базовый экспорт таблицы. Доступен для всех [`Grid`](./views.md#grid). Все функции, кроме [`export()`](#exporter.export), возвращают `this`.

&nbsp;

```js
setEncoding(encoding: string): Exporter
```
Устанавливает кодировку экспортируемого файла. Допустимые значения: 
`'win' ,'WIN', 'windows-1251', 'WINDOWS-1251', 'utf', 'UTF', 'utf-8', 'UTF-8'`. По умолчанию: `'UTF-8'`.

&nbsp;

```js
setFormat(format: string): Exporter
```
Устанавливает формат экспортируемого файла. Допустимые значения: `'csv', 'xls', 'xlsx', 'txt'`. По умолчанию: `'xlsx'`.

&nbsp;

```js
setOmitSummaryRows(omitSummaryRows: boolean): Exporter
```
Устанавливает флаг пропуска итоговых строк. По умолчанию: `false`.

&nbsp;

```js
setOmitEmptyRows(omitEmptyRows: boolean): Exporter
```
Устанавливает флаг пропуска пустых строк. По умолчанию: `false`.

&nbsp;

```js
setIncludeCodes(includeCodes: boolean): Exporter
```
Устанавливает флаг включения кодов для каждого измерения на строках. По умолчанию: `false`.

&nbsp;

```js
setMappingForFlexibleImport(mappingForFlexibleImport: boolean): Exporter
```
Устанавливает мэппинг для настраиваемого импорта. По умолчанию: `false`.

&nbsp;

```js
setMappingForAdvancedImport(mappingForAdvancedImport: boolean): Exporter
```
Устанавливает мэппинг для расширенного импорта. По умолчанию: `false`.

&nbsp;

```js
setFileName(fileName: string): Exporter
```
Устанавливает начальную часть имени экспортируемого файла. По умолчанию: `'view'`. Итоговое имя файла будет иметь вид `'{fileName}--YYYY.MM.DD--HH.mm.{format}'`.

&nbsp;

```js
setDelimiter(delimiter: string): Exporter
```
Устанавливает разделитель полей. Допустимые значения: `,`, `;`, `\t`. Значение по умолчанию: `;`.

&nbsp;

```js
setEnclosure(enclosure: string): Exporter
```
Устанавливает обрамляющий символ, которым будет обрамляться текстовое поле, если в нём содержится разделитель полей, пробел, табуляция, сам обрамляющий символ или [`разделитель строк`](#set-line-delimiter) (только для интерфейса [`StorageExporter`](#storage-exporter)). Допустимые значения: `'`, `"`. Значение по умолчанию: `"`.

&nbsp;

```js
setEscape(escape: string): Exporter
```
Устанавливает экранирующий символ: если в тексте встретится экранирующий символ и вслед за ним обрамляющий, эта последовательность останется неизменной; а если обрамляющий символ будет без экранирующего, он удвоится. Допустимые значения: `\`, `"`. Значение по умолчанию: `\`.

&nbsp;

```js
setShowAliasesWithoutNames(showAliasesWithoutNames: boolean): Exporter
```
Устанавливает флаг показа псевдонимов без имён. Применимо только для значений справочников. По умолчанию: `false`.

&nbsp;

```js
setUseCodeLikeLabels(useCodeLikeLabels: boolean): Exporter
```
Устанавливает флаг показа кода вместо имён для тех элементов, у которых есть код. По умолчанию: `false`.

&nbsp;

<a name="exporter.export"></a>
```js
export(): ExportResult
```
Производит экспорт представления в соответствии с настройками, регистрирует файл в [`глобальном реестре`](../appendix/glossary.md#global-file-registry) и возвращает ссылку на [`ExportResult`](#export-result).

&nbsp;

### Интерфейс StorageExporter<a name="storage-exporter"></a>
```ts
interface StorageExporter extends Exporter {
	setFormat(format: string): StorageExporter;
	setDelimiter(delimiter: string): StorageExporter;
	setLineDelimiter(lineDelimiter: string): StorageExporter;
	setFilterFormula(filterFormula: string): StorageExporter;
	setDecimalSeparator(decimalSeparator: string): StorageExporter;
	setDateFormat(dateFormat: string): StorageExporter;
	setBooleanCubeIdentifier(booleanCubeIdentifier: number): StorageExporter;
}
```
Интерфейс быстрого экспорта. Доступен только в мультикубах. Интерфейс наследуется от [`Exporter`](#exporter). В отличие от базового, формат выгрузки фиксирован и отличается от представления таблицы: в столбцах находятся измерения и кубы. Кроме того, вместо псевдонимов экспортируются только их имена. Все функции, кроме [`export()`](#exporter.export), возвращают `this`.

&nbsp;

```js
setFormat(format: string): StorageExporter
```
Устанавливает формат экспортируемого файла. Допустимые значения: `'csv', 'txt', 'gz', 'zip'`. По умолчанию: `'csv'`.

&nbsp;

```js
setDelimiter(delimiter: string): StorageExporter
```
Устанавливает разделитель полей. В отличие от аналагичного метода интерфейса `Exporter` можно установить любое значение.  По умолчанию: `;`.

&nbsp;

<a name="set-line-delimiter"></a>
```js
setLineDelimiter(lineDelimiter: string): StorageExporter
```
Устанавливает разделитель строк. По умолчанию: `\n`.

&nbsp;

```js
setFilterFormula(filterFormula: string): StorageExporter
```
Устанавливает булеву формулу, которая будет применяться в качестве аналога [`setBooleanCubeIdentifier()`](#set-boolean-cube-identifier), но без создания булева куба.

&nbsp;

```js
setDecimalSeparator(decimalSeparator: string): StorageExporter
```
Устанавливает десятичный разделитель. Допустимые значения: `,`, `.`.  По умолчанию: `.`.

&nbsp;

<a name="storage-exporter.set-date-format"></a>
```js
setDateFormat(dateFormat: string): StorageExporter
```
Устанавливает формат даты. Синтаксис формата такой же, как и в функции C++ [`std::put_time()`](https://en.cppreference.com/w/cpp/io/manip/put_time). Значение по умолчанию: `'%d.%m.%Y'`.

&nbsp;

<a name="set-boolean-cube-identifier"></a>
```js
setBooleanCubeIdentifier(booleanCubeIdentifier: number): StorageExporter
```
Устанавливает идентификатор булева куба, который будет использоваться в качестве логического фильтра.

&nbsp;

### Интерфейс ExportResult<a name="export-result"></a>
```ts
interface ExportResult {
	mergeToExternalExcelSheet(toFile: string, toSheet: string, fromSheet?: string): ExportResult;
	getHash(): string | null;
	copyToLocal(path: string): ExportResult;
	moveToLocal(path: string): ExportResult;
}
```
Интерфейс для работы с результатом экспорта.

&nbsp;

```js
mergeToExternalExcelSheet(toFile: string, toSheet: string, fromSheet?: string): ExportResult
```
Если экспорт был в формате `'xls'` или `'xlsx'`, заменяет в файле Excel (формата `.xlsx` или `.xlsm`) `toFile` **существующий** лист `toSheet` и помещает в него результат экспорта.  Данные берутся с листа `fromSheet`, по умолчанию – с первого листа. Возращает `this`.

&nbsp;

```js
getHash(): string | null
```
Возвращает идентификатор файла в [`глобальном реестре`](../appendix/glossary.md#global-file-registry), или `null`, если файл там отсутствует. Как правило, используется для передачи в функцию [`ResultInfo.addFileHash()`](./common.md#result-info.add-file-hash).

&nbsp;

```js
copyToLocal(path: string): ExportResult
```
Копирует экспортированный файл в путь `path` в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir). Возвращает `this`.

&nbsp;

```js
moveToLocal(path: string): ExportResult
```
Перемещает экспортированный файл в путь `path` в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir) и убирает его из [`глобального реестра`](../appendix/glossary.md#global-file-registry). Возвращает `this`.

&nbsp;

## Импорт в мультикубы, справочники и системные измерения<a name="import"></a>

### Интерфейс CSVParams<a name="csv-params"></a>
```ts
interface CSVParams {
	setDelimiter(delimiter: string): CSVParams;
	getDelimiter(): string;
	
	setEnclosure(enclosure: string): CSVParams;
	getEnclosure(): string;
	
	setEscape(escape: string): CSVParams;
	getEscape(): string;
	
	setLineDelimiter(lineDelimiter: string): CSVParams;
	getLineDelimiter(): string;
}
```
Интерфейс настроек различных манипуляций с файлом [`CSV`](https://ru.wikipedia.org/wiki/CSV).

&nbsp;

```js
setDelimiter(delimiter: string): CSVParams
```
Устанавливает разделитель полей. При использовании для интерфейса [`CsvReader`](./csv.md#csv-reader) должен быть однобайтным символом. При использовании для интерфейса [`CsvWriter`](./csv.md#csv-writer) разделитель может быть произвольной строкой, однако, если задана строка более чем из одного символа, механизм обрамления (enclosure) перестаёт работать, и рекомендуется всё же использовать одиночный символ. Значение по умолчанию: `;`. Возвращает `this`.

&nbsp;

```js
getDelimiter(): string
```
Возвращает разделитель полей.

&nbsp;

<a name="CSVParams.setEnclosure"></a>
```js
setEnclosure(enclosure: string): CSVParams
```
Устанавливает обрамляющий символ, которым будет обрамляться текстовое поле, если в нём содержится разделитель полей, пробел, табуляция, сам обрамляющий символ или [`разделитель строк`](#CSVParams.setLineDelimiter). Допустим лишь один однобайтовый символ. Значение по умолчанию: `"`. См. также [`экранирующий символ`](#CSVParams.setEscape). Возвращает `this`.

**Если для интерфейса [`CsvWriter`](./csv.md#csv-writer) задать в качестве обрамляющего символа строку более чем из одного символа, отключится механизм обрамления!**

&nbsp;

```js
getEnclosure(): string
```
Возвращает обрамляющий символ.

&nbsp;

<a name="CSVParams.setEscape"></a>
```js
setEscape(escape: string): CSVParams
```
Устанавливает экранирующий символ: если в тексте встретится экранирующий символ и вслед за ним обрамляющий, эта последовательность останется неизменной; а если обрамляющий символ будет без экранирующего, он удвоится.

Допустим лишь один однобайтовый символ. Значение по умолчанию: `\`. Возвращает `this`.

**Если задать в качестве экранирующего символа пустую строку, отключится механизм [`обрамления`](#CSVParams.setEnclosure)!**

&nbsp;

```js
getEscape(): string
```
Возвращает экранирующий символ.

&nbsp;

<a name="CSVParams.setLineDelimiter"></a>
```js
setLineDelimiter(lineDelimiter: string): CSVParams
```
Устанавливает разделитель строк. По умолчанию: `\n`. Возвращает `this`.

**Для интерфейса [`CsvReader`](./csv.md#csv-reader) невозможно установить значение, отличное от значения по умолчанию!**

&nbsp;

```js
getLineDelimiter(): string
```
Возвращает разделитель строк.

&nbsp;

### Интерфейс Importer<a name="importer"></a>
```ts
interface Importer {
	csv(): CSVParams;
	setFilePath(path: string): Importer;
	getFilePath(): string;
	getReportFilePath(): string | null;
	setEncoding(encoding: string): this;
	getEncoding(): string;
	import(): Importer;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), позволяет сформировать и вызвать запрос на базовый импорт таблицы [`Grid`](./views.md#grid). Результатом импорта является файл отчёта.

&nbsp;

```js
csv(): CSVParams
```
Возвращает ссылку на интерфейс [`CSVParams`](#csv-params), предоставляющий доступ к настройкам CSV. В случае импорта из Excel не имеет смысла.

&nbsp;

```js
setFilePath(path: string): Importer
```
Устанавливает имя импортируемого файла. Возвращает `this`.

&nbsp;

```js
getFilePath(): string
```
Возвращает имя импортируемого файла.

&nbsp;

```js
getReportFilePath(): string | null
```
Возвращает путь к файлу отчёта.

&nbsp;

```js
setEncoding(encoding: string): Importer;
```
Устанавливает кодировку импортируемого файла. Допустимые значения:
`'win'`, `'WINDOWS-1251'`, `'utf'`, `'UTF-8'`, `'auto'`, `'AUTO'`. Значение по умолчанию: `'AUTO'`.

&nbsp;

```js
getEncoding(): string;
```
Возвращает кодировку импортируемого файла.

&nbsp;

```js
import(): Importer
```
Производит импорт в [`Grid`](./views.md#grid) в соответствии с настройками. Возвращает `this`.

&nbsp;

### Интерфейс ListImporter<a name="list-importer"></a>
```ts
interface ListImporter extends Importer {
	setFilePath(path: string): ListImporter;
	setObligatoryListCodes(obligatoryListCodes: boolean): ListImporter;
	getObligatoryListCodes(): boolean;
	setImportToChildListOnly(importToChildListOnly: boolean): ListImporter;
	getImportToChildListOnly(): boolean;
	setUpdatedPropertiesOnParentLevels(updatedPropertiesOnParentLevels: boolean): ListImporter;
	getUpdatedPropertiesOnParentLevels(): boolean;
}
```
Интерфейс импорта в справочник. Интерфейс наследуется от [`Importer`](#importer).

&nbsp;

```js
setFilePath(path: string): ListImporter
```
Устанавливает имя импортируемого файла. Возвращает `this`.

&nbsp;

```js
setObligatoryListCodes(obligatoryListCodes: boolean): ListImporter
```
Устанавливает режим обязательных кодов: если столбец `Code` у элемента пустой, то несуществующие элементы не будут создаваться, но уже существующие тем не менее будут обновлены. Значение по умолчанию: `false`. Возвращает `this`.

&nbsp;

```js
getObligatoryListCodes(): boolean
```
Возвращает признак режима обязательных кодов.

&nbsp;

```js
setImportToChildListOnly(importToChildListOnly: boolean): ListImporter
```
Устанавливает режим обновления свойств `Parent` и `Code` для элементов только текущего справочника. Если аргумент `importToChildListOnly === false`, эти свойства будут обновляться также и у родительских справочников любого уровня. Значение по умолчанию: `false`. Возвращает `this`.

&nbsp;

```js
getImportToChildListOnly(): boolean
```
Возвращает признак режима обновления свойств `Parent` и `Code` для элементов только текущего справочника.

&nbsp;

```js
setUpdatedPropertiesOnParentLevels(updatedPropertiesOnParentLevels: boolean): ListImporter
```
Устанавливает режим обновления собственных свойств для элементов родительских справочников. Значение по умолчанию: `true`. Возвращает `this`.

&nbsp;

```js
getUpdatedPropertiesOnParentLevels(): boolean
```
Возвращает признак режима обновления собственных свойств для элементов родительских справочников.

&nbsp;

### Интерфейс MulticubeImporter<a name="multicube-importer"></a>
```ts
interface MulticubeImporter extends Importer {
}
```
Интерфейс импорта в мультикуб. Интерфейс наследуется от [`Importer`](#importer).

&nbsp;

### Интерфейс VersionsImporter<a name="versions-importer"></a>
```ts
interface VersionsImporter extends Importer {
}
```
Интерфейс импорта в системный справочник версий. Интерфейс наследуется от [`Importer`](#importer).

&nbsp;

### Интерфейс TimePeriodImporter<a name="time-period-importer"></a>
```ts
interface TimePeriodImporter extends Importer {
}
```
Интерфейс импорта в системный справочник времени. Интерфейс наследуется от [`Importer`](#importer).

&nbsp;

## Быстрый импорт в мультикубы<a name="om-import"></a>

### Интерфейс StorageImporter<a name="storage-importer"></a>
```ts
interface StorageImporter extends Importer {
	setMaxFailures(maxFailures: number): StorageImporter;
	setIsCompressed(isCompressed: boolean): StorageImporter;
	setEncoding(encoding: string): StorageImporter;
	setDateFormat(dateFormat: string): StorageImporter;
	setMappings(mappings: object): StorageImporter;
}
```
Интерфейс быстрого импорта. Наследуется от [`Importer`](#importer). Доступен только в мультикубах. В отличие от базового импорта, формат файла фиксирован: сначала идут столбцы с измерениями, далее — столбцы кубов. Для идентификации элемента измерения используются имена элементов (`Item Name`). Все функции возвращают `this`.

&nbsp;

```js
setMaxFailures(maxFailures: number): StorageImporter
```
Устанавливает количество ошибок, после которых попытка импорта прекращается. Уже импортированные значения при этом сохранятся. Значение по умолчанию: `0` (т. е. бесконечность).

&nbsp;

```js
setIsCompressed(isCompressed: boolean): StorageImporter
```
Устанавливает флаг `isCompressed`. Если он равен `true`, во время импорта будет происходить поточная деархивация упакованного в ZIP файла. Значение по умолчанию: `false`.

&nbsp;

```js
setEncoding(encoding: string): StorageImporter
```
Устанавливает кодировку. По умолчанию: `'UTF-8'`.

&nbsp;

```js
setDateFormat(dateFormat: string): StorageImporter
```
Устанавливает формат дат. Аналогично функции [`StorageExporter.setDateFormat()`](#storage-exporter.set-date-format).

&nbsp;

```js
setMappings(mappings: object): StorageImporter;
```
Позволяет установить соответствие полей импортируемого `CSV` и мультикуба-приёмника. Передаётся в виде объекта. 
Пример:
```json
{
  "additionalDimensionMapping": [
    {
      "dimensionName": "vs.SubsetB",
      "dimensionItemName": "Forecast2"
    }
  ],
  "dimensionMapping": [
    {
      "from": "vs.SubsetA",
      "to": "vs.SubsetB"
    },
    {
      "from": "Города",
      "to": "s.Большие Города"
    }
  ],
  "cubeMapping": [
    {
      "from": "Цена",
      "to": "Price"
    },
    {
      "from": "Куб1",
      "to": "КубB"
    }
  ],
  "dimensionItemMapping": [
    {
      "dimensionName": "vs.SubsetB",
      "dimensionItemMap": {
        "Actual": "Forecast2",
        "Budget": "Forecast3"
      }
    },
    {
      "dimensionName": "SKU",
      "dimensionItemMap": {
        "DD33": "LL1",
        "CC11": "KK18",
        "#45": "#370"
      }
    }
  ]
}
```

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
