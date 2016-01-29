seajs.config({
    base: '/src/',
    paths:{
        _core: '/lib/core/'
    },
    alias: {
        hy: '_core/hy.js?v=201601282344',
        url: '_core/url.js?v=201601282344',
        event: '_core/event.js?v=201601282344',
        route: '_core/route.js?v=201601282344',
        time: '_core/time.js?v=201601282344',
        cache: '_core/cache.js?v=201601282344',
        data: '_core/data.js?v=201601282344'
    }
});