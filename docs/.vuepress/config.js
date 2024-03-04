module.exports = {
    // 站点配置
    lang: 'zh-CN',
    title: 'oppnys docs',
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
                text: "前端基础",
                children: [
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
                        link: '/javascript/'
                    }
                ]
            },
            {
                text: '前端框架',
                children: [
                    {
                        text: 'Vue2',
                        link: '/vue/'
                    },
                    {
                        text: 'Vue3',
                        link: '/vue3/'
                    },
                    {
                        text: 'react',
                        link: '/react/'
                    },
                ]
            },
            {
                text: '脚手架',
                children: [
                    {
                        text: 'webpack',
                        link: '/cli/webpack/'
                    },
                    {
                        text: 'babel',
                        link: '/cli/babel/'
                    },
                ]
            },
            {
                text: '计算机基础',
                children: [
                    {
                        text: '数据结构与算法',
                        link: '/algorithm/'
                    },
                    {
                        text: '计算机网络',
                        link: '/network/'
                    }
                ]
            },
            {
                text: '服务端开发',
                children: [
                    {
                        text: 'node.js',
                        link: '/node.js/'
                    },
                    {
                        text: 'linux',
                        link: '/linux/'
                    },
                ]
            },
            {
                text: '好书',
                children: [
                    {
                        text: '你不知道的JavaScript',
                        link: '/you-dont-know-javascript/'
                    },
                    {
                        text: 'ECMAScript6 入门教程',
                        link: '/es6/'
                    },
                ]
            },
            {
                text: '随笔',
                link: '/essay/'
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
}