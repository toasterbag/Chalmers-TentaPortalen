# Course portal
A service to explore course statistics and exams at Chalmers University of Technology (not affiliated).

Official instance at: [https://tenta.davebay.net](https://tenta.davebay.net)

## Development
### Setup
 - [Docker](https://docs.docker.com/get-docker/)
 <!-- - [node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) -->

Depending on your system you will need additional software.

*Windows*
 - [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install)

*Linux*
 - [docker-compose](https://docs.docker.com/compose/install/)

### Running the code
Start by running `docker-compose up -d redis postgres` to start the databases and web frontend.

Run `./scripts/init.sh` to fetch the latest database dump from the official instance and seed the dev database with live data. Then run `docker-compose up app` to start the app. To see changes on the backend you have to restart it with `docker-compose up app`.

The web frontend has to be run on the host for now. `cd` into `./web` and run `yarn serve`. Any changes to the frontend will reload on the fly (hot-reload).

Developing through docker is the only officially supported way. It is expected that all code is tested on the docker setup. This is to ensure that all setups work the same. You are however welcome to suggest changes or develop in a way that suits you.

## Reporting issues
If you find any issues with the service please report them here on github or through [this link](https://tenta.davebay.net/feedback). If you provide sample pages and behaviour to recreate the problem will be fixed much faster! You are welcome to report issues in either English or Swedish, whatever you are most comfortable with.

## Deploying
The current official instance is located at [https://tenta.davebay.net](https://tenta.davebay.net). I welcome others to host their own but consider if perhaps there would be greater benefit if there were cooperation rather than a split as for example the different instances would not be able to share exam databases without effort.

I am committed to supporting this project until at least 2024!

## How to contribute

### Before starting
It's not important that everything is done exactly as written, I want this to be easy and welcoming so if you have any ideas start by creating an issue and I will help you through the process! Don't worry about breaking the api, it is currently not a priority to enable external projects to use our api. The recommendation is rather to download one of our dumps and process it themselves.

### Doing the actual work 
Make your changes to the code and try it locally by following the setup instructions. If it works and no tests fail then you are probably ready to do a pull request. Never hesitate to create an issue if you have questions.

Commit regurarily but strive for all commits to work on their own, though this is not mandatory. The real importance is that the final commit works as intended. 

### Committing
This project uses conventional commits to provide uniform commit messages. Instead of using git on your own you are encouraged to use `npx commit` as this helps you to conform to the style guide.

The `<type>` is usually either `feat` if you are adding a new feature or `fix` if you are fixing a bug. Other possible types are: style, refactor, build, perf, ci, docs, test, chore, revert. It is easy to change commit messages so do not worry to much if you don't pick the correct one.

The `<scope>` is either `web`, `backend`, `import` or `meta` depending on if your are changing the web frontend or backend. If you are writing a new importer, you should specify `import` even though its a part of the backend. `meta` can be regarded as "everything else".'

`<subject>` is a short summary of the commit. Write in present tense, e.g. change, not changes or changed. Start with lowercase. Do not end with a dot, `.`. The subject should be short.

`<body>` is for writing more information about the commit.

`<footer>` is for mentioning large changes or referencing issues. For example if this commit fixed a bug from issue #43 on Github then you could write `Closes #43` or multiple issues: `Closes #43, #45`. If you have added a new data source you might write that here.

