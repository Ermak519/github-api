const githubList = document.querySelector('.github-api__list');
const input = document.querySelector('input');
const dropdownList = document.querySelector('.dropdown__list')
const dropdownItems = document.querySelectorAll('.dropdown__item')
let arrQuery = []

const getGithubData = async (query) => {
    if (query) {
        const data = await fetch(`https://api.github.com/search/repositories?q=${query}+&sort=stars`);
        !data ? dropdownList.classList.remove('show') : dropdownList.classList.add('show');
        const { items } = await data.json();
        arrQuery = items.slice()
        dropdownItems.forEach((item, i) => {
            item.textContent = items[i].name;
            item.dataset.idrepo = items[i].id
        });
        return items;
    } else {
        dropdownList.classList.remove('show');
    }

}

const addGithubCard = (user) => {
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

const onChange = async (e) => {
    await getGithubData(e.target.value);
}

dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
        dropdownList.classList.remove('show');
        input.value = '';
        const repo = arrQuery.filter(obj => obj.id == item.dataset.idrepo)
        addGithubCard(...repo);
    });
});

input.addEventListener('keyup', debounce(onChange, 180));

