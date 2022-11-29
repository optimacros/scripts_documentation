# Файлы CSV

## Интерфейс FilesDataManager<a name="FilesDataManager"></a>
```ts
interface FilesDataManager {
	csvWriter(): CsvWriter;
	csvReader(path: PathObj): CsvReader;
	converterManager(): ConverterManager;
}
```
Интерфейс, который группирует интерфейсы для работы с файлами в [`рабочей директории скрипта`](../appendix/glossary.md#scriptDir).

&nbsp;


```js
csvWriter(): CsvWriter
```
Возвращает ссылку на [`CsvWriter`](#CsvWriter).

&nbsp;

```js
csvReader(path: PathObj): CsvReader
```
Возвращает ссылку на [`CsvReader`](#CsvReader) для чтения файла `path` в формате [`PathObj`](./fs.md#PathObj).

&nbsp;

```js
converterManager(): ConverterManager
```
Возвращает ссылку на [`ConverterManager`](#ConverterManager).

&nbsp;

### Интерфейс CsvWriter<a name="CsvWriter"></a>
```ts
interface CsvWriter {
	params(): CSVParams;
	writeRow(row: string[]): CsvWriter;
	writeRows(rows: string[][]): CsvWriter;
	save(name: string, charset?: string): string;
}
```
Интерфейс для записи в новый файл формата [`CSV`](https://ru.wikipedia.org/wiki/CSV). Запись ведётся во временный буфер, и лишь функция [`save()`](#CsvWriter.save) сохраняет файл в памяти. Редактировать существующий файл невозможно, вместо этого нужно читать из одного файла и писать в другой.

&nbsp;

```js
params(): CSVParams
```
Возвращает ссылку на интерфейс [`CSVParams`](./exportImport.md#CSVParams), предоставляющий доступ к настройкам CSV.

&nbsp;

```js
writeRow(row: string[]): CsvWriter
```
Записывает массив полей `row` в очередную строку файла. Возвращает `this`.

&nbsp;

```js
writeRows(rows: string[][]): CsvWriter
```
Записывает двойной массив полей `rows` в очередные несколько строк файла. Возвращает `this`.

&nbsp;

<a name="CsvWriter.save"></a>
```js
save(name: string, charset?: string): string
```
Сохраняет файл в [`рабочей директории скрипта`](../appendix/glossary.md#scriptDir) под именем `{name}.csv` в кодировке `charset` (допустимые значения: `UTF-8`, `WINDOWS-1251`, значение по умолчанию: `UTF-8`). Возвращает имя файла с расширением: `{name}.csv`.

&nbsp;

### Интерфейс CsvReader<a name="CsvReader"></a>
```ts
interface CsvReader {
	params(): CSVParams;
	changeFileCharset(charset: string): CsvReader;
	generator(): string[][];
}
```
Интерфейс для чтения файла формата [`CSV`](https://ru.wikipedia.org/wiki/CSV).

&nbsp;

```js
params(): CSVParams
```
Возвращает ссылку на интерфейс [`CSVParams`](./exportImport.md#CSVParams), предоставляющий доступ к настройкам CSV.

&nbsp;

```js
changeFileCharset(charset: string): CsvReader
```
Устанавливает кодировку файла. Допустимые значения: `UTF-8`, `WINDOWS-1251`, значение по умолчанию: `UTF-8`. Возвращает `this`.

&nbsp;

```js
generator(): string[][]
```
Возвращает генератор, при каждом обращении читающий одну строку файла CSV и возвращающий её в виде `string[]`.

&nbsp;

### Интерфейс BaseConverter<a name="BaseConverter"></a>
```ts
interface BaseConverter {
	setSource(path: string): this;
	convert(): string;
}
```
Базовый интерфейс преобразования файлов.

&nbsp;

```js
setSource(path: string): this
```
Устанавливает имя исходного файла. Возвращает `this`.

&nbsp;

```js
convert(): string
```
Конвертирует файл. Возвращает имя преобразованного файла.

&nbsp;

### Интерфейс ExcelToCsvConverter<a name="ExcelToCsvConverter"></a>
```ts
interface ExcelToCsvConverter extends BaseConverter {
	setSheetIdentifier(identifier: string | number): ExcelToCsvConverter;
}
```
Интерфейс преобразования файлов Excel в CSV. Наследуется от [`BaseConverter`](#BaseConverter).

&nbsp;

```js
setSheetIdentifier(identifier: string | number): ExcelToCsvConverter
```
Устанавливает идентификатор или имя листа. Возвращает `this`.

&nbsp;

### Интерфейс ConverterManager<a name="ConverterManager"></a>
```ts
interface ConverterManager {
	excelToCsv(): ExcelToCsvConverter;
}
```
Менеджер конвертеров.

&nbsp;

```js
excelToCsv(): ExcelToCsvConverter
```
Возвращает ссылку на интерфейс [`ExcelToCsvConverter`](#ExcelToCsvConverter) преобразования файлов Excel в CSV.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)