# Оптимизационные запросы

## Интерфейс Optimization<a name="Optimization"></a>
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
Возвращает ссылку на интерфейс [`OptimizationRequestTab`](#OptimizationRequestTab). В интерфейсе Optimacros аналогично открытию вкладки `Оптимизация` -> `Оптимизационные запросы`.

&nbsp;

### Интерфейс OptimizationRequestTab<a name="OptimizationRequestTab"></a>
```ts
interface OptimizationRequestTab extends Tab {
	run(name: string): { success: boolean, error: undefined | string };
}
```
Запускает оптимизационный запрос `name`. Возвращает объект с данными об исполнении. Интерфейс наследуется от [`Tab`](./views.md#Tab).

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)