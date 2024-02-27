# Криптография, хэширование и вспомогательные функции

Некоторые сервисы требуют (или позволяют) проверять целостность сообщения или шифровать его содержимое. Так как функции, выполняющие такие операции, обычно неспецифичны для конкретных сервисов и тем более платформы Оптимакрос, они вынесены в отдельный интерфейс для удобства доступа.

## Интерфейс Crypto<a name="crypto"></a>
```ts
interface Crypto {
	sha1(data: string): string | null;

	hash(algo: string , data: string , binary?: boolean): string | null;

	hmac(algo: string, data: string, key: string, binary?: boolean): string | null;

	getHashAlgorithms(): string[];

	getHmacAlgorithms(): string[];
}
```
Интерфейс для работы с криптографическими и их дополняющими функциями.

&nbsp;

```js
sha1(data: string): string | null
```
Возвращает [`SHA1-хэш`](https://en.wikipedia.org/wiki/SHA-1) строки `data` (переданной в кодировке `UTF-8`), вычисленный по алгоритму `US Secure Hash Algorithm 1` в виде `40`-символьного шестнадцатеричного числа.<br>
В случае ошибки (не прошла валидация входных параметров или что-то ещё) возвращается `null`.

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
hash(algo: string , data: string , binary?: boolean): string | null
```
Возвращает хэш строки `data` (переданной в кодировке `UTF-8`), вычисленный по указанному в `algo` алгоритму ("sha1", "md5", "sha256" и т.д.). Полный список доступных алгоритмов может быть получен с помощью метода `getHashAlgorithms()`.<br>
Если `binary` не выставлено в `true` (по умолчание не выставлено), то хэш возвращается в виде строки, использующей шестнадцатеричное кодирование в нижнем регистре.<br>
Если `binary` выставлено в `true`, то хэш возвращается в виде бинарных данных.<br>
В случае ошибки (не прошла валидация входных параметров или что-то ещё) возвращается `null`.

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
hmac(algo: string, data: string, key: string, binary?: boolean): string | null
```
Возвращает [`HMAC (Hash-based Message Authentication Code)`](https://ru.wikipedia.org/wiki/HMAC) для строки `data` (переданной в кодировке `UTF-8`) с использованием переданного `key` (переданного в кодировке `UTF-8`). Аналогично `hash` используется переданный в `algo` алгоритм ("sha1", "sha256", "sha512" и т.д.) для хэширования. Полный список доступных алгоритмов может быть получен с помощью метода `getHmacAlgorithms()`.<br>
Если `binary` не выставлено в `true` (по умолчание не выставлено), то hmac возвращается в виде строки, использующей шестнадцатеричное кодирование в нижнем регистре.<br>
Если `binary` выставлено в `true`, то hmac возвращается в виде бинарных данных, закодированных с помощью Base64 в формате "==Base64String==".<br>
В случае ошибки (не прошла валидация входных параметров или что-то ещё) возвращается `null`.

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

```js
getHashAlgorithms(): string[]
```
Возвращает список алгоритмов хэширования, которые могут быть использованы в параметре `algo` для метода `hash`.

Пример использования:

```js
let algos = om.crypto.getHashAlgorithms();
console.log('Available hashing algorithms:\n');
algos.forEach(algo => {
    console.log('    ' + algo + '\n');
});

```

&nbsp;

```js
getHmacHashAlgorithms(): string[]
```
Возвращает список алгоритмов хэширования, которые могут быть использованы в параметре `algo` для метода `hmac`.

Пример использования:

```js
let algos = om.crypto.getHmacHashAlgorithms();
console.log('Available hashing algorithms for HMAC:\n');
algos.forEach(algo => {
    console.log('    ' + algo + '\n');
});

```

&nbsp;

[API Reference](./API.md)

[Оглавление](../README.md)
