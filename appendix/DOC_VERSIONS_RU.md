# История изменений

## 24/11/2021
* В интерфейс [`Http.Response`](../API/http.md#response) добавлены функции `getStringDataGenerator()` и `getBinaryDataGenerator()`, изменено поведение функции `getStringData()`, изменено описание функции `getStringDataLikeJson()`.
* В разделе [`Расширенные возможности`](../advancedFeatues/advancedFeatues.md) написаны пункты [`Лимиты времени и памяти`](../advancedFeatues/limits.md) и [`Блокировка модели`](../advancedFeatues/modelLock.md).
* В [`Курс молодого бойца`](../cookBook/cookBook.md) добавлены уроки по разбору скриптов [`частичного копирования справочников`](../cookBook/partialListCopy.md) и [`свёртки справочников`](../cookBook/listReduce.md).
* В план [`Курса молодого бойца`](../cookBook/cookBook.md) добавлены ещё три урока по разборам скриптов: Передача контекста, VBA Template Export, View Cleaner.
* Исправлен снимок экрана в [третьем уроке](../cookBook/cellsAccess.md) по доступу к ячейкам из Курса молодого бойца.
* Исправлены в лучшую сторону описания функций [`CubeCell`](../API/cubeCell.md#cube-cell).`getDimensionIds()`, [`CubeCell`](../API/cubeCell.md#cube-cell).`getDimensionItems()`, [`RequestManager`](../API/common.md#request-manager).`logStatusMessage()`, [`ElementsReorder`](../API/elementsManipulator.md#elements-reorder).`append()`.

## 27/09/2021
* Добавлен [третий урок](../cookBook/cellsAccess.md) в Курс молодого бойца.
* Сформировано содержание [Курса молодого бойца](../cookBook/cookBook.md).
* Исправлено в лучшую сторону описание функции [`NumericElementsCreator`](../API/elementsManipulator.md#numeric-elements-creator).`setPositionEnd()`.

## 20/09/2021
* Добавлены интерфейсы [`CubesTab`](../API/views.md#cubes-tab), [`CustomPropertiesTab`](../API/dimensions.md#custom-properties-tab) и функции доступа к ним [`MulticubeTab`](../API/views.md#multicube-tab).`cubesTab()`, [`ListTab`](../API/dimensions.md#list-tab).`customPropertiesTab()`.
* Исправлены в лучшую сторону описания функций [`GridRange`](../API/views.md#grid-range).`generator()`, [`SyncBuilder`](../API/sync.md#sync-builder).`setFilters()`, [`ElementsReorder`](../API/elementsManipulator.md#elements-reorder).`append()`, [`Tab`](../API/views.md#tab).`open()`, [`ListsTab`](../API/dimensions.md#lists-tab).`open()` и интерфейсов [`Http.UrlParams`](../API/http.md#url-params), [`CellBuffer`](../API/common.md#cell-buffer).

## 25/08/2021
* В интерфейс [`WinAgentBuilder`](../API/winAgent.md#win-agent-builder) добавлены функции: `setConnectTimeout()`, `setRequestTimeout()`, `setOperationTimeout()`.
* Добавлен функционал синхронизации мультикубов и справочников: функции `syncMulticube()` интерфейса [`Multicubes`](../API/views.md#multicubes) и `syncList()` интерфейса [`Lists`](../API/dimensions.md#lists), интерфейсы [`SyncBuilder`](../API/sync.md#sync-builder), [`SyncMulticubeBuilder`](../API/sync.md#sync-multicube-builder), [`SyncListBuilder`](../API/sync.md#sync-list-builder), [`SyncResult`](../API/sync.md#sync-result).
* Добавлена функця `setModelId()` интерфейса [`ResultBaseAction`](../API/scriptChains.md#result-base-action), позволяющая запускать скрипты из других моделей.

## 27/07/2021

* Документация ***полностью*** описывает API скриптов 1.0, [API reference](../API/API.md) состоит из описания 123 интерфейсов и 14 типов.
* [Cook book](../cookBook/cookBook.md) содержит 2 вводных урока.
* В разделе [Приложения](appendix.md) готовы разделы [Глоссарий](glossary.md), [Ограничения скриптов 1.0](constraints.md), [Эволюция скриптов 1.0](evolution.md).
* Все материалы подготовлены только на русском языке (RU).
* Изменения в скриптах фиксируются в виде буллетов для последующего описания в документации к скриптам 1.0 в топике https://rucom.optimacros.com/topic/5203/.

&nbsp;

[Приложения](appendix.md)

[Оглавление](../README.md)
