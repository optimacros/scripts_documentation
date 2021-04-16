# Файловые системы

1. Локальная файловая система
1. FTP
1. Shared folder
1. Файлы CSV


### Интерфейс Filesystems
```ts
interface Filesystems {
    ftp(): FTPAdapter;
    local(): Filesystem;
    sharedFolder(id: string): Filesystem;
    filesDataManager(): FilesDataManager;
}
```

---

### Интерфейс Filesystem
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

```js
has(path: string): boolean
```
Возвращает признак существования пути `path`.


## Локальная файловая система

Локальная файловая система — временная папка на сервере, которая является рабочей директорией скрипта. Скрипт ***не*** может выйти за её пределы.

## FTP

### Интерфейс BaseAdapter
```ts
interface BaseAdapter {
    load(): Filesystem;
}
```

Базовый интерфейс адаптеров файловых систем.

```js
load(): Filesystem
```
Возвращает объект файловой системы с предварительно установленными настройками.

### Интерфейс FTPAdapter
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

Интерфейс для соединения с FTP.

```js
setHost(host: string): FTPAdapter
```
Устанавливает адрес хоста. Возвращает `this`.

&nbsp;

```js
getHost(): string
```
Возвращает адрес хоста.

```js
setPort(port: number): FTPAdapter
```
Устанавливает порт. Возвращает `this`.

```js
getPort(): number
```
Возвращает порт.

```js
setUsername(username: string): FTPAdapter
```
Устанавливает имя пользователя. Возвращает `this`.

```js
getUsername(): string
```
Возвращает имя пользователя.

```js
setPassword(password: string): FTPAdapter
```
Устанавливает пароль. Возвращает `this`.

```js
getPassword(): string
```
Возвращает пароль.


___
```js
setRoot(root: string): FTPAdapter
```
Устанавливает порт. Возвращает `this`.

```js
getRoot(): string
```
Возвращает порт.

```js
setPassive(passive: boolean): FTPAdapter
```
Устанавливает активный или пассивный режим соединения. Возвращает `this`.

```js
getPassive(): boolean
```
Возвращает признак пассивности режима соединения.

```js
setSsl(ssl: boolean): FTPAdapter
```
Устанавливает порт. Возвращает `this`.

```js
getSsl(): boolean
```
Возвращает порт.

```js
setTimeout(timeout: number): FTPAdapter
```
Устанавливает порт. Возвращает `this`.

```js
getTimeout(): number
```
Возвращает порт.

```js
setUseListOptions(useListOptions: boolean): FTPAdapter
```
Устанавливает порт. Возвращает `this`.

```js
getUseListOptions(): boolean
```
Возвращает порт.
___

## Shared folder


## Файлы CSV



[API Reference](API_reference.md)

[Оглавление](../README.md)