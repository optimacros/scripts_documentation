# Файловые системы

## Интерфейс Filesystems<a name="filesystems"></a>
```ts
interface Filesystems {
	ftp(): FTPAdapter;
	local(): Filesystem;
	sharedFolder(id: string): Filesystem;
	filesDataManager(): FilesDataManager;
}
```
Интерфейс, группирующий интерфейсы для работы с файловыми системами.

&nbsp;

```js
ftp(): FTPAdapter;
```
Возвращает ссылку на интерфейс [`FTPAdapter`](#ftp-adapter) доступа к FTP.

&nbsp;

<a name="local"></a>
```js
local(): Filesystem;
```
Возвращает ссылку на интерфейс [`Filesystem`](#filesystem) доступа к локальной файловой системе. Локальная файловая система — временная папка на сервере, которая является рабочей директорией скрипта. Скрипт ***НЕ*** может выйти за её пределы.

&nbsp;

```js
sharedFolder(id: string): Filesystem;
```
Возвращает интерфейс [`Filesystem`](#filesystem) доступа к shared folder – папке на сервере, которая была добавлена администратором при установке Workspace через manifest внутрь контейнера workspace.

&nbsp; 

```js
filesDataManager(): FilesDataManager;
```
Возвращает интерфейс [`FilesDataManager`](./csv.md#files-data-manager) работы с файлами в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir).

&nbsp;

## Интерфейс Filesystem<a name="filesystem"></a>
```ts
interface Filesystem {
	has(path: string): boolean;
	read(path: string): string;
	readAndDelete(path: string): string;
	write(path: string, contents: string): null;
	delete(path: string): null;
	rename(from: string, to: string): null;
	copy(from: string, to: string): null;
	getTimestamp(path: string): number;
	getSize(path: string): number | boolean;
	createDir(path: string): null;
	deleteDir(path: string): null;
	listContents(path: string, recursive: boolean): FileMeta[];
	getMetadata(path: string): Object;
	upload(from: string, to: string): boolean;
	download(from: string, to: string): boolean;
	makeGlobalFile(name: string, extension: string, path: string, copy?: boolean): string;
	getPathObj(path: string): PathObj;
	changeTextFileCharset(path: string, fromCharset: string, toCharset: string): boolean;
}
```
Абстрактный интерфейс файловой системы.

&nbsp;

```js
has(path: string): boolean;
```
Возвращает признак существования файла/папки по адресу `path`.

&nbsp;

```js
read(path: string): string;
```
Читает целиком файл `path` и возвращает его содержимое.

&nbsp;

```js
readAndDelete(path: string): string;
```
Читает целиком файл `path`, удаляет его и возвращает его содержимое.

&nbsp;

```js
write(path: string, contents: string): null;
```
Если файла `path` не существует, создаёт его; при необходимости создаёт промежуточные папки. Затем записывает текст `contents` в файл `path`. Возвращает `null` в случае успешного выполнения.

&nbsp;

```js
delete(path: string): null;
```
Удаляет файл `path`. Возвращает `null` в случае успешного выполнения или если файла не существует.

&nbsp;

```js
rename(from: string, to: string): null;
```
Переименовывает файл/папку `from` в `to`. Возвращает `null` в случае успешного выполнения. Если объекта `from` не существует, бросает исключение.

&nbsp;

```js
copy(from: string, to: string): null;
```
Копирует файл `from` в путь `to`. Возвращает `null` в случае успешного выполнения. Если файла `from` не существует, бросает исключение.

&nbsp;

```js
getTimestamp(path: string): number;
```
Возвращает время последнего изменения в формате [`Unix`](https://ru.wikipedia.org/wiki/Unix-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F).

&nbsp;

```js
getSize(path: string): number | boolean;
```
Возвращает размер файла в байтах. Если `path` является папкой, возвращает `false`. В связи с багом сейчас бросает исключение, если передана папка, а не файл.

&nbsp;

```js
createDir(path: string): null;
```
Создаёт папку `path`; при необходимости создаёт промежуточные папки. Если папка уже существует, ничего не делает. Возвращает `null` в случае успешного выполнения.

&nbsp;

```js
deleteDir(path: string): null;
```
Удаляет папку `path`. Возвращает `null` в случае успешного выполнения или если папки не существует.

&nbsp;

```js
listContents(path: string, recursive: boolean): FileMeta[];
```
Возвращает массив объектов [`FileMeta`](#file-meta), содержащих информацию об объектах внутри папки `path`. Если включен флаг `recursive`, возвращается также информация и о вложенных объектах.

&nbsp;

```js
getMetadata(path: string): Object;
```
Возвращает объект с метаданными о файле/папке, аналогичный [`FileMeta`](#file-meta), однако часть полей может отсутствовать.

&nbsp;

```js
upload(from: string, to: string): boolean;
```
Копирует файл `from` с [`локальной`](#local) файловой системы в путь `to` файловой системы `this`. Возвращает признак успешного выполнения.

&nbsp;

```js
download(from: string, to: string): boolean;
```
Копирует файл `from` с файловой системы `this` в путь `to` [`локальной`](#local) файловой системы. Возвращает признак успешного выполнения.

&nbsp;

<a name="filesystem.make-global-file"></a>
```js
makeGlobalFile(name: string, extension: string, path: string, copy?: boolean): string;
```
Функция доступа *только* для [`локальной`](#local) файловой системы. Регистрирует уже существующий файл `path` в [`глобальном реестре`](../appendix/glossary.md#global-file-registry) под именем `{name}.{extension}`. Аргумент `copy` определяет, копировать или перемещать файл `path` в глобальный реестр; по умолчанию: `true`. Возвращает хэш файла. Как правило, используется для передачи в функцию [`ResultInfo.addFileHash()`](./common.md#result-info.add-file-hash).

&nbsp;

```js
getPathObj(path: string): PathObj;
```
Возвращает интерфейс [`PathObj`](#path-obj).

&nbsp;

```js
changeTextFileCharset(path: string, fromCharset: string, toCharset: string): boolean;
```
Меняет кодировку файла `path` (удаляет и создаёт новый) из кодировки `fromCharset` в кодировку `toCharset`. Список поддерживаемых кодировок [`здесь`](https://www.php.net/manual/ru/mbstring.supported-encodings.php). В случае неправильно указанной кодировки выбрасывает исключение. Возвращает `true` в случае успеха.

&nbsp;

### Интерфейс FileMeta<a name="file-meta"></a>
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
type: string;
```
Тип объекта: `file` или `dir`.

&nbsp;

```js
path: string;
```
Путь к объекту в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir).

&nbsp;

```js
visibility: string;
```
Доступность объекта: `private` или `public`.

&nbsp;

```js
size: number;
```
У файла: размер в байтах. У папок поле отсутствует.

&nbsp;

```js
dirname: string;
```
Папка, в которой находится объект. Для объектов в [`рабочей директории скрипта`](../appendix/glossary.md#script-dir) это пустая строка.

&nbsp;

```js
basename: string;
```
Имя объекта *с расширением*.

&nbsp;

```js
extension: string;
```
Расширение имени без точки. Если расширения нет, поле отсутствует.

&nbsp;

```js
filename: string;
```
Имя объекта (файла или папки) *без последней точки и расширения*.

&nbsp;

```js
timestamp: number;
```
Время последнего изменения в [`формате Unix`](https://ru.wikipedia.org/wiki/Unix-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F).

&nbsp;

### Интерфейс PathObj<a name="path-obj"></a>
```ts
interface PathObj {
	getSystem(): Filesystem;
	getPath(): string;
}
```
Интерфейс, хранящий в себе путь к файлу и ссылку на файловую систему.

&nbsp;

```js
getSystem(): Filesystem;
```
Возвращает ссылку на файловую систему.

&nbsp;

```js
getPath(): string;
```
Возвращает путь к файлу.

&nbsp;

## Интерфейс BaseAdapter<a name="base-adapter"></a>
```ts
interface BaseAdapter {
	load(): Filesystem;
}
```
Базовый интерфейс адаптеров файловых систем.

&nbsp;

```js
load(): Filesystem;
```
Возвращает объект файловой системы [`Filesystem`](#filesystem) с предварительно установленными настройками.

&nbsp;

### Интерфейс FTPAdapter<a name="ftp-adapter"></a>
```ts
interface FTPAdapter extends BaseAdapter {
	setHost(host: string): this;
	getHost(): string;

	setPort(port: number): this;
	getPort(): number;

	setUsername(username: string): this;
	getUsername(): string | null;

	setPassword(password: string): this;
	getPassword(): string | null;

	setRoot(root: string): this;
	getRoot(): string;

	setPassive(passive: boolean): this;
	getPassive(): boolean;
	
	setIgnorePassiveAddress(ignore: boolean): this; 
	getIgnorePassiveAddress(): boolean; 

	setSsl(ssl: boolean): this;
	getSsl(): boolean;

	setTimeout(timeout: number): this;
	getTimeout(): number;

	setUseListOptions(useListOptions: boolean): this;
	getUseListOptions(): boolean;
}
```

Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для соединения с сервером [`FTP`](https://ru.wikipedia.org/wiki/FTP). Наследуется от интерфейса [`BaseAdapter`](#base-adapter).

&nbsp;

```js
setHost(host: string): this;
```
Устанавливает адрес хоста. По умолчанию: `''`. Возвращает `this`.

&nbsp;

```js
getHost(): string;
```
Возвращает адрес хоста.

&nbsp;

```js
setPort(port: number): this;
```
Устанавливает номер порта. По умолчанию: `21`. Возвращает `this`.

&nbsp;

```js
getPort(): number;
```
Возвращает номер порта.

&nbsp;

```js
setUsername(username: string): this;
```
Устанавливает имя пользователя. Возвращает `this`.

&nbsp;

```js
getUsername(): string | null;
```
Возвращает имя пользователя.

&nbsp;

```js
setPassword(password: string): this;
```
Устанавливает пароль. Возвращает `this`.

&nbsp;

```js
getPassword(): string | null;
```
Возвращает пароль.

&nbsp;

```js
setRoot(root: string): this;
```
Устанавливает начальный путь для работы с FTP. По умолчанию: `/`. Возвращает `this`.

&nbsp;

```js
getRoot(): string;
```
Возвращает начальный путь для работы с FTP.

&nbsp;

```js
setPassive(passive: boolean): this;
```
Устанавливает активный или пассивный режим соединения. По умолчанию: `true`. Возвращает `this`.

&nbsp;

```js
getPassive(): boolean;
```
Возвращает признак пассивности режима соединения.

&nbsp;

```js
setIgnorePassiveAddress(ignore: boolean): this;
```
Устанавливает режим игнорирования IP-адреса, полученного от FTP-сервера в пассивном режиме. По умолчанию: `false`. Возвращает `this`. В связи с багом сейчас значение по умолчанию: `null`.

&nbsp;

```js
getIgnorePassiveAddress(ignore: boolean): boolean;
```
Возвращает признак игнорирования IP-адреса, полученного от FTP-сервера в пассивном режиме.

&nbsp;

```js
setSsl(ssl: boolean): this;
```
Устанавливает признак использования протокола [`SSL`](https://ru.wikipedia.org/wiki/SSL) поверх FTP ([`FTPS`](https://ru.wikipedia.org/wiki/FTPS)). По умолчанию: `false`. Возвращает `this`.

&nbsp;

```js
getSsl(): boolean;
```
Возвращает признак использования протокола SSL.

&nbsp;

```js
setTimeout(timeout: number): this;
```
Устанавливает таймаут подключения к серверу в секундах. По умолчанию: `30`. Возвращает `this`.

&nbsp;

```js
getTimeout(): number;
```
Возвращает таймаут подключения к серверу в секундах.

&nbsp;

```js
setUseListOptions(useListOptions: boolean): this;
```
Устанавливает флаги `-aln` у FTP-команды `LIST`. На некоторых серверах (например, ProFTPD) список файлов в директории может ошибочно возвращаться пустым. В этом случае нужно переключить этот параметр на `false`.  По умолчанию: `true`. Возвращает `this`. В связи с багом сейчас значение по умолчанию: `null`.

&nbsp;

```js
getUseListOptions(): boolean;
```
Возвращает признак использования флагов `-aln` у FTP-команды `LIST`.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
