# Пользователи

## Интерфейс Users<a name="users"></a>
```ts
interface Users {
	modelUsersTab(): ModelUsersTab;
    	workspaceUsersTab(): WorkspaceUsersTab;
}
```
Интерфейс для получения доступа к гридам пользователей.

&nbsp;

```js
modelUsersTab(): ModelUsersTab;
```
Возвращает ссылку на интерфейс [`ModelUsersTab`](#model-users-tab). В интерфейсе Optimacros аналогично открытию вкладки `Центр безопасности` -> `Пользователи`.

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
Вкладка `Пользователи модели`. Интерфейс наследуется от [`Tab`](./views.md#tab).

&nbsp;

### Интерфейс ModelUsersTab<a name="model-users-tab"></a>
```ts
interface WorkspaceUsersTab extends Tab {
    
}
```
Вкладка `Другие пользователи сервера`. Интерфейс наследуется от [`Tab`](./views.md#tab). Доступен только пользователям с правами администратора.

&nbsp;


[API Reference](./API.md)

[Оглавление](../README.md)
