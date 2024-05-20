# Экспорт и импорт

1. [Экспорт из мультикубов и справочников](#export)
1. [Импорт в мультикубы, справочники и системные измерения](#import)
1. [Быстрый импорт в мультикубы](#om-import)

## Экспорт из мультикубов и справочников<a name="export"></a>

### Интерфейс Exporter<a name="exporter"></a>
```ts
interface Exporter {
	setEncoding(encoding: string): this;
	setFormat(format: string): this;
	setOmitSummaryRows(omitSummaryRows: boolean): this;
	setOmitEmptyRows(omitEmptyRows: boolean): this;
	setIncludeCodes(includeCodes: boolean): this;
	setMappingForFlexibleImport(mappingForFlexibleImport: boolean): this;
	setMappingForAdvancedImport(mappingForAdvancedImport: boolean): this;
	setFileName(fileName: string): this;
	setDelimiter(delimiter: string): this;
	setEnclosure(enclosure: string): this;
	setEscape(escape: string): this;
	setShowAliasesWithoutNames(showAliasesWithoutNames: boolean): this;
	setUseCodeLikeLabels(useCodeLikeLabels: boolean): this;
	export(): ExportResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), позволяет сформировать и вызвать запрос на базовый экспорт таблицы. Доступен для всех [`Grid`](./views.md#grid). Все функции, кроме [`export()`](#exporter.export), возвращают `this`.

&nbsp;

```js
setEncoding(encoding: string): this;
```
Устанавливает кодировку экспортируемого файла. Допустимые значения: 
`'win' ,'WIN', 'windows-1251', 'WINDOWS-1251', 'utf', 'UTF', 'utf-8', 'UTF-8'`. По умолчанию: `'UTF-8'`.

&nbsp;

```js
setFormat(format: string): this;
```
Устанавливает формат экспортируемого файла. Допустимые значения: `'csv', 'xls', 'xlsx', 'txt'`. По умолчанию: `'xlsx'`.

&nbsp;

```js
setOmitSummaryRows(omitSummaryRows: boolean): this;
```
Устанавливает флаг пропуска итоговых строк. По умолчанию: `false`.

&nbsp;

```js
setOmitEmptyRows(omitEmptyRows: boolean): this;
```
Устанавливает флаг пропуска пустых строк. По умолчанию: `false`.

&nbsp;

```js
setIncludeCodes(includeCodes: boolean): this;
```
Устанавливает флаг включения кодов для каждого измерения на строках. По умолчанию: `false`.

&nbsp;

```js
setMappingForFlexibleImport(mappingForFlexibleImport: boolean): this;
```
Устанавливает мэппинг для настраиваемого импорта. По умолчанию: `false`.

&nbsp;

```js
setMappingForAdvancedImport(mappingForAdvancedImport: boolean): this;
```
Устанавливает мэппинг для расширенного импорта. По умолчанию: `false`.

&nbsp;

```js
setFileName(fileName: string): this;
```
Устанавливает начальную часть имени экспортируемого файла. По умолчанию: `'view'`. Итоговое имя файла будет иметь вид `'{fileName}--YYYY.MM.DD--HH.mm.{format}'`.

&nbsp;

```js
setDelimiter(delimiter: string): this;
```
Устанавливает разделитель полей. Допустимые значения: `,`, `;`, `\t`. Значение по умолчанию: `;`.

&nbsp;

```js
setEnclosure(enclosure: string): this;
```
Устанавливает обрамляющий символ, которым будет обрамляться текстовое поле, если в нём содержится разделитель полей, пробел, табуляция, сам обрамляющий символ или [`разделитель строк`](#set-line-delimiter) (только для интерфейса [`StorageExporter`](#storage-exporter)). Допустимые значения: `'`, `"`. Значение по умолчанию: `"`.

&nbsp;

```js
setEscape(escape: string): this;
```
Устанавливает экранирующий символ: если в тексте встретится экранирующий символ и вслед за ним обрамляющий, эта последовательность останется неизменной; а если обрамляющий символ будет без экранирующего, он удвоится. Допустимые значения: `\`, `"`. Значение по умолчанию: `\`.

&nbsp;

```js
setShowAliasesWithoutNames(showAliasesWithoutNames: boolean): this;
```
Устанавливает флаг показа псевдонимов без имён. Применимо только для значений справочников. По умолчанию: `false`.

&nbsp;

```js
setUseCodeLikeLabels(useCodeLikeLabels: boolean): this;
```
Устанавливает флаг показа кода вместо имён для тех элементов, у которых есть код. По умолчанию: `false`.

&nbsp;

<a name="exporter.export"></a>
```js
export(): ExportResult;
```
Производит экспорт представления в соответствии с настройками, регистрирует файл в [`глобальном реестре`](../appendix/glossary.md#global-file-registry) и возвращает ссылку на [`ExportResult`](#export-result).

&nbsp;

### Интерфейс StorageExporter<a name="storage-exporter"></a>
```ts
interface StorageExporter extends Exporter {
	setFormat(format: string): this;
	setDelimiter(delimiter: string): this;
	
	setLineDelimiter(lineDelimiter: string): this;
	setFilterFormula(filterFormula: string): this;
	setDecimalSeparator(decimalSeparator: string): this;
	setDateFormat(dateFormat: string): this;
	setBooleanCubeIdentifier(booleanCubeIdentifier: number): this;
}
```
Интерфейс быстрого экспорта. Доступен только в мультикубах. Интерфейс наследуется от [`Exporter`](#exporter). В отличие от базового, формат выгрузки фиксирован и отличается от представления таблицы: в столбцах находятся измерения и кубы. Кроме того, вместо псевдонимов экспортируются только их имена. Все функции, кроме [`export()`](#exporter.export), возвращают `this`.

&nbsp;

```js
setFormat(format: string): this;
```
Устанавливает формат экспортируемого файла. Допустимые значения: `'csv', 'txt', 'gz', 'zip'`. По умолчанию: `'csv'`.

&nbsp;

```js
setDelimiter(delimiter: string): this;
```
Устанавливает разделитель полей. В отличие от аналагичного метода интерфейса `Exporter` можно установить любое значение.  По умолчанию: `;`.

&nbsp;

<a name="set-line-delimiter"></a>
```js
setLineDelimiter(lineDelimiter: string): this;
```
Устанавливает разделитель строк. По умолчанию: `\n`.

&nbsp;

```js
setFilterFormula(filterFormula: string): this;
```
Устанавливает булеву формулу, которая будет применяться в качестве аналога [`setBooleanCubeIdentifier()`](#set-boolean-cube-identifier), но без создания булева куба.

&nbsp;

```js
setDecimalSeparator(decimalSeparator: string): this;
```
Устанавливает десятичный разделитель. Допустимые значения: `,`, `.`.  По умолчанию: `.`.

&nbsp;

<a name="storage-exporter.set-date-format"></a>
```js
setDateFormat(dateFormat: string): this;
```
Устанавливает формат даты. Синтаксис формата такой же, как и в функции C++ [`std::put_time()`](https://en.cppreference.com/w/cpp/io/manip/put_time). Значение по умолчанию: `'%d.%m.%Y'`.

&nbsp;

<a name="set-boolean-cube-identifier"></a>
```js
setBooleanCubeIdentifier(booleanCubeIdentifier: number): this;
```
Устанавливает идентификатор булева куба, который будет использоваться в качестве логического фильтра.

&nbsp;

### Интерфейс ExportResult<a name="export-result"></a>
```ts
interface ExportResult {
	mergeToExternalExcelSheet(toFile: string, toSheet: string, fromSheet?: string): this;
	getHash(): string | null;
	copyToLocal(path: string): this;
	moveToLocal(path: string): this;
}
```
Интерфейс для работы с результатом экспорта.

&nbsp;

```js
mergeToExternalExcelSheet(toFile: string, toSheet: string, fromSheet?: string): this;
```
Если экспорт был в формате `'xls'` или `'xlsx'`, заменяет в файле Excel (формата `.xlsx` или `.xlsm`) `toFile` **существующий** лист `toSheet` и помещает в него результат экспорта.  Данные берутся с листа `fromSheet`, по умолчанию – с первого листа. Возращает `this`.

&nbsp;

```js
getHash(): string | null;
```
Возвращает идентификатор файла в [`глобальном реестре`](../appendix/glossary.md#global-file-registry), или `null`, если файл там отсутствует. Как правило, используется для передачи в функцию [`ResultInfo.addFileHash()`](./common.md#result-info.add-file-hash).

&nbsp;

```js
copyToLocal(path: string): this;
```
Копирует экспортированный файл в путь `path` в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir). Возвращает `this`.

&nbsp;

```js
moveToLocal(path: string): this;
```
Перемещает экспортированный файл в путь `path` в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir) и убирает его из [`глобального реестра`](../appendix/glossary.md#global-file-registry). Возвращает `this`.

&nbsp;

## Импорт в мультикубы, справочники и системные измерения<a name="import"></a>

### Интерфейс CSVParams<a name="csv-params"></a>
```ts
interface CSVParams {
	setDelimiter(delimiter: string): this;
	getDelimiter(): string;
	
	setEnclosure(enclosure: string): this;
	getEnclosure(): string;
	
	setEscape(escape: string): this;
	getEscape(): string;
	
	setLineDelimiter(lineDelimiter: string): this;
	getLineDelimiter(): string;
}
```
Интерфейс настроек различных манипуляций с файлом [`CSV`](https://ru.wikipedia.org/wiki/CSV).

&nbsp;

```js
setDelimiter(delimiter: string): this;
```
Устанавливает разделитель полей. При использовании для интерфейса [`CsvReader`](./csv.md#csv-reader) должен быть однобайтным символом. При использовании для интерфейса [`CsvWriter`](./csv.md#csv-writer) разделитель может быть произвольной строкой, однако, если задана строка более чем из одного символа, механизм обрамления (enclosure) перестаёт работать, и рекомендуется всё же использовать одиночный символ. Значение по умолчанию: `;`. Возвращает `this`.

&nbsp;

```js
getDelimiter(): string;
```
Возвращает разделитель полей.

&nbsp;

<a name="CSVParams.setEnclosure"></a>
```js
setEnclosure(enclosure: string): this;
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
setEscape(escape: string): this;
```
Устанавливает экранирующий символ: если в тексте встретится экранирующий символ и вслед за ним обрамляющий, эта последовательность останется неизменной; а если обрамляющий символ будет без экранирующего, он удвоится.

Допустим лишь один однобайтовый символ. Значение по умолчанию: `\`. Возвращает `this`.

**Если задать в качестве экранирующего символа пустую строку, отключится механизм [`обрамления`](#CSVParams.setEnclosure)!**

&nbsp;

```js
getEscape(): string;
```
Возвращает экранирующий символ.

&nbsp;

<a name="CSVParams.setLineDelimiter"></a>
```js
setLineDelimiter(lineDelimiter: string): this;
```
Устанавливает разделитель строк. По умолчанию: `\n`. Возвращает `this`.

**Для интерфейса [`CsvReader`](./csv.md#csv-reader) невозможно установить значение, отличное от значения по умолчанию!**

&nbsp;

```js
getLineDelimiter(): string;
```
Возвращает разделитель строк.

&nbsp;

### Интерфейс Importer<a name="importer"></a>
```ts
interface Importer {
	csv(): CSVParams;
	setFilePath(path: string): this;
	getFilePath(): string;
	getReportFilePath(): string | null;
	import(): this;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), позволяет сформировать и вызвать запрос на базовый импорт таблицы [`Grid`](./views.md#grid). Результатом импорта является файл отчёта.

&nbsp;

```js
csv(): CSVParams;
```
Возвращает ссылку на интерфейс [`CSVParams`](#csv-params), предоставляющий доступ к настройкам CSV. В случае импорта из Excel не имеет смысла.

&nbsp;

```js
setFilePath(path: string): this;
```
Устанавливает имя импортируемого файла. Возвращает `this`.

&nbsp;

```js
getFilePath(): string;
```
Возвращает имя импортируемого файла.

&nbsp;

```js
getReportFilePath(): string | null;
```
Возвращает путь к файлу отчёта.

&nbsp;

```js
import(): this;
```
Производит импорт в [`Grid`](./views.md#grid) в соответствии с настройками. Возвращает `this`.

&nbsp;

### Интерфейс ListImporter<a name="list-importer"></a>
```ts
interface ListImporter extends Importer {
	setFilePath(path: string): this;
	
	setObligatoryListCodes(obligatoryListCodes: boolean): this;
	getObligatoryListCodes(): boolean;
	
	setImportToChildListOnly(importToChildListOnly: boolean): this;
	getImportToChildListOnly(): boolean;
	
	setUpdatedPropertiesOnParentLevels(updatedPropertiesOnParentLevels: boolean): this;
	getUpdatedPropertiesOnParentLevels(): boolean;
}
```
Интерфейс импорта в справочник. Интерфейс наследуется от [`Importer`](#importer).

&nbsp;

```js
setFilePath(path: string): this;
```
Устанавливает имя импортируемого файла. Возвращает `this`.

&nbsp;

```js
setObligatoryListCodes(obligatoryListCodes: boolean): this;
```
Устанавливает режим обязательных кодов: если столбец `Code` у элемента пустой, то несуществующие элементы не будут создаваться, но уже существующие тем не менее будут обновлены. Значение по умолчанию: `false`. Возвращает `this`.

&nbsp;

```js
getObligatoryListCodes(): boolean;
```
Возвращает признак режима обязательных кодов.

&nbsp;

```js
setImportToChildListOnly(importToChildListOnly: boolean): this;
```
Устанавливает режим обновления свойств `Parent` и `Code` для элементов только текущего справочника. Если аргумент `importToChildListOnly === false`, эти свойства будут обновляться также и у родительских справочников любого уровня. Значение по умолчанию: `false`. Возвращает `this`.

&nbsp;

```js
getImportToChildListOnly(): boolean;
```
Возвращает признак режима обновления свойств `Parent` и `Code` для элементов только текущего справочника.

&nbsp;

```js
setUpdatedPropertiesOnParentLevels(updatedPropertiesOnParentLevels: boolean): this;
```
Устанавливает режим обновления собственных свойств для элементов родительских справочников. Значение по умолчанию: `true`. Возвращает `this`.

&nbsp;

```js
getUpdatedPropertiesOnParentLevels(): boolean;
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
	setMaxFailures(maxFailures: number): this;
	setIsCompressed(isCompressed: boolean): this;
	setEncoding(encoding: string): this;
	setDateFormat(dateFormat: string): this;
	setMappings(mappings: Object): this;
}
```
Интерфейс быстрого импорта. Наследуется от [`Importer`](#importer). Доступен только в мультикубах. В отличие от базового импорта, формат файла фиксирован: сначала идут столбцы с измерениями, далее — столбцы кубов. Для идентификации элемента измерения используются имена элементов (`Item Name`). Все функции возвращают `this`.

&nbsp;

```js
setMaxFailures(maxFailures: number): this;
```
Устанавливает количество ошибок, после которых попытка импорта прекращается. Уже импортированные значения при этом сохранятся. Значение по умолчанию: `0` (т. е. бесконечность).

&nbsp;

```js
setIsCompressed(isCompressed: boolean): this;
```
Устанавливает флаг `isCompressed`. Если он равен `true`, во время импорта будет происходить поточная деархивация упакованного в ZIP файла. Значение по умолчанию: `false`.

&nbsp;

```js
setEncoding(encoding: string): this;
```
Устанавливает кодировку. По умолчанию: `'UTF-8'`.

&nbsp;

```js
setDateFormat(dateFormat: string): this;
```
Устанавливает формат дат. Аналогично функции [`StorageExporter.setDateFormat()`](#storage-exporter.set-date-format).

&nbsp;

```js
setMappings(mappings: Object): this;
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
