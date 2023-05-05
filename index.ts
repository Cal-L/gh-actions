// import core from "@actions/core";
// import github from "@actions/github";
const core = require("@actions/core");
const github = require("@actions/github");

const token = process.env.GITHUB_TOKEN as string;
const octokit = github.getOctokit(token);

console.log("token", token[0]);
