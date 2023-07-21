# Цепочки скриптов

## Интерфейс ResultActionsInfo<a name="result-actions-info"></a>
```ts
interface ResultActionsInfo {
	makeMacrosAction(identifier: string | number): ResultMacrosAction;
    	makeCodeExecutionAction(code: string): CodeExecutionAction;
	makeDashboardOpenAction(identifier: string | number): ResultOpenAction;
	makeContextTableOpenAction(identifier: string | number): ResultOpenAction;
	makeMulticubeViewOpenAction(multicube: string | number, view?: string | number | null): ResultOpenAction;
	makeListViewOpenAction(list: string | number, view?: string | number | null): ResultOpenAction;
}
```
Интерфейс создания действий, которые можно автоматически осуществить после исполнения текущего скрипта.

&nbsp;

```js
makeMacrosAction(identifier: string | number): ResultMacrosAction
```
Создаёт и возвращает действие [`ResultMacrosAction`](#result-macros-action) запуска существующего в модели скрипта. Аргумент `identifier` означает имя или [`longId`](./views.md#long-id) скрипта.

&nbsp;

```js
makeCodeExecutionAction(code: string): CodeExecutionAction
```
Создаёт и возвращает действие [`CodeExecutionAction`](#code-execution-action) запуска динамического кода. Аргумент `code` - строка с кодом.

&nbsp;

```js
makeDashboardOpenAction(identifier: string | number): ResultOpenAction
```
Создаёт и возвращает действие [`ResultOpenAction`](#result-open-action) открытия существующего в модели дашборда. Аргумент `identifier` означает имя или [`longId`](./views.md#long-id) дашборда.

&nbsp;

```js
makeContextTableOpenAction(identifier: string | number): ResultOpenAction
```
Создаёт и возвращает действие [`ResultOpenAction`](#result-open-action) открытия существующей в модели контекстной таблицы. Аргумент `identifier` означает имя или [`longId`](./views.md#long-id) контекстной таблицы.

&nbsp;

```js
makeMulticubeViewOpenAction(multicube: string | number, view?: string | number | null): ResultOpenAction
```
Создаёт и возвращает действие [`ResultOpenAction`](#result-open-action) открытия существующего в модели мультикуба. Аргумент `identifier` означает имя или [`longId`](./views.md#long-id) мультикуба, `view` означает имя или [`longId`](./views.md#long-id) представления.

&nbsp;

```js
makeListViewOpenAction(list: string | number, view?: string | number | null): ResultOpenAction
```
Создаёт и возвращает действие [`ResultOpenAction`](#result-open-action) открытия существующего в модели справочника. Аргумент `identifier` означает имя или [`longId`](./views.md#long-id) справочника, `view` означает имя или [`longId`](./views.md#long-id) представления.

&nbsp;

### Интерфейс ButtonInfoOptions<a name="button-info-options"></a>
```ts
interface ButtonInfoOptions {
	setLabel(label: string): ButtonInfoOptions;
	setStyle(style: string): ButtonInfoOptions;
}
```
Интерфейс настроек кнопки. Все функции возвращают `this`.

&nbsp;

```js
setLabel(label: string): ButtonInfoOptions
```
Устанавливает текст кнопки.

&nbsp;

```js
setStyle(style: string): ButtonInfoOptions
```
Устанавливает стиль кнопки. Возможные значения: `'PRIMARY'` – кнопка цвета темы Optimacros, `'SECONDARY'` – скучная, неинтересная кнопка. Значение по умолчанию: `'PRIMARY'`.

&nbsp;

### Интерфейс ButtonInfo<a name="button-info"></a>
```ts
interface ButtonInfo {
	setType(type: string): ButtonInfo;
	options(): ButtonInfoOptions;
}
```
Интерфейс информации о кнопке.

&nbsp;

```js
setType(type: string): ButtonInfo
```
Устанавливает тип кнопки. Возможные значения: `'GENERAL'` – подтверждение действия, `'CLOSE'` – отмена действия (в этом случае после завершения скрипта обе кнопки в интерфейсе Optimacros будут кнопками отмены). Значение по умолчанию: `'GENERAL'`. Возвращает `this`.

&nbsp;
	
```js
options(): ButtonInfoOptions
```
Возвращает интерфейс [`ButtonInfoOptions`](#button-info-options) настроек кнопки.

&nbsp;

### Интерфейс EnvironmentInfo<a name="environment-info"></a>
```ts
interface EnvironmentInfo {
	set(key: string, value: any): EnvironmentInfo;
	get(key: string): any;
}
```
Интерфейс [`переменных окружения`](https://ru.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F_%D1%81%D1%80%D0%B5%D0%B4%D1%8B). Значениями могут быть только [`сериализуемые`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) в JSON данные.

&nbsp;

```js
set(key: string, value: any): EnvironmentInfo
```
Устанавливает переменной `key` значение `value`. Возвращает `this`.

&nbsp;

```js
get(key: string): any
```
Возвращает значение переменной `key`.

&nbsp;

### Интерфейс ResultBaseAction<a name="result-base-action"></a>
```ts
interface ResultBaseAction {
	appendAfter(): this;
	setModelId(modelId: string): this;
}
```
Базовый интерфейс действия.

&nbsp;

```js
appendAfter(): this
```
Добавляет действие в реестр последующего запуска. Оно будет выполнено после исполнения текущего скрипта. При этом если действием является запуск очередного скрипта [`ResultMacrosAction`](#result-macros-action), который в свою очередь тоже может добавить в реестр действие запуска некоторого количества скриптов, то функционирование реестра запуска осуществляется в соответствии с алгоритмом обхода дерева запусков [`в глубину`](https://ru.wikipedia.org/wiki/%D0%9F%D0%BE%D0%B8%D1%81%D0%BA_%D0%B2_%D0%B3%D0%BB%D1%83%D0%B1%D0%B8%D0%BD%D1%83).

Рассмотрим пример. Скрипт `3` последовательно добавляет действия запусков скриптов `4` и `2`. Скрипт `4` последовательно добавляет действия запусков скриптов `5` и `1`:

![Дерево вызовов](./pic/DFS.png)

В такой ситуации скрипты исполнятся в следующем порядке: `3 -> 4 -> 5 -> 1 -> 2`.

&nbsp;

```js
setModelId(modelId: string): this
```
Устанавливает имя или `id` модели, к которой будет относиться выполнение действия. Этот механизм позволяет запустить скрипт из другой модели.

&nbsp;

### Интерфейс TaskPromiseResult<a name="task-promise-result"></a>
```ts
interface TaskPromiseResult {
    	getOutput(): string;
    	getDescription(): string;
    	getEnvironmentInfo(): EnvironmentInfo
}
```
Интерфейс результата запуска таски.

&nbsp;

```js
getOutput(): string
```
Возвращает вывод скрипта.

&nbsp;

```js
getDescription(): string
```
Возвращает описание таски скрипта.

&nbsp;

```js
getEnvironmentInfo(): EnvironmentInfo
```
Возвращает интерфейс [`EnvironmentInfo`](#environment-info) для передачи [`переменных окружения`](https://ru.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F_%D1%81%D1%80%D0%B5%D0%B4%D1%8B) скрипту.

&nbsp;

### Интерфейс TaskPromise<a name="task-promise"></a>
```ts
interface TaskPromise {
    	wait(wait: number): TaskPromiseResult|null;
	getStatus(): string|null;
}
```
Интерфейс промиса для таски

&nbsp;

```js
wait(wait: number): TaskPromiseResult|null
```
Устанавливает время ожидания промиса в секундах. Возвращает [`TaskPromiseResult`](#task-promise-result), если ответ пришёл в рамках установленного времени, иначе `null`

&nbsp;

```js
getStatus(): string|null
```
Возвращает одно из значений статуса таски: `NONE`, `WAIT_IN_QUEUE`, `IN_PROGRESS`, `SUCCESS`, `FAILED`, `ABORTED`. Иначе `null`

&nbsp;

### Интерфейс BaseCodeExecutionAction<a name="base-code-execution-action"></a>
```ts
interface BaseCodeExecutionAction extends ResultBaseAction {
	/**
	* @param value CUSTOM|SHARED|UNIQUE
	* Default is UNIQUE
	*/
	setLockMode(value: string): this;
	setAutoRunTimeout(seconds: number): this;
	buttonInfo(): ButtonInfo;
	environmentInfo(): EnvironmentInfo;
    	withPromise(withPromise: boolean): this;
        setTaskDescription(description: string): this;
        run(): TaskPromise|null;
}
```
Базовый интерфейс действия запуска скрипта. Наследуется от [`ResultBaseAction`](#result-base-action).

&nbsp;

```js
setLockMode(value: string): this
```
Устанавливает режим блокировки модели, где `value` соответствует режиму Lock Mode (CUSTOM|SHARED|UNIQUE). Значение по умолчанию UNIQUE

&nbsp;

```js
setAutoRunTimeout(seconds: number): this
```
Устанавливает тайм-аут запуска скрипта в секундах. Значение по умолчанию: `0`. Если задан ненулевой тайм-аут, дальнейшие действия зависят от факта вызова функции `buttonInfo()`.

Если `buttonInfo()` *не* была вызвана, после исполнения текущего скрипта произойдёт ожидание заданного тайм-аута и запустится следующий скрипт, однако результат вывода текущего скрипта на экране не отобразится.

Если `buttonInfo()` была вызвана, после исполнения текущего скрипта на экране отобразится его вывод и кнопки, указанные в описании этой функции. При этом на кнопке [`ButtonInfo`](#button-info) будет располагаться таймер обратного отсчёта заданного тайм-аута. Если пользователь не произведёт за это время действий, автоматически будет нажата эта кнопка.

Возвращает `this`.

&nbsp;

<a name="result-macros-action.button-info"></a>
```js
buttonInfo(): ButtonInfo
```
В случае вызова этой функции после завершения работы скрипта в интерфейсе Optimacros появятся 2 кнопки: `Отмена`, которая отменяет запуск действия, и кнопка, чьи вид и поведение определяются интерфейсом [`ButtonInfo`](#button-info), который и возвращает функция.

&nbsp;

```js
environmentInfo(): EnvironmentInfo
```
Возвращает интерфейс [`EnvironmentInfo`](#environment-info) для передачи [`переменных окружения`](https://ru.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F_%D1%81%D1%80%D0%B5%D0%B4%D1%8B) скрипту.

&nbsp;

```js
withPromise(withPromise: boolean): this
```
Устанавливает опцию для запуска скрипта с промисом. По умолчанию `false`

&nbsp;

```js
setTaskDescription(description: string): this
```
Устанавливает описание для таски скрипта.

&nbsp;

```js
run(): TaskPromise|null
```
Запускает скрипт. 
Если до запуска скрипта был вызван `withPromise(true)`, возвращает [`TaskPromise`](#task-promise), иначе `null`

&nbsp;

## Интерфейс ResultMacrosAction<a name="result-macros-action"></a>
```ts
interface ResultMacrosAction extends BaseCodeExecutionAction {

}
```
Интерфейс действия запуска скрипта. Наследуется от [`BaseCodeExecutionAction`](#base-code-execution-action).

&nbsp;

## Интерфейс CodeExecutionAction<a name="code-execution-action"></a>
```ts
interface CodeExecutionAction extends BaseCodeExecutionAction {
    setMemoryLimit(value: number): this;

    setTimeLimit(value: number): this;
}
```
Интерфейс действия запуска динамического кода. Наследуется от [`BaseCodeExecutionAction`](#base-code-execution-action).

&nbsp;

```js
setMemoryLimit(value: number): this
```
Устанавливает ограничение памяти.

&nbsp;

```js
setTimeLimit(value: number): this
```
Устанавливает ограничение времени.

&nbsp;

### Интерфейс ResultOpenAction<a name="result-open-action"></a>
```ts
interface ResultOpenAction extends ResultBaseAction {
	buttonInfo(): ButtonInfo;
}
```
Интерфейс действия открытия некоторого объекта Optimacros. Наследуется от [`ResultBaseAction`](#result-base-action).

&nbsp;

```js
buttonInfo(): ButtonInfo
```
Работает так же, как и [`ResultMacrosAction`](#result-macros-action).[`buttonInfo()`](#result-macros-action.button-info).

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
