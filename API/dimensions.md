# Измерения

## Интерфейс Lists<a name="lists"></a>
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
Возвращает ссылку на интерфейс [`ListsTab`](#lists-tab). В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Справочники`.

&nbsp;

```js
syncList(): SyncListBuilder
```
Возвращает интерфейс [`SyncListBuilder`](./sync.md#sync-list-builder) синхронизации справочников.

&nbsp;

### Интерфейс ListsTab<a name="lists-tab"></a>
```ts
interface ListsTab extends Tab {
	open(name: string): ListTab;
}
```
Интерфейс для получения ссылки на [`ListTab`](#list-tab). Интерфейс наследуется от [`Tab`](./views.md#tab). Несмотря на это, функция `open()` **не реализована**.

&nbsp;

```js
open(name: string): ListTab
```
Возвращает ссылку на [`ListTab`](#list-tab) справочника `name`. Если такой справочник отсутствует, бросает исключение. В интерфейсе Optimacros аналогично открытию вкладки справочника `name`.

&nbsp;

### Интерфейс ListTab<a name="list-tab"></a>
```ts
interface ListTab extends Tab {
	listSubsetTab(): ListSubsetsTab;
	customPropertiesTab(): CustomPropertiesTab;
	uamTab(): ListUserAccessTab;
	importer(): ListImporter;
}
```
Вкладка справочника. Интерфейс наследуется от [`Tab`](./views.md#tab).

&nbsp;

```js
listSubsetTab(): ListSubsetsTab
```
Возвращает ссылку на интерфейс [`ListSubsetsTab`](#list-subsets-tab). В интерфейсе Optimacros аналогично открытию вкладки `Выборки` справочника `name`.

&nbsp;
```js
customPropertiesTab(): CustomPropertiesTab
```
Возвращает интерфейс [`CustomPropertiesTab`](#custom-properties-tab) доступа к свойствам справочников.

&nbsp;
```js
uamTab(): ListUserAccessTab;
```
Возвращает интерфейс [`ListUserAccessTab`](#list-user-access-tab) доступа к управлению UAM (МДП) элементов справочника.

&nbsp;

```js
importer(): ListImporter
```
Возвращает интерфейс [`ListImporter`](#list-importer) для импорта данных в справочник.

&nbsp;

### Интерфейс ListSubsetsTab<a name="list-subsets-tab"></a>
```ts
interface ListSubsetsTab extends Tab {
	listTab(): ListTab;
}
```
Вкладка `Выборки` справочника. Интерфейс наследуется от [`Tab`](./views.md#tab). В отличие от аналогичной вкладки в интерфейсе Optimacros, её [`Grid`](./views.md#grid) не имеет ни измерений на столбцах, ни ячеек; доступ можно получить только к заголовкам строк, являющихся названиями выборок справочника.

&nbsp;

```js
listTab(): ListTab
```
Возвращает интерфейс [`ListTab`](#list-tab) вкладки того справочника, чьи выборки представляет собой `this`.

&nbsp;

### Интерфейс CustomPropertiesTab<a name="custom-properties-tab"></a>
```ts
interface CustomPropertiesTab extends Tab {
}
```
Интерфейс доступа к свойствам справочника. В интерфейсе Optimacros аналогично открытию вкладки `Свойства` справочника. Наследуется от интерфейса [`Tab`](./views.md#tab). Реализован только метод [`pivot()`](./views.md#tab.pivot), с помощью которого можно получить доступ на чтение и запись ячеек, но не на добавление/удаление/перемещение свойств.

&nbsp;
### Интерфейс ListUserAccessTab<a name="list-user-access-tab"></a>
```ts
interface ListUserAccessTab extends Tab {
}
```
Интерфейс доступа к UAM (МДП) элементов справочника. В интерфейсе Optimacros аналогично открытию вкладки `UAM`/`МДП` справочника. Наследуется от интерфейса [`Tab`](./views.md#tab). Реализован только метод [`pivot()`](./views.md#tab.pivot), с помощью которого можно получить доступ на чтение и запись ячеек.

&nbsp;

### Интерфейс ListImporter<a name="list-importer"></a>
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
Интерфейс импорта в справочник. Интерфейс наследуется от [`Importer`](./exportImport.md#importer).

&nbsp;

```js
setFilePath(path: string): ListImporter
```
Устанавливает имя импортируемого файла. Возвращает `this`.

&nbsp;

```js
setObligatoryListCodes(obligatoryListCodes: boolean): ListImporter
```
Устанавливает режим обязательных кодов: если столбец `Code` у элемента пустой, то несуществующие элементы не будут создаваться, но уже существующие тем не менее будут обновлены. Значение по умолчанию: `false`. Возвращает `this`.

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

### Интерфейс Versions<a name="versions"></a>
```ts
interface Versions {
	versionsTab(): VersionsTab;
	versionSubsetsTab(): VersionSubsetsTab;
}
```
Интерфейс работы с версиями.

&nbsp;

```js
versionsTab(): VersionsTab
```
Возвращает ссылку на вкладку [`VersionsTab`](#versions-tab) настроек версий. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Версии`.

&nbsp;

```js
versionSubsetsTab(): VersionSubsetsTab
```
Возвращает ссылку на вкладку [`VersionSubsetsTab`](#version-subsets-tab) выборок версий. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Версии` -> `Выборки`.

&nbsp;

### Интерфейс VersionsTab<a name="versions-tab"></a>
```ts
interface VersionsTab extends Tab {
	copyVersion(from: string, to: string): Object;
}
```
Вкладка `Версии`. Интерфейс наследуется от [`Tab`](./views.md#tab). Для работы не требует открытия.

&nbsp;

```js
copyVersion(from: string, to: string): Object
```
Копирует срез по версии `from` в срез по версии `to` во всех мультикубах модели, которые имеют измерение версий, включающее обе эти версии. Возвращает объект вида `{"success": true}`.

&nbsp;

### Интерфейс VersionSubsetsTab<a name="version-subsets-tab"></a>
```ts
interface VersionSubsetsTab extends Tab {
}
```
Вкладка `Выборки` версий. Интерфейс наследуется от [`Tab`](./views.md#tab). Для работы не требует открытия.

&nbsp;

### Интерфейс Times<a name="times"></a>
```ts
interface Times {
	optionsTab(): TimeOptionsTab;
        timePeriodTab(identifier: string | number): TimePeriodTab;
}
```
Интерфейс для получения доступа к настройкам и гридам измерений времени.

&nbsp;

```js
optionsTab(): TimeOptionsTab
```
Возвращает ссылку на вкладку [`TimeOptionsTab`](#time-options-tab) настроек времени. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Время`.

&nbsp;

```js
timePeriodTab(identifier: string | number): TimePeriodTab;
```
Возвращает ссылку на вкладку [`TimePeriodTab`](#time-period-tab) измерения времени `identifier`. Доступны измерения `Days`, `Weeks`, `Periods`, `Months`, `Quarters`, `Half Years`, `Years`. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Время` -> `identifier`.

&nbsp;

### Интерфейс TimeOptionsTab<a name="time-options-tab"></a>
```ts
interface TimeOptionsTab {
	resetForm(): Object;
	applyForm(): Object;
}
```
Вкладка `Время`. Для работы не требует открытия. Является [`плоской таблицей`](../appendix/constraints.md#flat-table). Кроме того, является формой, аналогичной форме HTML: после изменения значений ячейки/ячеек требуется ещё вызвать функцию `applyForm()` для применения новых данных к модели.

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

### Интерфейс TimePeriodTab<a name="time-period-tab"></a>
```ts
export interface TimePeriodTab extends Tab {
    subsetsTab(): TimePeriodSubsetTab;
}
```
Вкладка выбранного измерения времени. Интерфейс наследуется от [`Tab`](./views.md#tab). Для работы не требует открытия. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Время` -> `identifier`.

&nbsp;

```js
subsetsTab(): TimePeriodSubsetTab;
```
Возвращает ссылку на вкладку [`TimePeriodSubsetTab`](#time-period-subset-tab) выборок выбранного измерения времени. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Время` -> `{выбранное измерение времени}` -> `Выборки`.
&nbsp;

### Интерфейс TimePeriodSubsetTab<a name="time-period-subset-tab"></a>
```ts
export interface TimePeriodSubsetTab extends Tab {

}
```
Интерфейс доступа к вкладке `Выборки` выбранного измерения времени. Интерфейс наследуется от [`Tab`](./views.md#tab). Для работы не требует открытия. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Время` -> `{выбранное измерение времени}` -> `Выборки`.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
