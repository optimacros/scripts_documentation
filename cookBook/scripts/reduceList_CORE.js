// v1.1

const ENV = om.environment.get('ENV');

if (!ENV) {
	throw new Error('ENV not defined');
}

const dstListTab = om.lists.listsTab().open(ENV.DST_LIST);

// Set formula for NAME_PROPERTY
if (ENV.NAME_PROPERTY) {
	om.common.requestInfo().logStatusMessage(`Setting formula for ${ENV.NAME_PROPERTY}`, true);
	for (const chunk of dstListTab.customPropertiesTab().pivot().rowsFilter(ENV.NAME_PROPERTY).columnsFilter('Formula').create().range().generator()) {
		chunk.cells().first().setValue(ENV.PROPERTIES.map((prop) => "TEXT('" + prop + "')").join(' & "|" & '));
	}
}

ENV.PROPERTIES.push('Parent');

// Read data
om.common.requestInfo().logStatusMessage(`Reading source list`, true);
const pivot = om.lists.listsTab().open(ENV.SRC_LIST).pivot().columnsFilter(ENV.PROPERTIES.concat(['List']));
const srcListData = [];

for (const chunk of pivot.create().range().generator()) {
	chunk.rows().all().forEach(rowLabels => {
		const rowName = rowLabels.first().name();
		
		const elem = {};
		for (const cell of rowLabels.cells().all()) {
			const col = cell.columns().first().name();
			
			if (col === 'Parent') {
				elem[col] = cell.getContextValue();
			} else {
				elem[col] = cell.getValue();
			}
		}
		
		// Skip parent elements from other lists
		if (elem.List === ENV.SRC_LIST) {
			srcListData.push(elem);
		}
	})
}

// Compare function
function compare(a, b) {
	for (let i = 0; i < ENV.PROPERTIES.length; i++) {
		if (a[ENV.PROPERTIES[i]] < b[ENV.PROPERTIES[i]]) {
			return -1;
		} else if (a[ENV.PROPERTIES[i]] > b[ENV.PROPERTIES[i]]) {
			return 1;
		}
	}
	
	return 0;
}

// Do reduce !
om.common.requestInfo().logStatusMessage(`Reducing by property '${ENV.REDUCE_BY}'`, true);
srcListData.sort(compare);

let i = 0;
while (i < srcListData.length - 1) {
	const a = srcListData[i];
	
	let j = i + 1;
	while (j < srcListData.length && compare(a, srcListData[j]) === 0) {
		++j;
	}
	
	srcListData.splice(i + 1, j - 1 - i);
	++i;
}

// Insert into destination list
om.common.requestInfo().logStatusMessage(`Inserting into destination list '${ENV.DST_LIST}'`, true);
const createdElems = dstListTab
	.elementsCreator()
	.numeric()
	.setCount(srcListData.length)
	.create();

// Set fields
let ind = 0;
const cb = om.common.createCellBuffer().canLoadCellsValues(false);
for (const chunk of dstListTab.pivot().columnsFilter(ENV.PROPERTIES).rowsFilter(createdElems).create().range().generator()) {
	chunk.rows().all().forEach(rowLabels => {
		for (const cell of rowLabels.cells().all()) {
			const col = cell.columns().first().name();
			cb.set(cell, srcListData[ind][col]);
		}

		ind++;
	})
}
cb.apply();

console.log(`Well done!`);
