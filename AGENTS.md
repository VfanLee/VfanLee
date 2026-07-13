# AGENTS

## 项目概览

- 个人作品站：`/`、`/*`
- 开发工具箱：`/tools/*`

【个人作品站】、【开发工具箱】完全独立，毫无关联。

### shadcn

- `components.json` 约定的 shadcn 生成文件默认不得直接修改，应当按依赖代码使用，避免后续升级与维护成本。
- 修改 `components.json` 前，必须先确认不会影响后续生成路径或现有 import。
- 若生成组件不满足业务需求，应当优先在业务组件目录中复制或二次封装实现（如 `components/common/xxx/index.tsx`）。
- 仅在确有必要时修改原始生成文件；修改后必须记录到 `docs/shadcn-patches.md`，便于后续迁移。
- `utils` 别名指向 `@/utils/ui`（`cn` 等）；新增 shadcn 组件会按此路径生成 import。

### 全局组件

- 全局组件统一从 `@/components` 导入

### Hooks

- hooks 统一从 `@/hooks` 导入
