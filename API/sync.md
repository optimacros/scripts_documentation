# Синхронизация мультикубов и справочников

### Интерфейс SyncBuilder<a name="SyncBuilder"></a>
```ts
interface SyncBuilder {
	setSrcModelId(modelId: string): SyncBuilder;
	setDestModelId(modelId: string): SyncBuilder;
	setSrcEntityId(entityId: number): SyncBuilder;
	setDestEntityId(entityId: number): SyncBuilder;
	setFilters(filters: Record<string, string[]>): SyncBuilder;
	setMappings(mappings: ImportMappings): SyncBuilder;
	sync(): SyncResult;
}
```
Базовый интерфейс синхронизации, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)). Является аналогом функционала `Данные` -> `Импорт из мультикуба` интерфейса Optimacros. Все функции, кроме `sync()`, возвращают `this`.

&nbsp;

```js
setSrcModelId(modelId: string): SyncBuilder
```
Устанавливает `id` или имя модели-источника.

&nbsp;

```js
setDestModelId(modelId: string): SyncBuilder
```
Устанавливает `id` или имя модели-приёмника.

&nbsp;

```js
setSrcEntityId(entityId: number): SyncBuilder
```
Устанавливает `id` сущности-источника (например, мультикуба или справочника).

&nbsp;

```js
setDestEntityId(entityId: number): SyncBuilder
```
Устанавливает `id` сущности-приёмника (например, мультикуба или справочника).

&nbsp;

```js
setFilters(filters: Record<string, string[]>): SyncBuilder
```
Устанавливает фильтры – объект, в котором ключами являются строки с `id` измерений, а значениями – массивы строк с `id` значений фильтрации. Сейчас существует только один способ корректно сформировать этот объект: открыть вручную окно импорта из мультикуба в интерфейсе Optimacros: `Данные` -> `Импорт из мультикуба`, установить исходные модель и мультикуб, выбрать переключатель `Настраиваемый`, выбрать вручную нужные кубы и элементы измерений, нажать кнопку `Копировать параметры`, в появившемся окне `Редактор JSON` свойство `"selectedItems"` будет искомым объектом фильтров.

&nbsp;

```js
setMappings(mappings: ImportMappings): SyncBuilder
```
Устанавливает ETL меппинги через [`ImportMappings`](#ImportMappings), которые применятся при синхронизации.

&nbsp;

```js
sync(): SyncResult
```
Запускает процесс синхронизации и возвращает интерфейс результата [`SyncResult`](#SyncResult).

&nbsp;

### Интерфейс SyncMulticubeBuilder<a name="SyncMulticubeBuilder"></a>
```ts
interface SyncMulticubeBuilder extends SyncBuilder {
	setOmitEmptyRows(status: boolean): SyncMulticubeBuilder;
	setOmitSummaryRows(status: boolean): SyncMulticubeBuilder;
	setUseCodeInsteadLabel(status: boolean): SyncMulticubeBuilder;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), синхронизации мультикубов. Наследуется от [`SyncBuilder`](#SyncBuilder). Все функции возвращают `this`.

&nbsp;

```js
setOmitEmptyRows(status: boolean): SyncMulticubeBuilder
```
Устанавливает режим пропуска пустых строк. Значение по умолчанию: `false`.

&nbsp;

```js
setOmitSummaryRows(status: boolean): SyncMulticubeBuilder
```
Устанавливает режим пропуска строк, чьи элементы являются родительскими по отношению к другим. Значение по умолчанию: `false`.

&nbsp;

```js
setUseCodeInsteadLabel(status: boolean): SyncMulticubeBuilder
```
Устнавливает режим выгрузки кодов (если они есть) для заголовков и элементов измерений вместо имён. Если код отсутствует, в любом случае будет выгружаться имя. Значение по умолчанию: `true`.
 
&nbsp;

### Интерфейс SyncListBuilder<a name="SyncListBuilder"></a>
```ts
interface SyncListBuilder extends SyncBuilder {
	setViewId(viewId: number): SyncListBuilder;

	setSrcToDesListMap(map: {
		srcId: number,
		destId: number,
	}[]): SyncListBuilder;

	setProxySrcColumnDataMap(map: {
		fromName: string;
		toName: string;
	}[]): SyncListBuilder;

	setReportFileFormat(format: string): SyncListBuilder;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), синхронизации справочников. Наследуется от [`SyncBuilder`](#SyncBuilder). Все функции возвращают `this`.

&nbsp;

```js
setViewId(viewId: number): SyncListBuilder
```
Устанавливает `id` представления справочника.

&nbsp;

```js
setSrcToDesListMap(map: { 
	srcId: number,
	destId: number,
}[]): SyncListBuilder
```
Задаёт карту соответствия элементов источника элементам приёмника.

&nbsp;

```js
setProxySrcColumnDataMap(map: {
	fromName: string;
	toName: string;
}[]): SyncListBuilder
```
Задаёт карту копирования столбцов источника в столбцы приёмника.

&nbsp;

```js
setReportFileFormat(format: string): SyncListBuilder
```
Устанавливает формат файла отчёта. Возможные значения: `'XLSX'`, `'CSV'`. Значение по умолчанию: `'CSV'`.

&nbsp;

### Интерфейс SyncResult<a name="SyncResult"></a>
```ts
interface SyncResult {
	getReportPath(): string;
}
```
Интерфейс доступа к результатам синхронизации. Механизм синхронизации в процессе работы формирует файл отчёта.

&nbsp;

```js
getReportPath(): string
```
Возвращает имя файла отчёта.

&nbsp;

### Интерфейс ImportMappings<a name="ImportMappings"></a>
```ts
interface ImportMappings {
    dimensionMapping?: SimpleMapping[];
    cubeMapping?: SimpleMapping[];
    namespaceMapping?: SimpleMapping[];
    additionalDimensionMapping?: AdditionalDimensionMapping[];
    dimensionItemMapping?: DimensionItemMapping[];
}
```
Интерфейс для установки мэппингов при осуществлении синхронизации сущностей.

&nbsp;

```js
dimensionMapping?: SimpleMapping[]
```
Мэппинги димэншэнов. Являют экземпляром интерфейса [`SimpleMapping`](#SimpleMapping).

&nbsp;

```js
cubeMapping?: SimpleMapping[]
```
Мэппинги кубов. Являют экземпляром интерфейса [`SimpleMapping`](#SimpleMapping).

&nbsp;

```js
namespaceMapping?: SimpleMapping[]
```
Мэппинги нэймспэйсов. Являют экземпляром интерфейса [`SimpleMapping`](#SimpleMapping).

&nbsp;

```js
additionalDimensionMapping?: AdditionalDimensionMapping[]
```
Мэппинги дополнительных димэншэнов. Являют экземпляром интерфейса [`AdditionalDimensionMapping`](#AdditionalDimensionMapping).

&nbsp;

```js
dimensionItemMapping?: DimensionItemMapping[]
```
Мэппинги элементов димэншэнов. Являют экземпляром интерфейса [`DimensionItemMapping`](#DimensionItemMapping).

&nbsp;

### Интерфейс SimpleMapping<a name="SimpleMapping"></a>
```ts
interface SimpleMapping {
    from: string;
    to: string;
}
```
Интерфейс для установки стандартных мэппингов.

&nbsp;

### Интерфейс DimensionItemMapping<a name="DimensionItemMapping"></a>
```ts
interface DimensionItemMapping {
    dimensionName: string;
    dimensionItemMap: StringMap;
}
```
Интерфейс для установки мэппингов димэншэнов.

&nbsp;

### Интерфейс AdditionalDimensionMapping<a name="AdditionalDimensionMapping"></a>
```ts
interface AdditionalDimensionMapping {
    dimensionName: string;
    dimensionItemName: string;
}
```
Интерфейс для установки мэппингов дополнительных димэншэнов.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)