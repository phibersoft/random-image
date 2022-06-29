const isDev = process.env.NODE_ENV === 'development';

const STUDIO_REWRITES = {
    source: '/studio/:path*',
    destination: isDev ? 'http://localhost:3333/studio/:path*' : '/studio/index.html'
}

module.exports = {
    rewrites: () => [
        STUDIO_REWRITES
    ],
    images : {
        domains: ['cdn.sanity.io']
    }

}
