// import core from "@actions/core";
// import github from "@actions/github";
const core = require("@actions/core");
const github = require("@actions/github");

const prTemplatePath = ".github/PULL_REQUEST_TEMPLATE.md";
const context = github.context;
const token = process.env.GITHUB_TOKEN;
const octokit = github.getOctokit(token);

console.log("Octo", octokit.repos);

console.log("token", token[0]);
