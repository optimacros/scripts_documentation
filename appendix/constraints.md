# Ограничения скриптов 1.0

<a name="single-model"></a>
## Связь только с одной моделью

Скрипты 1.0 хранятся внутри некоторой модели и при запуске глобальная переменная [`om`](../API/API.md#om) автоматически соединяется с ней и только с ней. Возможность кросс-модельного взаимодействия отсутствует. Это [`реализовано`](https://github.com/optimacros/applications_documentation/blob/master/features.md) в Application Manager.

&nbsp;

<a name="flat-table"></a>
## Плоские таблицы

Если в сводной таблице на столбцах нет измерений (в этом случае в интерфейсе отображается один столбец), то к ячейкам невозможно получить доступ через функцию [`LabelsGroup`](../API/views.md#labels-group).`cells()`. В этой ситуации она возвращает `null`:

```js
for (const chunk of generator) {
	const rowsCells = chunk.rows().all()[0].cells()   // null
}
```

В этом случае система скриптов создаёт виртуальное измерение, к которому можно получить доступ стандартным способом, и вызов

```js
definitionInfo.getColumnDimensions()[0]getDimensionEntity().name()
```

вернёт специальное значение `'Empty 1 0'`.

Характерный пример плоской таблицы – [`вкладка`](../API/dimensions.md#time-options-tab) настроек времени.

Для решения этой проблемы следует использовать функцию [`GridRangeChunk`](../API/views.md#grid-range-chunk).`cells()`, которая возвращает линейный массив, параллельный массиву [`GridRangeChunk`](../API/views.md#grid-range-chunk).`rows()`. Пример кода, который в настройках времени устанавливает нужное значение в ячейку `Current Month`, используя такой подход:

```js
for (const chunk of generator) {
	let currentMonthIndex = null

	chunk.rows().all().forEach((rowLabels, index) => {
		const name = rowLabels.first().name()
		if (name === 'Current Month') {
			currentMonthIndex = index
		}
	});

	if (currentMonthIndex === null) {
		throw new Error(`Option 'Current Month' not found`)
	}

	const cells = chunk.cells().all()
	cells[currentMonthIndex].setValue(newCurrentMonthValue)
}
```

Если в сводной таблице нет измерений на *строках*, ситуация полностью аналогична описанной.

&nbsp;

<a name="pivot"></a>
## Сводная таблица Tab.pivot()

Функция [`Tab.pivot()`](../API/views.md#tab.pivot) — единственный способ получить доступ к представлению мультикуба. Возможность программно задать строки, колонки и фильтры для создания представления мультикуба в скриптах 1.0 отсутствует, поэтому для работы с нужным представлением через скрипт необходимо заранее создать и сохранить его вручную.

&nbsp;

<a name="generator"></a>
## Генератор GridRange.generator()

В функции [`GridRange.generator()`](../API/views.md#generator) значение параметра `size` ограничено сверху значением `5000`, поэтому в скриптах 1.0 невозможно работать с [`GridRange`](../API/views.md#grid-range) с бОльшим количеством столбцов. Для решения этой проблемы предлагается окропить святой водой моделлера, который создаёт такие таблицы.

&nbsp;

<a name="sync-output"></a>
## Вывод скрипта

Вывод скрипта доступен только после его завершения. Если скрипт запускает длительную задачу, это может быть неудобно. Для частичного решения этой проблемы предусмотрен функционал [`RequestManager`](../API/common.md#request-manager). Для полного – Application Manager, в нём вывод [`отображается`](https://github.com/optimacros/applications_documentation/blob/master/diff.md#async-output) асинхронно непосредственно во время работы приложения.

&nbsp;

<a name="no-line-break"></a>
## `console.log()` не добавляет символ переноса строки

Для получения удобочитаемого вывода рекомендуется добавлять этот символ самостоятельно:

```js
console.log(message + '\n')
```

или

```js
console.log(`${message} \n`)
```

Это неудобство [`отсутствует`](https://github.com/optimacros/applications_documentation/blob/master/diff.md#line-break) в Application Manager.


[Приложения](appendix.md)

[Оглавление](../README.md)
