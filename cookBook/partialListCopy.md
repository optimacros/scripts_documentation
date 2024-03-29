# Разбор скрипта Частичное копирование справочников

Скрипт копирует из справочника `SRC_LIST` в справочник `DST_LIST`, соответственно, из свойств `SRC_PROPS` в свойства `DST_PROPS`. Начальные элементы обоих массивов свойств должны быть уникальными идентификаторами элементов каждого справочника, так как по этим полям происходит сопоставление элементов справочников. Если в справочнике-приёмнике элемент отсутствует, он будет создан. Массивы `SRC_EXC` и `DST_EXC` задают элементы обоих справочников, которые должны быть проигнорированы при копировании.

Скрипт вызова содержит объект `ENV` настроек с комментариями для моделлеров и код вызова основного скрипта. Эта механика разобрана в [примере о цепочках скриптов](./scriptChains.md):

```js
const ENV = {
	CORE: 'ЧастичноеКопированиеСправочника',
	
	// Названия справочника-источника
	SRC_LIST: '01001-FG Валюта',
	// Названия справочника-приёмника
	DST_LIST: '01002-FG Функциональная валюта',
	// Параллельные массивы свойств. Каждое свойство источника копируется в соответствующее свойство приёмника.
	// Начальный элемент каждого массива - идентификатор элемента в справочнике. Он должен быть уникальным.
	SRC_PROPS: ['p.Наименование', 'Parent', 'Code', 's.Все валюты'],
	DST_PROPS: ['p.Наименование', 'Parent', 'p.Код валюты', 's.Все функциональные валюты'],
	// Элементы источника, которые скрипт пропускает
	SRC_EXC: ['Все валюты', 'Выгружается ЕОС НСИ', 'Ручной ввод'],
	// Элементы приёмника, которые скрипт пропускает
	DST_EXC: ['Все функциональные валюты', 'Выгружается ЕОС НСИ', 'Ручной ввод']
};

om.common
	.resultInfo()
	.actionsInfo()
	.makeMacrosAction(ENV.CORE)
	.appendAfter()
	.environmentInfo()
	.set('ENV', ENV);
```

Общий план работы скрипта:

+ чтение справочника-источника;
+ чтение справочника-приёмника;
+ осуществляется соспоставление элементов и исправление тех, в которых свойства совпадают не полностью;
+ создаётся недостающее количество элементов в приёмнике, если не удалось сопоставить все элементы источника;
+ устанавливаются нужные свойства справочника-приемника.

Основной скрипт начинается с комментария с номером версии, далее осуществляется чтение объекта настроек `ENV` из [переменной окружения](../API/env.md#environment). Также выполняется стандартные для всех цепочечных скриптов проверка на то, что он корректно считался, и, специфичной для этого скрипта, проверки на то, что массивы с названиями свойств обоих справочников имеют одинаковые длины:

```js
// v1.0

const ENV = om.environment.get('ENV');

if (!ENV) {
	throw new Error('ENV not defined');
}

if (ENV.SRC_PROPS.length !== ENV.DST_PROPS.length) {
	throw new Error('Списки свойств приёмника и источника разной длины!');
}
```

Последняя проверка необходима потому, что скрипт не сопоставляет свойства разных справочников по именам, а копирует из свойства `p1` справочника `L1` в свойство `p2` справочника `L2`.

Далее объявлена функция `readGrid(pivot, gridData, idCol, exc)`, которая читает табличные данные из представления `pivot`, пропускает элементы, где значение в столбце `idCol` соответствууют занчению исключения `exc`, и добавляя их как объекты в массив `gridData`. В скрипте используется материал [`предыдущих примеров`](./cellsAccess.md) и функция JavaScript [`findIndex()`](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex).

```js
function readGrid(pivot, gridData, idCol, exc) {
	for (const chunk of pivot.create().range().generator()) {
		chunk.rows().all().forEach(rowLabels => {
			const elem = {};

			for (const cell of rowLabels.cells().all()) {
				const col = cell.columns().first().name();
				elem[col] = cell.getValue();
			}
			
			if (exc.findIndex(ex => elem[idCol] === ex) === -1) {
				gridData.push(elem);
			}
		});
	}
}
```

После объявления функции начинается основной рабочий код скрипта. Сначала целиком считывается справочник-источник:

```js
// Get source list tab
const srcListTab = om.lists.listsTab().open(ENV.SRC_LIST);
let srcData = [];
om.common.requestInfo().logStatusMessage(`Reading source list`, true);
readGrid(srcListTab.pivot().columnsFilter(ENV.SRC_PROPS), srcData, ENV.SRC_PROPS[0], ENV.SRC_EXC);
```

Здесь стоит заметить, что используется функция [`logStatusMessage()`](../API/common.md#request-manager.log-status-message), которая информирует пользователя посредством вывода в консоль и одновременно отправляет сообщение в лог скрипта. Таблица справочника считывается не целиком, а фильтруется по именам свойств, заданных в настройках `ENV`. В данном примере справочник-источник выглядит так:

![Справочник-источник](./pic/plc_srcList.png)

С учётом выбранных полей для копирования справочник будет считан в таком виде:

![Справочник-источник после фильтрации](./pic/plc_srcListFiltered.png)

Далее начинается следующий этап: чтение справочника-приёмника и одновременная перезапись свойств тех элементов приёмника, которые успешно сопоставились с элементами справочника-источника, но не идентичны им по заданному массиву свойств:

```js
// Get destination list tab
const dstListTab = om.lists.listsTab().open(ENV.DST_LIST);
const cb = om.common.createCellBuffer().canLoadCellsValues(false);
let propNameMap = {};
om.common.requestInfo().logStatusMessage(`Reading destination list and changing existing items`, true);
```

В примере справочник-приёмник выглядит так:

![Справочник-приёмник](./pic/plc_dstList.png)

После чтения справочника-приемника выполняется цикл прохода по ячейкам таблицы:

```js
for (const chunk of dstListTab.pivot().columnsFilter(ENV.DST_PROPS.concat(['Item Name'])).create().range().generator()) {
	chunk.rows().all().forEach(rowLabels => {
		// ...
	});
}
```

В перебираемые циклом свойства справочника-приемника дополнительно включается столбец с именами. C учётом фильтрации справочник-приёмник будет выглядеть таким образом:

![Справочник-приёмник](./pic/plc_dstListFiltered.png)

Внутри цикла каждая строка обрабатывается следующим кодом:

```js
// Read destination row
const elem = {};
let itemName, idProp;
for (const cell of rowLabels.cells().all()) {
	const col = cell.columns().first().name();
	elem[col] = cell.getValue();
	
	if (col === 'Item Name') {
		itemName = cell.getValue();
	} else if (col === ENV.DST_PROPS[0]) {
		idProp = cell.getValue();
	}
}
propNameMap[idProp] = itemName;
```

В коде создается объект `elem`, где ключами являются наименование свойства справочника, а значениями – значение свойства, а также дополнительно сохраняется имя элемента и нулевое свойство (которое является идентифицирующим) из списка `ENV.DST_PROPS`, заданного для копирования. Последней строкой этого кода между ними устанавливается соответствие с помощью объекта `propNameMap`, который пригодится позднее. Выглядеть он будет следующим образом:

```js
{
  "Все функциональные валюты": "Все функциональные валюты",
  "Выгружается ЕОС НСИ": "#1",
  "Лек": "#2",
  "Боливиано": "#16",
  "Пула": "#17",
  "Ручной ввод": "#176",
  "Угия": "#442"
}
```

Если элемент находится в списке исключений, он пропускается аналогично тому, как это делается для исключений при чтении справочника-источника:

```js
// Exclude if needed
if (ENV.DST_EXC.findIndex(ex => elem[ENV.DST_PROPS[0]] === ex) !== -1) {
	return;
}
```

После этого следует найти элемент справочника-источника, совпадающий с только-что прочитанным элементом справочником-приёмником по нулевому свойству (в данном случае и у источника, и у приёмника это `'p.Наименование'`):

```js
const sameIdInd = srcData.findIndex(e => e[ENV.SRC_PROPS[0]] === elem[ENV.DST_PROPS[0]]);

if (sameIdInd === -1) {
	return;
}
```

Если в справочнике-приёмнике такого элемента нет, необходимо пропустить элемент справочника-источника – он останется без соответствия, так как задачей кода не стоит удаление элементов справочника-приёмника. Если же соответствие элемента нашлось, следует выяснить, полное ли оно, для чего проверяются на равенство остальные свойства. Важно отметить, что переменная цикла инициализируется единицей, так как нулевое свойство уже проверено:

```js
// Check total equivalence
let eq = true;
for (let i = 1; i < ENV.SRC_PROPS.length; ++i) {
	if (srcData[sameIdInd][ENV.SRC_PROPS[i]] !== elem[ENV.DST_PROPS[i]]) {
		eq = false;
		break;
	}
}
```

Если элементы эквивалентны в смысле переданных списков свойств, никаких действий не предпринимается. Если же не совпадают какие-то свойства, выполняется перезаписать всех свойств, кроме нулевого, с помощью [`CellBuffer`](../API/common.md#cell-buffer):

```js
if (! eq) {
	// Replace all properties except id property
	for (const cell of rowLabels.cells().all()) {
		const dstCol = cell.columns().first().name();
		
		if (dstCol !== ENV.DST_PROPS[0]) {
			const colInd = ENV.DST_PROPS.indexOf(dstCol);
			cb.set(cell, srcData[sameIdInd][ENV.SRC_PROPS[colInd]]);
		}
	}
}
```

Вне зависимости от наличия полного соответствия, соответствующий элемент справочника-источника можно [удалить](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) из массива, что ускорит поиск следующих соответствий в дальнейших итерациях цикла:

```js
// Delete processed element form srcData
srcData.splice(sameIdInd, 1);
```

На этом цикл обработки справочника-приёмника заканчивается, и накопленные изменения отправляются на сервер, о чем пользователь будет уведомлен выводом в консоль:

```js
const c = cb.count() / ENV.DST_PROPS.length;
cb.apply();
console.log(`${c} existing items changed \n`);
```

Удаление элементов из `srcData` приводит не только к увеличению скорости поиска соответствий, но и к тому, что по окончании цикла в этом массиве останутся только те элементы, соответствия которым не нашлось. Это означает, что оставшиеся элементы массива нужно создать в справочнике-приёмнике. Но если элементов в массиве не осталось, значит создании элементов нет необходимости, нужно лишь вывести уведомление для пользователя:

```js
if (srcData.length > 0) {
	// ...
} else {
	console.log(`No new items needed \n`);
}
```

Для данного случая `srcData` будет выглядеть так:

```js
[
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000011",
		"p.Наименование": "Нгултрум",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000019",
		"p.Наименование": "Риель",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000042",
		"p.Наименование": "Даласи",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000043",
		"p.Наименование": "Седи",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000095",
		"p.Наименование": "Бальбоа",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000096",
		"p.Наименование": "Кина",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000097",
		"p.Наименование": "Гуарани",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000102",
		"p.Наименование": "Российский рубль",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000128",
		"p.Наименование": "Египетский фунт",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000131",
		"p.Наименование": "Доллар США",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000167",
		"p.Наименование": "Евро",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Выгружается ЕОС НСИ",
		"Code": "01001FG010000000000170",
		"p.Наименование": "Злотый",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Ручной ввод",
		"Code": "01001FG020000000000001",
		"p.Наименование": "Боливар Соберано",
		"s.Все валюты": "true"
	},
	{
		"Parent": "Ручной ввод",
		"Code": "01001FG020000000000003",
		"p.Наименование": "Добра",
		"s.Все валюты": "true"
	}
]
```

При создании новых элементов важно учитывать, что у них должен быть тот же родитель, что и в источнике. Сделать это можно двумя способами: непосредственно перед созданием указать [`longId`](../API/views.md#long-id) родителя для каждого элемента (или для каждой группы) с помощью функции [`NumericElementsCreator.setPositionChildOf()`](../API/elementsManipulator.md#base-elements-creator.set-position-child-of) или после создания задать свойство `'Parent'`. В первом случае нужно знать [`longId`](../API/views.md#long-id) родителя, а во втором – его свойство `'Item Name'`.  Так как у соответствующих элементов источника и приёмника не совпадает ни то, ни другое, необходимо использовать объект `propNameMap` – он устанавливает соответствие нулевого свойства (которое по условию тоже является уникальным) и `'Item Name'`. Следует использовать второй способ, как наиболее простой, так как в этом случае не нужно собирать элементы в группы и создавать их по отдельности, а можно установить свойство `'Parent'` внутри цикла обработки остальных свойств.

Необходимо изменить с помощью `propNameMap` отображаемое наименование родителя элемента источника на его `'Item Name'`:

```js
om.common.requestInfo().logStatusMessage(`Mapping parents`, true);
for (let elem of srcData) {
	elem.Parent = propNameMap[elem.Parent];
}
```

В итоге будет получен изменённый массив `srcData` (показаны только последние 3 элемента):

```js
[
	...,
	{
		"Parent": "#1",
		"Code": "01001FG010000000000170",
		"p.Наименование": "Злотый",
		"s.Все валюты": "true"
	},
	{
		"Parent": "#176",
		"Code": "01001FG020000000000001",
		"p.Наименование": "Боливар Соберано",
		"s.Все валюты": "true"
	},
	{
		"Parent": "#176",
		"Code": "01001FG020000000000003",
		"p.Наименование": "Добра",
		"s.Все валюты": "true"
	}
]
```

Далее следует [создать](../API/elementsManipulator.md#numeric-elements-creator) элементы справочника-приёмника:

```js
om.common.requestInfo().logStatusMessage(`Creating new items`, true);
const newElems = dstListTab.elementsCreator().numeric().setCount(srcData.length).create();
console.log(`${newElems.length} new items created \n`);
```

Выполнить установку всех свойств согласно массиву `srcData`:

```js
om.common.requestInfo().logStatusMessage(`Setting properties for new items`, true);
let ind = 0;
for (const chunk of dstListTab.pivot().columnsFilter(ENV.DST_PROPS).rowsFilter(newElems).create().range().generator()) {
	chunk.rows().all().forEach(rowLabels => {
		for (const cell of rowLabels.cells().all()) {
			const col = cell.columns().first().name();
			const colInd = ENV.DST_PROPS.indexOf(col);
			cb.set(cell, srcData[ind][ENV.SRC_PROPS[colInd]]);
		}
		++ind;
	});
}
cb.apply();
```

Вывести сообщение пользователю о благополучном выполнении коды:

```js
console.log(`Well done! \n`);
```

После выполнения скрипта будет виден его вывод:

```
Reading source list
Reading destination list and changing existing items
2 existing items changed 
Mapping parents
Creating new items
14 new items created 
Setting properties for new items
Well done! 
```

Справочник-приемник после выполнения кода:

![Справочник-приёмник в результате](./pic/plc_result.png)

В справочнике-приемнике в результате были изменены два существовавших в нем элемента – это `'Боливиано'` и `'Пула'`, было установлено свойство `'p.Код валюты'`и было создано 14 новых элементов: `'Нгултрум'`, `'Риель'`, ..., `'Злотый'` с родителем `'Выгружается ЕОС НСИ'`, а также `'Боливар Соберано'` и `'Добра'` с родителем `'Ручной ввод'`.

**Полный текст**: [Скрипт](./scripts/partialListCopy_v1.0.js) и [пример](./scripts/partialListCopy_ENV.js) его настроек.

[Курс молодого бойца](cookBook.md)

[Оглавление](../README.md)
