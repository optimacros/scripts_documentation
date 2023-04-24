# Api Services

### Интерфейс ApiServices<a name="apiServices"></a>
```ts
interface ApiServices {
    apiServicesTab(): ApiServicesTab;
}

```
Интерфейс для работы с `Api Services`.

&nbsp;

```js
apiServicesTab(): ApiServicesTab
```
Возвращает ссылку на вкладку управления (создания, сортировки, удаления) элементами списка `Api Services`.
!!!В интерфейсе Optimacros эта вкладка не реализована, доступна только в скриптах.

&nbsp;

### Интерфейс ApiServicesTab<a name="apiServicesTab"></a>
```ts
interface ApiServicesTab extends Tab {
}
```
Вкладка `Api Services`. Интерфейс наследуется от [`Tab`](./views.md#tab). Для работы не требует открытия.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
