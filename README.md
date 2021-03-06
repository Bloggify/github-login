<!-- Please do not edit this file. Edit the `blah` field in the `package.json` instead. If in doubt, open an issue. -->


















# bloggify-github-login

 [![Version](https://img.shields.io/npm/v/bloggify-github-login.svg)](https://www.npmjs.com/package/bloggify-github-login) [![Downloads](https://img.shields.io/npm/dt/bloggify-github-login.svg)](https://www.npmjs.com/package/bloggify-github-login)







> Login with GitHub for Bloggify.

















## :cloud: Installation

```sh
# Using npm
npm install --save bloggify-github-login

# Using yarn
yarn add bloggify-github-login
```













## :clipboard: Example



```js
const Bloggify = require("bloggify");
const GitHub = Bloggify.require("github-login");
const User = Bloggify.models.User;

// On successful login
GitHub.on("login-success", (token, user, lien) => {

    // Check if there is already an existing user
    User.get({
        username: user.login
    }, (err, existingUser) => {

        if (err) {
            Bloggify.log(err);
            return lien.redirect("/");
        }

        if (existingUser) {
            lien.startSession({
                user: existingUser
            });
        } else {
            const newUser = new Bloggify.models.User({
                username: user.login,
                email: user.emails[0].email,
                profile: {
                    bio: user.bio,
                    website: user.blog,
                    full_name: user.name,
                    picture: user.avatar_url,
                    github_username: user.login
                }
            });

            lien.startSession({
                user: newUser.toObject()
            });
        }

        lien.redirect("/");
    });
});
```











## :question: Get Help

There are few ways to get help:



 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:





## :memo: Documentation


### Plugin Configuration

- **Object** `config`:
 - `loginURI` (String): The application login url.
 - `callbackURI`(String): The application login callback url.
 - `githubClient` (String): The application client id.
 - `githubSecret` (String): The application client secret.
 - `scope` (String): The user scopes (default: `user:email`).

 To create a GitHub application, [click here](https://github.com/settings/applications/new).

#### Events

:arrow_up: The following events are emitted by the module:

 - **`login-error`** (`err`, [`lien`](https://github.com/LienJS/Lien), ghApiClient)

   An error happened durring the error.

 - **`login-success`** (`token`, `user`, `ctx`, `ghApiClient`)

    The user metadata was fetched. If you don't want to fetch

 - **`token`** (`token`, `ctx`, `ghApiClient`)

    Emitted when the token is successfully got.














## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].
























## :scroll: License

[MIT][license] © [Bloggify][website]






[license]: /LICENSE
[website]: https://bloggify.org
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
