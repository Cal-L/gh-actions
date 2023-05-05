// import core from "@actions/core";
// import github from "@actions/github";
const core = require("@actions/core");
const github = require("@actions/github");

const prTemplatePath = ".github/PULL_REQUEST_TEMPLATE.md";
const token = process.env.GITHUB_TOKEN;
const octokit = github.getOctokit(token);

const context = github.context;

const main = async () => {
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const response = await octokit.rest.repos.getContent({
    owner,
    repo,
    path: prTemplatePath,
  });
  const k = response.data;
  console.log("LOL", k);
  // const fileUrl = await response.data.download_url;
};
main();
