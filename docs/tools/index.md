# 开发工具

记录开发过程中使用的工具、配置和最佳实践。

## 🛠️ 核心工具

### 版本控制

- [Git 工作流](./git.md) - 分支管理、提交规范、协作开发
- [GitHub 使用技巧](./github.md) - Issues、PR、Actions自动化

### 开发环境

- [VS Code 配置](./vscode.md) - 插件推荐、快捷键、调试配置
- [终端工具](./terminal.md) - PowerShell、Git Bash、WSL配置
- [浏览器调试](./browser-debug.md) - DevTools使用技巧

### 构建与部署

- [Docker 容器化](./docker.md) - 镜像构建、容器编排
- [CI/CD 流程](./cicd.md) - GitHub Actions、自动化部署
- [域名与DNS](./domain-dns.md) - 域名解析、HTTPS配置

## 📋 工具清单

### 前端工具链

- **构建工具**: Vite, Webpack
- **包管理**: pnpm, npm
- **代码规范**: ESLint, Prettier, husky
- **测试工具**: Vitest, Jest, Cypress
- **调试工具**: Vue DevTools, React DevTools

### 后端工具链

- **框架**: NestJS, Express
- **数据库工具**: MongoDB Compass, Robo 3T
- **API工具**: Postman, Apifox, Swagger
- **性能监控**: PM2, New Relic

### 设计与协作

- **原型设计**: Figma, 墨刀
- **图标资源**: Iconify, Heroicons
- **文档工具**: VitePress, GitBook
- **团队协作**: Slack, 飞书, Notion

## ⚙️ 配置文件

### VS Code 工作区配置

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

### ESLint + Prettier 配置

基于项目的代码规范配置，支持 Vue3 + TypeScript

### Git 提交规范

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具变动
```

## 🚀 效率提升

### 开发技巧

1. **快捷键熟练使用** - 提升代码编写效率
2. **代码片段配置** - 常用代码模板化
3. **调试技能掌握** - 快速定位问题
4. **自动化脚本** - 减少重复操作

### 工作流优化

1. **分支管理策略** - Git Flow 或 GitHub Flow
2. **代码评审流程** - Pull Request 规范
3. **自动化测试** - CI/CD 集成
4. **文档同步更新** - 保持文档的时效性

## 📚 学习资源

### 官方文档

- [VS Code 官方文档](https://code.visualstudio.com/docs)
- [Git 官方文档](https://git-scm.com/doc)
- [Docker 官方文档](https://docs.docker.com/)

### 实用教程

- Pro Git（Git权威指南）
- Docker从入门到实践
- VS Code权威指南

## 🔧 问题解决

### 常见问题

- [环境配置问题](./common-issues.md#环境配置)
- [构建部署问题](./common-issues.md#构建部署)
- [版本控制问题](./common-issues.md#版本控制)

### 调试技巧

- 前端调试方法
- Node.js 应用调试
- 数据库查询优化

---

> 🎯 **工具理念**：工欲善其事，必先利其器。合适的工具能够大幅提升开发效率和代码质量。
