# История изменений

## 24/11/2021
* В интерфейс [`Http.Response`](../API/http.md#Response) добавлены функции `getStringDataGenerator()` и `getBinaryDataGenerator()`, изменено поведение функций `getStringData()`, изменено описание функции `getStringDataLikeJson()`.
* В разделе [`Расширенные возможности`](../advancedFeatues/advancedFeatues.md) написаны пункты [`Лимиты времени и памяти`](../advancedFeatues/limits.md) и [`Блокировка модели`](../advancedFeatues/modelLock.md).
* В [`Курс молодого бойца`](../cookBook/cookBook.md) добавлены уроки по разбору скриптов [частичного копирования справочников](../cookBook/partialListCopy.md) и [свёртки справочников](../cookBook/listReduce.md).
* В план [`Курса молодого бойца`](../cookBook/cookBook.md) добавлены ещё три урока по разборам скриптов: Передача контекста, VBA Template Export, View Cleaner.
* Исправлен снимок экрана в [третьем уроке](../cookBook/cellsAccess.md) по доступу к ячейкам из Курса молодого бойца.
* Исправлены в лучшую сторону описания функций [`CubeCell`](../API/cubeCell.md#CubeCell).`getDimensionIds()`, [`CubeCell`](../API/cubeCell.md#CubeCell).`getDimensionItems()`, [`RequestManager`](../API/common.md#RequestManager).`logStatusMessage()`, [`ElementsReorder`](../API/elementsManipulator.md#ElementsReorder).`append()`.

## 27/09/2021
* Добавлен [третий урок](../cookBook/cellsAccess.md) в Курс молодого бойца.
* Сформировано содержание [Курса молодого бойца](../cookBook/cookBook.md).
* Исправлено в лучшую сторону описание функции [`NumericElementsCreator`](../API/elementsManipulator.md#NumericElementsCreator).`setPositionEnd()`.

## 20/09/2021
* Добавлены интерфейсы [`CubesTab`](../API/views.md#CubesTab), [`CustomPropertiesTab`](../API/dimensions.md#CustomPropertiesTab) и функции доступа к ним [`MulticubeTab`](../API/views.md#MulticubeTab).`cubesTab()`, [`ListTab`](../API/dimensions.md#ListTab).`customPropertiesTab()`.
* Исправлены в лучшую сторону описания функций [`GridRange`](../API/views.md#GridRange).`generator()`, [`SyncBuilder`](../API/sync.md#SyncBuilder).`setFilters()`, [`ElementsReorder`](../API/elementsManipulator.md#ElementsReorder).`append()`, [`Tab`](../API/views.md#Tab).`open()`, [`ListsTab`](../API/dimensions.md#ListsTab).`open()` и интерфейсов [`Http.UrlParams`](../API/http.md#UrlParams), [`CellBuffer`](../API/common.md#CellBuffer).

## 25/08/2021
* В интерфейс [`WinAgentBuilder`](../API/winAgent.md#WinAgentBuilder) добавлены функции: `setConnectTimeout()`, `setRequestTimeout()`, `setOperationTimeout()`.
* Добавлен функционал синхронизации мультикубов и справочников: функции `syncMulticube()` интерфейса [`Multicubes`](../API/views.md#Multicubes) и `syncList()` интерфейса [`Lists`](../API/dimensions.md#Lists), интерфейсы [`SyncBuilder`](../API/sync.md#SyncBuilder), [`SyncMulticubeBuilder`](../API/sync.md#SyncMulticubeBuilder), [`SyncListBuilder`](../API/sync.md#SyncListBuilder), [`SyncResult`](../API/sync.md#SyncResult).
* Добавлена функця `setModelId()` интерфейса [`ResultBaseAction`](../API/scriptChains.md#ResultBaseAction), позволяющая запускать скрипты из других моделей.

## 27/07/2021

* Документация ***полностью*** описывает API скриптов 1.0, [API reference](../API/API.md) состоит из описания 123 интерфейсов и 14 типов.
* [Cook book](../cookBook/cookBook.md) содержит 2 вводных урока.
* В разделе [Приложения](appendix.md) готовы разделы [Глоссарий](glossary.md), [Ограничения скриптов 1.0](constraints.md), [Эволюция скриптов 1.0](evolution.md).
* Все материалы подготовлены только на русском языке (RU).
* Изменения в скриптах фиксируются в виде буллетов для последующего описания в документации к скриптам 1.0 в топике https://rucom.optimacros.com/topic/5203/.

&nbsp;

[Приложения](appendix.md)

[Оглавление](../README.md)
