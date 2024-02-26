# Криптография, хэширование и вспомогательные функции

Некоторые сервисы требуют (или позволяют) проверять целостность сообщения или шифровать его содержимое. Так как функции, выполняющие такие операции, обычно неспецифичны для конкретных сервисов и тем более платформы Оптимакрос, они вынесены в отдельный интерфейс для удобства доступа.

## Интерфейс Crypto<a name="crypto"></a>
```ts
interface Crypto {
	sha1(data: string): string;

	hash(algo: string , data: string , binary?: boolean): string;

	hmac(algo: string, data: string, key: string, binary?: boolean): string;
}
```
Интерфейс для работы с криптографическими и их дополняющими функциями.

&nbsp;

```js
sha1(data: string): string
```
Возвращает [`SHA1-хэш`](https://en.wikipedia.org/wiki/SHA-1) строки `data` (переданной в кодировке `UTF-8`), вычисленный по алгоритму `US Secure Hash Algorithm 1` в виде `40`-символьного шестнадцатеричного числа.

Пример использования:

```js
let data = 'data';
let hash = om.crypto.sha1(data);
console.log(
    hash // a17c9aaa61e80a1bf71d0d850af4e5baa9800bbd
);
```

&nbsp;

```js
hash(algo: string , data: string , binary?: boolean): string
```
Возвращает хэш строки `data` (переданной в кодировке `UTF-8`), вычисленный по указанному в `algo` алгоритму ("sha1", "md5", "sha256" и т.д.).
Если `binary` не выставлено в `true` (по умолчание не выставлено), то хэш возвращается в виде строки, использующей шестнадцатеричное кодирование в нижнем регистре.
Если `binary` выставлено в `true`, то хэш возвращается в виде бинарных данных.

Пример использования:

```js
let data = 'data';
let hash = om.crypto.hash('sha1', data);
console.log(
    hash // a17c9aaa61e80a1bf71d0d850af4e5baa9800bbd
);
```

&nbsp;

```js
hmac(algo: string, data: string, key: string, binary?: boolean): string
```
Возвращает [`HMAC (Hash-based Message Authentication Code)`](https://ru.wikipedia.org/wiki/HMAC) для строки `data` (переданной в кодировке `UTF-8`) с использованием переданного `key`. Аналогично `hash` спользуется переданный в `algo` алгоритм ("sha1", "sha256", "sha512" и т.д.) для хэширования.
Если `binary` не выставлено в `true` (по умолчание не выставлено), то hmac возвращается в виде строки, использующей шестнадцатеричное кодирование в нижнем регистре.
Если `binary` выставлено в `true`, то hmac возвращается в виде бинарных данных, закодированных с помощью Base64 в формате "==Base64String==".

Пример использования:

```js
let data = 'data';
let hash = om.crypto.hmac('sha1', data, 'some secret key');
console.log(
    hash // 8b992587610f000c8e5cae70826b2a46d872bfb5
);

let hash = om.crypto.hmac('sha1', data, 'some secret key', true);
console.log(
    hash // ==i5klh2EPAAyOXK5wgmsqRthyv7U===
);

```


&nbsp;

[API Reference](./API.md)

[Оглавление](../README.md)
