const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = rewireReactHotLoader(config, env);
    config = injectBabelPlugin(['import', {
        libraryName: 'antd', style: true
    }], config);  // change importing css to less
    config = rewireLess.withLoaderOptions({
        modifyVars: { "@primary-color": "#1DA57A" },
    })(config, env);
    return config;
}