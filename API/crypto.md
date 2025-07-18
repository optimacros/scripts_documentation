# Криптография, хэширование, вспомогательные функции и интерфейсы

Некоторые сервисы требуют (или позволяют) проверять целостность сообщения или шифровать его содержимое. Так как функции, выполняющие такие операции, обычно неспецифичны для конкретных сервисов и тем более платформы Оптимакрос, они вынесены в отдельный интерфейс для удобства доступа.

## Интерфейс Crypto<a name="crypto"></a>
```ts
interface Crypto {
	sha1(data: string | SecretValue): string;
	hash(algo: string, data: string | SecretValue, binary?: boolean): string | BinaryData;
	hmac(algo: string, data: string | SecretValue, key: string | BinaryData, binary?: boolean): string | BinaryData;
	getHashAlgorithms(): string[];
	getHmacHashAlgorithms(): string[];
}
```
Интерфейс для работы с криптографическими и их дополняющими функциями.

&nbsp;

```js
sha1(data: string | SecretValue): string;
```
Возвращает [`SHA1-хэш`](https://en.wikipedia.org/wiki/SHA-1) строки `data` (переданной в кодировке `UTF-8`), вычисленный по алгоритму `US Secure Hash Algorithm 1` в виде `40`-символьного шестнадцатеричного числа. Поддерживает [секреты](./secrets.md).

Пример использования:

```js
let hash = om.crypto.sha1('data');
console.log(
    hash, // a17c9aaa61e80a1bf71d0d850af4e5baa9800bbd
    typeof(hash) // string
);
```

&nbsp;

```js
hash(algo: string, data: string | SecretValue, binary?: boolean): string | BinaryData;
```
Метод для получения хэша строки `data` (переданной в кодировке `UTF-8`) по указанному алгоритму `algo`. Поддерживает [секреты](./secrets.md). Полный список доступных алгоритмов может быть получен с помощью метода `getHashAlgorithms()`.

Если `binary = false` (по умолчанию), то хэш возвращается в виде строки, использующей шестнадцатеричное кодирование в нижнем регистре ([`hexits`](https://en.wiktionary.org/wiki/hexit)).

Если `binary = true`, то хэш возвращается в виде бинарных данных, инкапсулированных в специальный объект [`BinaryData`](#binarydata).

Пример использования:

```js
let hash = om.crypto.hash('sha1', 'data');
console.log(
    hash // a17c9aaa61e80a1bf71d0d850af4e5baa9800bbd
);
```

&nbsp;

```js
hmac(algo: string, data: string | SecretValue, key: string | BinaryData, binary?: boolean): string | BinaryData;
```
Метод для получения подписи [`HMAC (Hash-based Message Authentication Code)`](https://ru.wikipedia.org/wiki/HMAC) для строки `data` (переданной в кодировке `UTF-8`) с использованием ключа `key` и алгоритма хэширования `algo`. Поддерживает [секреты](./secrets.md).

Ключ `key` может быть передан в виде строки в кодировке `UTF-8` или в бинарном виде — инкапсулированным в объект [`BinaryData`](#binarydata). Аналогично методу `hash()`, полный список доступных алгоритмов хэширования `algo` может быть получен с помощью метода `getHmacHashAlgorithms()`.

Если `binary = false` (по умолчанию), то хэш возвращается в виде строки, использующей шестнадцатеричное кодирование в нижнем регистре ([`hexits`](https://en.wiktionary.org/wiki/hexit)).

Если `binary = true`, то хэш возвращается в виде бинарных данных, инкапсулированных в специальный объект [`BinaryData`](#binarydata).

Демонстрация использования на примере получения подписи для сервиса [`AWS s3`](https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-streaming.html):

```js
const dateKey = om.crypto.hmac('sha-256', '20130524', 'AWS4' + 'very_secret_key', true);
const regionKey = om.crypto.hmac('sha-256', 'us-east-1', dateKey, true);
const serviceKey = om.crypto.hmac('sha-256', 's3', regionKey, true);
const signingKey = om.crypto.hmac('sha-256', 'aws4_request' , serviceKey, true);
const signature = om.crypto.hmac('sha-256', 'stringToSign', signingKey);
```

&nbsp;

```js
getHashAlgorithms(): string[];
```
Возвращает список алгоритмов хэширования, которые могут быть использованы в параметре `algo` метода `hash()`.

&nbsp;

```js
getHmacHashAlgorithms(): string[];
```
Возвращает список алгоритмов хэширования, которые могут быть использованы в параметре `algo` метода `hmac()`.

&nbsp;

## Интерфейс BinaryData<a name="binarydata"></a>
```ts
interface BinaryData {
	getAsRawString(): string;
}
```
Служебный интерфейс для работы с бинарными данными, которые могут быть получены в результате вычисления хэшей. Создан для передачи бинарных данных между `js` и `php` компонентами платформы.

&nbsp;

```js
getAsRawString(): string;
```
Возвращает бинарные данные в виде `utf-8` строки.

Пример использования:

```js
const signature = om.crypto.hmac('sha1', 'data', 'some secret key', true);

console.log(
    signature.getAsRawString() // ��%�a
);
```

&nbsp;

[API Reference](./API.md)

[Оглавление](../README.md)
