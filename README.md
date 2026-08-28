https://github-profile-searcher-bhuvan.netlify.app/
# GitHub Profile Searcher

A beginner-friendly, responsive web app that searches the public GitHub API for a user profile and their five most recently updated public repositories.

## Features

- Search any public GitHub username
- Profile image, name, bio, followers, following, and public-repository count
- Five most recently updated public repositories
- Loading spinner while data is being fetched
- Clear **User not found** message for invalid usernames
- Responsive layout for phones, tablets, and desktops
- No frameworks, build tools, API keys, or installation required

## Project files

```text
github-profile-searcher/
├── index.html    # Page structure
├── style.css     # Responsive styles
├── script.js     # Fetch API and page behavior
└── README.md     # This guide
```

## Run it locally

1. Download or clone this project.
2. Open the `github-profile-searcher` folder.
3. Double-click `index.html` to open it in your web browser.
4. Type a public GitHub username (for example, `octocat`) and select **Search**.

That is all—this project uses the public GitHub API, so no API key is needed for normal use.

### Optional: run with VS Code Live Server

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

## Publish it on GitHub Pages

1. Create a new repository on GitHub, such as `github-profile-searcher`.
2. Upload the four project files (`index.html`, `style.css`, `script.js`, and `README.md`) to the repository's top level.
3. In the repository, open **Settings** → **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. Wait a minute or two. GitHub will display the public website address on the Pages settings screen.

## How it works

`script.js` makes two requests with JavaScript's built-in `fetch()` function:

- `https://api.github.com/users/USERNAME` gets profile information.
- `https://api.github.com/users/USERNAME/repos?sort=updated&per_page=5` gets the newest five repositories.

The app shows a loading state during these requests. If GitHub returns a 404 response, it shows the **User not found** message instead.

## Note about API limits

GitHub limits unauthenticated requests to its public API. This is plenty for a small demo, but repeated searches may temporarily hit the limit. Waiting for the limit to reset will make searches work again.
