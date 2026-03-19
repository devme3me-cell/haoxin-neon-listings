# Zeabur + Neon 部署说明

## ✅ 已改用 Neon Serverless Driver

本项目现在使用 **Neon官方serverless driver (`@neondatabase/serverless`)**，通过HTTP进行高效查询。

### 优势

1. **官方支持** - 使用Neon官方维护的驱动包
2. **HTTP优化** - 专为serverless和edge环境优化的HTTP连接
3. **低延迟** - 通过消息流水线等优化实现低延迟查询
4. **完全兼容** - 与PostgreSQL完全兼容
5. **静态网站友好** - 可在浏览器中直接运行
6. **Zeabur完美支持** - 无需特殊配置

### 工作原理

```
浏览器 (Static Site)
  ↓ @neondatabase/serverless (via HTTP)
Neon Database (PostgreSQL over HTTP)
```

Neon serverless driver 使用 HTTP fetch API 进行查询，非常适合静态网站部署。

## ✅ 正确配置

**vite.config.ts** - 保持原样即可：

```typescript
export default defineConfig(({ mode }) => ({
  // ... 配置
  // 不需要任何 external 配置！
}));
```

**package.json** - 包含官方 Neon 依赖：

```json
{
  "dependencies": {
    "@neondatabase/serverless": "^0.10.4",
    // 其他依赖...
  }
}
```

## 🚀 Zeabur 部署步骤

### 静态网站部署（推荐）

`zeabur.json` 配置：

```json
{
  "build": {
    "command": "bun install && bun run build"
  },
  "output": {
    "type": "static",
    "dir": "dist"
  }
}
```

**步骤：**
1. 部署为静态网站
2. 在 Zeabur 仪表板添加环境变量：
   - `VITE_DATABASE_URL` - Neon 连接字符串
   - `VITE_CLOUDINARY_CLOUD_NAME` (可选)
   - `VITE_CLOUDINARY_UPLOAD_PRESET` (可选)
3. 重新部署

**工作原理：**
- 使用 `@neondatabase/serverless` 包
- 通过 HTTP 进行数据库查询
- 支持SQL模板字符串，防止SQL注入
- 完全静态部署，无需服务器端代码

## 📊 构建输出

```
dist/
  ├── index.html
  ├── assets/
  │   ├── index-[hash].js  ← 包含 @neondatabase/serverless
  │   ├── index-[hash].css
  │   └── ... 其他文件
  └── ... 静态资源
```

## ✅ 验证构建

```bash
bun run build
```

应该看到：
```
✓ built in ~19s
dist/assets/index-[hash].js  325 kB  ← 所有代码都已打包
```

## 🆘 故障排除

### 问题："数据库未连接"

**检查：**
1. ✅ 环境变量 `VITE_DATABASE_URL` 已在 Zeabur 设置
2. ✅ Neon 数据库可访问（在 Neon 控制台测试）
3. ✅ 连接字符串格式正确
4. ✅ 添加环境变量后重新部署

### 问题："构建失败"

**检查：**
1. ✅ 本地构建成功：`bun run build`
2. ✅ `zeabur.json` 配置正确
3. ✅ `package.json` 中包含 `@neondatabase/serverless`
4. ✅ Vite 会自动打包所有依赖

## 📚 相关资源

- [Neon Serverless Driver 文档](https://neon.tech/docs/serverless/serverless-driver)
- [GitHub: @neondatabase/serverless](https://github.com/neondatabase/serverless)
- [Zeabur 静态网站文档](https://zeabur.com/docs/deploy/static)
- 项目部署指南：`ZEABUR_DEPLOYMENT.md`

## ✅ 总结

- ✅ 部署为**静态网站**
- ✅ 使用官方 **`@neondatabase/serverless`** 包
- ✅ 通过 **HTTP** 进行高效查询
- ✅ 代码全部打包到 `dist/`
- ✅ 在 Zeabur 仪表板添加环境变量
- ✅ 低延迟、高性能！🎉
