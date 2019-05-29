// link: https://github.com/storybooks/storybook/issues/2718#issuecomment-400968205

const path = require('path');
const fs = require("fs");
const findUp = require('find-up');

module.exports = ({ config }) => {
  const tsFile = findUp.sync('tsconfig.json');
  const tsConfig = JSON.parse(fs.readFileSync(tsFile));
  const root = path.join(path.dirname(tsFile), tsConfig.compilerOptions.baseUrl);

  const entries = Object.entries(tsConfig.compilerOptions.paths);
  const aliases = entries.map(([alias, resolvePath]) => [alias, path.join(root, resolvePath[0])]);

  return {
    ...config,
    resolve: {
      ...(config.resolve || {}),
      alias: {
        ...(config.resolve && config.resolve.alias || {}),
        ...Object.fromEntries(aliases)
      }
    }
  };
};
