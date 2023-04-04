# Оптимизационные запросы

## Интерфейс Optimization<a name="optimization"></a>
```ts
interface Optimization {
	optimizationRequestsTab(): OptimizationRequestTab
}
```
Интерфейс оптимизационных запросов.

&nbsp;

```js
optimizationRequestsTab(): OptimizationRequestTab
```
Возвращает ссылку на интерфейс [`OptimizationRequestTab`](#optimization-request-tab). В интерфейсе Optimacros аналогично открытию вкладки `Оптимизация` -> `Оптимизационные запросы`.

&nbsp;

### Интерфейс OptimizationRequestTab<a name="optimization-request-tab"></a>
```ts
interface OptimizationRequestTab extends Tab {
	run(name: string): { success: boolean, error: undefined | string };
}
```
Запускает оптимизационный запрос `name`. Возвращает объект с данными об исполнении. Интерфейс наследуется от [`Tab`](./views.md#tab).

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)