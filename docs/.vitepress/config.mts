import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "技术积累",
  description: "全栈开发学习笔记",
  lang: "zh-CN",
  lastUpdated: true,

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "author", content: "汤健" }],
    ["meta", { name: "keywords", content: "Vue3, NestJS, MongoDB, TypeScript, 前端, 后端, 全栈开发" }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端技术",
        items: [
          { text: "📋 技术总览", link: "/frontend/" },
          { text: "📄 HTML5", link: "/frontend/html" },
          { text: "📄 CSS3", link: "/frontend/css" },
          { text: "📄 JavaScript", link: "/frontend/javascript" },
          { text: "📄 Vue3 实践", link: "/frontend/vue" },
          { text: "📄 TypeScript", link: "/frontend/typescript" },
        ],
      },
      {
        text: "后端技术",
        items: [
          { text: "📋 技术总览", link: "/backend/" },
          { text: "NestJS 框架", link: "/backend/nestjs" },
          { text: "MongoDB 实践", link: "/backend/mongodb" },
          { text: "Node.js 核心", link: "/backend/nodejs" },
          { text: "API 设计", link: "/backend/api" },
        ],
      },
      {
        text: "项目实践",
        items: [
          { text: "📋 项目总览", link: "/projects/" },
          { text: "表单设计器", link: "/projects/form-designer" },
          { text: "数据管理", link: "/projects/data-management" },
          { text: "权限控制", link: "/projects/permission-system" },
        ],
      },
      {
        text: "开发工具",
        items: [
          { text: "📋 工具总览", link: "/tools/" },
          { text: "Git 工作流", link: "/tools/git" },
          { text: "VS Code 配置", link: "/tools/vscode" },
          { text: "Docker 容器化", link: "/tools/docker" },
          { text: "CI/CD 流程", link: "/tools/cicd" },
        ],
      },
      {
        text: "更多",
        items: [
          { text: "📚 学习资源", link: "/resources/" },
          { text: "🐛 踩坑记录", link: "/issues/" },
          { text: "📖 Markdown 示例", link: "/markdown-examples" },
          { text: "🔧 API 示例", link: "/api-examples" },
        ],
      },
    ],

    sidebar: {
      "/frontend/": [
        {
          text: "前端基础",
          collapsed: false,
          items: [
            { text: "技术总览", link: "/frontend/" },
            { text: "HTML5 语义化", link: "/frontend/html" },
            { text: "CSS3 进阶", link: "/frontend/css" },
            { text: "JavaScript 核心", link: "/frontend/javascript" },
          ],
        },
        {
          text: "前端框架",
          collapsed: false,
          items: [
            { text: "Vue3 实战", link: "/frontend/vue" },
            { text: "React 开发", link: "/frontend/react" },
            { text: "TypeScript", link: "/frontend/typescript" },
          ],
        },
        {
          text: "工程化",
          collapsed: false,
          items: [
            { text: "构建工具", link: "/frontend/build-tools" },
            { text: "代码规范", link: "/frontend/code-standards" },
            { text: "测试", link: "/frontend/testing" },
          ],
        },
      ],

      "/backend/": [
        {
          text: "Node.js",
          collapsed: false,
          items: [
            { text: "技术总览", link: "/backend/" },
            { text: "Node.js 核心", link: "/backend/nodejs" },
            { text: "Express 框架", link: "/backend/express" },
            { text: "NestJS 框架", link: "/backend/nestjs" },
          ],
        },
        {
          text: "数据库",
          collapsed: false,
          items: [
            { text: "MongoDB 实践", link: "/backend/mongodb" },
            { text: "Mongoose ODM", link: "/backend/mongoose" },
            { text: "数据库设计", link: "/backend/database-design" },
          ],
        },
        {
          text: "API 设计",
          collapsed: false,
          items: [
            { text: "RESTful API", link: "/backend/restful-api" },
            { text: "GraphQL", link: "/backend/graphql" },
            { text: "API 文档", link: "/backend/api-documentation" },
          ],
        },
      ],

      "/projects/": [
        {
          text: "项目实践",
          collapsed: false,
          items: [
            { text: "项目总览", link: "/projects/" },
            { text: "表单设计器", link: "/projects/form-designer" },
            { text: "动态表单渲染", link: "/projects/form-renderer" },
            { text: "数据管理系统", link: "/projects/data-management" },
            { text: "权限控制", link: "/projects/permission-system" },
          ],
        },
      ],

      "/tools/": [
        {
          text: "开发工具",
          collapsed: false,
          items: [
            { text: "工具总览", link: "/tools/" },
            { text: "Git 工作流", link: "/tools/git" },
            { text: "VS Code 配置", link: "/tools/vscode" },
            { text: "Docker 容器化", link: "/tools/docker" },
            { text: "CI/CD 流程", link: "/tools/cicd" },
          ],
        },
      ],

      "/resources/": [
        {
          text: "学习资源",
          collapsed: false,
          items: [{ text: "资源总览", link: "/resources/" }],
        },
      ],

      "/issues/": [
        {
          text: "踩坑记录",
          collapsed: false,
          items: [
            { text: "问题总览", link: "/issues/" },
            { text: "前端问题", link: "/issues/frontend-issues" },
            { text: "后端问题", link: "/issues/backend-issues" },
            { text: "部署问题", link: "/issues/deployment-issues" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/tangjian1891/jas-table" }],

    footer: {
      message: "记录成长路径，分享技术心得",
      copyright: "Copyright © 2024 汤健",
    },

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/tangjian1891/jas-table/edit/main/docs/:path",
      text: "在 GitHub 上编辑此页",
    },

    lastUpdated: {
      text: "最后更新",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    },
  },

  markdown: {
    lineNumbers: true,
    config: (_md) => {
      // 可以在这里添加 markdown 插件
    },
  },
});
