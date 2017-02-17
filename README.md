
# bloggify-github-login

 [![Version](https://img.shields.io/npm/v/bloggify-github-login.svg)](https://www.npmjs.com/package/bloggify-github-login) [![Downloads](https://img.shields.io/npm/dt/bloggify-github-login.svg)](https://www.npmjs.com/package/bloggify-github-login)

> Login with GitHub for Bloggify.

## :cloud: Installation

```sh
$ npm i --save bloggify-github-login
```


## :clipboard: Example



```js
const bloggifyGithubLogin = require("bloggify-github-login");

console.log(bloggifyGithubLogin());
```

## :memo: Documentation


### Plugin Configuration

 - `loginURI` (String): The application login url.
 - `callbackURI`(String): The application login callback url.
 - `githubClient` (String): The application client id.
 - `githubSecret` (String): The application client secret.
 - `scope` (String): The user scopes (default: `user:email`).

 To create a GitHub application, [click here](https://github.com/settings/applications/new).

 :arrow_up: The following events are emitted by the module:

  - **`login-error`** (err, [lien](https://github.com/LienJS/Lien), ghApiClient)

    An error happened durring the error.

  - **`login-success`** token, user, res.lien, ghApiClient);

     The user metadata was fetched. If you don't want to fetch

  - **`token`** (token, lien, ghApiClient)

     Emitted when the token is successfully got.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].



## :scroll: License

[MIT][license] © [Bloggify][website]

[license]: http://showalicense.com/?fullname=Bloggify%20%3Csupport%40bloggify.org%3E%20(https%3A%2F%2Fbloggify.org)&year=2016#license-mit
[website]: https://bloggify.org
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
