# Окружение, модель, пользователь

### Интерфейс Environment<a name="Environment"></a>
```ts
interface Environment {
    load(name: string): Environment;
    get(key: string, def?: any): any;
    set(name: string, value: number | string | null): Environment;
}
```
Интерфейс для доступа к [переменным окружения](https://ru.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F_%D1%81%D1%80%D0%B5%D0%B4%D1%8B).

&nbsp;

```js
load(name: string): Environment
```
Загружает значения переменных окружения из нуль-мерного мультикуба `name`. Возвращает `this`.

&nbsp;

```js
get(key: string, def?: any): any
```
Возвращает значение переменной окружения `key`. При отсутствии этой переменной и наличии аргумента `def` возвращает `def`.

&nbsp;

```js
set(name: string, value: number | string | null): Environment
```
Устанавливает значение переменной окружения `key` в значение `value`. Возвращает `this`.



[API Reference](API_reference.md)

[Оглавление](../README.md)