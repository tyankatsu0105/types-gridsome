module.exports = {
  mergeStrategy: {
    toSameBranch: ["legacy"],
    toReleaseBranch: {
      develop: "master"
    }
  }
};
