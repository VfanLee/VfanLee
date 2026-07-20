'use client'

import { RotateCcw } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { CssCodeOutput } from '@/components'
import { Button } from '@/components/ui'

type AnimationExample = {
  id: string
  title: string
  description: string
  code: string
  preview: ReactNode
}

const underlineCode = `.animated-underline {
  line-height: 2;
  background: linear-gradient(90deg, #ef4444, #22c55e) no-repeat right bottom / 0 2px;
  transition: background-size 1s;
}

.animated-underline:hover {
  background-position: left bottom;
  background-size: 100% 2px;
}`

const eraserCode = `.text-eraser-container {
  --surface-color: #fff;
  position: relative;
  color: #374151;
}

@property --erase-position {
  syntax: '<percentage>';
  initial-value: 0%;
  inherits: false;
}

.text-eraser {
  --erase-position: 5%;
  color: transparent;
  background-image: linear-gradient(
    to right,
    var(--surface-color, #fff) var(--erase-position),
    transparent calc(var(--erase-position) + 50px)
  );
  animation: erase 4s forwards;
}

@keyframes erase {
  to { --erase-position: 100%; }
}`

const skeletonCode = `.skeleton {
  animation: shimmer 1s linear infinite;
  background-image: linear-gradient(
    90deg,
    #e5e7eb 0%,
    #e5e7eb 30%,
    #f3f4f6 45%,
    #e5e7eb 60%,
    #e5e7eb 100%
  );
  background-size: 500%;
}

@keyframes shimmer {
  from { background-position: 0%; }
  to { background-position: 100%; }
}`

const examples: AnimationExample[] = [
  {
    id: 'animated-underline',
    title: '渐变下划线',
    description: '悬停时从右向左展开的渐变下划线。',
    code: underlineCode,
    preview: (
      <div className="animation-preview-surface grid min-h-52 place-items-center px-8 text-center sm:px-12">
        <p className="animated-underline-demo max-w-xl text-xl font-medium tracking-tight text-[#202020] sm:text-2xl">
          让交互在细节处自然发生
        </p>
      </div>
    ),
  },
  {
    id: 'text-eraser',
    title: '文本擦除',
    description: '使用注册的自定义属性，让擦除位置平滑移动。',
    code: eraserCode,
    preview: (
      <div className="eraser-surface animation-preview-surface grid min-h-52 place-items-center px-8 sm:px-12">
        <div className="text-eraser-container max-w-xl text-center text-lg leading-8 sm:text-xl">
          <p>让文字在一段时间内逐渐消失，留下清爽的阅读空间。</p>
          <p className="text-eraser" aria-hidden="true">
            让文字在一段时间内逐渐消失，留下清爽的阅读空间。
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'skeleton',
    title: '骨架屏',
    description: '循环流动的高光，为加载过程提供视觉反馈。',
    code: skeletonCode,
    preview: (
      <div className="animation-preview-surface grid min-h-52 place-items-center p-8">
        <div className="flex w-full max-w-sm items-center gap-4">
          <div className="skeleton-demo size-14 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-3">
            <div className="skeleton-demo h-4 w-2/5 rounded-full" />
            <div className="skeleton-demo h-4 w-full rounded-full" />
            <div className="skeleton-demo h-4 w-4/5 rounded-full" />
          </div>
        </div>
      </div>
    ),
  },
]

export default function AnimationsPage() {
  const [previewVersions, setPreviewVersions] = useState<Record<string, number>>({})

  const restartPreview = (id: string) => {
    setPreviewVersions((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }))
  }

  return (
    <div className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-7 max-w-2xl">
        <h1 className="text-foreground text-xl font-semibold tracking-tight">CSS 动画示例</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          收集常见的动画效果。每项均可预览并复制 CSS，后续示例会持续补充。
        </p>
      </div>

      <div className="space-y-6">
        {examples.map((example) => (
          <section
            key={example.id}
            className="border-border bg-card overflow-hidden rounded-lg border lg:flex lg:h-[26rem] lg:flex-col"
          >
            <div className="border-border flex items-start justify-between gap-4 border-b px-4 py-4 sm:px-5">
              <div>
                <h2 className="text-foreground text-base font-medium">{example.title}</h2>
                <p className="text-muted-foreground mt-1 text-sm">{example.description}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-foreground shrink-0"
                onClick={() => restartPreview(example.id)}
                aria-label={`重新播放${example.title}`}
                title="重新播放动画"
              >
                <RotateCcw />
              </Button>
            </div>
            <div className="grid gap-4 p-4 sm:p-5 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.9fr)]">
              <div
                key={previewVersions[example.id] ?? 0}
                className="border-border overflow-hidden rounded-lg border lg:h-full"
              >
                {example.preview}
              </div>
              <CssCodeOutput code={example.code} codeClassName="overflow-y-auto" />
            </div>
          </section>
        ))}
      </div>

      <style jsx global>{`
        .animation-preview-surface {
          background: #fff;
        }
        @media (min-width: 1024px) {
          .animation-preview-surface {
            height: 100%;
            min-height: 0;
          }
        }
        .animated-underline-demo {
          line-height: 2;
          background: linear-gradient(90deg, #ef4444, #22c55e) no-repeat right bottom / 0 2px;
          transition: background-size 1s;
        }
        .animated-underline-demo:hover {
          background-position: left bottom;
          background-size: 100% 2px;
        }
        .eraser-surface {
          background: #fff;
        }
        .text-eraser-container {
          --surface-color: #fff;
          position: relative;
          color: #374151;
        }
        .text-eraser {
          --erase-position: 5%;
          position: absolute;
          inset: 0;
          margin: 0;
          color: transparent;
          background-image: linear-gradient(
            to right,
            var(--surface-color) var(--erase-position),
            transparent calc(var(--erase-position) + 50px)
          );
          animation: erase 4s forwards;
        }
        .skeleton-demo {
          animation: shimmer 1s linear infinite;
          background-image: linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 30%, #f3f4f6 45%, #e5e7eb 60%, #e5e7eb 100%);
          background-size: 500%;
        }
        @property --erase-position {
          syntax: '<percentage>';
          initial-value: 0%;
          inherits: false;
        }
        @keyframes erase {
          to {
            --erase-position: 100%;
          }
        }
        @keyframes shimmer {
          from {
            background-position: 0%;
          }
          to {
            background-position: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animated-underline-demo {
            transition-duration: 0.01ms;
          }
          .text-eraser,
          .skeleton-demo {
            animation-duration: 0.01ms;
          }
        }
      `}</style>
    </div>
  )
}
