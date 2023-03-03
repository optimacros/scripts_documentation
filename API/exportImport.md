# Экспорт и импорт

1. [Экспорт из мультикубов и справочников](#export)
1. [Импорт в мультикубы и справочники](#import)

## Экспорт из мультикубов и справочников<a name="export"></a>

### Интерфейс Exporter<a name="Exporter"></a>
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
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), позволяет сформировать и вызвать запрос на базовый экспорт таблицы. Доступен для всех [`Grid`](./views.md#Grid). Все функции, кроме [`export()`](#Exporter.export), возвращают `this`.

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

<a name="setDelimiter"></a>
```js
setDelimiter(delimiter: string): Exporter
```
Устанавливает разделитель полей. Допустимые значения: `,`, `;`, `\t`.  По умолчанию: `;`.

&nbsp;

<a name="setEnclosure"></a>
```js
setEnclosure(enclosure: string): Exporter
```
Устанавливает обрамляющий символ, которым будет обрамляться текстовое поле, если в нём содержится разделитель полей. Допустимые значения: `'` и `"`. По умолчанию: `"`.

&nbsp;

<a name="setEscape"></a>
```js
setEscape(escape: string): Exporter
```
Устанавливает символ для экранирования обрамляющего символа, если встретится в строке ещё и он, и символа переноса строки. Допустимые значения: `\` и `"`. По умолчанию равен обрамляющему символу.

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

<a name="Exporter.export"></a>
```js
export(): ExportResult
```
Производит экспорт представления в соответствии с настройками, регистрирует файл в [`глобальном реестре`](../appendix/glossary.md#globalFileRegistry) и возвращает ссылку на [`ExportResult`](#ExportResult).

&nbsp;

### Интерфейс StorageExporter<a name="StorageExporter"></a>
```ts
interface StorageExporter extends Exporter {
	setFormat(format: string): StorageExporter;
	setLineDelimiter(lineDelimiter: string): StorageExporter;
	setFilterFormula(filterFormula: string): StorageExporter;
	setDecimalSeparator(decimalSeparator: string): StorageExporter;
	setDateFormat(dateFormat: string): StorageExporter;
	setBooleanCubeIdentifier(booleanCubeIdentifier: number): StorageExporter;
}
```
Интерфейс быстрого экспорта. Доступен только в мультикубах. Интерфейс наследуется от [`Exporter`](#Exporter). В отличие от базового, формат выгрузки фиксирован и отличается от представления таблицы: в столбцах находятся измерения и кубы. Кроме того, вместо псевдонимов экспортируются только их имена. Все функции, кроме [`export()`](#Exporter.export), возвращают `this`.

&nbsp;

```js
setFormat(format: string): StorageExporter
```
Устанавливает формат экспортируемого файла. Допустимые значения: `'csv', 'txt', 'gz', 'zip'`. По умолчанию: `'csv'`.

&nbsp;

<a name="setLineDelimiter"></a>
```js
setLineDelimiter(lineDelimiter: string): StorageExporter
```
Устанавливает разделитель строк. По умолчанию: `\n`.

&nbsp;

```js
setFilterFormula(filterFormula: string): StorageExporter
```
Устанавливает булеву формулу, которая будет применяться в качестве аналога [`setBooleanCubeIdentifier()`](#setBooleanCubeIdentifier), но без создания булева куба.

&nbsp;

```js
setDecimalSeparator(decimalSeparator: string): StorageExporter
```
Устанавливает десятичный разделитель. Допустимые значения: `,`, `.`.  По умолчанию: `.`.

&nbsp;

<a name="StorageExporter.setDateFormat"></a>
```js
setDateFormat(dateFormat: string): StorageExporter
```
Устанавливает формат даты. Синтаксис формата такой же, как и в функции C++ [`std::put_time()`](https://en.cppreference.com/w/cpp/io/manip/put_time). Значение по умолчанию: `'%d.%m.%Y'`.

&nbsp;

<a name="setBooleanCubeIdentifier"></a>
```js
setBooleanCubeIdentifier(booleanCubeIdentifier: number): StorageExporter
```
Устанавливает идентификатор булева куба, который будет использоваться в качестве логического фильтра.

&nbsp;

### Интерфейс ExportResult<a name="ExportResult"></a>
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
Если экспорт был в формате `'xls'` или `'xlsx'`, создаёт в файле Excel `toFile` новый лист `toSheet` и помещает в него результат экспорта.  Данные берутся с листа `fromSheet`, по умолчанию – с первого листа. Возвращает `this`. *В ходе тестов удалось только импортировать результат в **существующий лист**. Требует дополнительной проверки*.

&nbsp;

```js
getHash(): string | null
```
Возвращает идентификатор файла в [`глобальном реестре`](../appendix/glossary.md#globalFileRegistry), или `null`, если файл там отсутствует. Как правило, используется для передачи в функцию [`ResultInfo.addFileHash()`](./common.md#ResultInfo.addFileHash).

&nbsp;

```js
copyToLocal(path: string): ExportResult
```
Копирует экспортированный файл в путь `path` в [`рабочей директории скрипта`](../appendix/glossary.md#scriptDir). Возвращает `this`.

&nbsp;

```js
moveToLocal(path: string): ExportResult
```
Перемещает экспортированный файл в путь `path` в [`рабочей директории скрипта`](../appendix/glossary.md#scriptDir) и убирает его из [`глобального реестра`](../appendix/glossary.md#globalFileRegistry). Возвращает `this`.

&nbsp;

## Импорт в мультикубы и справочники<a name="import"></a>

### Интерфейс CSVParams<a name="CSVParams"></a>
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
Интерфейс настроек импорта из файла [`CSV`](https://ru.wikipedia.org/wiki/CSV).

&nbsp;

```js
setDelimiter(delimiter: string): CSVParams
```
Устанавливает разделитель полей. Аналогично `Exporter`.[`setDelimiter()`](#setDelimiter). Возвращает `this`.

&nbsp;

```js
getDelimiter(): string
```
Возвращает разделитель полей.

&nbsp;

```js
setEnclosure(enclosure: string): CSVParams
```
Устанавливает обрамляющий символ. Аналогично `Exporter`.[`setEnclosure()`](#setEnclosure). Возвращает `this`.

&nbsp;

```js
getEnclosure(): string
```
Возвращает обрамляющий символ.

&nbsp;

```js
setEscape(escape: string): CSVParams
```
Устанавливает символ для экранирования обрамляющего символа. Аналогично `Exporter`.[`setEscape()`](#setEscape). Возвращает `this`.

&nbsp;

```js
getEscape(): string
```
Возвращает символ для экранирования обрамляющего символа.

&nbsp;

```js
setLineDelimiter(escape: string): CSVParams
```
Устанавливает разделитель строк. Аналогично `StorageExporter`.[`setLineDelimiter()`](#setLineDelimiter). Возвращает `this`.

&nbsp;

```js
getLineDelimiter(): string
```
Возвращает разделитель строк.

&nbsp;

### Интерфейс Importer<a name="Importer"></a>
```ts
interface Importer {
	csv(): CSVParams;
	setFilePath(path: string): Importer;
	getFilePath(): string;
	getReportFilePath(): string | null;
	import(): Importer;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), позволяет сформировать и вызвать запрос на базовый импорт таблицы [`Grid`](./views.md#Grid). Доступен в мультикубах и в справочниках. Результатом импорта является файл отчёта.

&nbsp;

```js
csv(): CSVParams
```
Возвращает ссылку на интерфейс [`CSVParams`](#CSVParams), предоставляющий доступ к настройкам CSV. В случае импорта из Excel не имеет смысла.

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
import(): Importer
```
Производит импорт в [`Grid`](./views.md#Grid) в соответствии с настройками. Возвращает `this`.

&nbsp;

### Интерфейс StorageImporter<a name="StorageImporter"></a>
```ts
interface StorageImporter extends Importer {
	setMaxFailures(maxFailures: number): StorageImporter;
	setIsCompressed(isCompressed: boolean): StorageImporter;
	setEncoding(encoding: string): StorageImporter;
	setDateFormat(dateFormat: string): StorageImporter;
	setMappings(mappings: object): StorageImporter;
}
```
Интерфейс быстрого импорта. Доступен только в мультикубах. Интерфейс наследуется от [`Importer`](#Importer). В отличие от базового, формат выгрузки фиксирован и отличается от представления таблицы: в столбцах находятся измерения и кубы. Кроме того, вместо псевдонимов экспортируются только их имена. Все функции возвращают `this`.

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
Устанавливает формат дат. Аналогично функции [`StorageExporter.setDateFormat()`](#StorageExporter.setDateFormat).

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
