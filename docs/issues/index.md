# 踩坑记录

记录开发过程中遇到的问题、错误和解决方案，避免重复踩坑。

## 🚨 前端常见问题

### Vue.js 相关

#### 1. Vue3 响应式数据丢失问题

**问题描述**：
在 setup 函数中解构 props 导致响应式丢失

**错误示例**：

```javascript
// ❌ 错误写法
export default {
  props: ["user"],
  setup(props) {
    const { user } = props; // 响应式丢失
    return { user };
  },
};
```

**解决方案**：

```javascript
// ✅ 正确写法
import { toRefs } from "vue";

export default {
  props: ["user"],
  setup(props) {
    const { user } = toRefs(props); // 保持响应式
    return { user };
  },
};
```

#### 2. 动态组件 key 值问题

**问题描述**：
动态渲染组件时，组件状态未正确更新

**解决方案**：
为动态组件添加唯一的 key 值

```vue
<component :is="currentComponent" :key="componentKey" v-bind="componentProps" />
```

### TypeScript 相关

#### 1. 类型声明文件找不到

**问题描述**：

```
Cannot find module 'xxx' or its corresponding type declarations
```

**解决方案**：

1. 安装对应的类型声明包

```bash
pnpm add -D @types/xxx
```

2. 或创建声明文件 `types/xxx.d.ts`

```typescript
declare module "xxx" {
  // 模块声明
}
```

## ⚙️ 后端常见问题

### NestJS 相关

#### 1. 循环依赖问题

**问题描述**：

```
Nest cannot create the module dependencies of the Service
```

**解决方案**：
使用 forwardRef 解决循环依赖

```typescript
@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService,
  ) {}
}
```

#### 2. 装饰器参数验证失效

**问题描述**：
DTO 验证装饰器不生效

**解决方案**：
确保全局启用 ValidationPipe

```typescript
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
  }),
);
```

### MongoDB 相关

#### 1. 聚合查询性能问题

**问题描述**：
复杂聚合查询执行时间过长

**解决方案**：

1. 为查询字段添加索引
2. 在管道早期阶段使用 `$match` 过滤数据
3. 使用 `$project` 减少数据传输

```javascript
// ✅ 优化后的聚合查询
db.collection.aggregate([
  { $match: { status: "active" } }, // 早期过滤
  { $project: { _id: 1, name: 1, email: 1 } }, // 减少字段
  {
    $lookup: {
      /* 关联查询 */
    },
  },
]);
```

#### 2. ObjectId 类型转换问题

**问题描述**：
字符串与 ObjectId 类型不匹配

**解决方案**：

```javascript
import { Types } from "mongoose";

// 字符串转 ObjectId
const objectId = new Types.ObjectId(stringId);

// 验证是否为有效的 ObjectId
if (Types.ObjectId.isValid(stringId)) {
  // 安全转换
}
```

## 🔧 工具配置问题

### Git 相关

#### 1. 提交信息格式问题

**问题描述**：
团队提交信息格式不统一

**解决方案**：
使用 commitizen 和 husky 规范提交

```bash
# 安装工具
pnpm add -D @commitlint/cli @commitlint/config-conventional husky

# 配置 husky
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
```

#### 2. 大文件提交问题

**问题描述**：

```
remote: error: File xxx is xxx MB; this exceeds GitHub's file size limit of 100.00 MB
```

**解决方案**：

1. 使用 Git LFS 管理大文件

```bash
git lfs track "*.png"
git add .gitattributes
```

2. 或将文件添加到 `.gitignore`

### VS Code 配置

#### 1. ESLint 不生效

**问题描述**：
ESLint 规则不自动修复

**解决方案**：
检查 VS Code 设置

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "typescript", "vue"]
}
```

## 🐛 部署相关问题

### Docker 相关

#### 1. 镜像构建失败

**问题描述**：
npm install 在 Docker 中失败

**解决方案**：
使用国内镜像源并设置正确的工作目录

```dockerfile
FROM node:18-alpine

# 设置国内镜像源
RUN npm config set registry https://registry.npmmirror.com

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
```

#### 2. 容器内时区问题

**问题描述**：
容器时间与宿主机不一致

**解决方案**：

```dockerfile
# 设置时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
```

### 域名与 DNS

#### 1. HTTPS 证书问题

**问题描述**：
Let's Encrypt 证书申请失败

**解决方案**：

1. 确保域名已正确解析到服务器
2. 关闭防火墙或开放 80/443 端口
3. 使用 DNS 验证方式申请证书

## 📝 问题分类索引

### 按技术栈分类

- [前端问题](./frontend-issues.md)
- [后端问题](./backend-issues.md)
- [数据库问题](./database-issues.md)
- [部署问题](./deployment-issues.md)

### 按严重程度分类

- [严重问题](./critical-issues.md) - 影响系统正常运行
- [一般问题](./common-issues.md) - 影响开发效率
- [优化建议](./optimization-tips.md) - 性能与代码质量优化

## 🔍 问题排查方法

### 前端调试

1. **浏览器开发者工具** - Console、Network、Performance
2. **Vue DevTools** - 组件状态、事件追踪
3. **源码映射** - 定位原始代码位置

### 后端调试

1. **日志分析** - 结构化日志记录
2. **性能监控** - PM2、性能分析工具
3. **数据库查询** - 慢查询日志分析

### 系统问题排查

1. **资源监控** - CPU、内存、磁盘使用情况
2. **网络诊断** - 连接状态、延迟测试
3. **服务状态** - 进程、端口占用检查

---

> 💡 **总结经验**：每个问题都是学习的机会，记录问题和解决过程，形成个人知识库，避免重复踩坑。
