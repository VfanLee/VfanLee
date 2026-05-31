export interface MenuRoute {
  name: string
  path?: string
  meta?: {
    title?: string
    desc?: string
    hideTitle?: boolean
  }
  children?: MenuRoute[]
}

export const routes: MenuRoute[] = [
  {
    name: 'online',
    path: '/tools',
    meta: {
      title: '在线工具',
      desc: '实用的在线工具',
      hideTitle: true,
    },
  },
  {
    name: 'encode',
    meta: {
      title: '编码/解码',
    },
    children: [
      {
        name: 'url',
        path: '/url',
        meta: {
          title: 'URL 编码',
          desc: 'URL 编码/解码工具。',
        },
      },
      {
        name: 'base64',
        path: '/base64',
        meta: {
          title: 'Base64',
          desc: 'Base64 编码/解码工具。',
        },
      },
      {
        name: 'image-base64',
        path: '/image-base64',
        meta: {
          title: '图片转 Base64',
          desc: '将图片文件转换为 Base64 编码字符串，支持多种图片格式，便于在网页中嵌入使用。',
        },
      },
      {
        name: 'base64-to-image',
        path: '/base64-to-image',
        meta: {
          title: 'Base64 转图片',
          desc: '将 Base64 转换为图片。',
        },
      },
      {
        name: 'base58',
        path: '/base58',
        meta: {
          title: 'Base58',
          desc: 'Base58 编码/解码工具。',
        },
      },
    ],
  },
  {
    name: 'crypto',
    meta: {
      title: '加密',
    },
    children: [
      {
        name: 'sha256',
        path: '/sha256',
        meta: {
          title: 'SHA256',
          desc: 'SHA256 哈希计算工具，用于生成数据指纹和完整性验证。',
        },
      },
    ],
  },
  {
    name: 'value',
    meta: {
      title: '取数',
    },
    children: [
      {
        name: '随机数',
        path: '/random',
        meta: {
          title: '随机数',
          desc: '生成随机数',
        },
      },
    ],
  },
  {
    name: 'github',
    meta: {
      title: 'GitHub',
    },
    children: [
      {
        name: 'gh-deployment-mgt',
        path: '/gh-deployment-mgt',
        meta: {
          title: 'Deployments',
          desc: 'GitHub Deployment 管理工具。',
        },
      },
    ],
  },
  {
    name: 'ranking',
    meta: {
      title: '榜单排名',
    },
    children: [
      {
        name: 'cpu-ladder',
        path: '/cpu-ladder',
        meta: {
          title: 'CPU 天梯榜',
          desc: 'CPU性能排行榜，包含桌面级和移动级处理器排名。',
        },
      },
      {
        name: 'gpu-ladder',
        path: '/gpu-ladder',
        meta: {
          title: '显卡天梯榜',
          desc: '显卡性能排行榜，包含桌面级和移动级显卡排名。',
        },
      },
    ],
  },
  {
    name: 'fun',
    meta: {
      title: '娱乐',
    },
    children: [
      {
        name: 'girl',
        path: '/fun/girl',
        meta: {
          title: '随机小姐姐',
          desc: '视频素材',
        },
      },
      {
        name: 'avatar',
        path: '/fun/avatar',
        meta: {
          title: '随机头像',
          desc: '图片素材',
        },
      },
      {
        name: 'wallpaper',
        path: '/fun/wallpaper',
        meta: {
          title: '随机壁纸',
          desc: '图片素材',
        },
      },
    ],
  },
]
