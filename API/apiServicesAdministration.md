# Api Services

### Интерфейс ApiServices<a name="api-services"></a>
```ts
interface ApiServices {
	apiServicesTab(): ApiServicesTab;
}

```
Интерфейс для работы с `Api Services`. Так как управление веб-сервисами воркспейса доступно только администраторам воркспейса, то этот интерфейс также требует прав администратора воркспейса для использования.

&nbsp;

```js
apiServicesTab(): ApiServicesTab;
```
Возвращает ссылку на вкладку управления (создания, сортировки, удаления) элементами списка `Api Services` — списка веб-сервисов воркспейса, доступного в панели администратора воркспейса.

Работать с [`apiServicesTab()`](#api-services-tab) необходимо **вне** контекста модели, т.е. перед вызовом нужно выполнить [`om.common.modelInfo().unlock()`](./common.md#model-info.unlock).

&nbsp;

### Интерфейс ApiServicesTab<a name="api-services-tab"></a>
```ts
interface ApiServicesTab extends Tab {
	elementsCreator(): NamedElementsCreator;
	elementsDeleter(): ElementsDeleter;
}
```
Вкладка `Api Services`. Интерфейс наследуется от [`Tab`](./views.md#tab). Для работы не требует открытия.

&nbsp;

```js
elementsCreator(): NamedElementsCreator;
```
Возвращает ссылку на [`ElementsCreator`](./elementsManipulator.md#elements-creator) для добавления апи сервисов.

&nbsp;

```js
elementsDeleter(): ElementsDeleter;
```
Возвращает ссылку на [`ElementsDeleter`](./elementsManipulator.md#elements-deleter) для удаления апи сервисов.

&nbsp;

[API Reference](API.md)

[Оглавление](../README.md)
