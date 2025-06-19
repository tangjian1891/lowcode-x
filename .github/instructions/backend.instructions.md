---
applyTo: "backend/**"
---

# 后端项目说明

## 项目概述

本后端项目是一个基于 NestJS + MongoDB 构建的低代码表单管理系统 API 服务，为前端表单设计器提供完整的数据支持。系统采用模块化架构，支持表单的创建、更新、删除和查询操作，同时提供用户认证、文件上传、菜单管理等功能。

## 技术栈

- **框架**: NestJS 11.x + TypeScript
- **数据库**: MongoDB + Mongoose 8.x
- **认证**: JWT (@nestjs/jwt)
- **文件上传**: 七牛云存储 (qiniu)
- **运行时**: Node.js
- **测试**: Jest + Supertest
- **代码质量**: ESLint + Prettier
- **构建**: SWC (高性能编译器)

## 数据库设计

### Form 表单模型

```typescript
{
  relateId: string,    // 关联 ID (唯一索引)
  fields: any,         // 表单字段配置
  formTree: any,       // 表单树结构
  createdAt: Date,     // 创建时间
  updatedAt: Date      // 更新时间
}
```

### 特性

- **自动时间戳**: 使用 Mongoose 的 timestamps 功能
- **虚拟 ID**: 通过全局插件自动添加虚拟 id 属性
- **灵活数据结构**: 使用 Mixed 类型支持动态表单结构

## 中间件和拦截器

### 1. 响应拦截器 (ResponseInterceptor)

统一 API 响应格式:

```json
{
  "code": 0,
  "message": "success",
  "data": "实际数据"
}
```

### 2. 异常过滤器 (AllExceptionsFilter)

全局异常处理，统一错误响应格式

### 3. JWT 认证守卫 (AuthGuard)

- 自动验证请求中的 JWT Token
- 排除登录接口的验证
- 将用户信息注入到请求对象中

## 开发配置

### 数据库连接

- **MongoDB Atlas**: 使用云端 MongoDB 数据库
- **连接池**: 自动管理数据库连接
- **错误处理**: 内置连接错误重试机制

### CORS 配置

- 启用跨域资源共享
- 支持前端应用的 API 调用

### 环境配置

- **端口**: 默认 3000，支持环境变量配置
- **JWT 密钥**: 可通过环境变量配置
- **数据库 URI**: 支持不同环境的数据库配置

## API 规范

### 请求格式

- **RESTful**: 遵循 REST API 设计规范
- **Content-Type**: application/json
- **Authorization**: Bearer {token}

### 响应格式

```json
{
  "code": 0, // 状态码: 0-成功, 非0-失败
  "message": "success", // 响应消息
  "data": {} // 响应数据
}
```

### 错误处理

- **统一异常**: 全局异常过滤器处理
- **错误码**: 标准化错误代码
- **错误信息**: 详细的错误描述

## 安全特性

1. **JWT 认证**: 基于 Token 的无状态认证
2. **路由守卫**: 自动验证用户权限
3. **CORS 配置**: 防止跨域攻击
4. **数据验证**: 输入数据自动验证和过滤
5. **异常处理**: 防止敏感信息泄露

## 扩展性设计

1. **模块化架构**: 各功能模块独立，易于扩展
2. **动态表单**: 支持任意表单结构的动态创建
3. **插件系统**: 支持自定义插件扩展功能
4. **中间件栈**: 灵活的请求处理管道
5. **数据库抽象**: 基于 Mongoose 的数据访问层
