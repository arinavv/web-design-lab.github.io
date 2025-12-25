// Функции лабораторной работы
function multiply(a, b) {
    return a * b;
}

function trimSpaces(str) {
    return str.trim();
}

function isSame(a, b) {
    return a === b;
}

function hasKey(obj, key) {
    return key in obj;
}

function getLastElement(array) {
    if (array.length === 0) return undefined;
    return array[array.length - 1];
}

function logEven(array) {
    array.forEach(function(element) {
        if (typeof element === 'number' && element % 2 === 0) {
            console.log(element);
        }
    });
}

function doubleElements(array) {
    return array.map(function(element) {
        return element * 2;
    });
}

// Вспомогательные функции
function addResult(elementId, message, type = 'info') {
    const container = document.getElementById(elementId);
    const div = document.createElement('div');
    div.className = `result-item ${type}`;
    div.innerHTML = `<span class="result-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span> ${message}`;
    container.appendChild(div);
}

function clearResults(elementId) {
    document.getElementById(elementId).innerHTML = '';
    const consoleOutput = document.getElementById('console6');
    if (consoleOutput) {
        consoleOutput.style.display = 'none';
        consoleOutput.innerHTML = '';
    }
}

function clearAll() {
    for (let i = 1; i <= 7; i++) {
        clearResults(`task${i}`);
    }
}

// Тесты
function testMultiply() {
    const resultId = 'task1';
    clearResults(resultId);
    
    const tests = [
        {args: [2, 3], expected: 6},
        {args: [0, 5], expected: 0},
        {args: [-4, 6], expected: -24}
    ];
    
    tests.forEach(test => {
        const result = multiply(...test.args);
        const success = result === test.expected;
        addResult(resultId, 
            `multiply(${test.args.join(', ')}) = ${result} ${success ? '✓' : `✗ (ожидается: ${test.expected})`}`, 
            success ? 'success' : 'error'
        );
    });
}

function testTrimSpaces() {
    const resultId = 'task2';
    clearResults(resultId);
    
    const tests = [
        {input: "  Hello  ", expected: "Hello"},
        {input: "World   ", expected: "World"},
        {input: "   Test Case   ", expected: "Test Case"}
    ];
    
    tests.forEach(test => {
        const result = trimSpaces(test.input);
        const success = result === test.expected;
        addResult(resultId, 
            `trimSpaces("${test.input}") = "${result}" ${success ? '✓' : `✗ (ожидается: "${test.expected}")`}`, 
            success ? 'success' : 'error'
        );
    });
}

function testIsSame() {
    const resultId = 'task3';
    clearResults(resultId);
    
    const tests = [
        {args: [true, true], expected: true},
        {args: [false, false], expected: true},
        {args: [true, false], expected: false},
        {args: [false, true], expected: false}
    ];
    
    tests.forEach(test => {
        const result = isSame(...test.args);
        const success = result === test.expected;
        addResult(resultId, 
            `isSame(${test.args.map(a => a.toString()).join(', ')}) = ${result} ${success ? '✓' : `✗ (ожидается: ${test.expected})`}`, 
            success ? 'success' : 'error'
        );
    });
}

function testHasKey() {
    const resultId = 'task4';
    clearResults(resultId);
    
    const obj = {name: "John", age: 30, city: "Minsk"};
    const tests = [
        {key: "name", expected: true},
        {key: "age", expected: true},
        {key: "country", expected: false},
        {key: "city", expected: true}
    ];
    
    tests.forEach(test => {
        const result = hasKey(obj, test.key);
        const success = result === test.expected;
        addResult(resultId, 
            `hasKey(obj, "${test.key}") = ${result} ${success ? '✓' : `✗ (ожидается: ${test.expected})`}`, 
            success ? 'success' : 'error'
        );
    });
}

function testGetLastElement() {
    const resultId = 'task5';
    clearResults(resultId);
    
    const tests = [
        {array: [1, 2, 3, 4, 5], expected: 5},
        {array: ["a", "b", "c"], expected: "c"},
        {array: [], expected: undefined},
        {array: [42], expected: 42}
    ];
    
    tests.forEach(test => {
        const result = getLastElement(test.array);
        const success = result === test.expected;
        const arrayStr = JSON.stringify(test.array);
        addResult(resultId, 
            `getLastElement(${arrayStr}) = ${result} ${success ? '✓' : `✗ (ожидается: ${test.expected})`}`, 
            success ? 'success' : 'error'
        );
    });
}

function testLogEven() {
    const resultId = 'task6';
    const consoleId = 'console6';
    clearResults(resultId);
    
    const testArray = [1, 2, 3, 4, 5, 6];
    const consoleOutput = document.getElementById(consoleId);
    
    // Перехват console.log
    const originalLog = console.log;
    const logs = [];
    console.log = function(...args) {
        logs.push(args.join(' '));
        originalLog.apply(console, args);
    };
    
    // Выполнение теста
    logEven(testArray);
    console.log = originalLog;
    
    // Отображение результатов
    const success = logs.length === 3 && logs.includes('2') && logs.includes('4') && logs.includes('6');
    addResult(resultId, 
        `logEven([1,2,3,4,5,6]) вывел ${logs.length} чисел ${success ? '✓' : '✗'}`, 
        success ? 'success' : 'error'
    );
    
    if (logs.length > 0) {
        addResult(resultId, `Выведено: ${logs.join(', ')}`, 'info');
        
        // Показать консольный вывод
        consoleOutput.style.display = 'block';
        consoleOutput.innerHTML = logs.map(log => `&gt; ${log}`).join('<br>');
    }
}

function testDoubleElements() {
    const resultId = 'task7';
    clearResults(resultId);
    
    const tests = [
        {array: [1, 2, 3], expected: [2, 4, 6]},
        {array: [0, -1, 5], expected: [0, -2, 10]},
        {array: [10, 20, 30], expected: [20, 40, 60]},
        {array: [], expected: []}
    ];
    
    tests.forEach(test => {
        const result = doubleElements(test.array);
        const success = JSON.stringify(result) === JSON.stringify(test.expected);
        const arrayStr = JSON.stringify(test.array);
        const resultStr = JSON.stringify(result);
        addResult(resultId, 
            `doubleElements(${arrayStr}) = ${resultStr} ${success ? '✓' : `✗ (ожидается: ${JSON.stringify(test.expected)})`}`, 
            success ? 'success' : 'error'
        );
    });
}

function testAll() {
    clearAll();
    setTimeout(() => {
        testMultiply();
        testTrimSpaces();
        testIsSame();
        testHasKey();
        testGetLastElement();
        testLogEven();
        testDoubleElements();
    }, 100);
}