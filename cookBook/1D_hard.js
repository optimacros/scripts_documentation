const ENV = {
	SCRIPT: "1D_v1.8",
	SOURCE_INFO: {
		MULTICUBE_NAME: "1D_Hard",
		INTERSECTION_CUBE_NAME: "Есть данные",
		RELATION_CUBE_NAME: "ЦФО - PL.СтатьяЗатрат",
		DIMENSION_MAP: [
			{
				DIMENSION_NAME: "ЦФО"
			},
			{
				DIMENSION_NAME: "PL.СтатьяЗатрат",
				PARENT_STAIR: {
					LIST_NAME: "PL.СтатьяЗатрат",
					VIEW_NAME: null,
					LEVELS: [0, 1, 2],
				}
			},
		]
	},
	
	DESTINATION_INFO: {
		DIMENSION_MAP: [
			{
				LIST_NAME: "ЦФО",
				ID_COLUMNS: [
					"p.ЦФО"
				],
				CAN_MANAGE: false,
				DIMENSION_COLUMN: null,
				STATUS_COLUMN: null,
			},
			
			{
				LIST_NAME: "ЦФО - GR",
				ID_COLUMNS: [
					"p.ЦФО",
					"p.PL.GR"
				],
				CAN_MANAGE: true,
				DIMENSION_COLUMN: "p.PL.GR",
				STATUS_COLUMN: null,
			},
			
			{
				LIST_NAME: "ЦФО - Родитель3",
				ID_COLUMNS: [
					"p.ЦФО",
					"p.PL.GR",
					"p.PL.Родитель.3"
				],
				CAN_MANAGE: true,
				DIMENSION_COLUMN: "p.PL.Родитель.3",
				STATUS_COLUMN: null,
			},
			
			{
				LIST_NAME: "ЦФО - Родитель6",
				ID_COLUMNS: [
					"p.ЦФО",
					"p.PL.GR",
					"p.PL.Родитель.3",
					"p.PL.Родитель.6"
				],
				CAN_MANAGE: true,
				DIMENSION_COLUMN: "p.PL.Родитель.6",
				STATUS_COLUMN: null,
			},
			
			{
				LIST_NAME: "ЦФО - СЗ",
				ID_COLUMNS: [
					"p.ЦФО",
					"p.PL.GR",
					"p.PL.Родитель.3",
					"p.PL.Родитель.6",
					"p.PL.СЗ"
				],
				CAN_MANAGE: true,
				DIMENSION_COLUMN: "p.PL.СЗ",
				STATUS_COLUMN:  "s.ЦФО - СЗ",
			},
		]
	}
};


om.common
	.resultInfo()
	.actionsInfo()
	.makeMacrosAction(ENV.SCRIPT)
	.appendAfter()
	.environmentInfo()
	.set('ENV', ENV)
