const core = require("@actions/core");
const github = require("@actions/github");

const githubToken = process.env.GITHUB_TOKEN;
const octokit = github.getOctokit(githubToken);

const githubContext = github.context;
const pullRequestTitle = githubContext.payload.pull_request.title;
const headBranchName = githubContext.payload.pull_request.head.ref;
const owner = githubContext.repo.owner;
const repo = githubContext.repo.repo;

/**
 * Checks if PR title is valid.
 *
 * @param {string} title
 * @returns
 */
const checkTitle = async () => {
  try {
    throw new Error("#WHAM");
    const validPrefixes = ["[FEATURE]", "[FIX]", "[IMPROVEMENT]"];
    for (const prefix of validPrefixes) {
      if (title.startsWith(prefix)) {
        core.info("Title format looks good!");
        return;
      }
    }
    core.setFailed(
      "Title is not a valid syntax. It needs to be prefixed with one of the following - [FEATURE], [FIX], or [IMPROVEMENT]."
    );
  } catch (error) {
    core.warning(`Title validation failed with error ${error}.`);
  }
};

checkTitle();
