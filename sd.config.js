module.exports = {
    source: ['resources/common/data/tokens.json'],
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'resources/common/css/',
            files: [{
                destination: 'variables.css',
                format: 'css/variables'
            }]
        }
    }
}