# Файловые системы

1. [Общие интерфейсы файловых систем](#generalFS)
1. [Локальная файловая система](#localFS)
1. [FTP](#ftp)
1. [Shared folder](#sharedFolder)
1. [Файлы CSV](#csv)

## Общие интерфейсы файловых систем<a name="generalFS"></a>

### Интерфейс Filesystems ...<a name="Filesystems"></a>
```ts
interface Filesystems {
	ftp(): FTPAdapter;
	local(): Filesystem;
	sharedFolder(id: string): Filesystem;
	filesDataManager(): FilesDataManager;
}
```

&nbsp;

```js
ftp(): FTPAdapter
```
Возвращает ссылку на интерфейс [`FTPAdapter`](#FTPAdapter) доступа к FTP.

&nbsp;

<a name="local"></a>
```js
local(): Filesystem
```
Возвращает ссылку на интерфейс [`Filesystem`](#Filesystem) доступа к локальной файловой системе.

&nbsp;

```js
sharedFolder(id: string): Filesystem
```
sharedFolder – папка на сервере, которая была добавлена администратором при установке Workspace через manifest внутрь контейнера workspace. Папка на хостовой ОС. 

```js
filesDataManager(): FilesDataManager
```

&nbsp;

### Интерфейс FileMeta<a name="FileMeta"></a>
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
Интерфейс содержит набор свойств файла или папки.

&nbsp;

```js
type: string
```
Тип объекта: `file` или `dir`.

&nbsp;

```js
path: string
```
Путь к объекту в [`рабочей директории скрипта`](../appendix/glossary.md#scriptDir).

&nbsp;

```js
visibility: string
```
Доступность объекта: `private` или `public`.

&nbsp;

```js
size: number
```
У файла: размер в байтах. У папок поле отсутствует.

&nbsp;

```js
dirname: string
```
Папка, в которой находится объект. Для объектов в [`рабочей директории скрипта`](../appendix/glossary.md#scriptDir) это пустая строка.

&nbsp;

```js
basename: string
```
Имя объекта *с расширением*.

&nbsp;

```js
extension: string
```
Расширение имени без точки. Если расширения нет, поле отсутствует.

&nbsp;

```js
filename: string
```
Имя объекта (файла или папки) *без последней точки и расширения*.

&nbsp;

```js
timestamp: number
```
Время последнего изменения в [`формате Unix`](https://ru.wikipedia.org/wiki/Unix-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F).

&nbsp;

### Интерфейс PathObj<a name="PathObj"></a>
```ts
interface PathObj {
	getSystem(): Filesystem;
	getPath(): string;
}
```
Интерфейс, хранящий в себе путь к файлу и ссылку на файловую систему.

&nbsp;

```js
getSystem(): Filesystem
```
Возвращает ссылку на файловую систему.

&nbsp;

```js
getPath(): string
```
Возвращает путь к файлу.

&nbsp;

### Интерфейс Filesystem<a name="Filesystem"></a>
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
	getSize(path: string): number | boolean;
	createDir(path: string): boolean;
	deleteDir(path: string): boolean;
	listContents(path: string, recursive: boolean): FileMeta[];
	getMetadata(path: string): Object;
	upload(from: string, to: string): boolean;
	download(from: string, to: string): boolean;
	makeGlobalFile(name: string, extension: string, path: string, copy?: boolean): string;
	getPathObj(path: string): PathObj;
}
```
Абстрактный интерфейс файловой системы.

&nbsp;

```js
has(path: string): boolean
```
Возвращает признак существования файла/папки по адресу `path`.

&nbsp;

```js
read(path: string): string
```
Читает целиком файл `path` и возвращает его содержимое.

&nbsp;

```js
readAndDelete(path: string): string
```
Читает целиком файл `path`, удаляет его и возвращает его содержимое.

&nbsp;

```js
write(path: string, contents: string): boolean
```
Если файла `path` не существует, создаёт его; при необходимости создаёт промежуточные папки. Затем записывает текст `contents` в файл `path` и возвращает признак успешного выполнения. 

&nbsp;

```js
delete(path: string): boolean
```
Удаляет файл `path`. Возвращает признак успешного выполнения. Если файл не существует, выбрасывает исключение.

&nbsp;

```js
rename(from: string, to: string): boolean
```
Переименовывает объект `from` в `to`. Возвращает признак успешного выполнения.

&nbsp;

```js
copy(from: string, to: string): boolean
```
Копирует файл `from` в путь `to`. Возвращает признак успешного выполнения.

&nbsp;

```js
getTimestamp(path: string): string
```
Возвращает время последнего изменения в формате [`Unix`](https://ru.wikipedia.org/wiki/Unix-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F).

&nbsp;

```js
getSize(path: string): number | boolean
```
Возвращает размер файла в байтах. Если `path` является папкой, возвращает `false`.

&nbsp;

```js
createDir(path: string): boolean
```
Создаёт папку `path`; при необходимости создаёт промежуточные папки. Возвращает признак успешного выполнения.

&nbsp;

```js
deleteDir(path: string): boolean
```
Удаляет папку `path`. Возвращает признак успешного выполнения.

&nbsp;

```js
listContents(path: string, recursive: boolean): FileMeta[]
```
Возвращает массив объектов [`FileMeta`](#FileMeta), содержащих информацию об объектах внутри папки `path`. Если включен флаг `recursive`, возвращается также информация и о вложенных объектах.

&nbsp;

```js
getMetadata(path: string): Object
```
Возвращает объект с метаданными о файле/папке, аналогичный [`FileMeta`](#FileMeta), однако часть полей может отсутствовать.

&nbsp;

```js
upload(from: string, to: string): boolean
```
Копирует файл `from` с [`локальной`](#local) файловой системы в путь `to` файловой системы `this`. Возвращает признак успешного выполнения.

&nbsp;

```js
download(from: string, to: string): boolean
```
Копирует файл `from` с файловой системы `this` в путь `to` [`локальной`](#local) файловой системы. Возвращает признак успешного выполнения.

&nbsp;

```js
makeGlobalFile(name: string, extension: string, path: string, copy?: boolean): string
```
Функция доступа *только* для [`локальной`](#local) файловой системы. Регистрирует уже существующий файл `path` в [`глобальном реестре`](../appendix/glossary.md#globalFileRegistry) под именем `{name}.{extension}`. Аргумент `copy` определяет, копировать или перемещать файл `path` в глобальный реестр; по умолчанию: `true`. Возвращает хэш файла. Как правило, используется для передачи в функцию [`ResultInfo.addFileHash()`](./common.md#ResultInfo.addFileHash).

&nbsp;

```js
getPathObj(path: string): PathObj
```
Возвращает интерфейс [`PathObj`](#PathObj).

&nbsp;

## Локальная файловая система<a name="localFS"></a>

Локальная файловая система — временная папка на сервере, которая является рабочей директорией скрипта. Скрипт ***НЕ*** может выйти за её пределы.

&nbsp;

## FTP<a name="ftp"></a>

### Интерфейс BaseAdapter<a name="BaseAdapter"></a>
```ts
interface BaseAdapter {
	load(): Filesystem;
}
```
Базовый интерфейс адаптеров файловых систем.

&nbsp;

```js
load(): Filesystem
```
Возвращает объект файловой системы [`Filesystem`](#Filesystem) с предварительно установленными настройками.

&nbsp;

### Интерфейс FTPAdapter<a name="FTPAdapter"></a>
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
	
	setIgnorePassiveAddress(ignore: boolean): FTPAdapter; 
	getIgnorePassiveAddress(): boolean; 

	setSsl(ssl: boolean): FTPAdapter;
	getSsl(): boolean;

	setTimeout(timeout: number): FTPAdapter;
	getTimeout(): number;

	setUseListOptions(useListOptions: boolean): FTPAdapter;
	getUseListOptions(): boolean;
}
```

Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для соединения с сервером [`FTP`](https://ru.wikipedia.org/wiki/FTP).

&nbsp;

```js
setHost(host: string): FTPAdapter
```
Устанавливает адрес хоста. Возвращает `this`.

&nbsp;

```js
getHost(): string
```
Возвращает адрес хоста.

&nbsp;

```js
setPort(port: number): FTPAdapter
```
Устанавливает номер порта. Возвращает `this`.

&nbsp;

```js
getPort(): number
```
Возвращает номер порта.

&nbsp;

```js
setUsername(username: string): FTPAdapter
```
Устанавливает имя пользователя. Возвращает `this`.

&nbsp;

```js
getUsername(): string
```
Возвращает имя пользователя.

&nbsp;

```js
setPassword(password: string): FTPAdapter
```
Устанавливает пароль. Возвращает `this`.

&nbsp;

```js
getPassword(): string
```
Возвращает пароль.

&nbsp;

```js
setRoot(root: string): FTPAdapter
```
Устанавливает начальный путь для работы с FTP. По умолчанию: `/`. Возвращает `this`.

&nbsp;

```js
getRoot(): string
```
Возвращает начальный путь для работы с FTP.

&nbsp;

```js
setPassive(passive: boolean): FTPAdapter
```
Устанавливает активный или пассивный режим соединения. По умолчанию: `true`. Возвращает `this`.

&nbsp;

```js
getPassive(): boolean
```
Возвращает признак пассивности режима соединения.

&nbsp;

```js
setIgnorePassiveAddress(ignore: boolean) : FTPAdapter
```
Устанавливает режим игнорирования IP-адреса, полученного от FTP-сервера в пассивном режиме. По умолчанию: `false`. Возвращает `this`.

&nbsp;


```js
getIgnorePassiveAddress(ignore: boolean) : boolean
```
Возвращает признак игнорирования IP-адреса, полученного от FTP-сервера в пассивном режиме.

&nbsp;

```js
setSsl(ssl: boolean): FTPAdapter
```
Устанавливает признак использования протокола [`SSL`](https://ru.wikipedia.org/wiki/SSL) поверх FTP ([`FTPS`](https://ru.wikipedia.org/wiki/FTPS)). По умолчанию: `false`. Возвращает `this`.

&nbsp;

```js
getSsl(): boolean
```
Возвращает признак использования протокола SSL.

&nbsp;

```js
setTimeout(timeout: number): FTPAdapter
```
Устанавливает таймаут подключения к серверу в секундах. По умолчанию: `30`. Возвращает `this`.

&nbsp;

```js
getTimeout(): number
```
Возвращает таймаут подключения к серверу в секундах.

&nbsp;

```js
setUseListOptions(useListOptions: boolean): FTPAdapter
```
Устанавливает флаги `-aln` у FTP-команды `LIST`. FTP может быть настроен по особенному, поэтому иногда требуется передать `false`. По умолчанию: `true`. Возвращает `this`.

&nbsp;

```js
getUseListOptions(): boolean
```
Возвращает признак использованися флагов `-aln` у FTP-команды `LIST`.

&nbsp;

## Shared folder<a name="sharedFolder"></a>

&nbsp;

## Файлы CSV<a name="csv"></a>

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
Возвращает ссылку на интерфейс [`CSVParams`](./OMviews.md#CSVParams), предоставляющий доступ к настройкам CSV.

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
Возвращает ссылку на интерфейс [`CSVParams`](./OMviews.md#CSVParams), предоставляющий доступ к настройкам CSV.

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

### Интерфейс BaseConverter ...<a name="BaseConverter"></a>
```ts
interface BaseConverter {
	setSource(path: string): BaseConverter;
	convert(): string;
}
```

&nbsp;

```js
setSource(path: string): BaseConverter
```

&nbsp;

```js
convert(): string
```

&nbsp;

### Интерфейс ExcelToCsvConverter ...<a name="ExcelToCsvConverter"></a>
```ts
interface ExcelToCsvConverter extends BaseConverter {
	setSheetIdentifier(identifier: string | number): ExcelToCsvConverter;
}
```

&nbsp;

```js
setSheetIdentifier(identifier: string | number): ExcelToCsvConverter
```

&nbsp;

### Интерфейс ConverterManager ...<a name="ConverterManager"></a>
```ts
interface ConverterManager {
	excelToCsv(): ExcelToCsvConverter;
}
```


&nbsp;

```js
excelToCsv(): ExcelToCsvConverter
```

&nbsp;

### Интерфейс FilesDataManager<a name="FilesDataManager"></a>
```ts
interface FilesDataManager {
	csvWriter(): CsvWriter;
	csvReader(path: PathObj): CsvReader;
	converterManager(): ConverterManager;
}
```
Интерфейс, который группирует интерфейсы для работы с данными файлов в [`рабочей директории скрипта`](../appendix/glossary.md#scriptDir).

&nbsp;


```js
csvWriter(): CsvWriter
```
Возвращает ссылку на [`CsvWriter`](#CsvWriter).

&nbsp;

```js
csvReader(path: PathObj): CsvReader
```
Возвращает ссылку на [`CsvReader`](#CsvReader) для чтения файла `path` в формате [`PathObj`](#PathObj).

&nbsp;

```js
converterManager(): ConverterManager
```
Возвращает ссылку на [`ConverterManager`](#ConverterManager).



[API Reference](API.md)

[Оглавление](../README.md)