# Интерфейс Common

## Интерфейс Common<a name="common"></a>
```ts
interface Common {
	createCellBuffer(): CellBuffer;
	requestInfo(): RequestManager;
	modelInfo(): ModelInfo;
	userInfo(): UserInfo;
	resultInfo(): ResultInfo;
	entitiesInfo(): EntitiesInfo;
	copyData(): CopyData;
	apiServiceRequestInfo(): ApiService.RequestInfo | null;
	enterpriseContractManager(): EnterpriseContractManager;
	metricsManager(): MetricsManager;

	setCurrentMacrosStorageReadMode(type: string): boolean;
	getCurrentMacrosStorageReadMode(): string;
}
```
Интерфейс, группирующий некоторые общие интерфейсы и методы, не связанные друг с другом.

&nbsp;

```js
createCellBuffer(): CellBuffer;
```
Возвращает ссылку на интерфейс [`CellBuffer`](#cell-buffer).

&nbsp;

```js
requestInfo(): RequestManager;
```
Возвращает ссылку на интерфейс [`RequestManager`](#request-manager).

&nbsp;


```js
modelInfo(): ModelInfo;
```
Возвращает ссылку на интерфейс [`ModelInfo`](#model-info).

&nbsp;

```js
userInfo(): UserInfo;
```
Возвращает ссылку на интерфейс [`UserInfo`](#user-info).

&nbsp;

```js
resultInfo(): ResultInfo;
```
Возвращает ссылку на интерфейс [`ResultInfo`](#result-info).

&nbsp;

```js
entitiesInfo(): EntitiesInfo;
```
Возвращает ссылку на интерфейс [`EntitiesInfo`](#entities-info).

&nbsp;

```js
copyData(): CopyData;
```
Возвращает ссылку на интерфейс [`CopyData`](#copy-data).

&nbsp;

```js
apiServiceRequestInfo(): ApiService.RequestInfo | null;
```
Возвращает ссылку на интерфейс [`ApiService.RequestInfo`](./apiService.md#request-info), если скрипт вызван через API Service, или `null` иначе.

&nbsp;

```js
enterpriseContractManager(): EnterpriseContractManager;
```
Возвращает ссылку на интерфейс [`EnterpriseContractManager`](#enterprise-contract-manager).

&nbsp;

```js
metricsManager(): MetricsManager;
```
Возвращает ссылку на интерфейс [`MetricsManager`](#metrics-manager).

&nbsp;

```js
setCurrentMacrosStorageReadMode(type: string): boolean;
```
Устанавливает режим чтения данных модели для текущего скрипта. Описание режимов в разделе [`Режимы чтения и записи данных`](../advancedFeatues/readWriteModes.md#read-mode). Возвращает `true`.

&nbsp;

```js
getCurrentMacrosStorageReadMode(): string;
```
Возвращает режим чтения данных модели для текущего скрипта. Описание режимов в разделе [`Режимы чтения и записи данных`](../advancedFeatues/readWriteModes.md#read-mode). 

&nbsp;

### Интерфейс CellBuffer<a name="cell-buffer"></a>
```ts
interface CellBuffer {
	set(cell: Cell | CubeCell, value: number | string | boolean | null): this;
	apply(): this;
	count(): number;
	canLoadCellsValues(value: boolean): this;
	lastApplyErrors(): CellApplyError[];
}
```
Буфер, куда можно временно поместить значения набора ячеек, не обязательно смежных, чтобы изменить их перед отправкой на сервер.

В один буфер можно помещать запросы на изменение ячеек, принадлежащих разным представлениям одного объекта (мультикуба или справочника) и даже разным объектам. Однако в последнем случае следует понимать, что если между объектами (например, мультикубами `мк1` и `мк2`) существует связь, которая может привести к пересчёту значений, то последовательность действий

```
* запись в `CellBuffer` ячеек `мк1`
* запись в `CellBuffer` ячеек `мк2`
* вызов `CellBuffer.apply()`
```

и последовательность

```
* запись в `CellBuffer` ячеек `мк1`
* вызов `CellBuffer.apply()`
* запись в `CellBuffer` ячеек `мк2`
* вызов `CellBuffer.apply()`
```

может привести к различным результатам.

При модификации большого количества клеток (от нескольких сотен тысяч), рекомендуется пользоваться [`импортом CSV`](./exportImport.md#importer).

&nbsp;

```js
set(cell: Cell | CubeCell, value: number | string | boolean | null): this;
```
Устанавливает значение `value` в клетку `cell` в буфере. Возвращает `this`.

&nbsp;

<a name="cell-buffer.apply"></a>
```js
apply(): this;
```
Передаёт на сервер значения всех клеток для присваивания в модели и очищает буфер. Перед присваиванием сервер может их обработать и выставить другие значение, например, после установки в ячейку формата даты строки `'2019-03-01'` впоследствии из неё будет считана строка `'1 Mar 19'`. Возвращает `this`.

&nbsp;

```js
count(): number;
```
Возвращает количество ячеек в буфере.

&nbsp;

```js
canLoadCellsValues(value: boolean): this;
```
Устанавливает значение `value`, указывающее, нужно ли перезагружать значения клеток в буфере, если они изменятся. Возвращает `this`.

По умолчанию: `true`. Использование значения по умолчанию сохранено для обратной совместимости и приводит к снижению производительности. Рекомендуется сразу после инициализации объекта вызвать функцию `canLoadCellsValues()` и передать ей значение `false`.

&nbsp;

```js
lastApplyErrors(): CellApplyError[];
```
Если после последнего выполнения функции [`apply()`](#cell-buffer.apply) в некоторые ячейки по каким-то причинам фактически не произошла запись, информация о каждой такой ячейке и причине неуспеха помещается в интефейс [`CellApplyError`](#cell-apply-error). Функция возвращает массив таких интерфейсов.
	
&nbsp;

### Интерфейс CellApplyError<a name="cell-apply-error"></a>
```ts
interface CellApplyError {
	definitions(): number[];
	error(): string;
}
```
Интерфейс содержит информацию об адресе ячейки и причинах невозможности произвести в неё запись с помощью функции [`CellBuffer.apply()`](#cell-buffer.apply).

&nbsp;

```js
definitions(): number[];
```
Возвращает адрес ячейки, то же что и [`CubeCell.definitions()`](./cubeCell.md#cube-cell.definitions).

&nbsp;

```js
error(): string;
```
Возвращает текст ошибки.

&nbsp;

### Интерфейс RequestManager<a name="request-manager"></a>
```ts
interface RequestManager {
	log(message: string, print?: boolean): this;
	logStatusMessage(message: string, print?: boolean): this;
	setStatusMessage(message: string): this;
}
```
Интерфейс для записи в лог (устаревший функционал) и работы со статусными сообщениями. Все функции возвращают `this`.

&nbsp;

```js
log(message: string, print?: boolean): this;
```
Выводит сообщение `message` в лог, доступ к которому можно получить в панели администратора. Если `print === true` (по умолчанию: `false`), дублирует сообщение `message` в консоль и дополнительно переносит курсор на новую строку. *Устаревшая функция.*

![Лог в панели администратора](./pic/requestInfo.png)

&nbsp;

<a name="request-manager.log-status-message"></a>
```js
logStatusMessage(message: string, print?: boolean): this;
```
Делает то же, что и `setStatusMessage()`. Если `print === true` (по умолчанию: `false`), дублирует сообщение `message` в консоль и дополнительно переносит курсор на новую строку. *Устаревшая функция.*

&nbsp;

<a name="request-manager.set-status-message"></a>
```js
setStatusMessage(message: string): this;
```
Устанавливает статусное сообщение `message`. Может использоваться для уведомления пользователя во время длительной работы скрипта об этапах или процентах выполненных работ.

![Пример отображения статусного сообщения](./pic/statusMessage.png)

&nbsp;

### Интерфейс ExportObfuscationState<a name="export-obfuscation-state"></a>
```ts
interface ExportObfuscationState {
	setPath(path: string): this;
	setEmailWhiteList(emailWhiteList: string[]): this;
	setDataArchiveType(type: string): this;
	export(): boolean;
}
```
Интерфейс для экспорта модели в [`обфусцированном`](https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%84%D1%83%D1%81%D0%BA%D0%B0%D1%86%D0%B8%D1%8F_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%BD%D0%BE%D0%B5_%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D0%B5)) состоянии. Используется для передачи моделей, содержащих конфиденциальную информацию, третьим лицам.

&nbsp;

```js
setPath(path: string): this;
```
Устанавливает путь к файлу модели. Возвращает `this`.

&nbsp;

```js
setEmailWhiteList(emailWhiteList: string[]): this;
```
Устанавливает список email пользователей модели, которые *не* будут обфусцированы. Возвращает `this`.

&nbsp;

```js
setDataArchiveType(type: string): this;
```
Устанавливает тип формата выгруженных данных модели. Допустимые значения: `TXT`, `BIN`. Значение по умолчанию: `BIN`. Возвращает `this`.

&nbsp;

```js
export(): boolean;
```
Экспортирует модель и возвращает `true`.

&nbsp;

### Тип UpdateInputCellsViaFormulaRequest<a name="update-input-cells-via-formula-request"></a>
```js
type UpdateInputCellsViaFormulaRequest = {
	cubeLongId: number;
	valueFormula: string;
	conditionFormula?: string;
}
```
Тип содержит информацию о сущности в свойстве `cubeLongId`, формулу для пересчёта в свойстве `valueFormula`, и условную формулу, которая будет применяться к каждой клетке куба в свойстве `conditionFormula`, которое не является обязательным и по умолчанию имеет значение `true`.

Используется как параметр функции `Modelinfo`.[`batchUpdateInputCellsViaFormula()`](#model-info.batch-update-input-cells-via-formula).

&nbsp;

### Интерфейс ModelInfo<a name="model-info"></a>
```ts
interface ModelInfo {
	id(): string;
	name(): string;
	lastSyncDate(): number;
	
	autoCalcStatus(): boolean;
	setModelCalculationMode(status: boolean): boolean;
	
	repair(): boolean;
	recalculate(): boolean;
	backup(path?: string): EntityInfo | boolean;
	
	export(path: string): boolean;
	exportObfuscationState(): ExportObfuscationState;
	
	useUniqueLock(): this;
	useSharedLock(): this;
	hasUniqueLock(): boolean;
	hasSharedLock(): boolean;
	unlock(): this;
	
	recalculateIfManualCalculable(identifiers: number[]): boolean;

	batchUpdateInputCellsViaFormula(requests: UpdateInputCellsViaFormulaRequest[], sortByDependenciesValueFormula?: boolean, sortByDependenciesConditionFormula?: boolean): boolean;

	getStorageInstancePriority(): number;
	setStorageInstancePriority(priority: number): number;

	setModelStorageReadMode(type: string): boolean;
	setModelStorageWriteMode(type: string): boolean;
	getStorageReadMode(): string;
	getStorageWriteMode(): string;

	setMacrosStorageReadMode(type: string): boolean;
	getMacrosStorageReadMode(): string;
	
	recalculateCubes(identifiers: number[]): boolean;
	recalculateCubesWithTheirSources(identifiers: number[]): boolean;
	recalculateCubesWithTheirDestinations(identifiers: number[]): boolean;
	recalculateCubesWithLinkedCubes(identifiers: number[]): boolean;
}
```
Интерфейс получения информации о модели и произведения с ней некоторых манипуляций.

&nbsp;

<a name="model-id"></a>
```js
id(): string;
```
Возвращает `id` модели.

&nbsp;

```js
name(): string;
```
Возвращает имя модели.

&nbsp;

```js
lastSyncDate(): number;
```
Возвращает дату и время в формате [`UNIX`](https://ru.wikipedia.org/wiki/Unix-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F) последнего пересчёта модели в ручном режиме.

&nbsp;

```js
autoCalcStatus(): boolean;
```
Возвращает признак режима автоматического пересчёта модели.

&nbsp;

```js
setModelCalculationMode(status: boolean): boolean;
```
Устанавливает признак режима автоматического пересчёта модели. Аналог в интерфейсе Optimacros: меню пользователя -> `Параметры` -> `Расширенные` -> `Режим ручного пересчёта модели`. Возвращает `true`.

&nbsp;

```js
repair(): boolean;
```
Делает резервную копию модели, останавливает все [`процессы`](https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81_(%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0)) ОС, которые обслуживают модель, запускает их заново и восстанавливает модель из копии. Аналог в интерфейсе Optimacros: меню пользователя -> `Перезапустить модель`. Возвращает `true`.

&nbsp;

```js
recalculate(): boolean;
```
Выполняет пересчёт модели в ручном режиме. Не останавливает процессы модели, за счёт чего выполняется значительно быстрее, чем `repair()`. Аналог в интерфейсе Optimacros: меню пользователя -> `Пересчитать модель`. Возвращает `true`.

&nbsp;

```js
backup(path?: string): EntityInfo | boolean;
```
Сохраняет резервную копию в логах модели: в интерфейсе Optimacros на вкладке `Центр безопастности`->`Логи`->`Резервные копии`. Если указан путь `path`, после создания копии вызовется функция `export()` и вернётся её результат типа `boolean`. Если `path` не указан, возвращает сущность резервной копии в виде [`EntityInfo`](./common.md#entity-info).

&nbsp;

```js
export(path: string): boolean;
```
Сохраняет резервную копию в [`рабочую директорию`](../appendix/glossary.md#script-dir) скрипта по пути `path`. Возвращает `true`.

&nbsp;

```js
exportObfuscationState(): ExportObfuscationState;
```
Возвращает интерфейс [`ExportObfuscationState`](#export-obfuscation-state) экспорта модели в обфусцированном состоянии.

&nbsp;

```js
useUniqueLock(): this;
```
Устанавливает режим блокировки модели скриптом (`Lock Mode`) `Unique`. Необходим для изменения метаданных модели. В таком режиме одномоментно может испольняться только один запрос (работающий скрипт или пользователь), остальные будут стоять в очереди. Подробнее о режимах блокировки [здесь](../advancedFeatues/modelLock.md).

&nbsp;

```js
useSharedLock(): this;
```
Устанавливает режим блокировки модели скриптом (`Lock Mode`) `Shared`. Достаточен для чтения данных из модели и изменения значений кубов. В один момент может исполняться несколько запросов от скриптов и пользователей с таким режимом блокировки. Попытка изменения метаданных будет вызывать ошибку `Unique lock not defined`. Подробнее о режимах блокировки [здесь](../advancedFeatues/modelLock.md).

&nbsp;

```js
hasUniqueLock(): boolean;
```
Находится ли модель под `unique` блокировкой. Если скрипт находится вне контекста модели (режим запуска `Custom` или использован метод `unlock()`), то вернёт `false`.

&nbsp;

```js
hasSharedLock(): boolean;
```
Находится ли модель под `shared` блокировкой. Если скрипт находится вне контекста модели (режим запуска `Custom` или использован метод `unlock()`), то вернёт `false`.

&nbsp;

<a name="model-info.unlock"></a>
```js
unlock(): this;
```
Устанавливает режим блокировки модели скриптом (`Lock Mode`) `Custom`. Скрипт перестанет отображаться в очереди модели (также перестанет отображаться плашка с информацией от скрипта!). Методы, связанные с моделью, будут вызывать ошибку `Model not defined`. Подробнее о режимах блокировки [здесь](../advancedFeatues/modelLock.md).

&nbsp;

<a name="model-info.recalculate-if-manual-calculable"></a>
```js
recalculateIfManualCalculable(identifiers: number[]): boolean;
```
Производит пересчёт сущностей (кубов или свойств в справочниках) `identifiers`, если на них не стоит флаг автопересчёта. Если массив `identifiers` пустой, вместо него берётся массив всех сущностей модели. Автоматически пересчитываемые сущности пропускаются. При успешном пересчёте возвращает `true`, и это **поведение отличается** от поведения группы функций [`recalculateCubes...()`](#model-info.recalculate-cubes).

&nbsp;

<a name="model-info.batch-update-input-cells-via-formula"></a>
```js
batchUpdateInputCellsViaFormula(requests: UpdateInputCellsViaFormulaRequest[], sortByDependenciesValueFormula?: boolean, sortByDependenciesConditionFormula?: boolean): boolean;
```
Производит пересчёт (независимо от флага автопересчёта) сущностей (вводимых кубов или свойств справочников), заданных массивом `requests` типа [`UpdateInputCellsViaFormulaRequest`](#update-input-cells-via-formula-request). Передаваемая формула *не* переписывает текущую формулу данной сущности. При успешном пересчёте возвращает `true`, и это **поведение отличается** от поведения группы функций [`recalculateCubes...()`](#model-info.recalculate-cubes).

Дополнительные булевые параметры влияют на порядок выполнения запросов.
- `sortByDependenciesValueFormula` — учитывать формулы при определении порядка расчётов кубов. Значение по умолчанию: `true`.
- `sortByDependenciesConditionFormula` — учитывать формулы, передаваемые в условии, при определении порядка расчёта кубов. Значение по умолчанию: `true`.

Значение `true` указывает, что при построении порядка расчётов нужно учитывать зависимости между кубами в формулах, т. е. если `куб2` ссылается на `куб1`, то `куб1` должен считаться раньше. Значение `false` указывает, что порядок расчётов не важен и система сама решит, в каком порядке выполнить пересчёт в этот раз (порядок может отличаться при разных запусках).

&nbsp;

```js
getStorageInstancePriority(): number;
```
Возвращает текущий приоритет OLAP-процесса модели — значение [nice](https://ru.wikipedia.org/wiki/Nice), число от `-20` (наивысший приоритет) до `+19` (наименьший приоритет).

&nbsp;

```js
setStorageInstancePriority(priority: number): number;
```
Устанавливает приоритет OLAP-процесса модели (значение [nice](https://ru.wikipedia.org/wiki/Nice)). В параметре принимает число от `0` до `19`, отрицательные значения не разрешены. Возвращает предыдущее значение приоритета.

<details><summary>Дополнительно о приоритете процесса</summary>
&nbsp;
<p>
По умолчанию большинство процессов в системе имеют приоритет 0.
</p>
<p>Если OLAP-процесс (процесс БД, хранящей и вычисляющей данные) одной из моделей воркспейса потребляет значительно больше ресурсов, чем остальные процессы, это может приводить к видимому замедлению работы в других моделях на том же воркспейсе или любых других процессов, использующих те же ресурсы. Чтобы подправить эту ситуацию, можно установить для OLAP-процессов моделей разные приоритеты (то есть, подвинуть их в очереди на получение ресурсов процессора). Если установить OLAP-процессу модели приоритет ниже (чиcло выше), то она будет пропускать в очереди другие процессы и, хоть и работать медленнее, но не мешать работе в остальных моделях.
</p>
</details>

&nbsp;

```js
setModelStorageReadMode(type: string): boolean;
```
Устанавливает режим чтения данных модели для пользователей. Аналог в интерфейсе `Optimacros`: `Меню пользователя` -> `Параметры` -> `Режимы чтения и записи` -> `Режим чтения для пользователей`. Описание режимов в разделе [`Режимы чтения и записи данных`](../advancedFeatues/readWriteModes.md#read-mode).  Возвращает `true`.

&nbsp;

```js
setModelStorageWriteMode(type: string): boolean;
```
Устанавливает режим записи данных в модель. Аналог в интерфейсе `Optimacros`: `Меню пользователя` -> `Параметры` -> `Режимы чтения и записи` -> `Режим записи для пользователей и скриптов`. Описание режимов в разделе [`Режимы чтения и записи данных`](../advancedFeatues/readWriteModes.md#write-mode). Возвращает `true`.

&nbsp;

```js
getStorageReadMode(): string;
```
Возвращает установленный режим чтения данных модели. Описание режимов в разделе [`Режимы чтения и записи данных`](../advancedFeatues/readWriteModes.md#read-mode).

&nbsp;

```js
getStorageWriteMode(): string;
```
Возвращает установленный режим записи данных в модель. Описание режимов в разделе [`Режимы чтения и записи данных`](../advancedFeatues/readWriteModes.md#write-mode).

&nbsp;

```js
setMacrosStorageReadMode(type: string): boolean;
```
Устанавливает режим чтения данных модели для скриптов. Аналог в интерфейсе `Optimacros`: `Меню пользователя` -> `Параметры` -> `Режимы чтения и записи` -> `Режим чтения для скриптов`. Описание режимов в разделе [`Режимы чтения и записи данных`](../advancedFeatues/readWriteModes.md#read-mode). Метод ожидает завершения всех запросов в модели и только после этого переключает режим. Возвращает `true`.

&nbsp;

```js
getMacrosStorageReadMode(): string;
```
Возвращает установленный режим чтения данных модели для скриптов. Описание режимов в разделе [`Режимы чтения и записи данных`](../advancedFeatues/readWriteModes.md#read-mode).

&nbsp;

<a name="model-info.recalculate-cubes"></a>
```js
recalculateCubes(identifiers: number[]): boolean;
```
Выполняет пересчёт кубов, переданных в качестве аргумента, без пересчёта связанных кубов. Аналог в интерфейсе Optimacros: `Контекстное меню куба` -> `Пересчитать куб` -> `Только этот куб`. Возвращает `true` в случае успешного выполнения и `false`, если был передан пустой список кубов, и это **поведение отличается** от поведения похожей функции [`recalculateIfManualCalculable()`](#model-info.recalculate-if-manual-calculable). В случае ошибки выбрасывает исключение.

&nbsp;

```js
recalculateCubesWithTheirSources(identifiers: number[]): boolean;
```
Выполняет пересчёт кубов, переданных в качестве аргумента, а также кубов, на которые ссылаются эти кубы, – рекурсивно. Аналог в интерфейсе Optimacros: `Контекстное меню куба` -> `Пересчитать куб` -> `Источники для куба и сам куб`. Возвращает `true` в случае успешного выполнения и `false`, если был передан пустой список кубов, и это **поведение отличается** от поведения похожей функции [`recalculateIfManualCalculable()`](#model-info.recalculate-if-manual-calculable). В случае ошибки выбрасывает исключение.

&nbsp;

```js
recalculateCubesWithTheirDestinations(identifiers: number[]): boolean;
```
Выполняет пересчёт кубов, переданных в качестве аргумента, а также кубов, которые ссылаются на эти кубы, – рекурсивно. Аналог в интерфейсе Optimacros: `Контекстное меню куба` -> `Пересчитать куб` -> `Этот куб и все приёмники куба`. Возвращает `true` в случае успешного выполнения и `false`, если был передан пустой список кубов, и это **поведение отличается** от поведения похожей функции [`recalculateIfManualCalculable()`](#model-info.recalculate-if-manual-calculable). В случае ошибки выбрасывает исключение.

&nbsp;

```js
recalculateCubesWithLinkedCubes(identifiers: number[]): boolean;
```
Выполняет пересчёт кубов, переданных в качестве аргумента, и всех связанных кубов – рекурсивно. Аналог в интерфейсе Optimacros: `Контекстное меню куба` -> `Пересчитать куб` - `Источники для куба и все приёмники`. Возвращает `true`, в случае успешного выполнения, либо `false`, если был передан пустой список кубов, и это **поведение отличается** от поведения похожей функции [`recalculateIfManualCalculable()`](#model-info.recalculate-if-manual-calculable). В случае ошибки выбрасывает исключение.

&nbsp;

### Интерфейс UserInfo<a name="user-info"></a>
```ts
interface UserInfo {
	getEntity(): EntityInfo;
	getEmail(): string;
	getFirstName(): string;
	getLastName(): string;
	getRole(): EntityInfo;
}
```
Интерфейс получения информации о пользователе.

&nbsp;

```js
getEntity(): EntityInfo;
```
Возвращает сущность пользователя в виде [`EntityInfo`](./common.md#entity-info).

&nbsp;

```js
getEmail(): string;
```
Возвращает email пользователя.

&nbsp;

```js
getFirstName(): string;
```
Возвращает имя пользователя.

&nbsp;

```js
getLastName(): string;
```
Возвращает фамилию пользователя.

&nbsp;

```js
getRole(): EntityInfo;
```
Возвращает сущность роли пользователя в виде [`EntityInfo`](./common.md#entity-info).

&nbsp;

### Интерфейс ResultInfo<a name="result-info"></a>
```ts
interface ResultInfo {
	addFileHash(hash: string): this;
	actionsInfo(): ResultActionsInfo;
	setProperty(name: string, value: any): this;
}
```
Интерфейс управления ответом на запрос о запуске скрипта.

&nbsp;

<a name="result-info.add-file-hash"></a>
```js
addFileHash(hash: string): this;
```
Добавляет к ответу на запрос скрипта хэш `hash` файла, ранее зарегистрированного в [`глобальном реестре`](../appendix/glossary.md#global-file-registry). Для пользователя это приведёт к тому, что файл будет скачан в браузере. Возвращает `this`.

&nbsp;

```js
actionsInfo(): ResultActionsInfo;
```
Возвращает интерфейс [`ResultActionsInfo`](./scriptChains.md#result-actions-info) создания действий, которые можно автомагически осуществить после исполнения текущего скрипта.

&nbsp;

```js
setProperty(name: string, value: any): this;
```
Устанавливает свойству `name` значение `value` в HTTP-ответе на запрос о запуске скрипта приложением-клиентом (например, web-интерфейсом Optimacros). Возвращает `this`.

&nbsp;

### Интерфейс EntityInfo (Label)<a name="entity-info"></a>
```ts
interface Label {
	longId(): number;
	name(): string;
	code(): string | null;
	alias(): string;
	label(): string;
	parentLongId(): number;
	hierarchyLongId(): number;
}

```
Интерфейс сущности. Как правило, представляет собой один из заголовков строки или столбца.

&nbsp;

<a name="long-id"></a>
```js
longId(): number;
```
Возвращает внутренний идентификатор сущности в системе, уникальный в пределах модели.

&nbsp;

<a name="label.name"></a>
```js
name(): string;
```
Возвращает имя сущности.

&nbsp;

```js
code(): string;
```
Возвращает код сущности. В Optimacros всего две сущности могут иметь код: элементы справочников и кубы.

&nbsp;

<a name="alias"></a>
```js
alias(): string;
```
Возвращает отображаемое имя.

Если `this` является сущностью элемента справочника, в настройках которого задано некоторое свойство в качестве отображаемого имени (опция `Отображение`), и для этой сущности задано значение этого свойства, то возвращает значение этого свойства.

Иначе возвращает [`name()`](#label.name).

&nbsp;

```js
label(): string;
```
То же, что и [`alias()`](#alias).

&nbsp;

```js
parentLongId(): number;
```
Если сущность является элементом, у которого есть родительский элемент, то возвращает [`longId`](#long-id) сущности родителя.

Если родительской сущности нет, возвращает `-1`.

&nbsp;

```js
hierarchyLongId(): number;
```
Если сущность является элементом или сабсетом справочника (включая справочники времени и версий), возвращает  [`longId`](#long-id) самого справочника. Если родительского справочника нет, возвращает `-1`. На данный момент этот метод может некорректно работать в зависимости от способа получения `EntityInfo`, для корректной работы рекомендуется получать сущность с помощью интерфейса [`EntitiesInfo`](#entities-info).

&nbsp;

### Интерфейс EntitiesInfo<a name="entities-info"></a>
```ts
interface EntitiesInfo {
	get(longId: number): EntityInfo | null;
	getCollection(longId: number[]): EntityInfo[];
}
```
Интерфейс для получения сущности по [`longId`](./common.md#long-id).

&nbsp;

```js
get(longId: number): EntityInfo | null;
```
Возвращает сущность [`EntityInfo`](#entity-info) по её [`longId`](#long-id).

&nbsp;

```js
getCollection(longId: number[]): EntityInfo[];
```
Возвращает массив сущностей [`EntityInfo`](#entity-info) по массиву их [`longId`](#long-id). Корректно работает, только если все переданные `longId` корректные (существуют в модели). Иначе возвращает массив меньшей размерности. Использовать с осторожностью. Порядок возвращаемых сущностей `EntityInfo` может отличаться от порядка переданных `longId`.

&nbsp;

### Интерфейс CopyData<a name="copy-data"></a>
```ts
interface CopyData {
	setSourceLongId(longId: number): this;
	setDestLongId(longId: number): this;
	
	enableCopyAllCubes(): this;
	enableCustomProperties(): this;
	setMulticubeLongIds(longIds: number[]): this;
	setMulticubeByNames(names: string[]): this;
	
	copy(): this;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), позволяет скопировать данные срезов кубов или свойств справочника по некоторому элементу *заданного измерения* в другой элемент того же измерения. Для использования нужно:
- указать два элемента одного и того же измерения, которое здесь будем называть *заданным измерением*, вызовом функций `setSourceLongId()` и `setDestLongId()`;
- указать кубы или свойства справочников, срезы которых нужно копировать, вызовом одной из четырёх функций: `enableCopyAllCubes()`, `enableCustomProperties()`, `setMulticubeLongIds()`, `setMulticubeByNames()`;
- вызвать функцию `copy()`.
Все функции возвращают `this`.

&nbsp;

```js
setSourceLongId(longId: number): this;
```
Устанавливает [`longId`](#long-id) элемента-источника *заданного измерения*.

&nbsp;

```js
setDestLongId(longId: number): this;
```
Устанавливает [`longId`](#long-id) элемента-приёмника *заданного измерения*.

&nbsp;

```js
enableCopyAllCubes(): this;
```
Предписывает произвести копирование во всех кубах модели, содержащих *заданное измерение*.

&nbsp;

```js
enableCustomProperties(): this;
```
Предписывает произвести копирование данных из пользовательских свойств элемента-источника в свойства элемента-приёмника во всех справочниках, содержащих оба этих элемента.

&nbsp;

```js
setMulticubeLongIds(longIds: number[]): this;
```
Предписывает произвести копирование в указанных по [`longId`](#long-id) мультикубах, которые содержат *заданное измерение*.

&nbsp;

```js
setMulticubeByNames(names: string[]): this;
```
Предписывает произвести копирование в указанных по именам мультикубах, которые содержат *заданное измерение*.

&nbsp;

```js
copy(): this;
```
Выполняет копирование.

&nbsp;

### Интерфейс EnterpriseContractManager<a name="enterprise-contract-manager"></a>
```ts
interface EnterpriseContractManager {
	doesWorkspaceRequireContract(): boolean;
	getWorkspaceContractInfo(): ContractInfo;
	
	generateSalt(): string;
	
	validateContractJson(jsonStr: string): boolean;
	calculateContractHash(contractData: string, salt: string): string;
	validateContract(contractData: string, hash: string, salt: string): string;
}
```
On-premise (на сервере клиента) установка предполагает ограничения на различные параметры воркспейса: домен, число моделеров, число обычных пользователей и т. д. Для контроля соответствия фактического состояния вещей договору с клиентом используется следующий подход:

1. при сборке дистрибутива для клиента в него записывается секретная строка — [соль](https://ru.wikipedia.org/wiki/Соль_(криптография)),
1. параметры договора записываются в виде JSON-строки фиксированного формата (который на данный момент не задокументирован),
1. JSON-строка и значение хэш-функции (тоже текст), которое было рассчитано из JSON-строки и соли, передаются клиенту,
1. клиент указывает оба этих значения в настройках воркспейса в панели администратора воркспейса,
1. воркспейс проверяет
   - соответствие строки формату JSON,
   - соответствие JSON-строки схеме данных,
   - соответствие JSON-строки указанному значению хэш-функции,
   - соответствие текущих параметров воркспейса параметрам, указанным в JSON-строке,
1. в случае наличия ошибок или нарушения параметров договора всем пользователям выводится системное сообщение с информацией о проблеме.

Данный интерфейс предоставляет возможность работать с текущими параметрами договора воркспейса, а также генерировать новые пары "`соль — значение хэш-функции`" на основе произвольных параметров договора.

&nbsp;

```js
doesWorkspaceRequireContract(): boolean;
```
Возвращает `true`, если воркспейс установлен из дистрибутива, собранного с данными для сверки параметров договора. В противном случае возвращает `false`.

&nbsp;

```js
getWorkspaceContractInfo(): ContractInfo;
```
Сначала функция проверяет JSON-объект с параметрами договора аналогично `validateContractJson()`. Если указанный в интерфейсе администратора JSON-объект содержит синтаксическую ошибку или не соответствует схеме данных, будет выброшено соответствующее исключение.

Затем сравнивает параметры договора, указанные в настройках воркспейса (`Settings` -> `Editor` -> `Workspace` -> `Contract`), с текущими параметрами воркспейса. Возвращает объект [`ContractInfo`](#contract-info) с результатом проверок.

Если воркспейс не имеет данных для проверки параметров договора, выбрасывает исключение `Contract is not required for this workspace`.

&nbsp;

```js
generateSalt(): string;
```
Генерирует и возвращает случайное значение соли для последующего использования при генерации хэша.

&nbsp;

```js
validateContractJson(jsonStr: string): boolean;
```
Проверяет `jsonStr` на соответствие формату `JSON` и схеме валидации параметров договора. Возвращает `true` или выбрасывает исключение об ошибке синтаксиса.

&nbsp;

```js
calculateContractHash(contractData: string, salt: string): string;
```
Проверяет JSON-строку `contractData` с параметрами договора аналогично методу `validateContractJson()`, затем рассчитывает и возвращает значение хэш-функции, используя значение соли, которое должно быть произвольной непустой строкой.

&nbsp;

```js
validateContract(contractData: string, hash: string, salt: string): string;
```
Проверяет JSON-строку `contractData` с параметрами договора аналогично методу `validateContractJson()`, затем проверяет соответствие параметров договора `contractData` и второго аргумента хэш-функции `salt` значению этой хэш-функции `hash`. Если проверка прошла успешно, возвращает JSON-объект с параметарми договора в виде строки. В противном случае выбрасывает исключение `Contract data does not match hash`. `hash` и `salt` должны быть непустыми строками.

&nbsp;

### Тип ContractInfo<a name="contract-info"></a>
```ts
type ContractInfo = {
	contractJson(): string;
	errors(): string[];
}
```
Объект содержит информацию о параметрах договора и обнаруженных проблемах. Если параметры договора не указаны в интерфейсе администратора, объект будет содержать только ошибку `Contract not found`.

Если параметры, указанные в JSON-строке не соответствуют текущим параметрам воркспейса, объект `ContractInfo` будет содержать информацию об этих несоответствиях, которую можно получить, вызвав метод `errors()`.

Пример использования:

```js
try {
	const contractInfo = om.common.enterpriseContractManager().getWorkspaceContractInfo();

	const errors = contractInfo.errors();
	if (errors.length > 0) {
		console.log("Errors:\n" + errors + "\n\n");
	}

	console.log(contractInfo.contractJson());
} catch (e) {
	console.log("Exception: " + e.message);
}
```

&nbsp;

```js
contractJson(): string;
```
Возвращает нормализованную JSON-строку, которая соответствует JSON-объекту, указанному в панели администратора воркспейса. Например, если в панели администратора введена строка `{   "id"  :   "some_id"   }`, функция `contractJson()` вернёт `{"id":"some_id"}`.

Если JSON-строка и значение хэш-функции не соответствуют записанному в воркспейс значению соли, вернёт пустой JSON-объект.

&nbsp;

```js
errors(): string[];
```
Возвращает список строк с обнаруженными проблемами.

Если JSON-строка и значение хэш-функции не соответствуют записанному в воркспейс значению соли, список будет содержать ошибку `Contract data does not match hash`.

&nbsp;

### Интерфейс MetricsManager<a name="metrics-manager"></a>
```ts
type StringMap = {
	[key: string]: string;
};

type MetricData = {
	name(): string;
	value(): number;
	tags(): string;
};

interface MetricsManager {
	getAllMetrics(): MetricData[];
	setMetricValue(name: string, value: number, tags?: StringMap[]): this;
	getMetricValue(name: string, tags?: StringMap[]): number | null;
}
```
Интерфейс для работы с [`метриками воркспейса`](https://github.com/optimacros/ws_metrics_api/tree/27378_metrics_service). Каждая метрика `MetricData` идентифицируется именем `name` и (возможно, пустым) набором тегов `tags`. То есть, могут существовать разные одноимённые метрики с разными наборами тегов.

Тип `MetricData` описывает метрику в виде объекта, который предоставляет методы для доступа к имени метрики, её числовому значению и тегам. Пример использования:
```js
	const metrics = om.common.metricsManager().getAllMetrics();
	for (let metric of metrics) {
		console.log(metric.name() + ': ' + metric.value() + ' (' + metric.tags() + ')');
	}
```

&nbsp;

```js
getAllMetrics(): MetricData[];
```
Возвращает массив всех доступных метрик.

&nbsp;

```js
setMetricValue(name: string, value: number, tags?: StringMap[]): this;
```
Сохраняет метрику с именем `name` и тегами `tags`, присваивая ей числовое значение `value`. Возвращает `this`.

&nbsp;

```js
getMetricValue(name: string, tags?: StringMap[]): number | null;
```
Возвращает числовое значение метрики с именем `name` и тегами `tags`, или `null`, если метрика не существует.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
