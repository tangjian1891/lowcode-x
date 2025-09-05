- 全栈知识技能图谱
- 本图展示了前端与后端常用技术体系结构
- 允许点击节点触发链接

```mermaid
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

class DA  "./docs/html-tags.md";
```
