---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "技术积累"
  text: "全栈开发学习笔记"
  tagline: 记录成长路径，分享技术心得
  image:
    src: /image.png
    alt: Tech Stack
  actions:
    - theme: brand
      text: 前端技术栈
      link: /frontend/
    - theme: alt
      text: 后端技术栈
      link: /backend/
    - theme: alt
      text: 项目实践
      link: /projects/

features:
  - icon: 🎨
    title: 前端技术
    details: Vue3、React、TypeScript、工程化工具等现代前端技术栈的学习与实践
    link: /frontend/
  - icon: ⚙️
    title: 后端技术
    details: NestJS、Node.js、MongoDB、RESTful API 等后端技术的深入理解
    link: /backend/
  - icon: 🚀
    title: 项目实践
    details: 低代码表单系统等完整项目的设计思路与技术实现
    link: /projects/
  - icon: 🛠️
    title: 开发工具
    details: Git、部署、运维等开发工具链的使用技巧与最佳实践
    link: /tools/
  - icon: 📚
    title: 学习资源
    details: 优质文档、教程推荐，技术书籍读书笔记
    link: /resources/
  - icon: 💡
    title: 踩坑记录
    details: 开发过程中遇到的问题及解决方案，避免重复踩坑
    link: /issues/
---

## 🗺️ 技术学习路线图

```mermaid
%%{init: {'securityLevel': 'loose', 'theme': 'base', 'themeVariables': {'primaryColor': '#3b82f6', 'primaryTextColor': '#1f2937', 'primaryBorderColor': '#374151', 'lineColor': '#6b7280'}}}%%
graph TB
    subgraph "前端技术栈"
        A[前端基础] --> A1[HTML5 语义化]
        A --> A2[CSS3 & 预处理器]
        A --> A3[JavaScript ES6+]

        B[前端框架] --> B1[Vue 3 Composition API]
        B --> B2[React Hooks]
        B --> B3[TypeScript]

        C[工程化] --> C1[Vite/Webpack]
        C --> C2[ESLint/Prettier]
        C --> C3[单元测试]
    end

    subgraph "后端技术栈"
        D[Node.js] --> D1[NestJS 框架]
        D --> D2[Express 基础]

        E[数据库] --> E1[MongoDB]
        E --> E2[Mongoose ODM]

        F[API设计] --> F1[RESTful API]
        F --> F2[GraphQL]
    end

    subgraph "项目实践"
        G[低代码表单系统] --> G1[表单设计器]
        G --> G2[动态表单渲染]
        G --> G3[数据管理]

        H[部署运维] --> H1[Docker容器化]
        H --> H2[域名与DNS]
        H --> H3[HTTPS配置]
    end

    subgraph "开发工具"
        I[版本控制] --> I1[Git工作流]
        I --> I2[代码规范]

        J[开发环境] --> J1[VS Code配置]
        J --> J2[调试技巧]
    end

    %% 点击跳转
    click A1 "/frontend/html" "HTML5 详细笔记"
    click A2 "/frontend/css" "CSS3 学习笔记"
    click A3 "/frontend/javascript" "JavaScript 进阶"
    click B1 "/frontend/vue" "Vue3 实践"
    click B2 "/frontend/react" "React 开发"
    click B3 "/frontend/typescript" "TypeScript 指南"
    click D1 "/backend/nestjs" "NestJS 深入"
    click E1 "/backend/mongodb" "MongoDB 实践"
    click G1 "/projects/form-designer" "表单设计器项目"
    click I1 "/tools/git" "Git 使用指南"
```

## 📋 学习计划

### 当前进行中

- [x] NestJS 框架深入学习
- [x] MongoDB 数据库设计与优化
- [x] Vue3 + TypeScript 项目实践
- [ ] 低代码表单系统完善
- [ ] 部署自动化流程

### 近期计划

- [ ] React 18 新特性学习
- [ ] GraphQL API 设计实践
- [ ] Docker 容器化部署
- [ ] 性能优化与监控
- [ ] 微前端架构探索

## 🎯 项目展示

### 低代码表单管理系统

基于 NestJS + MongoDB + Vue3 的企业级低代码平台

**技术栈：** NestJS, MongoDB, Vue3, TypeScript, Element Plus

**核心功能：**

- 🎨 可视化表单设计器
- 📊 动态表单渲染引擎
- 💾 表单数据管理
- 🔐 用户权限控制

[查看详情](/projects/form-system) | [在线演示](#) | [源码地址](https://github.com/tangjian1891/jas-table)

---

> 💡 **学习心得**：技术的学习不在于广度，而在于深度。每一个技术点都要亲自实践，记录问题与解决方案，形成自己的知识体系。

## 🔗 快速导航

### 前端技术

- [HTML5 基础](/frontend/html) - 语义化标签与现代HTML特性
- [CSS3 进阶](/frontend/css) - Flexbox、Grid、动画等现代CSS技术
- [JavaScript 核心](/frontend/javascript) - ES6+语法、异步编程、模块化
- [Vue3 实战](/frontend/vue) - Composition API、状态管理、组件设计
- [TypeScript](/frontend/typescript) - 类型系统、泛型、装饰器

### 后端技术

- [Node.js 基础](/backend/nodejs) - 事件循环、模块系统、异步编程
- [NestJS 框架](/backend/nestjs) - 依赖注入、装饰器、中间件
- [MongoDB 数据库](/backend/mongodb) - 数据建模、聚合查询、索引优化
- [API 设计](/backend/api) - RESTful设计原则、接口文档

### 项目实践

- [表单设计器](/projects/form-designer) - 可视化拖拽表单构建器
- [数据管理系统](/projects/data-management) - CRUD操作与权限控制
- [部署方案](/projects/deployment) - Docker容器化与自动化部署

### 开发工具

- [Git 工作流](/tools/git) - 分支管理、协作开发、版本发布
- [开发环境](/tools/development) - VS Code配置、调试技巧、插件推荐
- [性能优化](/tools/performance) - 代码分析、性能监控、优化策略

```mermaid
%%{init: {'securityLevel': 'loose'}}%%
graph TD;
A[前端开发技能] --> B[前端基础]
A --> C[前端框架]
A --> P[前端工程化]
    B --> D["HTML"]
    D --> DA[详细理解]
    B --> E[CSS]
    B --> F[JavaScript]
    C --> G[React]
    C --> H[Vue]
E --> J[语义化标签]
F --> K[ES6+]
G --> L[Hooks]
H --> M[Vue 3]
C --> N[TypeScript]
G --> O[Next.js]
P --> Q[Git]

    Z[后端开发技能] --> ZA[Node.js]
    ZA --> ZB[NestJS]
    Z --> ZC[数据库]
    ZC --> ZD[MongoDB]
    Z --> ZE[运维与部署]
    ZE --> ZF[域名]
    ZE --> ZG[DNS解析]
    ZE --> Q

%% 点击“详细理解”跳转到 /markdown-examples
click DA "/markdown-examples" "查看：Markdown 示例" _self
```
