// v1.0

const ENV = om.environment.get('ENV');

if (!ENV) {
	throw new Error('ENV not defined');
}

if (ENV.SRC_PROPS.length !== ENV.DST_PROPS.length) {
	throw new Error('Списки свойств приёмника и источника разной длины!')
}

function readGrid(pivot, gridData, idCol, exc) {
	for (const chunk of pivot.create().range().generator()) {
		chunk.rows().all().forEach(rowLabels => {
			const elem = {}

			for (const cell of rowLabels.cells().all()) {
				const col = cell.columns().first().name();
				elem[col] = cell.getValue()
			}
			
			if (exc.findIndex(ex => elem[idCol] === ex) === -1) {
				gridData.push(elem)
			}
		})
	}
}

// Get source list tab
const srcListTab = om.lists.listsTab().open(ENV.SRC_LIST);
let srcData = [];
om.common.requestInfo().logStatusMessage(`Reading source list`, true);
readGrid(srcListTab.pivot().columnsFilter(ENV.SRC_PROPS), srcData, ENV.SRC_PROPS[0], ENV.SRC_EXC)

// Get destination list tab
const dstListTab = om.lists.listsTab().open(ENV.DST_LIST);
const cb = om.common.createCellBuffer().canLoadCellsValues(false);
let propNameMap = {};
om.common.requestInfo().logStatusMessage(`Reading destination list and changing existing items`, true);

for (const chunk of dstListTab.pivot().columnsFilter(ENV.DST_PROPS.concat(['Item Name'])).create().range().generator()) {
	chunk.rows().all().forEach(rowLabels => {
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
		
		// Exclude if needed
		if (ENV.DST_EXC.findIndex(ex => elem[ENV.DST_PROPS[0]] === ex) !== -1) {
			return;
		}
		
		const sameIdInd = srcData.findIndex(e => e[ENV.SRC_PROPS[0]] === elem[ENV.DST_PROPS[0]]);
		
		if (sameIdInd === -1) {
			return;
		}
		
		// Check total equivalence
		let eq = true;
		for (let i = 1; i < ENV.SRC_PROPS.length; ++i) {
			if (srcData[sameIdInd][ENV.SRC_PROPS[i]] !== elem[ENV.DST_PROPS[i]]) {
				eq = false;
				break;
			}
		}
		
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
		
		// Delete processed element form srcData
		srcData.splice(sameIdInd, 1);
	})
}
const c = cb.count() / ENV.DST_PROPS.length;
cb.apply();
console.log(`${c} existing items changed \n`);

if (srcData.length > 0) {
	om.common.requestInfo().logStatusMessage(`Mapping parents`, true);
	for (let elem of srcData) {
		elem.Parent = propNameMap[elem.Parent];
	}

	om.common.requestInfo().logStatusMessage(`Creating new items`, true);
	const newElems = dstListTab.elementsCreator().numeric().setCount(srcData.length).create();
	console.log(`${newElems.length} new items created \n`);

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
		})
	}
	cb.apply();
} else {
	console.log(`No new items needed \n`);
}

console.log(`Well done! \n`);
