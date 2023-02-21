# Доступ к измерениям в строках, столбцах и фильтрах

Для выполнения этого задания понадобится тестовая модель и тестовый мультикуб, который нужно создать, если модель пуста.

В этом упражнении в качестве примера будет использоваться модель `FinMod_Parking (Exp)`, работа будет вестись с мультикубом `Условия и расчёты`

![Скрин МК Условия и расчёты](./pic/rcf_MKUiR.png)

## Доступ к измерениям в строках

Сначала скрипту необходимо открыть мультикуб. Скрипт начинает свой путь с переменной [om](../API/API.md#OM), обращаясь к свойствам для углубления в модель. Для того, чтобы с помощью скрипта найти раздел `Данные` -> `Мультикубы`, используется интерфейс [Multicubes](../API/views.md#Multicubes). Для перехода в этот раздел необходимо вызвать функцию `multicubesTab()`. Результат сохраняется в константу `multicubesTab`:

```js
const multicubesTab = om.multicubes.multicubesTab();
```

Таким образом, с помощью скрипта будет доступен список мультикубов модели. Теперь для того, чтобы выбрать интересующий мультикуб, необходимо вызвать функцию `open()` из интерфейса [MulticubesTab](../API/views.md#MulticubesTab) и в качестве аргумента указать имя мультикуба, с которым мы хотим работать. Для удобства можно сохранить открытый мультикуб в константу `multicubeTab`. Теперь код выглядит так:

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');
```

После того, как макрос открыл мультикуб, ему нужно понять, как именно расположить измерения, либо выбрать представление, в котором уже сохранено расположение измерений. Однако в скриптах 1.0 есть только [один способ](../appendix/constraints.md#pivot) получить доступ к представлению мультикуба.

Чтобы открыть представление, нужно вызвать функцию `pivot()` из интерфейса [Tab](../API/views.md#Tab). В этом примере использутеся представление `Условия и расчёты 3`, которое сохранено в константе `pivot`:

```js
const pivot = multicubeTab.pivot('Условия и расчёты 3');
```
После выбора представления следует обратиться к таблице с данными. Для этого следует использовать функцию `create()` интерфейса [Pivot](../API/views.md#Pivot). Ссылкф на таблицу сохранена в константу `grid`:

```js
const pivot = multicubeTab.pivot('Условия и расчёты 3');
const grid =  pivot.create();
```

Для проверки корректности выполненных действий можно количество строк с помощью функции `rowCount()` интерфейса [Grid](../API/views.md#Grid):

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');

const pivot = multicubeTab.pivot('Условия и расчёты 3');
const grid =  pivot.create();

console.log(`Rows: ${grid.rowCount()} \n`);
```

Здесь стоит обратить внимание, что функция `console.log()` [не переносит курсор](../appendix/constraints.md#noLineBreak) на следующую строку, и это необходимо делать вручную.

В реузльтате рыботы скрипта получаем искомое количество строк:

![364 строки в МК Условия и расчёты](./pic/rcf_RowsMK.png)

Для получения названия названий измерений, которые указаны в строках, необходимо сохранить информацию об измерениях в константу `definitionInfo` с помощью функции `getDefinitionInfo()`, вызванной на `grid` и создать пустой список `rowDimensionNames`, который далее будет заполнен наименованиями измерений:

```js
const definitionInfo =  grid.getDefinitionInfo();
let rowDimensionNames = [];
```

Для того, чтобы просмотреть измерения, используемые в строках таблицы, нужно вызвать функцию `getRowDimensions()` интерфейса [GridDefinitionInfo](../API/views.md#GridDefinitionInfo). Эта функция обратится к измерениям на строках и вернёт их в виде массива (для тестовой таблицы массив будет содержать два элемента: `Кубы`, `s.Тип парковки`):

![Строчные измерения вьюхи Условия и расчёты 3](./pic/rcf_RowMeasuresMK.png)

Для перебора массива можно воспользоваться [forEach()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

Для того, чтобы в `entity` получить сущность [EntityInfo](../API/views.md#EntityInfo) измерения, необходимо вызвать функцию `getDimensionEntity()` интерфейса [GridDimension](../API/views.md#GridDimension). После чего добавить все названия измерений с помощью [push()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/push) в созданный нами ранее список `rowDimensionNames`. Осталось лишь написать вывод информации о количестве измерений:

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

Для получения названи1 измерений в столбцах, используется аналогичная механика. Можно воспользоваться уже написаным выше скриптом и дописать пару строк.

Чтобы получить измерения в столбцах, следует воспользоваться функцией `getColumnDimensions()` интерфейса [GridDefinitionInfo](../API/views.md#GridDefinitionInfo):

```js
let columnDimensionNames = [];
definitionInfo.getColumnDimensions().forEach(gridDimension => {
    const entity = gridDimension.getDimensionEntity();
    columnDimensionNames.push(entity.name());
});
```

Добавим вывод `columnDimensionNames`, и тогда скрипт примет следующий вид:

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

Чтобы получить доступ к измерениям в фильтрах, необходимо использовать немного усложнённую механику. Результат будет сохранён в массив `pageSelectedNames`. Для получения интерфейса с данными об измерениях в фильтрах представления нужно вызвать функцию `getPageSelectors()` интерфейса [GridDefinitionInfo](../API/views.md#GridDefinitionInfo):

```js
let pageSelectedNames = [];
definitionInfo.getPageSelectors().forEach(pageSelector => {
    const dimensionEntity = pageSelector.getDimensionEntity();
});
```
А теперь отличие от двух предыдущих пунктов. Помимо наименований измерений в фильтрах, необходимо также получить информацию о выбранном элементе в фильтре. Для этого используется функция `getSelectedEntity()` (интерфейс [GridPageSelector](../API/views.md#GridPageSelector)):

```js
let pageSelectedNames = [];
definitionInfo.getPageSelectors().forEach(pageSelector => {
    const dimensionEntity = pageSelector.getDimensionEntity();
    const selectedEntity = pageSelector.getSelectedEntity();
});
```

Далее добавляется информация по каждому измерению и выбранному элементу в этом измерении в массив `pageSelectedNames`:

```js
const pageSelectedNames = [];
definitionInfo.getPageSelectors().forEach(pageSelector => {
    const dimensionEntity = pageSelector.getDimensionEntity();
    const selectedEntity = pageSelector.getSelectedEntity();
    pageSelectedNames.push(`${dimensionEntity.name()} (${selectedEntity.name()})`);
});
```

После добавления строки с выводом `pageSelectedNames`, скрипт будет выглядеть так:

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

Всё сделано верно, но после `Filter dimensions:` пустота. Так как в фильтрах на этом представлении нет измерений, следовательно, скрипт выводит пустой массив:

![Измерения в фильтрах МК условия и расчёты](./pic/rcf_FilterMeasuresMK.png)

Для проверки работоспособности кода следует запустить скрипт на представлении, в котором есть измерения в фильтрах. В качестве тестового измерения использовалось представление `Условия и расчёты 2`:

![Скрин измерений в фильтрах 2](./pic/rcf_FilterMeasuresMK2.png)

В результате данные в `Filter dimensions` появились:

![Измерения в фильтрах МК условия и расчёты 2, скрипт](./pic/rcf_FiltersReady2.png)

Необходимо заметить, что на столбцах появилось измерение `'Empty 1 0'`, хотя в представлении измерений на столбцах нет. Подробнее про это можно прочитать [здесь](../appendix/constraints.md#flatTable).

[Курс молодого бойца](cookBook.md)

[Оглавление](../README.md)

