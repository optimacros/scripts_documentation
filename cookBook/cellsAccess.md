# Способы доступа к ячейкам

## Доступ к заголовкам строк

Для получения наименований заголовков строк необходимо обратиться к таблице представления мультикуба и последовательно перебрать каждое наименование строки таблицы.

По аналогии с предыдущим уроком для получения доступа к ячейкам представления мультикуба необходимо открыть раздел мультикубов, выбрать один из доступных, указать необходимое представление и обратиться к таблице с данными:

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');

const pivot = multicubeTab.pivot('Условия и расчёты 3');
const grid = pivot.create();

const range = grid.range();
const generator = range.generator();
```

Для получения данных из таблицы представления мультикуба используется функция `range()` интерфейса [Grid](../API/views.md#Grid). Она выбирает некоторый диапазон таблицы представления мультикуба, и если не передавать в неё аргументы, то будет выбирать всю таблицу.

На данном этапе ещё нет запроса доступа данных к указанному диапазону, и переменная `range` не содержит в себе значений клеток. Чтобы их получить, необходимо вызвать функцию-генератор  `generator()` – интерфейса [GridRange](../API/views.md#GridRange). Т. к. среда Оptimacros расчитана на работу с объектами, содержащими большие объёмы данных, запрос на получение этих данных реализован покусочно. Функция-генератор возвращает куски [GridRangeChunk](../API/views.md#GridRangeChunk) представления таблицы, с которыми можно работать в цикле.

В зависимости от представления (количества измерений в строках) логика получения данных заголовков строк будет разной. Далее разобраны два случая: первый, когда в измерениях строк одно измерение, и второй, когда измерений несколько.

### Одно измерение в строках

Настройки представления отображения мультикуба:

![Сводная таблица с одним измерением в строках](./pic/ca_DimensionRow.png)

Представление таблицы мультикуба:

![Вид таблицы мультикуба с одним измерением](./pic/ca_Table1.png)

Функция `rows()`, вызванная на куске [`chunk`](../API/views.md#GridRangeChunk) выбранного диапазона, который был указан в переменной `range`, позволяет получить доступ к заголовкам строк. Для получения полного массива заголовков строк в представлении следует вызвать функцию `all()` интерфейса [Labels](../API/views.md#Labels) и перебирать элементы полученного массива данных с помощью [`forEach()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

При переборе элементов необходимо задать аргумент `labelsGroup` функции `forEach`, вызвать функцию `first()` интерфейса [LabelsGroup](../API/views.md#LabelsGroup), которая возвращает объекты заголовков строк из полученного массива заголовков представления, и функцию `label()` интерфейса [EntityInfo](../API/views.md#EntityInfo), которая вернёт наименования заголовков:

```js
for (const chunk of generator) {
    chunk.rows().all().forEach(labelsGroup => {
        console.log(labelsGroup.first().label());
    });
}
```

В результате работы скрипта в консоль выводится склеенные в одну строку наименования заголовков строк, так как движок скриптов 1.0 [не переносит курсор](../appendix/constraints.md#noLineBreak) на следующую строку после работы функции `console.log()`:

![Результат вывода без переноса строки](./pic/ca_DimRowResText.png)

Если необходим вывод названия строк на отдельных строках, следует самостоятельно добавить перенос строк:

```js
for (const chunk of generator) {
    chunk.rows().all().forEach(labelsGroup => {
        console.log(`Row label: ${labelsGroup.first().label()} \n`);
    });
}
```

Итоговый код скрипта:

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');

const pivot = multicubeTab.pivot('Условия и расчёты 3');
const grid =  pivot.create();

const range = grid.range();
const generator = range.generator();

for (const chunk of generator) {
    chunk.rows().all().forEach(labelsGroup => {
        console.log(`Row label: ${labelsGroup.first().label()} \n`);
    });
}
```

В результате получается полный список заголовков строк:

![Результат работы скрипта по одному измерению в строках](./pic/ca_DimRows1Res.png)

### Несколько измерений в строках

Настройки сводной таблицы представления мультикуба:

![Скрин сводной таблицы с двумя измерениями в строках](./pic/ca_DimensionsRows2.png)

Представление таблицы мультикуба:

![Скрин с видом таблицы мультикуба с двумя измерениями](./pic/ca_Table2.png)

Чтобы получить заголовки строк всех измерений необходимо заменить функцию `first()` на функцию `all()`. Чтобы получить данные вида `Заголовок 1 уровня, Заголовок 2 уровня, ...`, нужно перебирать элементы массива заголовков каждого измерения (в данном случае до второго) с помощью функции массивов [`forEach()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

Следует создать пустой массив `rowLabels` для хранения наименований заголовков и добавлять в него полученные значения. Далее значение массива следует вывести в консоль, указывая резделитель заголовков `', '` с помощью функции объединения массивов [`join()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/join):

```js
for (const chunk of generator) {
    chunk.rows().all().forEach(labelsGroup => {
        const rowLabels = [];
        labelsGroup.all().forEach(label => {
            rowLabels.push(label.label());
        });
		
        console.log(`Row label: ${rowLabels.join(', ')} \n`);
    });
}
```

Итоговый код скрипта:

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');

const pivot = multicubeTab.pivot('Условия и расчёты 3');
const grid =  pivot.create();

const range = grid.range();
const generator = range.generator();

for (const chunk of generator) {
    chunk.rows().all().forEach(labelsGroup => {
        const rowLabels = [];
        labelsGroup.all().forEach(labels => {
            rowLabels.push(labels.label());
        });
				
        console.log(`Row label: ${rowLabels.join(', ')} \n`);
    });
}
```

В результате работы скрипта будет получен полный список двух измерений заголовков представления мультикуба, включая все уровни измерений:

![Результат работы скрипта по двум измерениям в строках](./pic/ca_DimRows2Res.png)

## Доступ к значениям клеток

Чтобы получить значения, которые находятся в клетках таблицы представления мультикуба, как и со строками, для начала необходимо обратиться к таблице представления и последовательно вывести данные ячеек.

### Доступ ко всем значениям

Для получения доступа к значениям клеток используется интерфейс [Cell](../API/views.md#Cell). Функции интерфейса позволяют считывать и изменять значения клеток. Для получения значений хранящихся в ячейках вызывается функция `getValue()`. В массив `cellValues` будем сохранять полученные функцией `getValue()` значения. Итоговый код скрипта:

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');

const pivot = multicubeTab.pivot('Условия и расчёты 3');
const grid =  pivot.create();

const range = grid.range();
const generator = range.generator();

for (const chunk of generator) {
    chunk.rows().all().forEach(labelsGroup => {
        const rowLabels = [];
        labelsGroup.all().forEach(labels => {
            rowLabels.push(labels.label());
        });
        console.log(`Row label: ${rowLabels.join(', ')} \n`);
				
        const cellValues = [];
        labelsGroup.cells().all().forEach(cell => {
            cellValues.push(cell.getValue());
        });
        console.log(`Cells value: ${cellValues.join(', ')} \n \n`);
    });
}
```

![Результат работы скрипта получения данных ячеек](./pic/ca_DimCells.png)

### Доступ к значениям определённого столбца с помощью фильтра

Если необходимо получить значения только из одного столбца и не планируется считывать данные из других, то одним из вариантов написания кода будет вызов функции `columnsFilter()` интерфейса [Pivot](../API/views.md#Pivot). Необходимо создать переменную `monthFilter`, задать ей значение заголовка из необходимого столбца, например, `'Jan 21'`, и передать её в функцию:

```js
const pivot = multicubeTab.pivot('Условия и расчёты 3');
const monthFilter = 'Jan 21';
const grid =  pivot.columnsFilter(monthFilter).create();

const range = grid.range();
const generator = range.generator();

console.log(`Filter on columns: ${monthFilter} \n`);
```

Т. к. в результате работы скрипта будут получены значения только одного столбца, массив `cellValues` можно не использовать.

Итоговый код:

```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open('Условия и расчёты');

const pivot = multicubeTab.pivot('Условия и расчёты 3');
const monthFilter = 'Jan 21';
const grid =  pivot.columnsFilter(monthFilter).create();

const range = grid.range();
const generator = range.generator();

console.log(`Filter on columns: ${monthFilter} \n`);

for (const chunk of generator) {
    chunk.rows().all().forEach(labelsGroup => {
        const rowLabels = [];
        labelsGroup.all().forEach(labels => {
            rowLabels.push(labels.label());
        });
				
        console.log(`Row label: ${rowLabels.join(', ')} \n`);
        labelsGroup.cells().all().forEach(cell => {
            console.log(`Cells value: ${cell.getValue()} \n`);
        });
    });
}
```

![Результат работы скрипта для получения данных ячеек по конкретному столбцу](./pic/ca_DimCellsFilter.png)

[Курс молодого бойца](cookBook.md)

[Оглавление](../README.md)
