# Аудит

Аудит позволяет отследить, какие операции и кем были произведены в модели. Аудит записывается в отдельную базу данных и хранится отдельно от данных и метаданных модели. К самой модели аудит привязан по её [`идентификатору`](./common.md#model-id). Таким образом, при изменении идентификатора (разворачивании копии модели, переезде на другой сервер без полного копирования сервера) аудит **будет потерян**.

Набор событий аудита постоянно пополняется, и нужно учитывать, что документация может за этим не поспевать. Поэтому для получения актуального списка событий стоит обратиться к документации конкретной версии приложения или открыть вкладку `Центр безопасности` -> `Логи` -> `Аудит` и посмотреть в настройках фильтрации доступные типы событий. 

С точки зрения скриптов работа с аудитом — это работа с обычным [`гридом`](./views.md#grid). Фильтрация грида осуществляется — как и для других гридов — на этапе создания представления [`pivot`](./views.md#pivot). Единственным отличием является то, что для `pivot` аудита доступны дополнительные методы фильтрации, соответствующие содержанию некоторых колонок аудита.

Для ускорения получения данных рекомендуется использовать выгрузку в файл (интерфейс [Exporter](./exportImport.md#exporter)).

## Таблица событий<a name="events-table"></a>

| Наименование  | longId | Details 4 |
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
Возвращает ссылку на  интерфейс [`AuditPivot`](#audit-pivot) представления аудита.

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
Интерфейс представления аудита. Интерфейс наследуется от [`Pivot`](./views.md#pivot).

&nbsp;

```js
eventTypeFilter(data: string | number | (string | number)[]): AuditPivot
```
Фильтрует получаемые представлением строки по [типу события](#events-table). Значения можно задать следующими способами:

- `string` — название типа события,

- `number` — [`longId`](./views.md#long-id) типа события,

- `(string | number)[]` — массив (возможно, смешанный) названий и [`longId`](./views.md#long-id) типов событий.

Возвращает `this`.

&nbsp;

```js
dateFilter(beginAt?: string | number | undefined | null, endAt?:  string | number | undefined | null): AuditPivot
```
Ограничивает получаемые представлением строки временн***ы***м диапазоном. Полный список допустимых форматов даты и времени можно посмотреть [здесь](https://www.php.net/manual/ru/datetime.formats.php). Кроме того даты можно передать в формате [`UNIX`](https://ru.wikipedia.org/wiki/Unix-%D0%B2%D1%80%D0%B5%D0%BC%D1%8F). **Внимание**: воркспейс работает во временой зоне `Etc/UTC (UTC, +0000)`, и в веб-интерфейсе аудита время отображается так же. Например, число `1701317458` означает время `2023-11-30 04:10:58`. Любой параметр можно задать как `undefined` или `null` – тогда временн***о***й диапазон не будет ограничен с соответствующей стороны.

Примеры дат в виде строк:
```js
dateFilter("10 September 2023");
dateFilter("+1 week 2 days 4 hours 2 seconds");
dateFilter("last Monday");
dateFilter("2023-11-30 04:10:58");
dateFilter("2023-11-30");
```

Возвращает `this`.

&nbsp;

```js
statusFilter(status: number): AuditPivot
```
Фильтрует получаемые представлением строки по статусу. Принимает 3 значения:

- `0` – без статуса

- `1` – успех

- `2`– неудача

Возвращает `this`.

&nbsp;

```js
authorFilter(name: string): AuditPivot
```
Фильтрует получаемые представлением строки по имени автора или целевого пользователя.

Возвращает `this`.

&nbsp;

```js
detailsFilter(details4: string): AuditPivot
```
Фильтрует получаемые представлением строки по колонке `Details 4`. Функция будет работать, только если перед этим функцией `eventTypeFilter()` было произведена фильтрация по типу события, которое имеет значение в поле `Details 4`; при этом при использовании фильтрации по массиву событий достаточно, чтобы хотя бы одно упомянутое событие имело атрибут `Details 4`.

Возвращает `this`.

&nbsp;

[API Reference](./API.md)

[Оглавление](../README.md)
