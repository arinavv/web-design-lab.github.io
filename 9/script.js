// DOM
const taskOutput = document.getElementById("taskOutput");
const postsList = document.getElementById("posts");
const ratesList = document.getElementById("rates");

const runTasksBtn = document.getElementById("runTasks");
const loadPostsBtn = document.getElementById("loadPosts");
const loadRatesProxyBtn = document.getElementById("loadRatesProxy");
const loadNBRBBtn = document.getElementById("loadNBRB");

// 1. Асинхронные задачи
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function task(name, time) {
    taskOutput.textContent += `${name} началась\n`;
    await delay(time);
    taskOutput.textContent += `${name} завершилась\n`;
}

runTasksBtn.onclick = async () => {
    taskOutput.textContent = "";
    await task("Задача 1", 1000);
    await task("Задача 2", 1500);
    await task("Задача 3", 2000);
    taskOutput.textContent += "Все задачи выполнены\n";
};

// 2. JSONPlaceholder
loadPostsBtn.onclick = async () => {
    postsList.innerHTML = "<li>Загрузка...</li>";

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    postsList.innerHTML = "";

    posts.slice(0, 10).forEach(post => {
        const li = document.createElement("li");
        li.textContent = post.title;
        postsList.appendChild(li);
    });
};

// 3. Курсы Belarusbank (proxy)
loadRatesProxyBtn.onclick = async () => {
    ratesList.innerHTML = "<li>Загрузка курсов (proxy)...</li>";

    try {
        const response = await fetch(
            "https://api.allorigins.win/raw?url=https://belarusbank.by/api/kursExchange"
        );
        const rates = await response.json();

        ratesList.innerHTML = "";

        rates.slice(0, 10).forEach(rate => {
            const li = document.createElement("li");
            li.textContent = `${rate.Cur_Abbreviation}: ${rate.Cur_OfficialRate}`;
            ratesList.appendChild(li);
        });
    } catch (error) {
        ratesList.innerHTML = "<li>Ошибка загрузки данных</li>";
    }
};

// 4. Курсы НБРБ (без proxy)
loadNBRBBtn.onclick = async () => {
    ratesList.innerHTML = "<li>Загрузка курсов НБРБ...</li>";

    try {
        const response = await fetch(
            "https://www.nbrb.by/api/exrates/rates?periodicity=0"
        );
        const rates = await response.json();

        ratesList.innerHTML = "";

        rates.slice(0, 10).forEach(rate => {
            const li = document.createElement("li");
            li.textContent = `${rate.Cur_Abbreviation}: ${rate.Cur_OfficialRate} BYN`;
            ratesList.appendChild(li);
        });
    } catch (error) {
        ratesList.innerHTML = "<li>Ошибка загрузки данных</li>";
    }
};
