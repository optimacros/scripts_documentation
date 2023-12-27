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

	elementsCreator(): ElementsCreator;
	elementsDeleter(): ElementsDeleter;
	elementsReorder(): ElementsReorder;
}
```
Вкладка `Справочники`. Интерфейс наследуется от [`Tab`](./views.md#tab).

&nbsp;

```js
open(name: string): ListTab
```
Возвращает ссылку на [`ListTab`](#list-tab) справочника `name`. Если такой справочник отсутствует, бросает исключение. В интерфейсе Optimacros аналогично открытию вкладки справочника `name`.

&nbsp;

```js
elementsCreator(): ElementsCreator
```
Возвращает ссылку на [`ElementsCreator`](./elementsManipulator.md#elements-creator) для добавления справочников.

&nbsp;

```js
elementsDeleter(): ElementsDeleter
```
Возвращает ссылку на [`ElementsDeleter`](./elementsManipulator.md#elements-deleter) для удаления справочников.

&nbsp;

```js
elementsReorder(): ElementsReorder
```
Возвращает ссылку на [`ElementsReorder`](./elementsManipulator.md#elements-reorder) для тасования справочников.

&nbsp;

### Интерфейс ListTab<a name="list-tab"></a>
```ts
interface ListTab extends Tab {
	listSubsetTab(): ListSubsetsTab;
	customPropertiesTab(): CustomPropertiesTab;
	uamTab(): ListUserAccessTab;

	elementsCreator(): ElementsCreator;
	elementsDeleter(): ElementsDeleter;
	elementsReorder(): ElementsReorder;

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
elementsCreator(): ElementsCreator
```
Возвращает ссылку на [`ElementsCreator`](./elementsManipulator.md#elements-creator) для добавления элементов.

&nbsp;

```js
elementsDeleter(): ElementsDeleter
```
Возвращает ссылку на [`ElementsDeleter`](./elementsManipulator.md#elements-deleter) для удаления элементов.

&nbsp;

```js
elementsReorder(): ElementsReorder
```
Возвращает ссылку на [`ElementsReorder`](./elementsManipulator.md#elements-reorder) для тасования элементов.

&nbsp;

```js
importer(): ListImporter
```
Возвращает интерфейс [`ListImporter`](./exportImport.md#list-importer) для импорта данных в справочник.

&nbsp;

### Интерфейс ListSubsetsTab<a name="list-subsets-tab"></a>
```ts
interface ListSubsetsTab extends Tab {
	listTab(): ListTab;

	elementsCreator(): ElementsCreator;
	elementsDeleter(): ElementsDeleter;
	elementsReorder(): ElementsReorder;
}
```
Вкладка `Выборки` справочника. Интерфейс наследуется от [`Tab`](./views.md#tab). В отличие от аналогичной вкладки в интерфейсе Optimacros, её [`Grid`](./views.md#grid) не имеет ни измерений на столбцах, ни ячеек; доступ можно получить только к заголовкам строк, являющихся названиями выборок справочника.

&nbsp;

```js
listTab(): ListTab
```
Возвращает интерфейс [`ListTab`](#list-tab) вкладки того справочника, чьи выборки представляет собой `this`.

&nbsp;

```js
elementsCreator(): ElementsCreator
```
Возвращает ссылку на [`ElementsCreator`](./elementsManipulator.md#elements-creator) для добавления выборок.

&nbsp;

```js
elementsDeleter(): ElementsDeleter
```
Возвращает ссылку на [`ElementsDeleter`](./elementsManipulator.md#elements-deleter) для удаления выборок.

&nbsp;

```js
elementsReorder(): ElementsReorder
```
Возвращает ссылку на [`ElementsReorder`](./elementsManipulator.md#elements-reorder) для тасования выборок.

&nbsp;

### Интерфейс CustomPropertiesTab<a name="custom-properties-tab"></a>
```ts
interface CustomPropertiesTab extends Tab {
	elementsCreator(): ElementsCreator;
	elementsDeleter(): ElementsDeleter;
	elementsReorder(): ElementsReorder;
}
```
Интерфейс доступа к свойствам справочника. В интерфейсе Optimacros аналогично открытию вкладки `Свойства` справочника. Наследуется от интерфейса [`Tab`](./views.md#tab).

&nbsp;

```js
elementsCreator(): ElementsCreator
```
Возвращает ссылку на [`ElementsCreator`](./elementsManipulator.md#elements-creator) для добавления свойств.

&nbsp;

```js
elementsDeleter(): ElementsDeleter
```
Возвращает ссылку на [`ElementsDeleter`](./elementsManipulator.md#elements-deleter) для удаления свойств.

&nbsp;

```js
elementsReorder(): ElementsReorder
```
Возвращает ссылку на [`ElementsReorder`](./elementsManipulator.md#elements-reorder) для тасования свойств.

&nbsp;

### Интерфейс ListUserAccessTab<a name="list-user-access-tab"></a>
```ts
interface ListUserAccessTab extends Tab {
}
```
Интерфейс доступа к UAM (МДП) элементов справочника. В интерфейсе Optimacros аналогично открытию вкладки `UAM`/`МДП` справочника. Наследуется от интерфейса [`Tab`](./views.md#tab). Реализован только метод [`pivot()`](./views.md#tab.pivot), с помощью которого можно получить доступ на чтение и запись ячеек.

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

	elementsCreator(): ElementsCreator;
	elementsDeleter(): ElementsDeleter;
	elementsReorder(): ElementsReorder;

	importer(): VersionsImporter;
}
```
Вкладка `Версии`. Интерфейс наследуется от [`Tab`](./views.md#tab). Для работы не требует открытия.

&nbsp;

```js
copyVersion(from: string, to: string): Object
```
Копирует срез по версии `from` в срез по версии `to` во всех мультикубах модели, которые имеют измерение версий, включающее обе эти версии. Возвращает объект вида `{"success": true}`.

&nbsp;

```js
elementsCreator(): ElementsCreator
```
Возвращает ссылку на [`ElementsCreator`](./elementsManipulator.md#elements-creator) для добавления элементов.

&nbsp;

```js
elementsDeleter(): ElementsDeleter
```
Возвращает ссылку на [`ElementsDeleter`](./elementsManipulator.md#elements-deleter) для удаления элементов.

&nbsp;

```js
elementsReorder(): ElementsReorder
```
Возвращает ссылку на [`ElementsReorder`](./elementsManipulator.md#elements-reorder) для тасования элементов.

&nbsp;

```js
importer(): VersionsImporter
```
Возвращает интерфейс [`VersionsImporter`](./exportImport.md#versions-importer) импорта данных в системный справочник версий.

&nbsp;

### Интерфейс VersionSubsetsTab<a name="version-subsets-tab"></a>
```ts
interface VersionSubsetsTab extends Tab {
	elementsCreator(): ElementsCreator;
	elementsDeleter(): ElementsDeleter;
	elementsReorder(): ElementsReorder;
}
```
Вкладка `Выборки` версий. Интерфейс наследуется от [`Tab`](./views.md#tab). Для работы не требует открытия.

&nbsp;

```js
elementsCreator(): ElementsCreator
```
Возвращает ссылку на [`ElementsCreator`](./elementsManipulator.md#elements-creator) для добавления выборок.

&nbsp;

```js
elementsDeleter(): ElementsDeleter
```
Возвращает ссылку на [`ElementsDeleter`](./elementsManipulator.md#elements-deleter) для удаления выборок.

&nbsp;

```js
elementsReorder(): ElementsReorder
```
Возвращает ссылку на [`ElementsReorder`](./elementsManipulator.md#elements-reorder) для тасования выборок.

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
	importer(): TimePeriodImporter;
}
```
Вкладка выбранного измерения времени. Интерфейс наследуется от [`Tab`](./views.md#tab). Для работы не требует открытия. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Время` -> `identifier`.

&nbsp;

```js
subsetsTab(): TimePeriodSubsetTab;
```
Возвращает ссылку на вкладку [`TimePeriodSubsetTab`](#time-period-subset-tab) выборок выбранного измерения времени. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Время` -> `{выбранное измерение времени}` -> `Выборки`.

&nbsp;

```js
importer(): TimePeriodImporter
```
Возвращает ссылку на интерфейс импорта [`TimePeriodImporter`](./exportImport.md#time-period-importer).

&nbsp;

### Интерфейс TimePeriodSubsetTab<a name="time-period-subset-tab"></a>
```ts
export interface TimePeriodSubsetTab extends Tab {
	elementsCreator(): ElementsCreator;
	elementsDeleter(): ElementsDeleter;
	elementsReorder(): ElementsReorder;
}
```
Интерфейс доступа к вкладке `Выборки` выбранного измерения времени. Интерфейс наследуется от [`Tab`](./views.md#tab). Для работы не требует открытия. В интерфейсе Optimacros аналогично открытию вкладки `Измерения` -> `Время` -> `{выбранное измерение времени}` -> `Выборки`.

&nbsp;

```js
elementsCreator(): ElementsCreator
```
Возвращает ссылку на [`ElementsCreator`](./elementsManipulator.md#elements-creator) для добавления выборок.

&nbsp;

```js
elementsDeleter(): ElementsDeleter
```
Возвращает ссылку на [`ElementsDeleter`](./elementsManipulator.md#elements-deleter) для удаления выборок.

&nbsp;

```js
elementsReorder(): ElementsReorder
```
Возвращает ссылку на [`ElementsReorder`](./elementsManipulator.md#elements-reorder) для тасования выборок.

&nbsp;

## Интерфейс Audit<a name="audit"></a>
```ts
interface Audit {
	auditTab(): AuditTab
}
```
Интерфейс аудита.

&nbsp;

```js
auditTab(): AuditTab
```
Возвращает ссылку на интерфейс [`AuditTab`](#audit-tab). В интерфейсе Optimacros аналогично открытию вкладки `Центр безопасности` -> `Логи` -> `Аудит`.

&nbsp;

### Интерфейс AuditTab<a name="audit-tab"></a>
```ts
interface AuditTab extends Tab {
	pivot(): AuditPivot
}
```
Вкладка `Аудит`. Интерфейс наследуется от [`Tab`](./views.md#tab).

&nbsp;

```js
pivot(): AuditPivot
```
Возвращает ссылку на объект [`AuditPivot`](#audit-pivot) представления Аудита.

&nbsp;

### Интерфейс AuditPivot<a name="audit-pivot"></a>
```ts
interface AuditPivot extends Pivot {
    	eventTypeFilter(data: string[] | string | number | number[]): AuditPivot
    	dateFilter(beginAt?: string | number | undefined | null, endAt?:  string | number | undefined | null): AuditPivot
    	statusFilter(status: number): AuditPivot
    	authorFilter(name: string): AuditPivot
    	detailsFilter(details4: string): AuditPivot
}
```
Интерфейс представления Аудита. Интерфейс наследуется от [`Pivot`](./views.md#pivot).

&nbsp;

```js
eventTypeFilter(data: string[] | string | number | number[]): AuditPivot
```
Позволяет ограничить отображаемые строки по типу события аудита заданными значениями. Значения можно задать следующими способами:

`string` — название типа события;

`string[]` — массив названий типов событий;

`number` — [`longId`](#long-id) типа события;

`number[]` — массив [`longId`](#long-id) типов событий.

Таблица событий:

| name  | longId |
|-------|--------|
| Client Auth | 119000000001 |
| User Model Change Role | 119000000002 |
| Cube Cell Value Change | 119000000003 |
| Create Model Backup Point | 119000000004 |
| Delete Model Backup Point | 119000000005 |
| Erase Model Backup Point | 119000000006 |
| Revert Model Backup Point | 119000000007 |
| Report Export | 119000000008 |
| Export Model Backup Point | 119000000009 |
| File Download | 119000000010 |
| Formula Change | 119000000011 |
| User Ban Status Change | 119000000012 |
| Script Change | 119000000013 |
| Script Add | 119000000014 |
| Script Delete | 119000000015 |
| Script Rename | 119000000016 |
| Audit Records Cleaned | 119000000017 |

Примеры передач:
```
om.audit.auditTab().pivot().eventTypeFilter("Script Change").create(); // передача в виде строки
om.audit.auditTab().pivot().eventTypeFilter(119000000011).create(); // передача в виде longId
om.audit.auditTab().pivot().eventTypeFilter(["Script Change", 119000000011]).create(); // передача в виде множества
```

Возвращает `this`.

&nbsp;

```js
dateFilter(beginAt?: string | number | undefined | null, endAt?:  string | number | undefined | null): AuditPivot
```
Позволяет ограничить отображаемые строки по дате в диапазоне от и до. Полный список допустимых форматов даты и времени можно посмотреть здесь - [Форматы даты и времени](https://www.php.net/manual/ru/datetime.formats.php#datetime.formats.time). Так же даты можно передать в виде Unix time значения. **Внимание**, воркспейс работает во временой зоне: `Etc/UTC (UTC, +0000)`, следовательно в веб-интерфейсе в аудите, время отображается в **UTC+0**. На это стоит делать поправку при передаче в Unix Time. Например число `1701317458` будет считаться как `2023-11-30 04:10:58`. Параметры можно указать как `undefined` или `null` и не задавать интервал «с — до»

Примеры дат в виде строк:
```
...dateFilter("10 September 2023");
...dateFilter("+1 week 2 days 4 hours 2 seconds");
...dateFilter("last Monday");
...dateFilter("2023-11-30 04:10:58");
...dateFilter("2023-11-30");
```

Возвращает `this`.

&nbsp;

```js
statusFilter(status: number): AuditPivot
```
Позволяет ограничить отображаемые строки по статусу. Принимает 3 значения

`0` - Без статуса,

`1` - Успех,

`2`- Неудача,

Возвращает `this`.

&nbsp;

```js
authorFilter(name: string): AuditPivot
```
Позволяет ограничить отображаемые строки по имени автора или целевого пользователя.

Возвращает `this`.

&nbsp;

```js
detailsFilter(details4: string): AuditPivot
```
Позволяет ограничить отображаемые строки по колонке **Details4**. Функция будет работать, только если перед этим было произведено ограничение по типу события `Изменение значения клетки`.

Возвращает `this`.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
