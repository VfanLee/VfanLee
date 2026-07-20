import type { LucideIcon } from 'lucide-react'
import { Binary, Box, Hash, Image, Layers3, Link2, Rocket, Sparkles, Shuffle } from 'lucide-react'

export type ToolItem = {
  href: string
  title: string
  desc: string
  icon: LucideIcon
}

export type ToolGroup = {
  name: string
  description: string
  tools: ToolItem[]
}

export const toolGroups: ToolGroup[] = [
  {
    name: 'CSS',
    description: '常用 CSS 样式的可视化调节工具',
    tools: [
      {
        href: '/tools/css/border',
        title: 'Border',
        desc: '可视化调节四边边框与四角圆角',
        icon: Box,
      },
      {
        href: '/tools/css/box-shadow',
        title: 'Box Shadow',
        desc: '可视化编辑多层 box-shadow 阴影',
        icon: Layers3,
      },
      {
        href: '/tools/css/animations',
        title: '动画示例',
        desc: '收录常见且可直接复用的 CSS 动画效果',
        icon: Sparkles,
      },
    ],
  },
  {
    name: '编码 / 解码',
    description: '常见编码格式的互转工具',
    tools: [
      {
        href: '/tools/encode/url',
        title: 'URL 编码',
        desc: 'URL 编码 / 解码工具',
        icon: Link2,
      },
      {
        href: '/tools/encode/base64',
        title: 'Base64',
        desc: 'Base64 字符串编码 / 解码',
        icon: Binary,
      },
      {
        href: '/tools/encode/image-base64',
        title: '图片 ↔ Base64',
        desc: '图片文件与 Base64 字符串双向转换',
        icon: Image,
      },
      {
        href: '/tools/encode/base58',
        title: 'Base58',
        desc: 'Base58 编码 / 解码（含 Check 校验模式）',
        icon: Binary,
      },
    ],
  },
  {
    name: '加密',
    description: '常用加密哈希工具',
    tools: [
      {
        href: '/tools/crypto/sha256',
        title: 'SHA256',
        desc: 'SHA256 哈希计算工具，用于生成数据指纹和完整性验证。',
        icon: Hash,
      },
    ],
  },
  {
    name: '取数',
    description: '实用数据生成工具',
    tools: [
      {
        href: '/tools/value/random',
        title: '随机数',
        desc: '生成随机数',
        icon: Shuffle,
      },
    ],
  },
  {
    name: 'GitHub',
    description: 'GitHub 实用工具',
    tools: [
      {
        href: '/tools/github/gh-deployment-mgt',
        title: 'Deployments',
        desc: 'GitHub Deployment 管理工具。',
        icon: Rocket,
      },
    ],
  },
]

export const allTools: ToolItem[] = toolGroups.flatMap((group) => group.tools)

export function getToolByHref(href: string): ToolItem | undefined {
  return allTools.find((tool) => tool.href === href)
}
