# Доступ к измерениям в строках, столбцах и фильтрах

Для выполнения этого задания понадобится тестовая модель и тестовый мультикуб, который нужно создать, если модель пуста.

В этом упражнении в качестве примера будет использоваться модель `FinMod_Parking (Exp)`, работа будет вестись с мультикубом `Условия и расчёты`

![Скрин МК Условия и расчёты](./pic/rcf_MKUiR.png)

## Доступ к измерениям в строках

В первую очередь скрипт должен открыть мультикуб. Скрипт начинает работу с объявления переменной [om](../API/API.md#OM), обращаясь к ее интерфейсам для получения элементов модели. Для того, чтобы с помощью скрипта найти раздел `Данные` -> `Мультикубы`, используется интерфейс [Multicubes](../API/views.md#Multicubes). Аналогично переходу в раздел `Мультикубы` можно вызвать функцию `multicubesTab()`. Результат сохраняется в константу `multicubesTab`:

```js
const multicubesTab = om.multicubes.multicubesTab();
```

Таким образом, с помощью скрипта будет доступен список мультикубов модели. Теперь для того, чтобы выбрать интересующий мультикуб, необходимо вызвать функцию `open()` из интерфейса [MulticubesTab](../API/views.md#MulticubesTab) и в качестве аргумента указать имя мультикуба, с которым необходимо работать. Для удобства можно сохранить открытый мультикуб в константу `multicubeTab`. Теперь код выглядит так:

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');
```

После того, как макрос открыл мультикуб, необходимо получить информацию об используемых измерениях, либо выбрать представление, в котором уже сохранено расположение измерений. Однако в скриптах 1.0 на текущий момент есть только [один способ](../appendix/constraints.md#pivot) получить доступ к представлению мультикуба.

Чтобы открыть представление, нужно вызвать функцию `pivot()` из интерфейса [MulticubesTab](../API/views.md#MulticubesTab). В этом примере использутеся представление `Условия и расчёты 3`, которое сохраняется в константу `pivot`:

```js
const pivot = multicubeTab.pivot('Условия и расчёты 3');
```

После выбора представления следует обратиться к таблице с данными. Для этого следует использовать функцию `create()` интерфейса [Pivot](../API/views.md#Pivot). Ссылка на таблицу сохраняется в константу `grid`:

```js
const pivot = multicubeTab.pivot('Условия и расчёты 3');
const grid =  pivot.create();
```

Для проверки корректности выполненных действий можно вывести количество строк с помощью функции `rowCount()` интерфейса [Grid](../API/views.md#Grid):

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');

const pivot = multicubeTab.pivot('Условия и расчёты 3');
const grid =  pivot.create();

console.log(`Rows: ${grid.rowCount()} \n`);
```

Здесь стоит обратить внимание, что функция `console.log()` [не переносит курсор](../appendix/constraints.md#noLineBreak) на следующую строку после вывода сообщения. Для перевода строки следует добавить в строку сообщения спецсимволы перевода каретки `\n`.

В результате работы скрипта получаем вывод искомого количества строк:

![364 строки в МК Условия и расчёты](./pic/rcf_RowsMK.png)

Для получения названий измерений, которые указаны в строках, необходимо сохранить информацию об измерениях в константу `definitionInfo` с помощью функции `getDefinitionInfo()`, вызванной из `grid`. Также нужжно создать пустой список `rowDimensionNames`, который далее будет заполнен наименованиями измерений:

```js
const definitionInfo =  grid.getDefinitionInfo();
let rowDimensionNames = [];
```

Для просмотра измерений, используемых в строках таблицы, нужно вызвать функцию `getRowDimensions()` интерфейса [GridDefinitionInfo](../API/views.md#GridDefinitionInfo). Функция обратится к измерениям в строках и вернёт их в виде массива (для тестовой таблицы массив будет содержать два элемента: `Кубы`, `s.Тип парковки`):

![Строчные измерения вьюхи Условия и расчёты 3](./pic/rcf_RowMeasuresMK.png)

Для перебора элементов массива можно воспользоваться [forEach()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

Для того, чтобы в константу `entity` получить сущность [EntityInfo](../API/views.md#EntityInfo) измерения, необходимо вызвать функцию `getDimensionEntity()` интерфейса [GridDimension](../API/views.md#GridDimension). После чего добавить все названия измерений с помощью [push()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/push) в созданный ранее список `rowDimensionNames`. Полный текст скрипта с выводом информации о количестве измерений:

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');

const pivot = multicubeTab.pivot('Условия и расчёты 3');
const grid =  pivot.create();

console.log(`Rows: ${grid.rowCount()} \n`);
console.log(`Columns: ${grid.columnCount()} \n`);

const definitionInfo = grid.getDefinitionInfo();
let rowDimensionNames = [];
definitionInfo.getRowDimensions().forEach(gridDimension => {
    const entity = gridDimension.getDimensionEntity();
    rowDimensionNames.push(entity.name());
});

console.log(`Row dimensions: ${rowDimensionNames.join(', ')} \n`);
```

Результат работы скрипта:

![Строчные измерения МК Условия и расчёты](./pic/rcf_RowsReady.png)

## Доступ к измерениям в столбцах

Для получения названий измерений в столбцах, используется аналогичный механизм. Можно воспользоваться уже написаным выше скриптом и дополнить код.

Для получения измерений в столбцах, следует воспользоваться функцией `getColumnDimensions()` интерфейса [GridDefinitionInfo](../API/views.md#GridDefinitionInfo):

```js
let columnDimensionNames = [];
definitionInfo.getColumnDimensions().forEach(gridDimension => {
    const entity = gridDimension.getDimensionEntity();
    columnDimensionNames.push(entity.name());
});
```

Полный текст скрипта с выводом массива `columnDimensionNames`:

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');

const pivot = multicubeTab.pivot('Условия и расчёты 3');
const grid =  pivot.create();

console.log(`Rows: ${grid.rowCount()} \n`);
console.log(`Columns: ${grid.columnCount()} \n`);

const definitionInfo =  grid.getDefinitionInfo();
let rowDimensionNames = [];
definitionInfo.getRowDimensions().forEach(gridDimension => {
    const entity = gridDimension.getDimensionEntity();
    rowDimensionNames.push(entity.name());
});

console.log(`Row dimensions: ${rowDimensionNames.join(', ')} \n`);

let columnDimensionNames = [];
definitionInfo.getColumnDimensions().forEach(gridDimension => {
    const entity = gridDimension.getDimensionEntity();
    columnDimensionNames.push(entity.name());
});

console.log(`Column dimensions: ${columnDimensionNames.join(', ')} \n`);
```

Результат работы скрипта:

![Измерения в столбцам МК условия и расчёты](./pic/rcf_ColumnsReady.png)

## Доступ к измерениям в фильтрах

Для получения доступа к измерениям в фильтрахиспользуется более сложный алгоритм. Результат сохраняется в массив `pageSelectedNames`. Для получения интерфейса с данными об измерениях в фильтрах представления нужно вызвать функцию `getPageSelectors()` интерфейса [GridDefinitionInfo](../API/views.md#GridDefinitionInfo):

```js
let pageSelectedNames = [];
definitionInfo.getPageSelectors().forEach(pageSelector => {
    const dimensionEntity = pageSelector.getDimensionEntity();
});
```

Далее следует отличие от двух предыдущих пунктов. Помимо наименований измерений в фильтрах, необходимо также получить информацию о выбранном элементе в фильтре. Для этого используется функция `getSelectedEntity()` интерфейса [GridPageSelector](../API/views.md#GridPageSelector):

```js
let pageSelectedNames = [];
definitionInfo.getPageSelectors().forEach(pageSelector => {
    const dimensionEntity = pageSelector.getDimensionEntity();
    const selectedEntity = pageSelector.getSelectedEntity();
});
```

Потом добавляется информация по каждому измерению и выбранному элементу в этом измерении, в массив `pageSelectedNames`:

```js
const pageSelectedNames = [];
definitionInfo.getPageSelectors().forEach(pageSelector => {
    const dimensionEntity = pageSelector.getDimensionEntity();
    const selectedEntity = pageSelector.getSelectedEntity();
    pageSelectedNames.push(`${dimensionEntity.name()} (${selectedEntity.name()})`);
});
```

Полный текст скрипта, с выводом массива `pageSelectedNames`:

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');

const pivot = multicubeTab.pivot('Условия и расчёты 3');
const grid = pivot.create();

console.log(`Rows: ${grid.rowCount()} \n`);
console.log(`Columns: ${grid.columnCount()} \n`);

const definitionInfo =  grid.getDefinitionInfo();
const rowDimensionNames = [];
definitionInfo.getRowDimensions().forEach(gridDimension => {
    const entity = gridDimension.getDimensionEntity();
    rowDimensionNames.push(entity.name());
});

console.log(`Row dimensions: ${rowDimensionNames.join(', ')} \n`);

const columnDimensionNames = [];
definitionInfo.getColumnDimensions().forEach(gridDimension => {
    const entity = gridDimension.getDimensionEntity();
    columnDimensionNames.push(entity.name());
});

console.log(`Column dimensions: ${columnDimensionNames.join(', ')} \n`);

const pageSelectedNames = [];
definitionInfo.getPageSelectors().forEach(pageSelector => {
    const dimensionEntity = pageSelector.getDimensionEntity();
    const selectedEntity = pageSelector.getSelectedEntity();
    pageSelectedNames.push(`${dimensionEntity.name()} (${selectedEntity.name()})`);
});

console.log(`Filter dimensions: ${pageSelectedNames.join(', ')} \n`);
```

Результат работы скрипта:

![Измерения в фильтрах МК условия и расчёты, скрипт](./pic/rcf_FiltersReady.png)

В выводе скрипта после фразы `Filter dimensions:` отсутствуют названия измерений. Так как в фильтрах на этом представлении нет измерений, следовательно, скрипт выводит пустой массив:

![Измерения в фильтрах МК условия и расчёты](./pic/rcf_FilterMeasuresMK.png)

Для проверки работоспособности кода следует запустить скрипт на представлении, в котором есть измерения в фильтрах. В качестве тестируемого объекта использовалось представление `Условия и расчёты 2`:

![Скрин измерений в фильтрах 2](./pic/rcf_FilterMeasuresMK2.png)

В результате работы скрипта выполнен вывод измерений в фильтрах после фразы `Filter dimensions`:

![Измерения в фильтрах МК условия и расчёты 2, скрипт](./pic/rcf_FiltersReady2.png)

Необходимо заметить, что в выводе измерений столбцов `Column dimensions` появилось измерение `'Empty 1 0'`, хотя в представлении МК измерений на столбцах нет. Подробнее про это можно прочитать [здесь](../appendix/constraints.md#flatTable).

[Курс молодого бойца](cookBook.md)

[Оглавление](../README.md)

