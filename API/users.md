# Пользователи

## Интерфейс Users<a name="users"></a>
```ts
interface Users {
	modelUsersTab(): ModelUsersTab;
    workspaceUsersTab(): WorkspaceUsersTab;
}
```
Интерфейс для получения доступа к гридам пользователей в модели.

&nbsp;

```js
modelUsersTab(): ModelUsersTab;
```
Возвращает ссылку на интерфейс [`ModelUsersTab`](#model-users-tab). В интерфейсе Optimacros аналогично открытию вкладки `Центр безопасности` -> `Пользователи` -> `Пользователи модели`.

&nbsp;

```js
workspaceUsersTab(): ModelUsersTab;
```
Возвращает ссылку на интерфейс [`WorkspaceUsersTab`](#workspace-users-tab). В интерфейсе Optimacros аналогично открытию вкладки `Центр безопасности` -> `Пользователи` -> `Другие пользователи сервера`.

&nbsp;

### Интерфейс ModelUsersTab<a name="model-users-tab"></a>
```ts
interface ModelUsersTab extends Tab {
    
}
```
Вкладка `Пользователи модели`. Содержит пользователей модели и их настройки. Интерфейс наследуется от [`Tab`](./views.md#tab).
[`Grid`](./views.md#grid) данного [`Tab`](./views.md#tab) доступен только пользователям с правами моделера.

Для данного [`Tab`](./views.md#tab) недоступны методы:
- `importer()`
- `storageImporter()`

Для [`Pivot`](./views.md#интерфейс-pivot) данного [`Tab`](./views.md#tab) не работают мотоды:
- `rowsFilter()`
- `addDependentContext()`

У [`Grid`](./views.md#grid) недоступны методы:
- `storageExporter()`

Для изменения натроек пользователей нужна роль равная им или выше. (Моделер -> Администратор -> Сервисный администратор)
&nbsp;

### Интерфейс WorkspaceUsersTab<a name="workspace-users-tab"></a>
```ts
interface WorkspaceUsersTab extends Tab {
    
}
```
Вкладка `Другие пользователи сервера`. Содержит пользхователей воркспейса, у которых нет доступа к даннй модели и их настройки. Интерфейс наследуется от [`Tab`](./views.md#tab). Доступен только пользователям с правами администратора.

Для данного [`Tab`](./views.md#tab) недоступны методы:
- `importer()`
- `storageImporter()`

Для [`Pivot`](./views.md#интерфейс-pivot) данного [`Tab`](./views.md#tab) не работают мотоды:
- `rowsFilter()`
- `addDependentContext()`

&nbsp;


[API Reference](./API.md)

[Оглавление](../README.md)
