module.exports = {
    client: {
        service: {
            name: '@bnbstaker/client',
            // URL to the GraphQL API
            url: 'https://graphql.bnbstaker.fun/graphql',
        },
        // Files processed by the extension
        includes: [
            'src/**/*.vue',
            'src/**/*.ts',
        ],
    }
}