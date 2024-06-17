# Файлы CSV

## Интерфейс FilesDataManager<a name="files-data-manager"></a>
```ts
interface FilesDataManager {
	csvWriter(): CsvWriter;
	csvReader(path: PathObj): CsvReader;
	converterManager(): ConverterManager;
}
```
Интерфейс, который группирует интерфейсы для работы с файлами в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir).

&nbsp;


```js
csvWriter(): CsvWriter;
```
Возвращает ссылку на [`CsvWriter`](#csv-writer).

&nbsp;

```js
csvReader(path: PathObj): CsvReader;
```
Возвращает ссылку на [`CsvReader`](#csv-reader) для чтения файла `path` в формате [`PathObj`](./fs.md#path-obj).

&nbsp;

```js
converterManager(): ConverterManager;
```
Возвращает ссылку на [`ConverterManager`](#converter-manager).

&nbsp;

### Интерфейс CsvWriter<a name="csv-writer"></a>
```ts
interface CsvWriter {
	params(): CSVParams;
	writeRow(row: string[]): this;
	writeRows(rows: string[][]): this;
	save(name: string, charset?: string): string;
}
```
Интерфейс для записи в новый файл формата [`CSV`](https://ru.wikipedia.org/wiki/CSV). Запись ведётся во временный буфер, и лишь функция [`save()`](#csv-writer.save) сохраняет файл в памяти. Редактировать существующий файл невозможно, вместо этого нужно читать из одного файла и писать в другой.

&nbsp;

```js
params(): CSVParams;
```
Возвращает ссылку на интерфейс [`CSVParams`](./exportImport.md#csv-params), предоставляющий доступ к настройкам CSV.

&nbsp;

```js
writeRow(row: string[]): this;
```
Записывает массив полей `row` в очередную строку файла. Возвращает `this`.

&nbsp;

```js
writeRows(rows: string[][]): this;
```
Записывает двойной массив полей `rows` в очередные несколько строк файла. Возвращает `this`.

&nbsp;

<a name="csv-writer.save"></a>
```js
save(name: string, charset?: string): string;
```
Сохраняет файл в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir) под именем `'{name}.csv'` в кодировке `charset` (допустимые значения: `'UTF-8'`, `'WINDOWS-1251'`, значение по умолчанию: `'UTF-8'`). Не сбрасывает кэш записанных строк, поэтому стоит создавать на каждый записываемый файл свой объект `CsvWriter`. Возвращает имя файла с расширением: `'{name}.csv'`.

&nbsp;

### Интерфейс CsvReader<a name="csv-reader"></a>
```ts
interface CsvReader {
	params(): CSVParams;
	changeFileCharset(charset: string): this;
	generator(): IterableIterator<string[]>;
}
```
Интерфейс для чтения файла формата [`CSV`](https://ru.wikipedia.org/wiki/CSV).

&nbsp;

```js
params(): CSVParams;
```
Возвращает ссылку на интерфейс [`CSVParams`](./exportImport.md#csv-params), предоставляющий доступ к настройкам CSV.

&nbsp;

```js
changeFileCharset(charset: string): this;
```
Устанавливает кодировку файла. Допустимые значения: `'UTF-8'`, `'WINDOWS-1251'`, значение по умолчанию: `'UTF-8'`. Возвращает `this`.

&nbsp;

```js
generator(): IterableIterator<string[]>;
```
Возвращает генератор, при каждом обращении читающий одну строку файла CSV и возвращающий её в виде `string[]`. Генератор вернёт `null`, если исходный файл был длиной 0 байт.

&nbsp;

### Интерфейс BaseConverter<a name="base-converter"></a>
```ts
interface BaseConverter {
	setSource(path: string): this;
	convert(): string;
}
```
Базовый интерфейс преобразования файлов.

&nbsp;

```js
setSource(path: string): this;
```
Устанавливает имя исходного файла. Возвращает `this`.

&nbsp;

```js
convert(): string;
```
Конвертирует файл. Возвращает имя преобразованного файла.

&nbsp;

### Интерфейс ExcelToCsvConverter<a name="excel-to-csv-converter"></a>
```ts
interface ExcelToCsvConverter extends BaseConverter {
	setSheetIdentifier(identifier: string | number): this;
}
```
Интерфейс преобразования файлов Excel в CSV. Наследуется от [`BaseConverter`](#base-converter).

&nbsp;

```js
setSheetIdentifier(identifier: string | number): this;
```
Устанавливает идентификатор или имя листа. Возвращает `this`.

&nbsp;

### Интерфейс ConverterManager<a name="converter-manager"></a>
```ts
interface ConverterManager {
	excelToCsv(): ExcelToCsvConverter;
}
```
Менеджер конвертеров.

&nbsp;

```js
excelToCsv(): ExcelToCsvConverter;
```
Возвращает ссылку на интерфейс [`ExcelToCsvConverter`](#excel-to-csv-converter) преобразования файлов Excel в CSV.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
