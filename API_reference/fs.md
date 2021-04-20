# Файловые системы

1. Локальная файловая система
1. FTP
1. Shared folder
1. Файлы CSV


### Интерфейс Filesystems ...<a name="Filesystems"></a>
```ts
interface Filesystems {
    ftp(): FTPAdapter;
    local(): Filesystem;
    sharedFolder(id: string): Filesystem;
    filesDataManager(): FilesDataManager;
}
```

---

### Интерфейс Filesystem ...<a name="Filesystem"></a>
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
Абстрактный интерфейс файловой системы.

&nbsp;

```js
has(path: string): boolean
```
Возвращает признак существования пути `path`.

## Локальная файловая система

Локальная файловая система — временная папка на сервере, которая является рабочей директорией скрипта. Скрипт ***не*** может выйти за её пределы.

## FTP

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

### Интерфейс FTPAdapter ...<a name="FTPAdapter"></a>
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

Интерфейс для соединения с сервером [`FTP`](https://ru.wikipedia.org/wiki/FTP).

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

## Shared folder


## Файлы CSV



[API Reference](API_reference.md)

[Оглавление](../README.md)