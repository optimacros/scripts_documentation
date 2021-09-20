# Измерения

### Интерфейс Lists<a name="Lists"></a>
```ts
interface Lists {
	listsTab(): ListsTab;
	syncList(): SyncListBuilder;
}
```
Интерфейс работы со справочниками.

&nbsp;

```js
listsTab(): ListsTab
```
Возвращает ссылку на интерфейс [`ListsTab`](#ListsTab). В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Справочники`.

&nbsp;

```js
syncList(): SyncListBuilder
```
Возвращает интерфейс [`SyncListBuilder`](./sync.md#SyncListBuilder) синхронизации справочников.

&nbsp;

### Интерфейс ListsTab<a name="ListsTab"></a>
```ts
interface ListsTab extends Tab {
	open(name: string): ListTab;
}
```
Интерфейс для получения ссылки на [`ListTab`](#ListTab). Интерфейс наследуется от [`Tab`](./views.md#Tab). Несмотря на это, функция `open()` **не реализована**.

&nbsp;

```js
open(name: string): ListTab
```
Возвращает ссылку на [`ListTab`](#ListTab) справочника `name`. В интерфейсе Optimacros аналогично открытию вкладки справочника `name`.

&nbsp;

### Интерфейс ListTab<a name="ListTab"></a>
```ts
interface ListTab extends Tab {
	listSubsetTab(): ListSubsetsTab;
	customPropertiesTab(): CustomPropertiesTab;
	importer(): ListImporter;
}
```
Вкладка справочника. Интерфейс наследуется от [`Tab`](./views.md#Tab).

&nbsp;

```js
listSubsetTab(): ListSubsetsTab
```
Возвращает ссылку на интерфейс [`ListSubsetsTab`](#ListSubsetsTab). В интерфейсе Optimacros аналогично открытию вкладки `Выборки` справочника `name`.

&nbsp;
```js
customPropertiesTab(): CustomPropertiesTab
```
Возвращает интерфейс [`CustomPropertiesTab`](#CustomPropertiesTab) доступа к свойствам справочников.

&nbsp;

```js
importer(): ListImporter
```
Возвращает интерфейс [`ListImporter`](#ListImporter) для импорта данных в справочник.

&nbsp;

### Интерфейс ListSubsetsTab<a name="ListSubsetsTab"></a>
```ts
interface ListSubsetsTab extends Tab {
	listTab(): ListTab;
}
```
Вкладка `Выборки` справочника. Интерфейс наследуется от [`Tab`](./views.md#Tab). В отличие от аналогичной вкладки в интерфейсе Optimacros, её [`Grid`](./views.md#Grid) не имеет ни измерений на столбцах, ни ячеек; доступ можно получить только к заголовкам строк, являющихся названиями выборок справочника.

&nbsp;

```js
listTab(): ListTab
```
Возвращает интерфейс [`ListTab`](#ListTab) вкладки того справочника, чьи выборки представляет собой `this`.

&nbsp;
### Интерфейс CustomPropertiesTab<a name="CustomPropertiesTab"></a>
```ts
interface CustomPropertiesTab extends Tab {
}
```
Интерфейс доступа к свойствам справочника. В интерфейсе Optimacros аналогично открытию вкладки `Свойства` справочника. Наследуется от интерфейса [`Tab`](./views.md#Tab). Реализован только метод [`pivot()`](./views.md#Tab.pivot), с помощью которого можно получить доступ на чтение и запись ячеек, но не на добавление/удаление/перемещение свойств.

&nbsp;

### Интерфейс ListImporter<a name="ListImporter"></a>
```ts
interface ListImporter extends Importer {
	setFilePath(path: string): ListImporter;
	setObligatoryListCodes(obligatoryListCodes: boolean): ListImporter;
	getObligatoryListCodes(): boolean;
	setImportToChildListOnly(importToChildListOnly: boolean): ListImporter;
	getImportToChildListOnly(): boolean;
	setUpdatedPropertiesOnParentLevels(updatedPropertiesOnParentLevels: boolean): ListImporter;
	getUpdatedPropertiesOnParentLevels(): boolean;
}
```
Интерфейс импорта в справочник. Интерфейс наследуется от [`Importer`](./exportImport.md#Importer).

&nbsp;

```js
setFilePath(path: string): ListImporter
```
Устанавливает имя импортируемого файла. Возвращает `this`.

&nbsp;

```js
setObligatoryListCodes(obligatoryListCodes: boolean): ListImporter
```
Устанавливает режим обязательных кодов: если столбец `Code` у элемента пустой, то несуществуещие элементы не будут создаваться, но уже существующие тем не менее будут обновлены. Значение по умолчанию: `false`. Возвращает `this`.

&nbsp;

```js
getObligatoryListCodes(): boolean
```
Возвращает признак режима обязательных кодов.

&nbsp;

```js
setImportToChildListOnly(importToChildListOnly: boolean): ListImporter
```
Устанавливает режим обновления свойств `Parent` и `Code` для элементов только текущего справочника. Если аргумент `importToChildListOnly === false`, эти свойства будут обновляться также и у родительских справочников любого уровня. Значение по умолчанию: `false`. Возвращает `this`.

&nbsp;

```js
getImportToChildListOnly(): boolean
```
Возвращает признак режима обновления свойств `Parent` и `Code` для элементов только текущего справочника.

&nbsp;

```js
setUpdatedPropertiesOnParentLevels(updatedPropertiesOnParentLevels: boolean): ListImporter
```
Устанавливает режим обновления собственных свойств для элементов родительских справочников. Значение по умолчанию: `true`. Возвращает `this`.

&nbsp;

```js
getUpdatedPropertiesOnParentLevels(): boolean
```
Возвращает признак режима обновления собственных свойств для элементов родительских справочников.

&nbsp;

### Интерфейс Versions<a name="Versions"></a>
```ts
interface Versions {
	versionsTab(): VersionsTab
}
```
Интерфейс для получения ссылки на [`VersionsTab`](#VersionsTab).

&nbsp;

```js
versionsTab(): VersionsTab
```
Возвращает ссылку на вкладку [`VersionsTab`](#VersionsTab) настроек версий. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Версии`.

&nbsp;

### Интерфейс VersionsTab<a name="VersionsTab"></a>
```ts
interface VersionsTab extends Tab {
	copyVersion(from: string, to: string): Object;
}
```
Вкладка `Версии`. Интерфейс наследуется от [`Tab`](./views.md#Tab). Для работы не требует открытия.

&nbsp;

```js
copyVersion(from: string, to: string): Object
```
Копирует срез по версии `from` в срез по версии `to` во всех мультикубах модели, которые имеют измерение версий, включающее обе эти версии. Возвращает объект вида `{"success": true}`.

&nbsp;

### Интерфейс Times<a name="Times"></a>
```ts
interface Times {
	optionsTab(): TimeOptionsTab;
}
```
Интерфейс для получения ссылки на [`TimeOptionsTab`](#TimeOptionsTab).

&nbsp;

```js
optionsTab(): TimeOptionsTab
```
Возвращает ссылку на вкладку [`TimeOptionsTab`](#TimeOptionsTab) настроек времени. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Время`.

&nbsp;

### Интерфейс TimeOptionsTab<a name="TimeOptionsTab"></a>
```ts
interface TimeOptionsTab {
	resetForm(): Object;
	applyForm(): Object;
}
```
Вкладка `Время`. Для работы не требует открытия. Является [`плоской таблицей`](../appendix/constraints.md#flatTable). Кроме того, является формой, аналогичной форме HTML: после изменения значений ячейки/ячеек требуется ещё вызвать функцию `applyForm()` для применения новых данных к модели.

&nbsp;

```js
resetForm(): Object
```
Сбрасывает все изменения данных во вкладке. Возвращает объект вида `{"success": true}`.

&nbsp;

```js
applyForm(): Object
```
Применяет все изменения данных. Возвращает объект вида `{"success": true}`.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
