# CSV
# Экспорт и импорт из мультикуба в csv
Здесь описано решение задачи модификации данных МК скриптом через CSV-файл. Другой метод модификации данных мультикуба использует функцию ```js generator``` интерфейса [GridRange](). Получаем интерфейс [GridRangeChunk](), который построчно читается. Модифицируем необходимые строки, записываем изменения в [буфер]() и передаем значения на сервер. Основной недостаток этого метода - очень медленная работа при большом размере мультикуба. Как показала практика, гораздо быстрее с этой задачей справляется метод, использующий модифицирование данных через csv файлы. Алгоритм метода включает в себя 4 пункта: выгрузку данных в файл, чтение и модификацию, запись в новый файл, импорт в МК новых данных.

**При экспорте-импорте CSV файла, мультикуб экспорта должен быть плоским, т.е. не включать в себя фильтры!** Это происходит потому, что функция `generator` не читает фильтры. Если это необходимо создайте нужное представление мультикуба.

В качестве примера возможной задачи возьмем мультикуб нескольких игроков. В зависимости от уровня игрока зависит ценность получаемой награды. Наша задача - раздать игрокам их
награды. Мультикуб называется "Уровни игроков". Внутри него 2 куба: "Приз" и "Уровень игрока". Если уровень игрока меньше или равен пятому, он получает меч третьего уровня, если больше пятого, уровень игрока становится равен случайному числу от 5 до 15 и получает Меч Иссинхдора.
##  Экспорт из мультикуба в csv

Сначала необходимо получить доступ к данным мультикуба для которого осуществляется экспорт. 

По аналогии с [одним из предыдущих уроков]() для получения доступа к ячейкам представления мультикуба необходимо открыть раздел мультикубов, выбрать один из доступных, указать необходимое представление и обратиться к таблице с данными:
```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open("Уровни игроков");

const pivot = multicubeTab.pivot();
const grid = pivot.create();
```
Теперь нам нужен интерфейс экспорта таблицы. Существует интерфейс [Exporter]() базового экспорта таблицы и интерфейс [StorageExporter]() быстрого экспорта таблицы. Рассмотрим их различия. Интерфейс `StorageExporter` наследуется от `Exporter`. Доступен только в мультикубах. В отличие от базового, формат выгрузки фиксирован и отличается от представления таблицы: в столбцах находятся измерения и кубы. Кроме того, вместо псевдонимов экспортируются только их имена.

На практике рассмотрим отличия в csv файлах. Для этого сначала сохраним экспортированные файлы по локальным путям и скачаем их.  

Получим доступ к интерфейсу быстрого экспорта таблицы [StorageExporter]() с помощью функции `storageExporter`. Устанавливаем формат экспортируемого файла csv, используя функцию `setFormat`. Для чтения файла в нужной кодировке используем функцию `setEncoding`. Будьте очень осторожны с изменением кодировки файла!!! Функция `generator` перестает работать при изменениях кодировки. Строки становятся не читаемыми. **После чтения файла функцию `setEncoding` из кода необходимо удалить!**

Производим экспорт файла в соответствии с настройками с помощью функции `export` и получаем ссылку на интерфейс [ExportResult](). Сохраним экспортированный файл по пути `storageExporter` с помощью функции `copyToLocal` для последующего доступа по сохраненному пути.
```js
const storageExporter = grid.storageExporter().setFormat("csv").setEncoding("WINDOWS-1251");
const storageExportResult = storageExporter.export().copyToLocal("storageExporter"); 
```
Получим доступ к интерфейсу базового экспорта таблицы [Exporter]() с помощью функции `exporter`. Устанавливаем формат экспортируемого файла csv, используя функцию `setFormat`. Для чтения файла в нужной кодировке используем функцию `setEncoding`.

Производим экспорт файла в соответствии с настройками с помощью функции `export` и получаем ссылку на интерфейс [ExportResult](). Сохраним экспортированный файл по пути `Exporter` с помощью функции `copyToLocal` для последующего доступа по сохраненному пути.
```js
const exporter = grid.exporter().setFormat("csv").setEncoding("WINDOWS-1251");
const exportResult = exporter.export().copyToLocal("export"); 
```
Для скачивания файлов необходимо получить идентификатор файла в глобальном реестре, чтобы передать его в функцию `ResultInfo.addFileHash`, используя интерфейс [ResultInfo](). Чтобы получить идентификатор воспользуемся функцией `getHash` интерфейса [ExportResult]() Функция `addFileHash` скачивает файл в браузере.
```js
const hashStorageExport = storageExportResult.getHash();
const hashExport = exportResult.getHash();
const resultInfo = om.common.resultInfo();

resultInfo.addFileHash(hashStorageExport);
resultInfo.addFileHash(hashExport);
```
Скрипт может скачивать только последний файл. Скачиваем оба файла по очереди, удаляя соответствующие строки кода.
Итоговый код:
```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open("Уровни игроков");

const pivot = multicubeTab.pivot();
const grid = pivot.create();

const storageExporter = grid.storageExporter().setFormat("csv").setEncoding("WINDOWS-1251");
const storageExportResult = storageExporter.export().copyToLocal("storageExporter"); 
const exporter = grid.exporter().setFormat("csv").setEncoding("WINDOWS-1251");
const exportResult = exporter.export().copyToLocal("export"); 

const hashStorageExport = storageExportResult.getHash();
const hashExport = exportResult.getHash();
resultInfo.addFileHash(hashStorageExport);
resultInfo.addFileHash(hashExport);
```
Файлы отличаются различной группировкой параметров. В случае базового экспорта в каждой строке идут измерения справочников месяцев и имен игроков. Затем идет название одного куба и его значение. На следующей строчке считывается следующий куб и его значение.
В случае быстрого экспорта файл реализован немного по другому. В нем нет измерения Cubes, вместо этого написаны все значения имен кубов. Далее в каждой строчке даны сразу все значения кубов, а не по отдельности как в первом случае. 
Я выбрал интерфейс StorageExporter из-за его сильного удобства. За одну строку мы сразу считаем значения всех кубов мультикуба. Это позволяет просто запомнить индексы соответствующих кубов и обращаться к ним в массиве. Во втором случае при большом количестве кубов проблематично однозначно идентифицировать имя куба с его значением. К тому же, если потребуется получить несколько значений кубов одновременно, придется вручную запоминать каждое из них в переменную, что не очень удобно. Случай работы с интерфейсом `Exporter` в этом уроке описан не будет.

Итоговый код:
```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open("Уровни игроков");

const pivot = multicubeTab.pivot();
const grid = pivot.create();

const storageExporter = this.grid.storageExporter().setFormat("csv");
const exportResult = storageExporter.export().copyToLocal("export"); 
```

##  Чтение csv и модификация
Теперь можно построчно читать данные входного мультикуба. 
Получаем доступ к интерфейсу локальной файловой системы [Filesystem]() с помощью функции `getPathObj`, в качестве параметра передается путь файла `export`. Этот интерфейс хранит в себе путь к файлу и ссылку на файловую систему. Он понадобится для чтения файла по выбранному пути.

Получим интерфейс [FilesDataManager]() для чтения файла с помощью функции `csvReader`, в качестве параметра укажем интерфейс PathObj. Чтобы прочитать файл построчно вызовем  функцию-генератор – `generator` – интерфейса `CsvReader` возвращающую массив строк вида `string[][]`.
```js
const localFileSystem = om.filesystems.local();
const filePath = localFileSystem.getPathObj("export");
const fileManager = om.filesystems.filesDataManager();
const csvReader = fileManager.csvReader(filePath);
const generator = csvReader.generator();
```
Итоговый код:
```js
const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open("Уровни игроков");

const pivot = multicubeTab.pivot();
const grid = pivot.create();

const storageExporter = grid.storageExporter().setFormat("csv").setEncoding("WINDOWS-1251");
const exportResult = storageExporter.export().copyToLocal("export"); 

const localFileSystem = om.filesystems.local();
const filePath = localFileSystem.getPathObj("export");
const fileManager = om.filesystems.filesDataManager();
const csvReader = fileManager.csvReader(filePath);
const generator = csvReader.generator();
```
Посмотрим на структуру файл импорта, скачанного в предыдущий раз. Сначала идут заголовки измерений, внизу прописаны их значения.
В первой строке файла слева направо читаем заголовки строк и столбцов. Последними в строке прописаны названия всех кубов мультикуба. Мультикуб может содержать внутри себя очень много кубов. Модифицировать нам необходимо только несколько кубов, еще некоторое количество кубов нам необходимо прочитать.  Нам необходимо сохранить заголовки строк, столбов и их значения без изменений. Оставим названия тех кубов, которые нам нужны и поменяем их значения на необходимые.

Для того, чтобы прочитать столбцы и строки измерений в каждой строчке файла, определим их общую длину. При построчном чтении эта часть останется без изменений.

Используем функцию `getDefinitionInfo` интерфейса `Grid` для доступа к интерфейсу [GridDefinitionInfo](). Последовательно получим доступ к массивам объектов строк и столбцов с интерфейсом [GridDimension](), используя функции `getRowDimensions`, `getColumnDimensions`. Далее вычислим длины массивов, сложим их и вычтем единицу(измерение "Cubes").

```js
const definitionInfo = grid.getDefinitionInfo();
const columnDimensions = definitionInfo.getColumnDimensions();
const columnLength = columnDimensions.length;
const rowDimensions = definitionInfo.getRowDimensions();
const rowLength = rowDimensions.length;
const dimensionsLength = rowLength + columnLength  - 1;
```
Также необходим объект содержащий названия кубов, которые необходимо перезаписать("valueCubes") и которые необходимо прочитать из строки("indexCubes") файла. По условию меняется два куба и читается куб "Уровень игрока".
```js
const CUBES_MK = {
    valueCubes: {
        cubePrize: "Приз",
        cubePoints: "Уровень игрока"
    },
    indexCubes: {
        cubePoints: "Уровень игрока"
    }
};
```
Т. к. среда Оptimacros расчитана на работу с объектами, содержащими большие объёмы данных, запрос на получение этих данных реализован покусочно. Функция-генератор возвращает строковый массив, с которым можно работать в цикле.
```js
for (let rowArray of generator) {
}
```

Сначала прочитаем первую строку. Используем индикатор `firstLaunch`, чтобы прочитать только её. Массив `row` будет содержать экспортируемую строку. Далее проходимся циклом по строке. Если индекс элемента не является названием куба, добавим элемент в массив `row` без изменений. Это проверяется условием, что индекс меньше длины всех измерений. Также создаем и заполняем массив `headersFile` всех заголовков мультикуба, включая названия кубов. 
```js
let firstLaunch = true;

for (let rowArray of generator) {
    let row = [];
    
    if (firstLaunch) {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
            headersFile.push(element);
        })
        firstLaunch = false;

    }
}
```

Далее записываем все названия кубов, которые будем менять. Для этого прочитаем объект `CUBES_MK.valueCubes`, содержащий названия кубов, котрые мы перезапишем. Переберем все значения свойств объекта и запишем их в массив `row`.

```js
let firstLaunch = true;

for (let rowArray of generator) {
    let row = [];
    
    if (firstLaunch) {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
            headersFile.push(element);
        })
        const headers = Object.values(CUBES_MK.valueCubes);
        headers.forEach(header => {
            row.push(header);
        });
        firstLaunch = false;
    }
}
```
Теперь можно переходить к следующей строке. Но нам необходимо прочитать свойство "Уровень игрока" в каждой строке. Для этого нужно знать индекс столбца файла по которому можно получить искомый куб. Названия кубов, которые необходимо прочитать, хранятся в объекте `CUBES_MK.indexCubes`. Напишем функцию, которая запишет в объект индексы кубов файла. Для начала получим массив `names`, хранящий все названия кубов.  В массиве `headersFile` хранятся все заголовки по порядку. Пройдемся по всем заголовкам массива `headersFile` и найдем искомый индекс нужного куба с помощью функции `findIndex`. Метод `findIndex` возвращает индекс в массиве, если элемент удовлетворяет условию проверяющей функции. В качестве элементов выступают значения объекта, которые перебираются в цикле `forEach`. Затем найденный индекс добавится в объект. Далее вызываем функцию.

```js
function writeIndexCubes() 
{
    const names = Object.keys(CUBES_MK.indexCubes);
    
    names.forEach(name => {
        const index = headersFile.findIndex(header =>header === CUBES_MK.indexCubes[name] );
        CUBES_MK.indexCubes[name] = index;
    });
}

for (let rowArray of generator) {
    let row = [];
    
    if (firstLaunch) {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
            headersFile.push(element);
        })
    const headers = Object.values(CUBES_MK.valueCubes);
    headers.forEach(header => {
        row.push(header);
    });
    writeIndexCubes();
    firstLaunch = false;
    }
}
```
Мы успешно записали первую строку файла. В следующей строке без изменений записываем заголовки измерений. Добавим ветку `else`, это значит, что строка не является первой.
```js
for (let rowArray of generator) {
    let row = [];
    
    if (firstLaunch) {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
            headersFile.push(element);
        })
    const headers = Object.values(CUBES_MK.valueCubes);
    headers.forEach(header => {
        row.push(header);
    });
    writeIndexCubes();
    firstLaunch = false;
    }
    else {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
        })
    }
}
```
Далее изменяем кубы. Свойство объекта `CUBES_MK.indexCubes.cubePoints` содержит индекс куба 'Уровень игрока' в массиве `rowArray`. Обратимся по индексу к кубу и проверим, что он больше пяти. В зависимости от этого условия модифицируем кубы объекта `CUBES_MK.valueCubes`. Затем получим массив значений кубов `valueCubes`. Добавляем значения массива в массив `row`, предварительно используя `spread` оператор.
```js
for (let rowArray of generator) {
    let row = [];
    
    if (firstLaunch) {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
            headersFile.push(element);
        })
    const headers = Object.values(CUBES_MK.valueCubes);
    headers.forEach(header => {
        row.push(header);
    });
    writeIndexCubes();
    firstLaunch = false;
    }
    else {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
        })
        if (rowArray[CUBES_MK.indexCubes.cubePoints] > 5) {
            CUBES_MK.valueCubes.cubePoints = Math.round(Math.random() * 10) + 5;
            CUBES_MK.valueCubes.cubePrize = "Меч Иссинхдора";
        }
        else {
            CUBES_MK.valueCubes.cubePoints = rowArray[CUBES_MK.indexCubes.cubePoints];
            CUBES_MK.valueCubes.cubePrize = "Меч 3 уровня";
        }
        const valueCubes = Object.values(CUBES_MK.valueCubes);
        row.push(...valueCubes);
    }
}
```

Итоговый код: 
```js
const CUBES_MK = {
    valueCubes: {
        cubePrize: "Приз",
        cubePoints: "Уровень игрока"
    },
    indexCubes: {
        cubePoints: "Уровень игрока"
    }
};

const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open("Уровни игроков");

const pivot = multicubeTab.pivot();
const grid = pivot.create();

const storageExporter = grid.storageExporter().setFormat("csv");
const exportResult = storageExporter.export().copyToLocal("export"); 

const localFileSystem = om.filesystems.local();
const filePath = localFileSystem.getPathObj("export");
const fileManager = om.filesystems.filesDataManager();
const csvReader = fileManager.csvReader(filePath);
const generator = csvReader.generator();
let writer = fileManager.csvWriter();

const definitionInfo = grid.getDefinitionInfo();
const columnDimensions = definitionInfo.getColumnDimensions();
const columnLength = columnDimensions.length;
const rowDimensions = definitionInfo.getRowDimensions();
const rowLength = rowDimensions.length;
const dimensionsLength = rowLength + columnLength - 1;

let firstLaunch = true;
const headersFile = [];

function writeIndexCubes() 
{
    const names = Object.keys(CUBES_MK.indexCubes);
    
    names.forEach(name => {
        const index = headersFile.findIndex(header =>header === CUBES_MK.indexCubes[name] );
        CUBES_MK.indexCubes[name] = index;
    });
}
for (let rowArray of generator) {
    let row = [];
    
    if (firstLaunch) {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
            headersFile.push(element);
        })
    const headers = Object.values(CUBES_MK.valueCubes);
    headers.forEach(header => {
        row.push(header);
    });
    writeIndexCubes();
    firstLaunch = false;
    }
    else {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
        })
        if (rowArray[CUBES_MK.indexCubes.cubePoints] > 5) {
            CUBES_MK.valueCubes.cubePoints = Math.round(Math.random() * 10) + 5;
            CUBES_MK.valueCubes.cubePrize = "Меч Иссинхдора";
        }
        else {
            CUBES_MK.valueCubes.cubePoints = rowArray[CUBES_MK.indexCubes.cubePoints];
            CUBES_MK.valueCubes.cubePrize = "Меч 3 уровня";
        }
        const valueCubes = Object.values(CUBES_MK.valueCubes);
        row.push(...valueCubes);
    }
}
```
## Запись в новый csv   
Для записи в новый csv понадобится интерфейс CsvWriter.

У интерфейса `FilesDataManager` вызовем функцию `csvWriter` и получим интерфейс [CsvWriter](). В цикле запишем строку с помощью функции `writeRow`.
Для записи массива типа `string[][]` нужно использовать функцию `writeRows`. Когда все строки из цикла записаны, используем функцию `save` для сохранения файла в рабочей директории скрипта под именем `import`. 
```js
let writer = fileManager.csvWriter();

for (let rowArray of generator) {
    writer.writeRow(rowArray);
}

writer.save("import","WINDOWS-1251");
```
Нам необходимо будет записать массив row в файл.
Итоговый код :
```js
const CUBES_MK = {
    valueCubes: {
        cubePrize: "Приз",
        cubePoints: "Уровень игрока"
    },
    indexCubes: {
        cubePoints: "Уровень игрока"
    }
};

const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open("Уровни игроков");

const pivot = multicubeTab.pivot();
const grid = pivot.create();

const storageExporter = grid.storageExporter().setFormat("csv");
const exportResult = storageExporter.export().copyToLocal("export"); 

const localFileSystem = om.filesystems.local();
const filePath = localFileSystem.getPathObj("export");
const fileManager = om.filesystems.filesDataManager();
const csvReader = fileManager.csvReader(filePath);
const generator = csvReader.generator();
let writer = fileManager.csvWriter();

const definitionInfo = grid.getDefinitionInfo();
const columnDimensions = definitionInfo.getColumnDimensions();
const columnLength = columnDimensions.length;
const rowDimensions = definitionInfo.getRowDimensions();
const rowLength = rowDimensions.length;
const dimensionsLength = rowLength + columnLength - 1;

let firstLaunch = true;
const headersFile = [];

function writeIndexCubes() 
{
    const names = Object.keys(CUBES_MK.indexCubes);
    
    names.forEach(name => {
        const index = headersFile.findIndex(header =>header === CUBES_MK.indexCubes[name] );
        CUBES_MK.indexCubes[name] = index;
    });
}

for (let rowArray of generator) {
    let row = [];
    
    if (firstLaunch) {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
            headersFile.push(element);
        })
    const headers = Object.values(CUBES_MK.valueCubes);
    headers.forEach(header => {
        row.push(header);
    });
    writeIndexCubes();
    firstLaunch = false;
    }
    else {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
        })
        if (rowArray[CUBES_MK.indexCubes.cubePoints] > 5) {
            CUBES_MK.valueCubes.cubePoints = Math.round(Math.random() * 10) + 5;
            CUBES_MK.valueCubes.cubePrize = "Меч Иссинхдора";
        }
        else {
            CUBES_MK.valueCubes.cubePoints = rowArray[CUBES_MK.indexCubes.cubePoints];
            CUBES_MK.valueCubes.cubePrize = "Меч 3 уровня";
        }
        const valueCubes = Object.values(CUBES_MK.valueCubes);
        row.push(...valueCubes);
    }
    writer.writeRow(row);
}

writer.save("import");
```
## Импорт обратно в мультикуб
Получаем ссылку на быстрый интерфейс импорта [StorageImporter]() с помощью функции `storageImporter` полученного выше интерфейса `Tab`. Задаем имя импортируемого файла `import.csv` и производим импорт в `grid`.
```js
const storageImporter = multicubeTab.storageImporter();
storageImporter.setFilePath("import.csv").import();
```
Теперь скачаем файл отчета после импорта. Вызовем функцию `getReportFilePath` для получения пути файла отчета. Далее используем функцию `makeGlobalFile` интерфейса [Filesystem](). Эта функция регистрирует уже существующий файл в глобальном реестре и возвращает его хэш. Далее скачиваем файл с использованием уже знакомой нам функции `addFileHash`.

```js
const reportFilePath = storageImporter.setFilePath("import.csv").import().getReportFilePath();

const hashReport = localFileSystem.makeGlobalFile("report","csv",reportFilePath,false);
resultInfo.addFileHash(hashReport);
```
Итоговый код :
```js
const CUBES_MK = {
    valueCubes: {
        cubePrize: "Приз",
        cubePoints: "Уровень игрока"
    },
    indexCubes: {
        cubePoints: "Уровень игрока"
    }
};

const multicubesTab = om.multicubes.multicubesTab();
const multicubeTab = multicubesTab.open("Уровни игроков");

const pivot = multicubeTab.pivot();
const grid = pivot.create();

const storageExporter = grid.storageExporter().setFormat("csv");
const exportResult = storageExporter.export().copyToLocal("export"); 
const resultInfo = om.common.resultInfo();

const localFileSystem = om.filesystems.local();
const filePath = localFileSystem.getPathObj("export");
const fileManager = om.filesystems.filesDataManager();
const csvReader = fileManager.csvReader(filePath);
const generator = csvReader.generator();
let writer = fileManager.csvWriter();

const definitionInfo = grid.getDefinitionInfo();
const columnDimensions = definitionInfo.getColumnDimensions();
const columnLength = columnDimensions.length;
const rowDimensions = definitionInfo.getRowDimensions();
const rowLength = rowDimensions.length;
const dimensionsLength = rowLength + columnLength - 1;

let firstLaunch = true;
const headersFile = [];

function writeIndexCubes() 
{
    const names = Object.keys(CUBES_MK.indexCubes);
    
    names.forEach(name => {
        const index = headersFile.findIndex(header =>header === CUBES_MK.indexCubes[name] );
        CUBES_MK.indexCubes[name] = index;
    });
}

for (let rowArray of generator) {
    let row = [];
    
    if (firstLaunch) {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
            headersFile.push(element);
        })
    const headers = Object.values(CUBES_MK.valueCubes);
    headers.forEach(header => {
        row.push(header);
    });
    writeIndexCubes();
    firstLaunch = false;
    }
    else {
        rowArray.forEach((element,index) => {
            if (index < dimensionsLength) {
                row.push(element);
            }
        })
        if (rowArray[CUBES_MK.indexCubes.cubePoints] > 5) {
            CUBES_MK.valueCubes.cubePoints = Math.round(Math.random() * 10) + 5;
            CUBES_MK.valueCubes.cubePrize = "Меч Иссинхдора";
        }
        else {
            CUBES_MK.valueCubes.cubePoints = rowArray[CUBES_MK.indexCubes.cubePoints];
            CUBES_MK.valueCubes.cubePrize = "Меч 3 уровня";
        }
        const valueCubes = Object.values(CUBES_MK.valueCubes);
        row.push(...valueCubes);
    }
    writer.writeRow(row);
}

writer.save("import");
const storageImporter = multicubeTab.storageImporter();
const reportFilePath = storageImporter.setFilePath("import.csv").import().getReportFilePath();

const hashReport = localFileSystem.makeGlobalFile("report","csv",reportFilePath,false);
resultInfo.addFileHash(hashReport);
```



[Курс молодого бойца](cookBook.md)

[Оглавление](../README.md)
