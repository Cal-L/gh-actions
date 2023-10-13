const core = require("@actions/core");
const github = require("@actions/github");

const githubContext = github.context;
const pullRequestTitle = githubContext.payload.pull_request.title;

/**
 * Checks if pull request title has a valid prefix.
 *
 * @param {string} title
 * @returns Fails the action if title is invalid.
 */
const checkTitle = async () => {
  const validPrefixes = ["[FEATURE]", "[FIX]", "[IMPROVEMENT]"];
  try {
    for (const prefix of validPrefixes) {
      if (pullRequestTitle.startsWith(prefix)) {
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
