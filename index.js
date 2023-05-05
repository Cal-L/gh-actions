// import core from "@actions/core";
// import github from "@actions/github";
const core = require("@actions/core");
const github = require("@actions/github");

const prTemplatePath = ".github/PULL_REQUEST_TEMPLATE.md";
const token = process.env.GITHUB_TOKEN;
const octokit = github.getOctokit(token);

const context = github.context;
const title = context.payload;

const main = async () => {
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  try {
    const repoResponse = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: prTemplatePath,
    });
    const fileUrl = await repoResponse.data.download_url;
    const contentResponse = await fetch(fileUrl);
    const text = await contentResponse.text();

    console.log("LOL", text);
    console.log("SA", title);
  } catch (err) {
    console.log("ERRr", err);
  }
  // const fileUrl = await response.data.download_url;
};
main();
