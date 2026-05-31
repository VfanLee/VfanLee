export const toolGroups = [
  {
    name: '编码 / 解码',
    description: '常见编码格式的互转工具',
    tools: [
      {
        href: '/tools/encode/url',
        title: 'URL 编码',
        desc: 'URL 编码 / 解码工具',
      },
      {
        href: '/tools/encode/base64',
        title: 'Base64',
        desc: 'Base64 字符串编码 / 解码',
      },
      {
        href: '/tools/encode/image-base64',
        title: '图片转 Base64',
        desc: '将图片文件转换为 Base64 字符串',
      },
      {
        href: '/tools/encode/base64-to-image',
        title: 'Base64 转图片',
        desc: '将 Base64 字符串还原为图片',
      },
      {
        href: '/tools/encode/base58',
        title: 'Base58',
        desc: 'Base58 编码 / 解码（含 Check 校验模式）',
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
      },
    ],
  },
]
