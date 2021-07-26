# Коннекторы

## Реляционные БД<a name="relationalDB"></a>
1. [MongoDB](#mongoDB)
1. [HTTP](#http)
1. [WinAgent](#WinAgent)


### Интерфейс Connectors<a name="Connectors"></a>
```ts
interface Connectors {
	mysql(): MysqlConnectorBuilder;
	postgresql(): SqlConnectorBuilder;
	sqlServer(): MicrosoftSqlConnectorBuilder;
	oracle(): OracleConnectorBuilder;
	mongodb(): Mongodb.ConnectorBuilder;
	http(): Http.HttpManager;
	winAgent(builtIn?: boolean): WinAgent.WinAgentBuilder;
}
```
Интерфейс, группирующий [`коннекторы`](../appendix/glossary.md#connector) к различным внешним системам.

&nbsp;

```js
mysql(): MysqlConnectorBuilder
```
Возвращает коннектор [`MysqlConnectorBuilder`](./relationalDB.md#MysqlConnectorBuilder) для подключения к базе данных [`MySQL`](https://ru.wikipedia.org/wiki/MySQL).

&nbsp;

```js
postgresql(): SqlConnectorBuilder
```
Возвращает коннектор [`SqlConnectorBuilder`](./relationalDB.md#SqlConnectorBuilder) для подключения к базе данных [`PostgreSQL`](https://ru.wikipedia.org/wiki/PostgreSQL).

&nbsp;

```js
sqlServer(): MicrosoftSqlConnectorBuilder
```
Возвращает коннектор [`MicrosoftSqlConnectorBuilder`](./relationalDB.md#MicrosoftSqlConnectorBuilder) для подключения к базе данных [`Microsoft SQL Server`](https://ru.wikipedia.org/wiki/Microsoft_SQL_Server).

&nbsp;

```js
oracle(): OracleConnectorBuilder
```
Возвращает коннектор [`OracleConnectorBuilder`](./relationalDB.md#OracleConnectorBuilder) для подключения к базе данных [`Oracle`](https://ru.wikipedia.org/wiki/Oracle_Database).

&nbsp;

```js
mongodb(): Mongodb.ConnectorBuilder
```
Возвращает коннектор [`Mongodb.ConnectorBuilder`](./mongoDB.md#ConnectorBuilder) для подключения к базе данных [`MongoDB`](https://ru.wikipedia.org/wiki/MongoDB).

&nbsp;

```js
http(): Http.HttpManager
```
Возвращает коннектор [`Http.HttpManager`](#HttpManager) соединения по протоколу HTTP.

&nbsp;

```js
winAgent(builtIn?: boolean): WinAgent.WinAgentBuilder
```
Возвращает коннектор [`WinAgent.WinAgentBuilder`](#WinAgentBuilder) для взаимодействия с [`WinAgent`](#WinAgent). Параметр `builtIn` указывает использовать встроенную конфигурацию воркспейса. Значение по умолчанию: `false`.

&nbsp;



## HTTP<a name="http"></a>

Все интерфейсы этого раздела, кроме `ObjectOfStringArray`, находятся в пространстве имён `Http`.

### Интерфейс Params<a name="Params"></a>
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
getAll(): Object
```
Возвращает все параметры в виде [`Object`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object).

&nbsp;

```js
setAll(pairs: Object): boolean
```
Не работает.

&nbsp;

```js
get(name: string): any
```
Возвращает значение параметра `name`.

&nbsp;

```js
set(name: string, value: any): boolean
```
Устанавливает значение параметра `name`. Возвращает `true`.

&nbsp;

```js
del(name: string): boolean
```
Удаляет параметр `name`. Возвращает `true`.

&nbsp;

```js
has(name: string): boolean
```
Возвращает признак наличия параметра `name`.

&nbsp;

```js
clear(): boolean
```
Удаляет все параметры. Возвращает `true`.

&nbsp;

### Интерфейс UrlParams<a name="UrlParams"></a>
```ts
interface UrlParams extends Params {
	stringify(): string;
	setEncodingType(type: string): UrlParams;
	getEncodingType(): string;
}
```
Интерфейс, представляющий набор параметров и их значений для передачи их в [`Url`](#Url).

&nbsp;

```js
stringify(): string
```
Возвращает строковое представление значений параметров вида `paramOne=5&paramTwo=hello&paramThree=world`.

&nbsp;

```js
setEncodingType(type: string): UrlParams
```
Устанавливает стандарт кодировки параметров URL. Допустимые значения: `NONE`, `RFC1738`, `RFC3986`. Значение по умолчанию: `RFC1738`. Возвращает `this`.

&nbsp;

```js
getEncodingType(): string
```
Возвращает стандарт кодировки параметров URL.

&nbsp;

### Интерфейс JsonRequestBody<a name="JsonRequestBody"></a>
```ts
interface JsonRequestBody {
	setJson(value: string | Object): boolean;
}
```
Интерфейс генерации тела запроса для отправки в нём [`JSON`](https://ru.wikipedia.org/wiki/JSON).

&nbsp;

```js
setJson(value: string | Object): boolean
```
Устанавливает в тело запроса переданный JSON. Если передаётся строка, она предварительно конвертируется в JSON с помощью [`JSON.parse()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse). Возвращает `true`. ***Передача в функцию `value` типа `Object` работает некорректно.***

&nbsp;

### Интерфейс StringRequestBody<a name="StringRequestBody"></a>
```ts
interface StringRequestBody {
	setBody(value: string): boolean;
}
```
Интерфейс генерации тела запроса для отправки в нём строки.

&nbsp;

```js
	setBody(value: string): boolean
```
Устанавливает переданную строку в тело запроса. Возвращает `true`.

&nbsp;

### Интерфейс FormRequestBody<a name="FormRequestBody"></a>
```ts
interface FormRequestBody {
	params(): Params;
}
```
Интерфейс генерации тела запроса для отправки в нём параметров [`формы`](https://ru.wikipedia.org/wiki/%D0%A4%D0%BE%D1%80%D0%BC%D0%B0_(HTML)).

&nbsp;

```js
	params(): Params
```
Возвращает объект [`Params`](#Params) для установки значений параметров.

&nbsp;

### Интерфейс RequestBody<a name="RequestBody"></a>
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
jsonBody(): JsonRequestBody
```
Устанавливает значение [`заголовка HTTP`](https://ru.wikipedia.org/wiki/Список_заголовков_HTTP) `Content-Type: application/json`, возвращает интерфейс [`JsonRequestBody`](#JsonRequestBody) для отправки [`JSON`](https://ru.wikipedia.org/wiki/JSON) в теле запроса.

&nbsp;

```js
stringBody(): StringRequestBody
```
*Не* устанавливает [`заголовок HTTP`](https://ru.wikipedia.org/wiki/Список_заголовков_HTTP) `Content-Type`, возвращает интерфейс [`StringRequestBody`](#StringRequestBody) для отправки строки в теле запроса.

&nbsp;

```js
formBody(): FormRequestBody
```
Устанавливает значение [`заголовка HTTP`](https://ru.wikipedia.org/wiki/Список_заголовков_HTTP) `Content-Type: application/x-www-form-urlencoded`, возвращает интерфейс [`FormRequestBody`](#FormRequestBody) для отправки формы в теле запроса.

&nbsp;

### Интерфейс Url<a name="Url"></a>
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
setUrl(url: string): boolean
```
Устанавливает URL целиком. Возвращает `true`.

&nbsp;

```js
getUrl(): string
```
Возвращает URL.

&nbsp;

```js
setUrlPath(path: string): boolean
```
Устанавливает путь на сервере. Возвращает `true`.

&nbsp;

```js
getUrlPath(): string
```
Возвращает путь на сервере.

&nbsp;

```js
setUrlScheme(scheme: string): boolean
```
Устанавливает схему URL (протокол). Возвращает `true`.

&nbsp;

```js
getUrlScheme(): string
```
Возвращает схему URL (протокол).

&nbsp;

```js
setHost(host: string): boolean
```
Устанавливает имя или адрес хоста. Возвращает `true`.

&nbsp;

```js
getHost(): string
```
Возвращает имя или адрес хоста, установленное в URL.

&nbsp;

```js
setPort(port: number | string): boolean
```
Устанавливает номер порта. Возвращает `true`.

&nbsp;

```js
getPort(): number | null
```
Возвращает номер порта.

&nbsp;

```js
setUser(user: string): boolean
```
Устанавливает имя пользователя. Возвращает `true`.

&nbsp;

```js
getUser(): string
```
Возвращает имя пользователя.

&nbsp;

```js
setPassword(password: string): boolean
```
Устанавливает пароль. Возвращает `true`.

&nbsp;

```js
getPassword(): string | null
```
Возвращает пароль.

&nbsp;

```js
setFragment(fragment: string): boolean
```
Устанавливает идентификатор якоря.  Возвращает `true`.

&nbsp;

```js
getFragment(): string | null
```
Возвращает идентификатор якоря.

&nbsp;

```js
params(): UrlParams
```
Возвращает интерфейс доступа [`UrlParams`](#UrlParams) к параметрам URL.

&nbsp;

### Интерфейс AllowRedirects<a name="AllowRedirects"></a>
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
setStatus(status: boolean): boolean
```
Устанавливает флаг разрешения перенаправлений HTTP-запросов. Значение по умолчанию: `true`. Возвращает `true`.

&nbsp;

```js
getStatus(): boolean
```
Возвращает флаг разрешения перенаправлений HTTP-запросов.

&nbsp;

```js
setMax(max: number): boolean
```
Устанавливает максимальное количество перенаправлений. Значение по умолчанию: `5`. Возвращает `true`.

&nbsp;

```js
getMax(): number
```
Возвращает максимальное количество перенаправлений.

&nbsp;

```js
setStrict(strict: boolean): boolean
```
Не реализовано.

&nbsp;

```js
getStrict(): boolean
```
Не реализовано.

&nbsp;

```js
setWithReferer(withReferer: boolean): boolean
```
Устанавливает флаг передачи [`HTTP referer`](https://ru.wikipedia.org/wiki/HTTP_referer) в заголовке запроса. Значение по умолчанию: `false`. Возвращает `true`.

&nbsp;

```js
getWithReferer(): boolean
```
Возвращает флаг передачи [`HTTP referer`](https://ru.wikipedia.org/wiki/HTTP_referer) в заголовке запроса.

&nbsp;

```js
setProtocols(protocols: string[]): boolean
```
Устанавливает список протоколов, для которых разрешены перенаправления. Значение по умолчанию: `['http', 'https']`. Возвращает `true`.

&nbsp;

```js
getProtocols(): string[]
```
Возвращает список протоколов, для которых разрешены перенаправления.

&nbsp;

### Интерфейс HttpAuth<a name="HttpAuth"></a>
```ts
interface HttpAuth {
	setUser(user: string): HttpAuth;
	setPassword(password: string): HttpAuth;
	setType(type: string): HttpAuth;
	setStatus(status: boolean): HttpAuth;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настроек аутентификации HTTP. Все функции возвращают `this`.

&nbsp;

```js
setUser(user: string): HttpAuth
```
Устанавливает имя пользователя.

&nbsp;

```js
setPassword(password: string): HttpAuth
```
Устанавливает пароль.

&nbsp;

```js
setType(type: string): HttpAuth
```
Устанавливает тип аутентификации. Допустимые значения: [`basic`](https://ru.wikipedia.org/wiki/%D0%90%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F_%D0%B2_%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82%D0%B5#%D0%91%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D1%8F_%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F), [`digest`](https://ru.wikipedia.org/wiki/%D0%94%D0%B0%D0%B9%D0%B4%D0%B6%D0%B5%D1%81%D1%82-%D0%B0%D1%83%D1%82%D0%B5%D0%BD%D1%82%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F), [`ntlm`](https://ru.wikipedia.org/wiki/NTLM).

&nbsp;

```js
setStatus(status: boolean): HttpAuth
```
Устанавливает флаг аутентификации HTTP. Значение по умолчанию: `false`.

&nbsp;

### Интерфейс Cert<a name="Cert"></a>
```ts
interface Cert {
	setPath(path: string): Cert;
	getPath(path: string): string;
	setPassphrase(passphrase: string): Cert;
}
```
Интерфейс настройки сертификата аутентификации HTTP. ***Не реализован.***

&nbsp;

```js
setPath(path: string): Cert
```
Устанавливает путь к файлу сертификата. Возвращает `this`.

&nbsp;

```js
getPath(path: string): string
```
Возвращает путь к файлу сертификата.

&nbsp;

```js
setPassphrase(passphrase: string): Cert
```
Устанавливает парольную фразу. Возвращает `this`.

&nbsp;

### Интерфейс Verify<a name="Verify"></a>
```ts
interface Verify {
	setStatus(value: boolean): boolean;
	setPath(path: string): boolean;
}
```
Интерфейс верификации сертификатов [`SSL`](https://ru.wikipedia.org/wiki/SSL).

```js
setStatus(value: boolean): boolean
```
Устанавливает признак верификации сертификата SSL. Значение по умолчанию: `true`. Возвращает `true`.

&nbsp;

```js
setPath(path: string): boolean
```
Не реализовано.

&nbsp;

### Интерфейс Options<a name="Options"></a>
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
setConnTimeout(seconds: number): boolean
```
Устанавливает тайм-аут соединения в секундах. Значение по умолчанию: `10`, максимальное значение: `60`. Возвращает `true`.

&nbsp;

```js
getConnTimeout(): number
```
Возвращает тайм-аут соединения.

&nbsp;

```js
setReqTimeout(seconds: number): boolean
```
Устанавливает тайм-аут ожидания ответа в секундах. Значение по умолчанию: `30`, максимальное значение: `300`. Возвращает `true`.

&nbsp;

```js
getReqTimeout(): number
```
Возвращает тайм-аут ожидания ответа.

&nbsp;

```js
setCanDecodeContent(value: boolean): boolean
```
Устанавливает признак распаковки тела ответа сервера. В случае `true` архивированное тело ответа будет деархивироваться, в случае `false` – нет. Значение по умолчанию: `true`. Возвращает `true`.

&nbsp;

```js
getCanDecodeContent(): boolean
```
Возвращает признак распаковки тела ответа сервера.

&nbsp;

```js
allowRedirects(): AllowRedirects
```
Возвращает интерфейс [`AllowRedirects`](#AllowRedirects) доступа к настройкам перенаправлений HTTP.

&nbsp;

```js
auth(): HttpAuth
```
Возвращает интерфейс [`HttpAuth`](#HttpAuth) доступа к настройкам аутентификации HTTP.

&nbsp;

```js
cert(): Cert
```
Возвращает интерфейс [`Cert`](#Cert) для настройки аутентификации по сертификату. ***Не реализовано.***

&nbsp;

```js
verify(): Verify
```
Возвращает интерфейс [`Verify`](#Verify) проверки сертификатов SSL.

&nbsp;

### Интерфейс RequestBuilder<a name="RequestBuilder"></a>
```ts
interface RequestBuilder {
	url(): Url;
	setMethod(type: string): boolean;
	getMethod(): string;
	body(): RequestBody;
	options(): Options;
	cookies(): Params;
	headers(): Params;
	send(): Response;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки и отправки запроса по протоколу [`HTTP`](https://ru.wikipedia.org/wiki/HTTP).

&nbsp;

```js
url(): Url
```
Возвращает объект [`Url`](#Url) построения URL.

&nbsp;

```js
setMethod(type: string): boolean
```
Устанавливает [`метод HTTP `](https://ru.wikipedia.org/wiki/HTTP#%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%D1%8B). Доступные значения: `GET`, `POST`, `DELETE`, `PUT`, `HEAD`, `OPTIONS`. Значение по умолчанию: `GET`. Возвращает `true`.

&nbsp;

```js
getMethod(): string
```
Возвращает [`метод HTTP `](https://ru.wikipedia.org/wiki/HTTP#%D0%9C%D0%B5%D1%82%D0%BE%D0%B4%D1%8B). 

&nbsp;

```js
body(): RequestBody
```
Возвращает интерфейс [`RequestBody`](#RequestBody) формирования тела запроса.

&nbsp;

```js
options(): Options
```
Возвращает интерфейс [`Options`](#Options) настройки опций соединения.

&nbsp;

```js
cookies(): Params
```
Возвращает интерфейс [`Params`](#Params) для доступа к [`cookies`](https://ru.wikipedia.org/wiki/Cookie).

&nbsp;

```js
headers(): Params
```
Возвращает интерфейс [`Params`](#Params) для формирования [`HTTP-заголовков`](https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BA%D0%B8_HTTP) запроса.

&nbsp;

```js
send(): Response
```
Отправляет HTTP-запрос, дожидается ответа и возвращает интерфейс [`Response`](#Response) доступа к данным ответа сервера.

&nbsp;

### Интерфейс HttpManager<a name="HttpManager"></a>
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
requestBuilder(): RequestBuilder
```
Возвращает объект [`RequestBuilder`](#RequestBuilder) построения запроса.

&nbsp;

```js
urlEncode(value: string): string
```
Возвращает строку `value`, закодированную в соответствии с правилами [`кодировки URL`](https://ru.wikipedia.org/wiki/URL#%D0%9A%D0%BE%D0%B4%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_URL).

&nbsp;

```js
urlDecode(value: string): string
```
Возвращает строку `value`, раскодированную в соответствии с правилами [`кодировки URL`](https://ru.wikipedia.org/wiki/URL#%D0%9A%D0%BE%D0%B4%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5_URL).

&nbsp;

```js
base64Encode(value: string): string
```
Возвращает строку `value`, закодированную по схеме [`base64 `](https://ru.wikipedia.org/wiki/Base64).


&nbsp;

```js
base64Decode(value: string): string | boolean
```
Возвращает строку `value`, раскодированную по схеме [`base64 `](https://ru.wikipedia.org/wiki/Base64), или `false` в случае ошибки.

&nbsp;

### Тип ObjectOfStringArray<a name="ObjectOfStringArray"></a>
```ts
type ObjectOfStringArray = {
	[key: string]: string[];
}
```
Специализированный тип объекта, в котором значения могут быть только списками строк.

&nbsp;

### Интерфейс ResponseErrors<a name="ResponseErrors"></a>
```ts
interface ResponseErrors {
	getCode(): number;
	getMessage(): string;
}
```
Интерфейс доступа к [`ошибке`](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP) транспортного уровня HTTP.

&nbsp;

```js
getCode(): number
```
Возвращает код ошибки.

&nbsp;

```js
getMessage(): string
```
Возвращает текст ошибки.

&nbsp;

### Интерфейс Response<a name="Response"></a>
```ts
interface Response {
	headers(): ObjectOfStringArray;
	getStringData(): string;
	getStringDataLikeJson(): Object | boolean;
	getStatusCode(): number;
	isOk(): boolean;
	getErrors(): ResponseErrors;
}
```
Интерфейс ответа HTTP-сервера.

&nbsp;

```js
headers(): ObjectOfStringArray
```
Возвращает заголовки ответа в виде [`ObjectOfStringArray`](#ObjectOfStringArray).

&nbsp;

```js
getStringData(): string
```
Возвращает первые `50 Мбайт` тела ответа.

&nbsp;

```js
getStringDataLikeJson(): Object | boolean
```
Получает первые `50 Мбайт` тела ответа, прогоняет их через функцию [`JSON.parse()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) и возвращает её результат или `false` в случае ошибки.

&nbsp;

```js
getStatusCode(): number
```
Возвращает [`код состояния HTTP`](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP).

&nbsp;

```js
isOk(): boolean
```
Возвращает признак того, что код состояния HTTP [`успешный`](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BA%D0%BE%D0%B4%D0%BE%D0%B2_%D1%81%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F_HTTP#%D0%A3%D1%81%D0%BF%D0%B5%D1%85), то есть `getStatusCode() == 200`.

&nbsp;

```js
getErrors(): ResponseErrors
```
Возвращает интерфейс [`ResponseErrors`](#ResponseErrors) доступа к ошибкам HTTP.

&nbsp;

## WinAgent<a name="WinAgent"></a>

WinAgent – сервис создания отчётов MS Word и Excel, работающий по протоколу [`HTTP`](https://ru.wikipedia.org/wiki/HTTP). Для его работы на выделенной машине под управлением Windows должен быть установлен сам сервис и MS Office, включающий пакеты Word и Excel. WinAgent принимает на вход отчёты из Optimacros и файл MS Word или MS Excel с макросом (расширение `docm` или `xlsm`) и запускает макрос. Макрос должен заранее знать, где будут располагаться входящие файлы. Он будет автомагически располагать в шаблоне данные этих файлов в зависимости от задачи.

Все интерфейсы этого раздела, находятся в пространстве имён `WinAgent`.

### Интерфейс WinAgentBuilder<a name="WinAgentBuilder"></a>
```js
interface WinAgentBuilder {
	setCommandUrl(url: string): this;
	setDownloadUrl(url: string): this;
	auth(): Http.HttpAuth;
	makeRunMacrosAction(): RunMacroAction;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки доступа к WinAgent.

&nbsp;

```js
setCommandUrl(url: string): this
```
Устанавливает [`URL`](https://ru.wikipedia.org/wiki/URL) агента, на который будут подаваться команды из скрипта. Возвращает `this`.

&nbsp;

```js
setDownloadUrl(url: string): this
```
Устанавливает [`URL`](https://ru.wikipedia.org/wiki/URL), по которому можно будет скачивать результирующие документы. Возвращает `this`.

&nbsp;

```js
auth(): Http.HttpAuth
```
Возвращает интерфейс [`Http.HttpAuth`](#HttpAuth) доступа к настройкам аутентификации WinAgent.

&nbsp;

```js
makeRunMacrosAction(): RunMacroAction
```
Возвращает интерфейс [`RunMacroAction`](#RunMacroAction) настройки и запуска макроса.

&nbsp;

### Интерфейс BaseAction<a name="BaseAction"></a>
```ts
interface BaseAction {
	run(): BaseActionResult;
}
```
Базовый интерфейс действия.

&nbsp;

```js
run(): BaseActionResult
```
Выполняет действие и возвращает базовый интерфейс [`BaseActionResult`](#BaseActionResult) доступа к данным его результата.

&nbsp;

### Интерфейс RunMacroAction<a name="RunMacroAction"></a>
```еs
interface RunMacroAction extends BaseAction {
	setMacroName(macroName: string): this;
	setMacroFilePath(macroFilePath: string): this;
	setDataFilePaths(dataFilePaths: string[]): this;
	run(): RunMacroActionResult;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для настройки запуска макроса. Наследуется от [`BaseAction`](#BaseAction).

&nbsp;

```js
setMacroName(macroName: string): this
```
Устанавливает имя макроса. Значение по умолчанию: `'process'`. Возвращает `this`.

&nbsp;

```js
setMacroFilePath(macroFilePath: string): this
```
Устанавливает имя файла с макросом. Возвращает `this`.

&nbsp;

```js
setDataFilePaths(dataFilePaths: string[]): this
```
Задаёт массив входных файлов с данными для макроса. Возвращает `this`.

&nbsp;

```js
run(): RunMacroActionResult
```
Запускает макрос и возвращает интерфейс [`RunMacroActionResult`](#RunMacroActionResult) доступа к данным его результата.

&nbsp;

### Интерфейс BaseActionResult<a name="BaseActionResult"></a>
```ts
interface BaseActionResult {

}
```
Базовый интерфейс результата действия. Он пустой.

&nbsp;

### Интерфейс RunMacroActionResult<a name="RunMacroActionResult"></a>
```ts
interface RunMacroActionResult extends BaseActionResult {
	getFilePaths(): string[];
}
```
Интерфейс доступа к данным результата выполнения макроса. Наследуется от [`BaseActionResult`](#BaseActionResult).

&nbsp;

```js
getFilePaths(): string[]
```
Возвращает список имён результирующих файлов.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
