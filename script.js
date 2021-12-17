const githubList = document.querySelector('.github-api__list');
const input = document.querySelector('input');
const dropdownList = document.querySelector('.dropdown__list');
const dropdownItems = document.querySelectorAll('.dropdown__item')
const arrQuery = []

const getGithubData = async (query) => {
    if (query) {
        const data = await fetch(`https://api.github.com/search/repositories?q=${query}+&sort=stars`);
        const { items } = await data.json();
        return items
    }
}

const renderGithubCard = (user) => {
    const { name, owner, stargazers_count } = user
    const listItem = document.createElement('li');
    listItem.classList.add("github-api__item", 'user');
    const htmlNode = `
            <ul class="user__list">
                <li class="user__item user__name">
                    <p>Name:</p>
                    <p>${name}</p>
                </li>
                <li class="user__item user__owner">
                    <p>Owner:</p>
                    <p>${owner.login}</p>
                </li>
                <li class="user__item user__stars">
                    <p>Stars:</p>
                    <p>${stargazers_count}</p>
                </li>
            </ul>
            <div class="cross-btn">
                    <img src="./src/cross7.svg" alt="1">
                    <img src="./src/cross8.svg" alt="1">
                </div>
        `;
    listItem.innerHTML = htmlNode;
    githubList.appendChild(listItem);

    const btn = listItem.querySelector('.cross-btn')
    btn.addEventListener('click', () => {
        listItem.remove()
    });
};

const debounce = (fn, debounceTime) => {
    let timeOut;
    return function () {
        const wrapper = () => { fn.apply(this, arguments) }
        clearTimeout(timeOut)
        timeOut = setTimeout(wrapper, debounceTime)
    }
};

const addItem = (e) => {
    const elem = e.target
    dropdownList.classList.remove('show');
    input.value = '';
    const repo = arrQuery.filter(obj => obj.id == elem.dataset.idrepo)
    renderGithubCard(...repo);
    elem.removeEventListener('click', addItem)
}

const renderListItems = (data) => {
    if(data){
        dropdownList.classList.add('show');
        dropdownItems.forEach((item, i) => {
            item.textContent = data[i].name;
            item.dataset.idrepo = data[i].id
            arrQuery[i] = data[i]
            item.addEventListener('click', addItem)
        });
    } else {
        dropdownList.classList.remove('show');
    }
}

const main = async (e) => {
    const searchedList  = await getGithubData(e.target.value);
    renderListItems(searchedList)
    console.log(arrQuery)
}

input.addEventListener('keyup', debounce(main, 500));

dropdownItems.forEach((item) => {
    item.addEventListener('click', addItem)
})