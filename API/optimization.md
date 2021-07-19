# Оптимизационные запросы

### Интерфейс Optimization<a name="Optimization"></a>
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

### Интерфейс OptimizationRequestTab ...<a name="OptimizationRequestTab"></a>
```ts
interface OptimizationRequestTab extends Tab {
	run(name: string): { success: boolean, error: undefined | string };
}
```
`om.optimization.optimizationRequestsTab.run()` Аналогично функционалу запуска Отпимизационного запроса в интерфейсной 
части приложения. run в качестве аргумента принимает строку с именем Отпимизационного запроса




[API Reference](API.md)

[Оглавление](../README.md)