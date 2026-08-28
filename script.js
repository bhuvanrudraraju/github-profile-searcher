// GitHub Profile Searcher - built with the public GitHub REST API and Fetch.
const form = document.querySelector('#search-form');
const input = document.querySelector('#username');
const results = document.querySelector('#results');
const states = document.querySelectorAll('.state-card');
const profileCard = document.querySelector('#profile-card');
const repositories = document.querySelector('#repositories');

function show(element) {
  states.forEach((state) => state.classList.add('hidden'));
  profileCard.classList.add('hidden');
  element.classList.remove('hidden');
}

function number(value) {
  return new Intl.NumberFormat().format(value);
}

function displayProfile(user, repos) {
  document.querySelector('#avatar').src = user.avatar_url;
  document.querySelector('#avatar').alt = `${user.login}'s profile picture`;
  document.querySelector('#profile-name').textContent = user.name || user.login;
  const login = document.querySelector('#profile-login');
  login.textContent = `@${user.login}`;
  login.href = user.html_url;
  document.querySelector('#github-link').href = user.html_url;
  document.querySelector('#bio').textContent = user.bio || 'This GitHub user has not added a bio yet.';
  document.querySelector('#followers').textContent = number(user.followers);
  document.querySelector('#following').textContent = number(user.following);
  document.querySelector('#public-repos').textContent = number(user.public_repos);

  repositories.innerHTML = '';
  if (!repos.length) {
    repositories.innerHTML = '<p class="empty-repos">No public repositories found.</p>';
  } else {
    repos.forEach((repo) => {
      const item = document.createElement('a');
      item.className = 'repo';
      item.href = repo.html_url;
      item.target = '_blank';
      item.rel = 'noopener noreferrer';
      item.innerHTML = `<div><div class="repo-name">${repo.name}</div><p class="repo-description">${repo.description || 'No description provided.'}</p></div><div class="repo-meta"><span>★ ${number(repo.stargazers_count)}</span><span>${repo.language || 'Code'}</span></div>`;
      repositories.append(item);
    });
  }
  show(profileCard);
}

async function searchUser(username) {
  show(document.querySelector('#loading-state'));
  results.setAttribute('aria-busy', 'true');
  try {
    const userResponse = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    if (userResponse.status === 404) throw new Error('not-found');
    if (!userResponse.ok) throw new Error('request-failed');
    const user = await userResponse.json();
    const reposResponse = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=5`);
    if (!reposResponse.ok) throw new Error('request-failed');
    displayProfile(user, await reposResponse.json());
  } catch (error) {
    const title = document.querySelector('#error-title');
    const message = document.querySelector('#error-message');
    if (error.message === 'not-found') {
      title.textContent = 'User not found';
      message.textContent = 'That GitHub username does not exist. Check the spelling and try again.';
    } else {
      title.textContent = 'Something went wrong';
      message.textContent = 'We could not reach GitHub right now. Please try again in a moment.';
    }
    show(document.querySelector('#error-state'));
  } finally {
    results.setAttribute('aria-busy', 'false');
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = input.value.trim();
  if (username) searchUser(username);
  else input.focus();
});

document.querySelectorAll('[data-username]').forEach((button) => {
  button.addEventListener('click', () => {
    input.value = button.dataset.username;
    searchUser(input.value);
  });
});
