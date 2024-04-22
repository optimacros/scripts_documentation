# HTTP

Все интерфейсы этого раздела, кроме [`ObjectOfStringArray`](#object-of-string-array), находятся в пространстве имён `Http`.

## Интерфейс HttpManager<a name="http-manager"></a>
```ts
interface HttpManager {
	requestBuilder(): RequestBuilder;
	urlEncode(value: string): string;
	urlDecode(value: string): string;
	base64Encode(value: string): string;
	base64Decode(value: string): string | boolean;
}
```
Коннектор для подключения к серверу по протоколу [`HTTP`](https://ru.wikipedia.org/wiki/HTTP).

&nbsp;

```js
requestBuilder(): RequestBuilder;
```
Возвращает объект [`RequestBuilder`](#request-builder) построения запроса.

&nbsp;

```js
urlEncode(value: string): string;
```
Возвращает строку `value`, закодированную в соответствии с правилами [`кодировки URL`](https://ru.wikipedia.org/wiki/URL#%D0%9A%D0%BE%D0%B4%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_URL).

&nbsp;

```js
urlDecode(value: string): string;
```
Возвращает строку `value`, раскодированную в соответствии с правилами [`кодировки URL`](https://ru.wikipedia.org/wiki/URL#%D0%9A%D0%BE%D0%B4%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_URL).

&nbsp;

```js
base64Encode(value: string): string;
```
Возвращает строку `value`, закодированную по схеме [`base64 `](https://ru.wikipedia.org/wiki/Base64).

&nbsp;

```js
base64Decode(value: string): string | boolean;
```
Возвращает строку `value`, раскодированную по схеме [`base64 `](https://ru.wikipedia.org/wiki/Base64), или `false` в случае ошибки.

&nbsp;

### Интерфейс Params<a name="params"></a>
```ts
interface Params {
	getAll(): Object;
	setAll(pairs: Object): boolean;
	get(name: string): any;
	set(name: string, value: any): boolean;
	del(name: string): boolean;
	has(name: string): boolean;
	clear(): boolean;
}
```
Интерфейс, представляющий набор параметров и их значений.

&nbsp;

```js
getAll(): Object;
```
Возвращает все параметры в виде [`Object`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object).

&nbsp;

```js
setAll(pairs: Object): boolean;
```
Не работает.

&nbsp;

```js
get(name: string): any;
```
Возвращает значение параметра `name`.

&nbsp;

```js
set(name: string, value: any): boolean;
```
Устанавливает значение параметра `name`. Возвращает `true`.

&nbsp;

```js
del(name: string): boolean;
```
Удаляет параметр `name`. Возвращает `true`.

&nbsp;

```js
has(name: string): boolean;
```
Возвращает признак наличия параметра `name`.

&nbsp;

```js
clear(): boolean;
```
Удаляет все параметры. Возвращает `true`.

&nbsp;

### Интерфейс UrlParams<a name="url-params"></a>
```ts
interface UrlParams extends Params {
	stringify(): string;
	setEncodingType(type: string): this;
	getEncodingType(): string;
}
```
Интерфейс, представляющий набор параметров и их значений для передачи их в [`Url`](#url). Наследуется от интерфейса [`Params`](#params).

&nbsp;

```js
stringify(): string;
```
Возвращает строковое представление значений параметров вида `paramOne=5&paramTwo=hello&paramThree=world`.

&nbsp;

```js
setEncodingType(type: string): this;
```
Устанавливает стандарт кодировки параметров URL. Допустимые значения: `NONE`, `RFC1738`, `RFC3986`. Значение по умолчанию: `RFC1738`. Возвращает `this`.

&nbsp;

```js
getEncodingType(): string;
```
Возвращает стандарт кодировки параметров URL.

&nbsp;

### Интерфейс JsonRequestBody<a name="json-request-body"></a>
```ts
interface JsonRequestBody {
	setJson(value: string | Object): boolean;
}
```
Интерфейс генерации тела запроса для отправки в нём [`JSON`](https://ru.wikipedia.org/wiki/JSON).

&nbsp;

```js
setJson(value: string | Object): boolean;
```
Устанавливает в тело запроса переданный JSON. Если передаётся строка, она предварительно конвертируется в JSON с помощью [`JSON.parse()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse). Возвращает `true`. ***Передача в функцию `value` типа `Object` работает некорректно.***

&nbsp;

### Интерфейс StringRequestBody<a name="string-request-body"></a>
```ts
interface StringRequestBody {
	setBody(value: string): boolean;
}
```
Интерфейс генерации тела запроса для отправки в нём строки.

&nbsp;

```js
	setBody(value: string): boolean;
```
Устанавливает переданную строку в тело запроса. Возвращает `true`.

&nbsp;

### Интерфейс FormRequestBody<a name="form-request-body"></a>
```ts
interface FormRequestBody {
	params(): Params;
	appendFile(fieldName: string, fileName: string, filePath: string): this;
}
```
Интерфейс генерации тела запроса для отправки в нём параметров [`формы`](https://ru.wikipedia.org/wiki/%D0%A4%D0%BE%D1%80%D0%BC%D0%B0_(HTML)).

&nbsp;

```js
	params(): Params;
```
Возвращает объект [`Params`](#params) для установки значений параметров.

&nbsp;

```js
	appendFile(fieldName: string, fileName: string, filePath: string): this;
```
Устанавливает заголовок `Content-Type` на `multipart/form-data`, что позволяет передавать бинарные данные (прикреплять к запросу файлы). Прикрепляет к запросу файл, расположенный по пути `filePath` локальной файловой системы скрипта. В заголовке [`Content-Disposition`](https://developer.mozilla.org/ru/docs/Web/HTTP/Headers/Content-Disposition) устанавливает значение параметра `name` как `fieldName`, параметра `filename` — `fileName`. Возвращает `this`.

&nbsp;

### Интерфейс RequestBody<a name="request-body"></a>
```ts
interface RequestBody {
	jsonBody(): JsonRequestBody;
	stringBody(): StringRequestBody;
	formBody(): FormRequestBody;
}
```
Интерфейс генерации тела запроса [`POST`](https://ru.wikipedia.org/wiki/POST_(HTTP)). Все функции перезаписывают тело запроса до отправки, поэтому следует выбрать одну из них.

&nbsp;

```js
jsonBody(): JsonRequestBody;
```
Устанавливает значение [`заголовка HTTP`](https://ru.wikipedia.org/wiki/Список_заголовков_HTTP) `Content-Type: application/json`, возвращает интерфейс [`JsonRequestBody`](#json-request-body) для отправки [`JSON`](https://ru.wikipedia.org/wiki/JSON) в теле запроса.

&nbsp;

```js
stringBody(): StringRequestBody;
```
*Не* устанавливает [`заголовок HTTP`](https://ru.wikipedia.org/wiki/Список_заголовков_HTTP) `Content-Type`, возвращает интерфейс [`StringRequestBody`](#string-request-body) для отправки строки в теле запроса.

&nbsp;

```js
formBody(): FormRequestBody;
```
Устанавливает значение [`заголовка HTTP`](https://ru.wikipedia.org/wiki/Список_заголовков_HTTP) `Content-Type: application/x-www-form-urlencoded`, возвращает интерфейс [`FormRequestBody`](#form-request-body) для отправки формы в теле запроса.

&nbsp;

### Интерфейс Url<a name="url"></a>
```ts
interface Url {
	setUrl(url: string): boolean;
	getUrl(): string;
	setUrlPath(path: string): boolean;
	getUrlPath(): string;
	setUrlScheme(scheme: string): boolean;
	getUrlScheme(): string;
	setHost(host: string): boolean;
	getHost(): string;
	setPort(port: number | string): boolean;
	getPort(): number | null;
	setUser(user: string): boolean;
	getUser(): string;
	setPassword(password: string): boolean;
	getPassword(): string | null;
	setFragment(fragment: string): boolean;
	getFragment(): string | null;
	params(): UrlParams;
}
```
Интерфейс построения [`URL`](https://ru.wikipedia.org/wiki/URL).

&nbsp;

```js
setUrl(url: string): boolean;
```
Устанавливает URL целиком. Возвращает `true`.

&nbsp;

```js
getUrl(): string;
```
Возвращает URL.

&nbsp;

```js
setUrlPath(path: string): boolean;
```
Устанавливает путь на сервере. Возвращает `true`.

&nbsp;

```js
getUrlPath(): string;
```
Возвращает путь на сервере.

&nbsp;

```js
setUrlScheme(scheme: string): boolean;
```
Устанавливает схему URL (протокол). Возвращает `true`.

&nbsp;

```js
getUrlScheme(): string;
```
Возвращает схему URL (протокол).

&nbsp;

```js
setHost(host: string): boolean;
```
Устанавливает имя или адрес хоста. Возвращает `true`.

&nbsp;

```js
getHost(): string;
```
Возвращает имя или адрес хоста, установленное в URL.

&nbsp;

```js
setPort(port: number | string): boolean;
```
Устанавливает номер порта. Возвращает `true`.

&nbsp;

```js
getPort(): number | null;
```
Возвращает номер порта.

&nbsp;

```js
setUser(user: string): boolean;
```
Устанавливает имя пользователя. Возвращает `true`.

&nbsp;

```js
getUser(): string;
```
Возвращает имя пользователя.

&nbsp;

```js
setPassword(password: string): boolean;
```
Устанавливает пароль. Возвращает `true`.

&nbsp;

```js
getPassword(): string | null;
```
Возвращает пароль.

&nbsp;

```js
setFragment(fragment: string): boolean;
```
Устанавливает идентификатор якоря.  Возвращает `true`.

&nbsp;

```js
getFragment(): string | null;
```
Возвращает идентификатор якоря.

&nbsp;

```js
params(): UrlParams;
```
Возвращает интерфейс доступа [`UrlParams`](#url-params) к параметрам URL.

&nbsp;

### Интерфейс AllowRedirects<a name="allow-redirects"></a>
```ts
interface AllowRedirects {
	setStatus(status: boolean): boolean;
	getStatus(): boolean;

	setMax(max: number): boolean;
	getMax(): number;

	setStrict(strict: boolean): boolean;
	getStrict(): boolean;

	setWithReferer(withReferer: boolean): boolean;
	getWithReferer(): boolean;

	setProtocols(protocols: string[]): boolean;
	getProtocols(): string[];
}
```
Интерфейс настроек разрешения [`перенаправления HTTP-запросов`](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP#%D0%9F%D0%B5%D1%80%D0%B5%D0%BD%D0%B0%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5).

&nbsp;

```js
setStatus(status: boolean): boolean;
```
Устанавливает флаг разрешения перенаправлений HTTP-запросов. Значение по умолчанию: `true`. Возвращает `true`.

&nbsp;

```js
getStatus(): boolean;
```
Возвращает флаг разрешения перенаправлений HTTP-запросов.

&nbsp;

```js
setMax(max: number): boolean;
```
Устанавливает максимальное количество перенаправлений. Значение по умолчанию: `5`. Возвращает `true`.

&nbsp;

```js
getMax(): number;
```
Возвращает максимальное количество перенаправлений.

&nbsp;

```js
setStrict(strict: boolean): boolean;
```
Не реализовано.

&nbsp;

```js
getStrict(): boolean;
```
Не реализовано.

&nbsp;

```js
setWithReferer(withReferer: boolean): boolean;
```
Устанавливает флаг передачи [`HTTP referer`](https://ru.wikipedia.org/wiki/HTTP_referer) в заголовке запроса. Значение по умолчанию: `false`. Возвращает `true`.

&nbsp;

```js
getWithReferer(): boolean;
```
Возвращает флаг передачи [`HTTP referer`](https://ru.wikipedia.org/wiki/HTTP_referer) в заголовке запроса.

&nbsp;

```js
setProtocols(protocols: string[]): boolean;
```
Устанавливает список протоколов, для которых разрешены перенаправления. Значение по умолчанию: `['http', 'https']`. Возвращает `true`.

&nbsp;

```js
getProtocols(): string[];
```
Возвращает список протоколов, для которых разрешены перенаправления.

&nbsp;

### Интерфейс HttpAuth<a name="http-auth"></a>
```ts
interface HttpAuth {
	setUser(user: string): this;
	setPassword(password: string): this;
	setType(type: string): this;
	setStatus(status: boolean): this;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настроек аутентификации HTTP. Все функции возвращают `this`.

&nbsp;

```js
setUser(user: string): this;
```
Устанавливает имя пользователя.

&nbsp;

```js
setPassword(password: string): this;
```
Устанавливает пароль.

&nbsp;

```js
setType(type: string): this;
```
Устанавливает тип аутентификации. Допустимые значения: [`basic`](https://ru.wikipedia.org/wiki/%D0%90%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F_%D0%B2_%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82%D0%B5#%D0%91%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D1%8F_%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F), [`digest`](https://ru.wikipedia.org/wiki/%D0%94%D0%B0%D0%B9%D0%B4%D0%B6%D0%B5%D1%81%D1%82-%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F), [`ntlm`](https://ru.wikipedia.org/wiki/NTLM).

&nbsp;

```js
setStatus(status: boolean): this;
```
Устанавливает флаг аутентификации HTTP. Значение по умолчанию: `false`.

&nbsp;

### Интерфейс Cert<a name="cert"></a>
```ts
interface Cert {
	setPath(path: string): this;
	getPath(path: string): string;
	setPassphrase(passphrase: string): this;
}
```
Интерфейс настройки сертификата аутентификации HTTP. ***Не реализован.***

&nbsp;

```js
setPath(path: string): this;
```
Устанавливает путь к файлу сертификата. Возвращает `this`.

&nbsp;

```js
getPath(path: string): string;
```
Возвращает путь к файлу сертификата.

&nbsp;

```js
setPassphrase(passphrase: string): this;
```
Устанавливает парольную фразу. Возвращает `this`.

&nbsp;

### Интерфейс Verify<a name="verify"></a>
```ts
interface Verify {
	setStatus(value: boolean): boolean;
	setPath(path: string): boolean;
}
```
Интерфейс верификации сертификатов [`SSL`](https://ru.wikipedia.org/wiki/SSL).

```js
setStatus(value: boolean): boolean;
```
Устанавливает признак верификации сертификата SSL. Значение по умолчанию: `true`. Возвращает `true`.

&nbsp;

```js
setPath(path: string): boolean;
```
Не реализовано.

&nbsp;

### Интерфейс Options<a name="options"></a>
```ts
interface Options {
	setConnTimeout(seconds: number): boolean;
	getConnTimeout(): number;
	setReqTimeout(seconds: number): boolean;
	getReqTimeout(): number;
	setCanDecodeContent(value: boolean): boolean;
	getCanDecodeContent(): boolean;
	allowRedirects(): AllowRedirects;
	auth(): HttpAuth;
	cert(): Cert;
	verify(): Verify;
}
```

Интерфейс настройки опций соединения.

&nbsp;

```js
setConnTimeout(seconds: number): boolean;
```
Устанавливает тайм-аут соединения в секундах. Значение по умолчанию: `10`, максимальное значение: `60`. Возвращает `true`.

&nbsp;

```js
getConnTimeout(): number;
```
Возвращает тайм-аут соединения.

&nbsp;

```js
setReqTimeout(seconds: number): boolean;
```
Устанавливает тайм-аут ожидания ответа в секундах. Значение по умолчанию: `30`, максимальное значение: `300`. Возвращает `true`.

&nbsp;

```js
getReqTimeout(): number;
```
Возвращает тайм-аут ожидания ответа.

&nbsp;

```js
setCanDecodeContent(value: boolean): boolean;
```
Устанавливает признак распаковки тела ответа сервера. В случае `true` архивированное тело ответа будет деархивироваться, в случае `false` – нет. Значение по умолчанию: `true`. Возвращает `true`.

&nbsp;

```js
getCanDecodeContent(): boolean;
```
Возвращает признак распаковки тела ответа сервера.

&nbsp;

```js
allowRedirects(): AllowRedirects;
```
Возвращает интерфейс [`AllowRedirects`](#allow-redirects) доступа к настройкам перенаправлений HTTP.

&nbsp;

```js
auth(): HttpAuth;
```
Возвращает интерфейс [`HttpAuth`](#http-auth) доступа к настройкам аутентификации HTTP.

&nbsp;

```js
cert(): Cert;
```
Возвращает интерфейс [`Cert`](#cert) для настройки аутентификации по сертификату. ***Не реализовано.***

&nbsp;

```js
verify(): Verify;
```
Возвращает интерфейс [`Verify`](#verify) проверки сертификатов SSL.

&nbsp;

### Интерфейс DownloadFileParams<a name="download-file-params"></a>
```ts
interface DownloadFileParams {
	setPath(path: string): this;
}
```

Интерфейс для указания настроек скачивания файлов.

&nbsp;

```js
setPath(path: string): this;
```
Устанавливает путь в локальной директории скриптов, по которому будет сохранён скачиваемый файл. Файл будет загружен по данному пути после отправки запроса. По умолчанию параметр пути не задан - файл скачиваться не будет. Возвращает `this`.

&nbsp;

### Интерфейс SizeLimitParams<a name="size-limit-params"></a>
```ts
interface SizeLimitParams {
	setContentLengthLimit(lengthInBytes: number): this;
}
```

Интерфейс для указания лимита размера получаемого контента в ответе на запрос.

&nbsp;

```js
setContentLengthLimit(lengthInBytes: number): this;
```
Устанавливает лимит получаемого контента в байтах. Если передать в аргумент `lengthInBytes` - `0` (числовой ноль), то проверка не будет происходить. Значение по умолчанию - `0`. Возвращает `this`.

&nbsp;

### Интерфейс RequestBuilder<a name="request-builder"></a>
```ts
interface RequestBuilder {
	url(): Url;
	setMethod(type: string): boolean;
	getMethod(): string;
	body(): RequestBody;
	options(): Options;
	cookies(): Params;
	headers(): Params;
	downloadFileParams(): DownloadFileParams;
	sizeLimitParams(): SizeLimitParams;
	send(): Response;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки и отправки запроса по протоколу [`HTTP`](https://ru.wikipedia.org/wiki/HTTP).

&nbsp;

```js
url(): Url;
```
Возвращает объект [`Url`](#url) построения URL.

&nbsp;

```js
setMethod(type: string): boolean;
```
Устанавливает [`метод HTTP `](https://ru.wikipedia.org/wiki/HTTP#%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%D1%8B). Доступные значения: `GET`, `POST`, `DELETE`, `PUT`, `HEAD`, `OPTIONS`. Значение по умолчанию: `GET`. Возвращает `true`.

&nbsp;

```js
getMethod(): string;
```
Возвращает [`метод HTTP `](https://ru.wikipedia.org/wiki/HTTP#%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%D1%8B). 

&nbsp;

```js
body(): RequestBody;
```
Возвращает интерфейс [`RequestBody`](#request-body) формирования тела запроса.

&nbsp;

```js
options(): Options;
```
Возвращает интерфейс [`Options`](#options) настройки опций соединения.

&nbsp;

```js
cookies(): Params;
```
Возвращает интерфейс [`Params`](#params) для доступа к [`cookies`](https://ru.wikipedia.org/wiki/Cookie).

&nbsp;

```js
headers(): Params;
```
Возвращает интерфейс [`Params`](#params) для формирования [`HTTP-заголовков`](https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BA%D0%B8_HTTP) запроса.

&nbsp;

```js
downloadFileParams(): DownloadFileParams;
```
Возвращает интерфейс [`DownloadFileParams`](#download-file-params) для указания настроек скачивания файлов.

&nbsp;

```js
sizeLimitParams(): SizeLimitParams;
```
Возвращает интерфейс [`SizeLimitParams`](#download-file-params) для указания лимита размера получаемого контента в ответе на запрос.

&nbsp;

```js
send(): Response;
```
Отправляет HTTP-запрос, дожидается ответа и возвращает интерфейс [`Response`](#response) доступа к данным ответа сервера.

&nbsp;

## Тип ObjectOfStringArray<a name="object-of-string-array"></a>
```ts
type ObjectOfStringArray = {
	[key: string]: string[];
}
```
Специализированный тип объекта, в котором значения могут быть только списками строк.

&nbsp;

## Интерфейс Response<a name="response"></a>
```ts
interface Response {
	headers(): ObjectOfStringArray;
	getStringData(length?: number, catchEof?: boolean): string;
	getStringDataLikeJson(): Object | boolean;
	getStringDataGenerator(length?: number): string[];
	getBinaryDataGenerator(length?: number): string[];
	getStatusCode(): number;
	isOk(): boolean;
	getErrors(): ResponseErrors;
}
```
Интерфейс ответа HTTP-сервера. Является [ленивым](https://ru.wikipedia.org/wiki/Ленивые_вычисления). Предоставленные функции чтения данных ответа: `getStringData()`, `getStringDataLikeJson()`, `getStringDataGenerator()`, `getBinaryDataGenerator()` — фактически берут данные из одного источника, и не рекомендуется их комбинировать.

&nbsp;

```js
headers(): ObjectOfStringArray;
```
Возвращает заголовки ответа в виде [`ObjectOfStringArray`](#object-of-string-array).

&nbsp;

```js
getStringData(length?: number, catchEof?: boolean): string;
```
Возвращает данные ответа. Размер данных ограничен лимитом в `length` байт. Параметр `length` может принимать значения от 1 байта до 100 Мбайт = 100 * 2<sup>20</sup> байт; значение по умолчанию: `100 Мбайт`. Если размер данных превышает лимит и `catchEof === true`, выбрасывается исключение. Значение `catchEof` по умолчанию: `true`.

&nbsp;

```js
getStringDataLikeJson(): Object | boolean;
```
Получает первые `length` байт тела ответа, прогоняет их через функцию [`JSON.parse()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) и возвращает её результат или `false` в случае ошибки. Величина `length` – значение по умолчанию аналогичного параметра функции `getStringData()`.

&nbsp;

```js
getStringDataGenerator(length?: number): string[];
```
Возвращает генератор, при каждом обращении возвращающий данные от сервера в виде строки размером *около* `length` байт. Параметр `length` может принимать значения от 1 байта до 1 Мбайта = 2<sup>20</sup> байт; значение по умолчанию: `1 Мбайт`. Несмотря на то, что размер данных задаётся в байтах, строки хранятся в кодировке `UTF-8`, и если последний многобайтовый символ возвращаемого куска данных не полностью помещается в заданный лимит, строка не будет обрезана на середине символа. Вместо этого генератор обрежет строку точно между символами `UTF-8` и вернёт результат размером чуть менее `length` байт. При следующем обращении к генератору указанный символ будет первым символом возвращаемой строки, чья длина теперь может быть чуть больше `length` байт.

&nbsp;

```js
getBinaryDataGenerator(length?: number): string[];
```
Возвращает генератор, при каждом обращении возвращающий данные от сервера в виде строки размером *ровно* `length` байт. Параметр `length` может принимать значения от 1 байта до 1 Мбайта = 2<sup>20</sup> байт; значение по умолчанию: `1 Мбайт`.

&nbsp;

```js
getStatusCode(): number;
```
Возвращает [`код состояния HTTP`](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP).

&nbsp;

```js
isOk(): boolean;
```
Возвращает признак того, что код состояния HTTP [`успешный`](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP#%D0%A3%D1%81%D0%BF%D0%B5%D1%85), то есть `getStatusCode() === 200`.

&nbsp;

```js
getErrors(): ResponseErrors;
```
Возвращает интерфейс [`ResponseErrors`](#response-errors) доступа к ошибкам HTTP.

&nbsp;

### Интерфейс ResponseErrors<a name="response-errors"></a>
```ts
interface ResponseErrors {
	getCode(): number;
	getMessage(): string;
}
```
Интерфейс доступа к [`ошибке`](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP) транспортного уровня HTTP.

&nbsp;

```js
getCode(): number;
```
Возвращает код ошибки.

&nbsp;

```js
getMessage(): string;
```
Возвращает текст ошибки.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
