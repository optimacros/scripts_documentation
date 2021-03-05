# Пример скрипта получения курсов валют
```ts
// Вводные данные:
const ENV = {
    DAILY_URL: 'http://www.cbr.ru/scripts/XML_daily.asp',
    DYNAMIC_URL: 'http://www.cbr.ru/scripts/XML_dynamic.asp',
    USD_ID: 'R01235',
    EUR_ID: 'R01239',
    SOURCE_PARAMS: {
        MULTICUBE_NAME: 'Params for Импорт валюты',
        VIEW_NAME: null,
    },
    PARAMS: {
        MULTICUBE_NAME:  null,
        VIEW_NAME: null,
        START_DATE: null,
        END_DATE: null,
    }
};

// Объявляем класс GetCurs
class GetCurs {
    constructor() {
        this.loadParams()
    }

    // loadParams() метод который вызывается в конструкторе и инстанцирует дополнительные значения свойств объекте ENV
    loadParams() {
        // деструктуризация объекта ENV.SOURCE_PARAMS с объявлением переменных
        const { SOURCE_PARAMS: { MULTICUBE_NAME, VIEW_NAME } } = ENV

        // помещаем в переменную generator содержимое грида мультикуба с именем переданным нами в MULTICUBE_NAME
        const grid = om.multicubes.multicubesTab().open(MULTICUBE_NAME).pivot(VIEW_NAME).create()
        const generator = grid.range().generator(5000)

        // Формирование даты в нужном формате типа 23.11.2020 и помещаем её в перемунню date
        const currentDate = new Date()
        const day = ('0' + currentDate.getDate()).slice(-2)
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
        const year = currentDate.getFullYear()
        const date = `${day}.${month}.${year}`

        // из мультикуба "Params for Импорт валюты" построчно забираем значения и устанавливаем их в ENV.PARAMS так же
        // построчно
        for(let chunk of generator) {
            const rows = chunk.rows().all()
            const cells = chunk.cells().all()
            rows.forEach((row, index) => {
                ENV.PARAMS[row.first().code()] = cells[index].getValue()
            })
        }

        // если после предыдущего цикла не сетнулось значение в начальную дату, то берём значение из date, где лежит
        // сегодняшняя дата
        if (!ENV.PARAMS.START_DATE) {
            ENV.PARAMS.START_DATE = date
        }

        // если после предыдущего цикла не сетнулось значение в конечную дату, то берём значение из date, где лежит
        // сегодняшняя дата
        if (!ENV.PARAMS.END_DATE) {
            ENV.PARAMS.END_DATE = date
        }
    }

    // load() основной метод загрузки, который мы вызываем в конце скрипта
    load() {
        // Деструктуризация объекта ENV.PARAMS + объявление переменных MULTICUBE_NAME, VIEW_NAME, START_DATE, END_DATE
        const { PARAMS: { MULTICUBE_NAME, VIEW_NAME, START_DATE, END_DATE } } = ENV

        // data будет содержать результат выполнения тернарного оператора: Если START_DATE == END_DATE начальная дата
        // равна конечной, то в дата поместим результат вызова функции this.getDataByDay() в ином случае результат
        // this.getDataByRange()
        const data = START_DATE == END_DATE ? this.getDataByDay() : this.getDataByRange()

        // помещаем в переменную generator содержимое грида мультикуба с именем переданным нами в MULTICUBE_NAME
        const grid = om.multicubes.multicubesTab().open(MULTICUBE_NAME).pivot(VIEW_NAME).create()
        const generator = grid.range().generator(5000)

        // Проходим по строкам грида, с помощью цикла устанавливая значения из сформированных из результатов запросов
        // данных
        for(let chunk of generator) {
            let lastElement = null

            // получаем индексы строк в гриде, содержащие даты в с соответствии с указанными датами во входных данных
            let firstRowIndex = this._getRowIndex(chunk, START_DATE)
            let lastRowIndex = this._getRowIndex(chunk, END_DATE)

            // если firstRowIndex или lastRowIndex вернут -1, то значит в гриде "4script_Импорт обменных курсов" нет
            // строки в которой записана дата переданная в env в качестве стартовой или конечной
            if (firstRowIndex < 0 || lastRowIndex < 0) {
                throw new Error('Grid does not have a specified range!')
            }

            // Проходимся с помощью цикла по всем строкам устанавливая соответствующие значения курсов, упуская строки
            // у которых в заголовках первый символ не число а текст, тем самым исключая не редактируемые стрроки
            // содержащие месяца и год типа: Jan 19. Данное действие и является целью скрипта. В случае успеха делаем
            // вывод текста 'Exchange rate loaded successfully!'
            const rows = chunk.rows().all().slice(firstRowIndex, lastRowIndex + 1)
            rows.forEach((row) => {
                const label = row.first().label()
                const firstChar = Number(label.charAt(0))
                const columns = {}
                if (!Number.isInteger(firstChar)) {
                    return
                }
                const date = new Date(label).toDateString()
                let element = data.find((element) => {
                    const [ day, month, year ] = element.date.split('.')
                    const elementDate = new Date(`${month}.${day}.${year}`).toDateString()
                    return elementDate == date
                })
                if (!element) {
                    if (!lastElement) {
                        lastElement = data[0]
                    }
                    element = lastElement
                }
                row.cells().all().forEach(cell => {
                    columns[cell.columns().first().label()] = cell
                })
                for (const [key, value] of Object.entries(element.currencies)) {
                    columns[key].setValue(value)
                }
                lastElement = element
            })
            console.log('Exchange rate loaded successfully!')
        }
    }

    // получение данных курса по одному дню
    getDataByDay() {
        // Получаем доступ в API requestBuilder
        const reqBuilder = om.connectors.http().requestBuilder()

        // Устанавливаем параметр 'date_req': ENV.PARAMS.START_DATE
        const params = { 'date_req': ENV.PARAMS.START_DATE }

        // Устанавливаем параметр url = ENV.DAILY_URL
        reqBuilder.url().setUrl(ENV.DAILY_URL)

        // Передаём параметр в url из переменной params
        reqBuilder.url().params().setAll(params)

        // Создаём переменную response содержащую результат ответа на запрос reqBuilder
        const response = reqBuilder.send()

        // передаём содержимое response в метод _checkResponse для обработки возможных ошибок
        this._checkResponse(response)

        // создаём переменную xml и помещаем в неё результат response.getStringData() возвращающий результат запроса,
        // в текстовом виде
        const xml = response.getStringData()

        // Проверка, если ответ пустой, то будет ошибка
        if (!xml) {
            throw new Error("Response not valid xml")
        }

        // создание переменных сожержащие РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ
        const regex1 = /<CharCode>(.+?)<\/CharCode>/g
        const regex2 = /<Value>(.+?)<\/Value>/g

        // Получаем объект со свойствами наименований валют и курсов валют, отсеивая все валюты кроме долларов и евро
        const chars = this.getArray(regex1, String(xml))
        const values = this.getArray(regex2, String(xml))
        const currencies = {}
        chars.forEach((char, index) => {
            if ((char == 'USD') || (char == 'EUR')) {
                currencies[char] = values[index]
            }
        })

        // Выдаём ошибку если ничего не попало в объект курсов
        if (!Object.keys(currencies).length) {
            throw new Error("Currencies is empty")
        }

        // возвращает наш метод, массив с объектом содержащим дату и курсы валют
        return [{
            date: ENV.PARAMS.START_DATE,
            currencies: currencies
        }]
    }

    // получение данных курса по диапазону дней
    getDataByRange() {
        // Получаем данные запрашивая данные по конкретным валютам, изменяя параметры с помощью метода _getParams
        const requestUsd = om.connectors.http().requestBuilder()
        const requestEur = om.connectors.http().requestBuilder()
        const paramsForUsd = this._getParams(ENV.USD_ID)
        const paramsForEur = this._getParams(ENV.EUR_ID)
        requestUsd.url().setUrl(ENV.DYNAMIC_URL)
        requestUsd.url().params().setAll(paramsForUsd)
        requestEur.url().setUrl(ENV.DYNAMIC_URL)
        requestEur.url().params().setAll(paramsForEur)
        const usdResponse = requestUsd.send()
        const eurResponse = requestEur.send()

        // Передаём содержимое response в метод _checkResponse для обработки возможных ошибок
        this._checkResponse(usdResponse)
        this._checkResponse(eurResponse)

        // Создаём переменную usdXml и помещаем в неё результат response.getStringData() возвращающий результат запроса,
        // в текстовом виде для долларов и для евро в eurXml
        const usdXml = usdResponse.getStringData()
        const eurXml = eurResponse.getStringData()

        // Проверка, если ответ для одной из валют окажется пустой, то будет ошибка
        if (!usdXml || !eurXml) {
            throw new Error("Response not valid xml")
        }

        // Создание переменных сожержащие РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ
        const regex1 = /Date="(.+?)"/g
        const regex2 = /<Value>(.+?)<\/Value>/g

        // Получаем массив объектов со свойствами наименований валют и курсов валют, отсеивая все валюты кроме долларов
        // и евро, где каждый элемент массива, соответствую дате и курсам по двум валютам.
        const dates = this.getArray(regex1, String(usdXml))
        const usdValues = this.getArray(regex2, String(usdXml))
        const eurValues = this.getArray(regex2, String(eurXml))
        const currencies = []
        dates.forEach((date, index) => {
            const obj = {
                date: date,
                currencies: {
                    USD: usdValues[index],
                    EUR: eurValues[index],
                }
            }
            currencies.push(obj)
        })

        // Выдаём ошибку, если ничего не попало в массив курсов
        if (!currencies.length) {
            throw new Error("Currencies is empty")
        }

        // Возвращаем массив объекстов с курсами валют по диапазону дат
        return currencies
    }

    getArray(regex, string) {
        let m
        const array = []
        while ((m = regex.exec(string)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++
            }
            m.forEach((match, groupIndex) => {
                if (groupIndex == 1) {
                    array.push(match)
                }
            })
        }
        return array
    }

    _getParams(valId) {
        return {
            'date_req1': ENV.PARAMS.START_DATE,
            'date_req2': ENV.PARAMS.END_DATE,
            'VAL_NM_RQ': valId,
        }
    }

    // метод позвращает индекс строки в гриде, если имеется строка с переданной в него датой. В случае, если не имеется
    // вернёт -1, который мы будем обрабатывать как ошибку, что грид не имеет указанного в дате диапазона. В частности
    // проверяем, что грид "4script_Импорт обменных курсов" имеет строку, в которой записана дата переданная сюда в 
    // качестве второго аргумента date
    _getRowIndex(chunk, date) {
        return chunk.rows().all().findIndex((row, index) => {
            const label = row.first().label()
            const firstChar = Number(label.charAt(0))
            if (!Number.isInteger(firstChar)) {
                return false
            }

            const dateFromRow = new Date(label).toDateString()
            const [ day, month, year ] = date.split('.')
            const dateFromParam = new Date(`${year}-${month}-${day}`).toDateString()
            return dateFromRow == dateFromParam
        })
    }

    // метод проверяющий, нет ли ошибок в ответе на наш запрос
    _checkResponse(response) {
        if (!response.isOk()) {
            throw new Error(response.getErrors() ? `Error: ${response.getErrors().getMessage()}` : `Status code: ${response.getStatusCode()}`)
        }
    }
}

let macros = new GetCurs

macros.load()

```

[Вернуться к примерам](example.md)