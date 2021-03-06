"use strict"

const GitHubOAuth = require("github-oauth")
    , GitHub = require("gh.js")


/**
 * @name bloggify:init
 * @param  {Object} config
 *
 *  - `loginURI` (String): The application login url.
 *  - `callbackURI`(String): The application login callback url.
 *  - `githubClient` (String): The application client id.
 *  - `githubSecret` (String): The application client secret.
 *  - `scope` (String): The user scopes (default: `user:email`).
 *
 *  To create a GitHub application, [click here](https://github.com/settings/applications/new).
 *
 * #### Events
 *
 * :arrow_up: The following events are emitted by the module:
 *
 *  - **`login-error`** (`err`, [`lien`](https://github.com/LienJS/Lien), ghApiClient)
 *
 *    An error happened durring the error.
 *
 *  - **`login-success`** (`token`, `user`, `ctx`, `ghApiClient`)
 *
 *     The user metadata was fetched. If you don't want to fetch
 *
 *  - **`token`** (`token`, `ctx`, `ghApiClient`)
 *
 *     Emitted when the token is successfully got.
 */
exports.init = function (config) {

    config.baseURL = Bloggify.options.domain
    const ghClient = GitHubOAuth(config)

    // Set up the routes
    Bloggify.server.addPage(config.loginURI, ctx => {
        ctx.res.ctx = ctx
        ghClient.login(ctx.req, ctx.res)
    })

    Bloggify.server.addPage(config.callbackURI, ctx => {
        ctx.res.ctx = ctx
        ghClient.callback(ctx.req, ctx.res)
    })

    this.ghClient = ghClient
    this.ghApiClient = null

    ghClient.on("error", (err, res) => {
        this.emit("login-error", err, res.ctx, this.ghClient, this.ghApiClient)
    })

    ghClient.on("token", (token, res) => {
        if (token.error) {
            return ghClient.emit("error", token, res)
        }

        let ghApiClient = this.ghApiClient = new GitHub(token.access_token)
        this.emit("token", token, res.lien, this.ghClient, this.ghApiClient)

        ghApiClient.get("user", (err, user) => {

            if (err) {
                return ghClient.emit("error", err, res, ghApiClient)
            }

            ghApiClient.get("user/emails", (err, emails) => {

                if (err) {
                    return ghApiClient.emit("error", err, res)
                }

                user.emails = emails

                this.emit("login-success", token, user, res.ctx, ghApiClient, this.ghClient)
            })
        })
    })
}
