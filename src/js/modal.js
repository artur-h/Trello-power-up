const STANDARD_AVATAR = '../img/user.png';
let t = window.TrelloPowerUp.iframe();

t.render(function () {
  return t.cards('all')
    .then(function (cards) {
      return generateList(cards);
    }).then(function (info) {
      return renderUserList(info.allProjectsDoneByUser, info.userList);
    })
})

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
  }
}

function formatUserList(userId, users, projects) {
  const user = users.find(currentUser => {
    if (currentUser.id === userId) return true;
  })

  return `
    <div class="list__item">
      <div class="list__custom-block"></div>
      <div class="list__user-info">
        <img src="${user.avatar || STANDARD_AVATAR}" alt="${user.username}'s avatar" class="list__img">
        <div class="list__description">
          <h3 class="list__full-name">${user.fullName}</h3>
          <h4 class="list__user-name">@${user.username}</h4>
        </div>
      </div>
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
    <li class="project__card-link">
      <a href="${project.url}" class="project__card-name">${project.name}</a>
    </li>
  `
}