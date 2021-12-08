const users = [
    {
        name: 'react',
        owner: 'facebook',
        stars: 145231
    },
    {
        name: 'angular',
        owner: 'angular',
        stars: 59457
    },
    {
        name: 'vue',
        owner: 'vuejs',
        stars: 160897
    }
];

const githubList = document.querySelector('.github-api__list');

const addGithubUser = (arrUsers) => {
    arrUsers.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.classList = "github-api__item user";
        const htmlNode = `
            <ul class="user__list">
                <li class="user__item user__name">
                    <p>Name:</p>
                    <p>${item.name}</p>
                </li>
                <li class="user__item user__owner">
                    <p>Owner:</p>
                    <p>${item.owner}</p>
                </li>
                <li class="user__item user__stars">
                    <p>Stars:</p>
                    <p>${item.stars}</p>
                </li>
            </ul>
            <div class="btn">
            </div>
        `;
        listItem.innerHTML = htmlNode;
        githubList.appendChild(listItem);
    });
};

addGithubUser(users);

