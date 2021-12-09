const githubList = document.querySelector('.github-api__list');
const input = document.querySelector('input');
const dropdownList = document.querySelector('.dropdown__list')
const dropdownItems = document.querySelectorAll('.dropdown__item')
dropdownList.addEventListener('change', () => {
    !input.value ? console.log('dskjf') : console.log('11111111111')
})
async function getGithubData(query) {
    const URL = `https://api.github.com/search/repositories?q=${query}`;
    const data = await fetch(URL);
    const { items } = await data.json();
    dropdownItems.forEach((item, i) => {
        item.textContent = items[i].name
    })
}

const debounce = (fn, debounceTime) => {
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

onChange = debounce(onChange, 500)
input.addEventListener('keyup', onChange)


const addGithubUser = (...arrUsers) => {
    const listItem = document.createElement('li');
    listItem.classList.add("github-api__item", 'user');
    const htmlNode = `
            <ul class="user__list">
                <li class="user__item user__name">
                    <p>Name:</p>
                    <p>${arrUsers[0]}</p>
                </li>
                <li class="user__item user__owner">
                    <p>Owner:</p>
                    <p>${arrUsers[1]}</p>
                </li>
                <li class="user__item user__stars">
                    <p>Stars:</p>
                    <p>${arrUsers[2]}</p>
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

dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
        console.log('click')
        addGithubUser()
    })
})


