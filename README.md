# Course statistics app

Better instructions are coming soon, I promise!


## Development
### Setup
 - [Docker](https://docs.docker.com/get-docker/)
 - [node and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Depending on your system you will need additional software.

*Windows*
 - [WSL2](https://docs.microsoft.com/en-us/windows/wsl/install)

*Linux*
 - [docker-compose](https://docs.docker.com/compose/install/)

### Running the code
Clone the repo and download a recent db dump from [TODO]().

Run `./init.sh db_dump.tar.gz` to create a clean state. Then run `docker-compose up` to start the app. Any changes to the frontend will reload on the fly (hot-reload) but to see changes on the backend you have to restart it with `docker-compose up`.

Developing through docker is the only officially supported way. It is expected that all code is tested on the docker setup. This is to ensure that all setups work the same.

## Deploying
The current official instance is located at [https://tenta.davebay.net](https://tenta.davebay.net). I welcome others to host their own but consider if perhaps there would be greater benefit if there were cooperation rather than a split as for example the different instances would not be able to share exam databases.

I am committed to supporting this instance until at least 2023!

## How to contribute

### Before starting
It's not important that everything is done exactly as written, I want this to be easy and welcoming so if you have any ideas start by creating an issue and ill help you through the process! Don't worry about breaking the api, it is currently not a priority to enable external projects to use our api. The recommendation is rather to download one of our backups and process it themselves.

### Doing the actual work 
Make your changes to the code and try it locally by following the setup instructions. If it works and no tests fail then you are probably ready to do a pull request. Never hesitate to create an issue if you have questions.

Commit regurarily but strive for all commits to work on their own, though this is not mandatory. The real importance is that the final commit works as intended. 

### Committing
This project uses conventional commits to provide uniform commit messages. Instead of using git on your own you are encouraged to use `npx commit` as this helps you to conform to the style guide.

The \<type\> is usually either `feat` if you are adding a new feature or `fix` if you are fixing a bug.

The \<scope\> is either `frontend`, `backend`, `import` or `meta` depending on if your are changing the web frontend or backend. If you are writing a new importer, you should specify `import` even though its a part of the backend. `meta` can be regarded as "everything else".'

\<subject\> is a short summary of the commit. Write in present tense, change, not changes or changed. Start with lowercase. Do not end with a `.`. The subject should be short.

\<body\> is for writing more extensive information about the commit.

\<footer\> is for mentioning large changes or referencing issues. For example if this commit fixed a bug from issue #43 on github then you could write `Closes #43` or multiple issues: `Closes #43, #45`.

### Pull request
TODO
