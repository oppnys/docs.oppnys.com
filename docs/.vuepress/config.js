module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: 'oppnys document',
    description: '这是我的第一个 VuePress 站点',
    head: [],
    // 主题和它的配置
    theme: '@vuepress/theme-default',
    themeConfig: {
        logo: '',
        navbar: [
            {
                text: '指南',
                link: '/',
            },
            {
                text: 'HTML',
                link: '/html/',
            },
            {
                text: 'CSS',
                link: '/css/',
            },
            {
                text: 'JavaScript',
                children: [{
                    text: 'JS 基础',
                    link: '/javascript/',
                    activeMatch: '/javascript',
                }, {
                    text: 'JS 三座大山',
                    activeMatch: '^/javascript\/ThreeMountains/',
                    link: '/javascript/ThreeMountains/'
                }],

            },
            {
                text: 'Vue2',
                link: '/vue/'
            },
            {
                text: 'Vue3',
                link: '/vue3/'
            },
            {
                text: '脚手架',
                link: '/cli/'
            },
            {
                text: '数据结构与算法',
                link: '/algorithm/'
            }
        ],
        repo: 'https://github.com/oppnys/docs.oppnys.com',
        editLink: false,
        editLinkText: '编辑页面',
        docsBranch: 'master',
        docsDir: 'docs',
        contributors: true,
        contributorsText: '作者',
        lastUpdatedText: '更新时间'
    }
    // plugins: [
    //     ['@vuepress/docsearch', {
    //         apiKey: '790e17cfe1a90b77b83aa6b9f4b83b32',
    //         indexName: 'oppnys',
    //         locales: {
    //             '/': {
    //                 placeholder: '搜索文档',
    //                 translations: {
    //                     button: {
    //                         buttonText: '搜索文档',
    //                     },
    //                 },
    //             },
    //             '/zh/': {
    //                 placeholder: '搜索文档',
    //                 translations: {
    //                     button: {
    //                         buttonText: '搜索文档',
    //                     },
    //                 },
    //             },
    //         },
    //     }]
    // ]
}