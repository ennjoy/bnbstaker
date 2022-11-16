module.exports = {
    client: {
        service: {
            name: '@bnbstaker/admin',
            // URL to the GraphQL API
            url: 'https://graphql.bepstake.fun/graphql',
        },
        // Files processed by the extension
        includes: [
            'src/**/*.vue',
            'src/**/*.ts',
        ],
    }
}