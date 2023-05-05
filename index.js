// import core from "@actions/core";
// import github from "@actions/github";
const core = require("@actions/core");
const github = require("@actions/github");

const prTemplatePath = ".github/PULL_REQUEST_TEMPLATE.md";
const token = process.env.GITHUB_TOKEN;
const octokit = github.getOctokit(token);

const context = github.context;
const prTitle = context.payload.pull_request.title;

/**
 * Checks if PR title is valid.
 *
 * @param {string} title
 * @returns
 */
const checkTitle = (title) => {
  const validPrefixes = ["[FEATURE]", "[FIX]", "[IMPROVEMENT]"];
  for (const prefix of validPrefixes) {
    if (title.startsWith(prefix)) {
      core.info("Title format looks goods!");
      return;
    }
  }
  core.setFailed(
    "Title is not a valid syntax. It needs to be prefixed with one of the following - [FEATURE], [FIX], or [IMPROVEMENT]."
  );
};

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

    checkTitle(prTitle);
  } catch (err) {
    console.log("ERRr", err);
  }
  // const fileUrl = await response.data.download_url;
};
main();
