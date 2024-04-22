# Синхронизация мультикубов и справочников

## Интерфейс SyncBuilder<a name="sync-builder"></a>
```ts
interface SyncBuilder {
	setSrcModelId(modelId: string): this;
	setDestModelId(modelId: string): this;
	setSrcEntityId(entityId: number): this;
	setDestEntityId(entityId: number): this;
	setFilters(filters: Record<string, string[]>): this;
	setMappings(mappings: ImportMappings): this;
	sync(): SyncResult;
}
```
Базовый интерфейс синхронизации, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)). Является аналогом функционала `Данные` -> `Импорт из мультикуба` интерфейса Optimacros. Все функции, кроме `sync()`, возвращают `this`.

&nbsp;

```js
setSrcModelId(modelId: string): this;
```
Устанавливает `id` или имя модели-источника.

&nbsp;

```js
setDestModelId(modelId: string): this;
```
Устанавливает `id` или имя модели-приёмника.

&nbsp;

```js
setSrcEntityId(entityId: number): this;
```
Устанавливает `id` сущности-источника (например, мультикуба или справочника).

&nbsp;

```js
setDestEntityId(entityId: number): this;
```
Устанавливает `id` сущности-приёмника (например, мультикуба или справочника).

&nbsp;

```js
setFilters(filters: Record<string, string[]>): this;
```
Устанавливает фильтры – объект, в котором ключами являются строки с `id` измерений, а значениями – массивы строк с `id` значений фильтрации. Сейчас существует только один способ корректно сформировать этот объект: открыть вручную окно импорта из мультикуба в интерфейсе Optimacros: `Данные` -> `Импорт из мультикуба`, установить исходные модель и мультикуб, выбрать переключатель `Настраиваемый`, выбрать вручную нужные кубы и элементы измерений, нажать кнопку `Копировать параметры`, в появившемся окне `Редактор JSON` свойство `'selectedItems'` будет искомым объектом фильтров.

&nbsp;

```js
setMappings(mappings: ImportMappings): this;
```
Устанавливает ETL маппинги через [`ImportMappings`](#import-mappings), которые применятся при синхронизации.

&nbsp;

```js
sync(): SyncResult;
```
Запускает процесс синхронизации и возвращает интерфейс результата [`SyncResult`](#sync-result).

&nbsp;

### Интерфейс SyncMulticubeBuilder<a name="sync-multicube-builder"></a>
```ts
interface SyncMulticubeBuilder extends SyncBuilder {
	setOmitEmptyRows(status: boolean): this;
	setOmitSummaryRows(status: boolean): this;
	setUseCodeInsteadLabel(status: boolean): this;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), синхронизации мультикубов. Наследуется от [`SyncBuilder`](#sync-builder). Все функции возвращают `this`.

&nbsp;

```js
setOmitEmptyRows(status: boolean): this;
```
Устанавливает режим пропуска пустых строк. Значение по умолчанию: `false`.

&nbsp;

```js
setOmitSummaryRows(status: boolean): this;
```
Устанавливает режим пропуска строк, чьи элементы являются родительскими по отношению к другим. Значение по умолчанию: `false`.

&nbsp;

```js
setUseCodeInsteadLabel(status: boolean): this;
```
Устанавливает режим выгрузки кодов (если они есть) для заголовков и элементов измерений вместо имён. Если код отсутствует, в любом случае будет выгружаться имя. Значение по умолчанию: `true`.

&nbsp;

### Интерфейс SyncListBuilder<a name="sync-list-builder"></a>
```ts
interface SyncListBuilder extends SyncBuilder {
	setViewId(viewId: number): this;

	setSrcToDesListMap(map: {
		sourceListLongId: number,
	 	destinationListLongId: number,
	}[]): this;

	setProxySrcColumnDataMap(map: {
		fromName: string;
		toName: string;
	}[]): this;

	setReportFileFormat(format: string): this;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), синхронизации справочников. Наследуется от [`SyncBuilder`](#sync-builder). Все функции возвращают `this`.

&nbsp;

```js
setViewId(viewId: number): this;
```
Устанавливает `id` представления справочника-источника. Получить `id` можно только в `КОПИРОВАТЬ ПАРАМЕТРЫ` при интерфейсной настройке импорта. Нужно открыть вручную окно импорта из справочника в интерфейсе Optimacros: `Данные` -> `Импорт из справочника`, установить исходные модель и справочник, перейти на вкладку `Расширенные`, включить опцию `Использовать Представление` и выбрать нужное представление из списка. Далее нажать кнопку `КОПИРОВАТЬ ПАРАМЕТРЫ`, в появившемся окне `Редактор JSON` свойство `"sourceListViewLongId"` будет содержать `id` представления.

&nbsp;

```js
setSrcToDesListMap(map: { 
	sourceListLongId: number,
	destinationListLongId: number,
}[]): this;
```
Задаёт карту отношений справочников источника к справочникам приёмника, что необходимо при импорте в справочник, дочерний по отношению к другому справочнику. Необходимо указывать только родительские уровни. Сами указанные справочники не будут изменены (для этого нужно отдельно делать в них импорт), но таким образом можно обновить вводимые свойства и сабсеты родительских элементов в дочернем справочнике.

&nbsp;

```js
setProxySrcColumnDataMap(map: {
	fromName: string;
	toName: string;
}[]): this;
```
Задаёт карту копирования столбцов источника в столбцы приёмника. Если наименования столбцов приемника не отличаются от источника, то значения в них будут перенесены автоматически, даже если они не заданы в карте. 

&nbsp;

```js
setReportFileFormat(format: string): this;
```
Устанавливает формат файла отчёта. Возможные значения: `'XLSX'`, `'CSV'`. Значение по умолчанию: `'CSV'`.

&nbsp;

### Интерфейс SyncResult<a name="sync-result"></a>
```ts
interface SyncResult {
	getReportPath(): string;
}
```
Интерфейс доступа к результатам синхронизации. Механизм синхронизации в процессе работы формирует файл отчёта.

&nbsp;

```js
getReportPath(): string;
```
Возвращает имя файла отчёта.

&nbsp;

### Интерфейс ImportMappings<a name="import-mappings"></a>
```ts
interface ImportMappings {
    dimensionMapping?: SimpleMapping[];
    cubeMapping?: SimpleMapping[];
    namespaceMapping?: SimpleMapping[];
    additionalDimensionMapping?: AdditionalDimensionMapping[];
    dimensionItemMapping?: DimensionItemMapping[];
}
```
Интерфейс для установки маппингов при осуществлении синхронизации сущностей.

&nbsp;

```js
dimensionMapping?: SimpleMapping[];
```
Маппинг измерений. Является экземпляром интерфейса [`SimpleMapping`](#simple-mapping).

&nbsp;

```js
cubeMapping?: SimpleMapping[];
```
Маппинг кубов. Является экземпляром интерфейса [`SimpleMapping`](#simple-mapping).

&nbsp;

```js
namespaceMapping?: SimpleMapping[];
```
Маппинг пространств имен. Является экземпляром интерфейса [`SimpleMapping`](#simple-mapping).

&nbsp;

```js
additionalDimensionMapping?: AdditionalDimensionMapping[];
```
Маппинг дополнительных измерений. Является экземпляром интерфейса [`AdditionalDimensionMapping`](#additional-dimension-mapping).

&nbsp;

```js
dimensionItemMapping?: DimensionItemMapping[];
```
Маппинг элементов измерений. Является экземпляром интерфейса [`DimensionItemMapping`](#dimension-item-mapping).

&nbsp;

### Интерфейс SimpleMapping<a name="simple-mapping"></a>
```ts
interface SimpleMapping {
    from: string;
    to: string;
}
```
Интерфейс для установки стандартных маппингов.

&nbsp;

### Интерфейс DimensionItemMapping<a name="dimension-item-mapping"></a>
```ts
interface DimensionItemMapping {
    dimensionName: string;
    dimensionItemMap: StringMap;
}
```
Интерфейс для установки маппингов измерений.

&nbsp;

### Интерфейс AdditionalDimensionMapping<a name="additional-dimension-mapping"></a>
```ts
interface AdditionalDimensionMapping {
    dimensionName: string;
    dimensionItemName: string;
}
```
Интерфейс для установки маппингов дополнительных измерений.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
