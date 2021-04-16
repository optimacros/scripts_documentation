# Представления Optimacros

1. [Представления мультикубов, справочников, версий](#views)
1. [Экспорт из мультикубов и справочников](#export)
1. [Импорт в мультикубы и справочники](#import)
1. [Обновление клеток мультикубов через формулу](#update)
1. [Получение клеток куба с помощью формулы](#get)
1. [Копирование срезов кубов](#copy)

## Представления мультикубов, справочников, версий<a name="views"></a>

### Интерфейс Multicubes
```ts
interface Multicubes {
    multicubesTab(): MulticubesTab;
}
```
Интерфейс для получения ссылки на `MulticubesTab`.

&nbsp;

```js
multicubesTab(): MulticubesTab
```
Возвращает ссылку на `MulticubesTab`. В интерфейсе Optimacros аналогично открытию таба "Мультикубы".

### Интерфейс MulticubesTab
```ts
interface MulticubesTab extends Tab {
    open(name: string): MulticubeTab;
}
```
Интерфейс для получения ссылки на `MulticubeTab`.

&nbsp;

```js
open(name: string): MulticubeTab
}
```
Возвращает ссылку на `MulticubeTab` куба `name`. В интерфейсе Optimacros аналогично открытию таба мультикуба `name`.

## Экспорт из мультикубов и справочников<a name="export"></a>
## Импорт в мультикубы и справочники<a name="import"></a>
## Обновление клеток мультикубов через формулу<a name="update"></a>
## Получение клеток куба с помощью формулы<a name="get"></a>
## Копирование срезов кубов<a name="copy"></a>




[API Reference](API_reference.md)

[Оглавление](../README.md)