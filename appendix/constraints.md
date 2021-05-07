# Ограничения скриптов 1.0

<a name="flatTable"></a>
## Плоские таблицы

Если в сводной таблице на строках нет измерений (в этом случае в интерфейсе отображается один столбец), то к ячейкам невозможно получить доступ через функцию [`LabelsGroup`](../API/OMviews.md#LabelsGroup).`cells()`. В этой ситуации она возвращает `null`:

```js
for (const chunk of generator) {
	const rowsCells = chunk.rows().all().cells();
}
```

Характерный пример плоской таблицы – [`вкладка`](../API/OMviews.md#TimeOptionsTab) настроек времени.

Для решения этой проблемы следует использовать функцию [`GridRangeChunk`](../API/OMviews.md#GridRangeChunk).`cells()`, которая возвращает линейный массив, параллельный массиву [`GridRangeChunk`](../API/OMviews.md#GridRangeChunk).`rows()`. Пример кода, который в настройках времени устанавливает нужное значение в ячейку `Current Month`, используя такой подход:

```js
for (const chunk of generator) {
	let currentMonthIndex = null;

	chunk.rows().all().forEach((rowLabels, index) => {
		const name = rowLabels.first().name();
		if (name === 'Current Month') {
			currentMonthIndex = index;
		}
	});

	if (currentMonthIndex === null) {
		throw new Error(`Option 'Current Month' not found`);
	}

	const cells = chunk.cells().all();
	cells[currentMonthIndex].setValue(newCurrentMonthValue);
}
```

Если в сводной таблице нет измерений на *столбцах*, ситуация полностью аналогична описанной.

## Pivot...

```js
pivot(viewName?: string): Pivot
```
Возвращает ссылку на объект [`Pivot`](#Pivot) представления `viewName` текущего мультикуба. Если `viewName` не задано, используется представление по умолчанию. Эта функция — ***единственный*** способ получить доступ к представлению мультикуба в скриптах 1.0. Возможность программно задать строки, колонки и фильтры для создания представления мультикуба в скриптах 1.0 [*отсутствует*](../appendix/constraints.md), поэтому для работы с нужным представлением через скрипт необходимо заранее создать и сохранить его вручную.


Значение параметра `size` ограничено сверху значением `5000`, поэтому в скриптах 1.0 [`*невозможно*`](../appendix/constraints.md) работать с `GridRange` с бОльшим количеством столбцов.

[Приложения](appendix.md)

[Оглавление](../README.md)