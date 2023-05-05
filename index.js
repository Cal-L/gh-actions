// import core from "@actions/core";
// import github from "@actions/github";
const core = require("@actions/core");
const github = require("@actions/github");

const prTemplatePath = ".github/PULL_REQUEST_TEMPLATE.md";
const token = process.env.GITHUB_TOKEN;

const context = github.context;
const title = context.payload.pull_request.title;
const prbranch = context.payload.pull_request.head.ref;
console.log("OK", prbranch, token[0]);
const owner = context.repo.owner;
const repo = context.repo.repo;
const octokit = github.getOctokit(token);

/**
 * Checks if PR title is valid.
 *
 * @param {string} title
 * @returns
 */
const checkTitle = async () => {
  try {
    // const repoResponse = await octokit.rest.repos.getContent({
    //   owner,
    //   repo,
    //   path: prTemplatePath,
    // });
    // const fileUrl = await repoResponse.data.download_url;
    // const contentResponse = await fetch(fileUrl);
    // const text = await contentResponse.text();

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
  } catch (err) {
    console.log("Failed to validate title.", err);
  }
};

const freezeMerge = async () => {
  try {
    await octokit.rest.repos.updateBranchProtection({
      owner,
      repo,
      branch,
      required_status_checks: {
        strict: false,
      },
      enforce_admins: true,
      required_pull_request_reviews: null,
      restrictions: null,
      allow_deletions: true,
    });
  } catch (err) {
    console.log("Failed to freeze merge", err);
  }
};

const enableMerge = async () => {
  try {
    await octokit.repos.updateBranchProtection({
      owner,
      repo,
      branch,
      required_status_checks: {
        strict: true,
      },
      enforce_admins: true,
      required_pull_request_reviews: null,
      restrictions: null,
      allow_deletions: true,
    });
  } catch (err) {
    console.log("Failed to enable merge.", err);
  }
};

const main = async () => {
  //   await freezeMerge();
  await checkTitle();
  //   await enableMerge();
  // const fileUrl = await response.data.download_url;
};

main();
