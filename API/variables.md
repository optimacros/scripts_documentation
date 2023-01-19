# Переменные

### Интерфейс Variables<a name="variables"></a>
```ts
interface Variables {
	get(): Variable;
}
```
Интерфейс для доступа к переменным, заданным в системном мультикубе `Variables`.

&nbsp;

```js
get(varName: string): Variable
```
Возвращает для переменной с именем `varName` ссылку на интерфейс [`Variable`](#variable).

&nbsp;

### Интерфейс Variable<a name="variable"></a>
```ts
interface Variable {
	isEntity(): boolean;
	getValue(): number | string | null | boolean | EntityInfo;
}
```
Интерфейс, предоставляющий методы для работы с переменной, полученной из системного мультикубе `Variables`.

&nbsp;

```js
isEntity(): boolean
```
Возвращает `true`, если значение переменной - объект EntityInfo и false в противном случае.

&nbsp;

```js
getValue(): number | string | null | boolean | EntityInfo
```
Возвращает значение переменной. Если в формате куба, содержащего переменную, выставлен атрибут `secret`, данный метод вернет реальное значение, а не маскированное звездочками.

&nbsp;


[API Reference](API.md)

[Оглавление](../README.md)
