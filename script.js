const githubList = document.querySelector('.github-api__list');
const input = document.querySelector('input');
const dropdownList = document.querySelector('.dropdown__list')
const dropdownItems = document.querySelectorAll('.dropdown__item')
let arr = []

async function getGithubData(query) {
    !query ? dropdownList.classList.remove('show') : dropdownList.classList.add('show');

    const data = await fetch(`https://api.github.com/search/repositories?q=${query}+&sort=stars`);
    const { items } = await data.json();
    arr = items.slice()
    dropdownItems.forEach((item, i) => {
        item.textContent = items[i].name;
        item.dataset.idrepo = items[i].id
    })
}

function githubCard(user) {
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
            <div class="btn">
            </div>
        `;
    listItem.innerHTML = htmlNode;
    githubList.appendChild(listItem);

    const btn = listItem.querySelector('.btn')
    btn.addEventListener('click', () => {
        listItem.remove()
    });
};

function debounce(fn, debounceTime) {
    let timeOut;
    return function () {
        const wrapper = () => { fn.apply(this, arguments) }
        clearTimeout(timeOut)
        timeOut = setTimeout(wrapper, debounceTime)
    }
};

function onChange(e) {
    getGithubData(e.target.value)
}

input.addEventListener('keyup', debounce(onChange, 180));

dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
        dropdownList.classList.remove('show');
        input.value = '';
    });
    item.addEventListener('click', () => {
        const repo = arr.filter(obj => obj.id == item.dataset.idrepo)
        githubCard(...repo)
    })
})







