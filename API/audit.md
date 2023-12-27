# Аудит

Аудит позволяет отследить, какие операции и кем были произведены в рамках данной модели. Аудит записывается в отдельную базу данных и хранится раздельно с данными и метаданными модели. К самой модели аудит привязан по её идентификатору. Таким образом, при изменении идентификатора (разворачивании копии модели, переезде на другой сервер без полного копирования сервера) аудит **будет потерян**.

Набор событий аудита постоянно пополняется и нужно учитывать, что данная документация может за этим не поспевать. Поэтому для получения актуального списка событий стоит обратиться к документации конкретной версии приложения или — проще — открыть вкладку `Центр безопасности` -> `Логи` -> `Аудит` и посмотреть в настройках фильтрации достунпные типы событий. 

С точки зрения скриптов, работа с аудитом — это работа с обычным гридом (плоской таблицей). Фильтрация грида осуществляется — как и для других гридов — на этапе создания `pivot` (представления), единственным отличием является то, что для `pivot` аудита доступны дополнительные методы фильтрации, соответствующие содержанию колонок аудита.

Для ускорения получения данных рекомендуется использовать выгрузку в файл (интерфейс [Exporter](./exportImport.md#интерфейс-exporter)).

## Таблица событий:

| Наименование  | longId | Details4 |
|-------|--------|--------|
| Client Auth | 119000000001 | |
| User Model Change Role | 119000000002 | |
| Cube Cell Value Change | 119000000003 | ✓ |
| Create Model Backup Point | 119000000004 | |
| Delete Model Backup Point | 119000000005 | |
| Erase Model Backup Point | 119000000006 | |
| Revert Model Backup Point | 119000000007 | |
| Report Export | 119000000008 | |
| Export Model Backup Point | 119000000009 | |
| File Download | 119000000010 | |
| Formula Change | 119000000011 | ✓ |
| User Ban Status Change | 119000000012 | |
| Script Change | 119000000013 | |
| Script Add | 119000000014 | |
| Script Delete | 119000000015 | |
| Script Rename | 119000000016 | |
| Audit Records Cleaned | 119000000017 | |

## Интерфейс Audit<a name="audit"></a>
```ts
interface Audit {
	auditTab(): AuditTab;
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
	pivot(): AuditPivot;
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
    	eventTypeFilter(data: string | number | (string | number)[]): AuditPivot;
    	dateFilter(beginAt?: string | number | undefined | null, endAt?:  string | number | undefined | null): AuditPivot;
    	statusFilter(status: number): AuditPivot;
    	authorFilter(name: string): AuditPivot;
    	detailsFilter(details4: string): AuditPivot;
}
```
Интерфейс представления Аудита. Интерфейс наследуется от [`Pivot`](./views.md#pivot).

&nbsp;

```js
eventTypeFilter(data: string[] | string | number | number[]): AuditPivot
```
Позволяет ограничить отображаемые строки по типу события аудита заданными значениями. Значения можно задать следующими способами:

- `string` — название типа события,

- `number` — [`longId`](#long-id) типа события,

- `(string | number)[]` — массив (возможно, смешанный) названий и [`longId`](#long-id) типов событий.

Примеры передачи:
```js
// передача в виде строки
om.audit.auditTab().pivot().eventTypeFilter("Script Change").create();
// передача в виде longId
om.audit.auditTab().pivot().eventTypeFilter(119000000011).create(); 
// передача в виде множества
om.audit.auditTab().pivot().eventTypeFilter(["Script Change", 119000000011]).create(); 
```

Возвращает `this`.

&nbsp;

```js
dateFilter(beginAt?: string | number | undefined | null, endAt?:  string | number | undefined | null): AuditPivot
```
Позволяет ограничить отображаемые строки по дате в диапазоне от и до. Полный список допустимых форматов даты и времени можно посмотреть здесь - [Форматы даты и времени](https://www.php.net/manual/ru/datetime.formats.php#datetime.formats.time). Так же даты можно передать в виде `Unix time` значения. **Внимание**, воркспейс работает во временой зоне `Etc/UTC (UTC, +0000)`, следовательно, в веб-интерфейсе в аудите, время отображается в **UTC+0**. На это стоит делать поправку при передаче в `Unix Time`. Например число `1701317458` будет считаться как `2023-11-30 04:10:58`. Параметры можно указать как `undefined` или `null` и не задавать интервал «с — до», а ограничится только стартом или завершением.

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
Позволяет ограничить отображаемые строки по статусу. Принимает 3 значения:

- `0` - без статуса,

- `1` - успех,

- `2`- неудача,

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
Позволяет ограничить отображаемые строки по колонке **Details4**. Функция будет работать, только если перед этим было произведено ограничение по типу события, которое имеет **Details4**. При использовании фильтрации по массиву, достаточно, чтобы хотя бы одно упомянутое событие имело аттрибут **Details4**.

Возвращает `this`.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
