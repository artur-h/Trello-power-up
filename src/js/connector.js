const WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
const BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';

function createUserList(data) {
  const tmpArray = [];
  const updatedUserList = [];
  data.forEach( card => {
    updatedUserList.push(...(card.members.filter( member => addUser(member, tmpArray))));
  });

  return updatedUserList;
}

function addUser(member, tmpArray) {
  if (tmpArray.indexOf(member.id) === -1) {
    tmpArray.push(member.id);
    return true
  }
  return false;
}

function generateList(info) {
  const userList = createUserList(info);
  const allProjectsDoneByUser = {};
  userList.forEach(user => {
    allProjectsDoneByUser[user.id] = [];

    info.forEach(card => card.members.forEach( member => {
      if (member.id === user.id) {
        allProjectsDoneByUser[user.id].push(card);
      }
    }))
  })

  return {
    data: info,
    userList: userList,
    allProjectsDoneByUser: allProjectsDoneByUser
  }
}

function renderUserList(projects, users) {
  for (let key in projects) {
    document.getElementById('list').innerHTML += formatUserList(key, users, projects)
    console.log(document.getElementById('list'));
  }
}

function formatUserList(userId, users, projects) {
  const user = users.find(currentUser => {
    if (currentUser.id === userId) return true;
  })

  return `<div class="employee">
    <h3 class="employee__name">${user.fullName}</h3>
    <div class="employee__username">${user.username}</div>
    <img src="${user.avatar}" alt="Employee's avatar" class="employee__avatar">
    ${renderProjectList(user.id, projects)}
    </div>
  `
}

function renderProjectList(id, projects) {
  return `
    <ol class="project">
      ${projects[id].map(card => formatProjectList(card)).join('')}
    </ol>
  `
}

function formatProjectList(project) {
  return `
    <li>
      <span class="project__status">List name</span>
      <a href="${project.url}" class="project__card-link">${project.name}</a>
    </li>
  `
}

function onBtnClick(t, opts) {
  return t.cards('all')
    .then(function (cards) {
      return generateList(cards);
    }).then(function (info) {
      renderUserList(info.allProjectsDoneByUser, info.userList)
      }).then(function () {
      return t.modal({
        url: 'https://wedcat-trello-power-up.netlify.com/',
        fullscreen: true
      })
    });
}

window.TrelloPowerUp.initialize({
  'board-buttons': function (t, opts) {
    return {
      icon: {
        dark: WHITE_ICON,
        light: BLACK_ICON
      },
      text: 'Callback',
      callback: onBtnClick,
      condition: 'admin'
    }
  }
});