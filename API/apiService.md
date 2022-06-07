# ApiService

Все интерфейсы этого раздела находятся в пространстве имён `ApiService`.

&nbsp;

### Интерфейс RequestInfo<a name="RequestInfo"></a>
```ts
interface RequestInfo {
	getMethod(): string;
    getClientInfo(): ClientInfo;
    getCookieInfos(): ParamInfos;
    getHeaderInfos(): ParamInfos;
    getUrlParamInfos(): ParamInfos;
    getFileInfos(): RequestFileInfos;
    getBodyParamInfos(): ParamInfos;
    getResponseInfo(): ResponseInfo;
}
```
Интерфейс для получения информации о запросе, который был отправлен по протоколу [`HTTP`](https://ru.wikipedia.org/wiki/HTTP) к API сервису.

&nbsp;

```js
getMethod(): string
```
Возвращает [`метод HTTP запроса`](https://ru.wikipedia.org/wiki/HTTP#%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%D1%8B). API сервис поддерживает только методы GET и POST. 

&nbsp;

```js
getClientInfo(): ClientInfo
```
Возвращает ссылку на интерфейс [`ClientInfo`](#ClientInfo) для получения информации о клиенте.

&nbsp;

```js
getCookieInfos(): ParamInfos
```
Возвращает ссылку на интерфейс [`ParamInfos`](#ParamInfos) для получения информации о куках, которые передал клиент в HTTP заголовке [`Cookies`](https://ru.wikipedia.org/wiki/Cookie).

&nbsp;

```js
getHeaderInfos(): ParamInfos
```
Возвращает ссылку на интерфейс [`ParamInfos`](#ParamInfos) для получения информации о [`HTTP-заголовках`](https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BA%D0%B8_HTTP), которые передал клиент.

&nbsp;

```js
getUrlParamInfos(): ParamInfos
```
Возвращает ссылку на интерфейс [`ParamInfos`](#ParamInfos) для получения информации о параметрах, которые передал клиент в URL адресе.

&nbsp;

```js
getFileInfos(): RequestFileInfos
```
Возвращает ссылку на интерфейс [`RequestFileInfos`](#RequestFileInfos) для получения информации о загруженных клиентом файлах при регистрации API запросов.

&nbsp;

```js
getBodyParamInfos(): ParamInfos
```
Возвращает ссылку на интерфейс [`ParamInfos`](#ParamInfos) для получения информации о POST параметрах.

&nbsp;

```js
getResponseInfo(): ResponseInfo
```
Возвращает ссылку на интерфейс [`ResponseInfo`](#ResponseInfo)

&nbsp;

### Интерфейс ClientInfo<a name="ClientInfo"></a>
```ts
interface ClientInfo {
	getAgent(): string;
    getIp(): string;
}
```
Интерфейс для получения информации о клиенте, который отправил запрос к API сервису.

&nbsp;

```js
getAgent(): string
```
Возвращает значение заголовка User-Agent, если он был передан.

&nbsp;

```js
getIp(): string
```
Возвращает значение IPv4 адреса клиента.

&nbsp;

### Интерфейс ParamInfos<a name="ParamInfos"></a>
```ts
interface ParamInfos {
	get(key: string): ParamInfo | null;
    getAll(): ParamInfo[];
}
```
Интерфейс, представляющий набор переданных параметров.

&nbsp;

```js
get(key: string): ParamInfo | null
```
Возвращает ссылку на интерфейс [`ParamInfo`](#ParamInfo) для параметра по ключу `key`.

&nbsp;

```js
getAll(): ParamInfo[]
```
Возвращает все параметры в виде массива объектов [`ParamInfo`](#ParamInfo)

&nbsp;

### Интерфейс ParamInfo<a name="ParamInfo"></a>
```ts
interface ParamInfo {
	getName(): string;
    getValue(): string | null;
}
```
Интерфейс для получения информации о параметре.

&nbsp;

```js
getName(): string
```
Возвращает имя параметра.

&nbsp;

```js
getValue(): string | null
```
Возвращает значение параметра.

&nbsp;

### Интерфейс RequestFileInfos<a name="RequestFileInfos"></a>
```ts
interface RequestFileInfos {
	get(key: string): RequestFileInfo | null;
    getAll(): RequestFileInfo[];
}
```
Интерфейс, представляющий набор загруженных клиентом файлов.

&nbsp;

```js
get(key: string): RequestFileInfo | null
```
Возвращает ссылку на интерфейс [`RequestFileInfo`](#RequestFileInfo) для файла по ключу `key`, переданного в теле запроса.

&nbsp;

```js
getAll(): RequestFileInfo[]
```
Возвращает информацию о всех загруженных клиентом файлах в виде массива объектов [`RequestFileInfo`](#RequestFileInfo)

&nbsp;

### Интерфейс RequestFileInfo<a name="RequestFileInfo"></a>
```ts
interface RequestFileInfo {
	getName(): string;
    getFileName(): string;
    getFileSize(): number;
    copyToLocal(path: string): this;
}
```
Интерфейс для получения информации о загруженном файле.

&nbsp;

```js
getName(): string
```
Возвращает имя.

&nbsp;

```js
getFileName(): string
```
Возвращает имя файла.

&nbsp;

```js
getFileSize(): number
```
Возвращает размер файла.

&nbsp;

```js
copyToLocal(path: string): this
```
Выполняет копирование файла из области мета данных зарегистрированного API запроса в [`локальную`](#local) директорию скрипта.

&nbsp;

### Интерфейс ResponseInfo<a name="ResponseInfo"></a>
```ts
interface ResponseInfo {
	getCookieInfos(): ResponseCookieInfos;
    getFileInfos(): ResponseFileInfos;
    getBodyParamInfos(): ResponseBodyParamInfos;
}
```
Интерфейс для формирования ответа с типом RESPONSE.

&nbsp;

```js
getCookieInfos(): ResponseCookieInfos
```
Возвращает ссылку на интерфейс [`ResponseCookieInfos`](#ResponseCookieInfos)

&nbsp;

```js
getFileInfos(): ResponseFileInfos
```
Возвращает ссылку на интерфейс [`ResponseFileInfos`](#ResponseFileInfos)

&nbsp;

```js
getBodyParamInfos(): ResponseBodyParamInfos
```
Возвращает ссылку на интерфейс [`ResponseBodyParamInfos`](#ResponseBodyParamInfos)

&nbsp;

### Интерфейс ResponseCookieInfos<a name="ResponseCookieInfos"></a>
```ts
interface ResponseCookieInfos {
	append(name: string, value: string, ttl: number): this;
}
```
Интерфейс для формирования параметров в HTTP заголовке [`Cookies`](https://ru.wikipedia.org/wiki/Cookie).

&nbsp;

```js
append(name: string, value: string, ttl: number): this
```
Позволяет передать клиенту куку через ответный заголовок Set-Cookie, где ttl это время жизни куки на клиенте (>=1)

&nbsp;

### Интерфейс ResponseFileInfos<a name="ResponseFileInfos"></a>
```ts
interface ResponseFileInfos {
	append(fileId: string): this;
}
```
Интерфейс для отправки файлов в ответе.

&nbsp;

```js
append(fileId: string): this
```
Позволяет передать файл. В функцию передается индентификатор файла `fileId`, зарегистрированного в [`глобальном реестре`](../appendix/glossary.md#globalFileRegistry).

&nbsp;

### Интерфейс ResponseBodyParamInfos<a name="ResponseBodyParamInfos"></a>
```ts
interface ResponseBodyParamInfos {
	append(name: string, value: unknown): this;
}
```
Интерфейс для формирования параметров в ответе.

&nbsp;

```js
append(name: string, value: unknown): this
```
Позволяет передать свойство `name` с значением `value`. Принимает значения с типами number, string, bool, object, array.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)