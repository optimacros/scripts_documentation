# Синхронизация мультикубов и справочников

### Интерфейс SyncBuilder<a name="SyncBuilder"></a>
```ts
interface SyncBuilder {
	/**
	 * @param modelId Source model string identifier or name
	 */
	setSrcModelId(modelId: string): SyncBuilder;

	/**
	 * @param modelId Destination model string identifier or name
	 */
	setDestModelId(modelId: string): SyncBuilder;

	/**
	 * @param entityId Source entity identifier
	 */
	setSrcEntityId(entityId: number): SyncBuilder;

	/**
	 * @param entityId Destination entity identifier
	 */
	setDestEntityId(entityId: number): SyncBuilder;

	setFilters(filters: Record<string, string[]>): SyncBuilder;

	sync(): SyncResult;
}
```

&nbsp;

```js
setSrcModelId(modelId: string): SyncBuilder
```

&nbsp;

```js
setDestModelId(modelId: string): SyncBuilder
```

&nbsp;

```js
setSrcEntityId(entityId: number): SyncBuilder
```

&nbsp;

```js
setDestEntityId(entityId: number): SyncBuilder
```

&nbsp;

```js
setFilters(filters: Record<string, string[]>): SyncBuilder
```

&nbsp;

```js
sync(): SyncResult
```

&nbsp;


### Интерфейс SyncMulticubeBuilder<a name="SyncMulticubeBuilder"></a>
```ts
interface SyncMulticubeBuilder extends SyncBuilder {
	setOmitEmptyRows(status: boolean): SyncMulticubeBuilder;
	setOmitSummaryRows(status: boolean): SyncMulticubeBuilder;
	setUseCodeInsteadLabel(status: boolean): SyncMulticubeBuilder;
}
```
Интерфейс, реализующий шаблон проектирования [`строитель`](https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%80%D0%BE%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_(%D1%88%D0%B0%D0%B1%D0%BB%D0%BE%D0%BD_%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)), для синхронизации мультикубов. Наследуется от [`SyncBuilder`](#SyncBuilder). Все функции возвращают `this`.

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

    /**
     * @param format Values: XLSX|CSV, Default: CSV
     */
    setReportFileFormat(format: string): SyncListBuilder;
}

interface SyncResult {
    getReportPath(): string;
}


[API Reference](API.md)

[Оглавление](../README.md)