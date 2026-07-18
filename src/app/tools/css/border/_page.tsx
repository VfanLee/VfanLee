'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import { CssCodeOutput } from '@/components'

type BorderSide = 'top' | 'right' | 'bottom' | 'left'
type Corner = 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft'
type BorderValue = {
  width: number
  style: string
  color: string
}

const sideLabels: Record<BorderSide, string> = {
  top: '上边',
  right: '右边',
  bottom: '下边',
  left: '左边',
}

const cornerLabels: Record<Corner, string> = {
  topLeft: '左上',
  topRight: '右上',
  bottomRight: '右下',
  bottomLeft: '左下',
}

const borderStyles = ['none', 'solid', 'dashed', 'dotted', 'double']

const initialBorders: Record<BorderSide, BorderValue> = {
  top: { width: 2, style: 'solid', color: '#171717' },
  right: { width: 2, style: 'solid', color: '#171717' },
  bottom: { width: 2, style: 'solid', color: '#171717' },
  left: { width: 2, style: 'solid', color: '#171717' },
}

const initialRadii: Record<Corner, number> = {
  topLeft: 16,
  topRight: 16,
  bottomRight: 16,
  bottomLeft: 16,
}

function RangeField({
  label,
  value,
  min,
  max,
  unit = 'px',
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  unit?: string
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <span className="text-muted-foreground mb-1.5 flex justify-between text-xs">
        {label}
        <span className="text-foreground font-mono">
          {value}
          {unit}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-foreground w-full"
      />
    </label>
  )
}

export default function BorderPage() {
  const [borders, setBorders] = useState(initialBorders)
  const [radii, setRadii] = useState(initialRadii)

  const cssCode = useMemo(
    () =>
      (['top', 'right', 'bottom', 'left'] as const)
        .map((side) => `border-${side}: ${borders[side].width}px ${borders[side].style} ${borders[side].color};`)
        .concat(
          (['topLeft', 'topRight', 'bottomRight', 'bottomLeft'] as const).map(
            (corner) =>
              `border-${corner.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`)}-radius: ${radii[corner]}px;`,
          ),
        )
        .join('\n'),
    [borders, radii],
  )

  const previewStyle: CSSProperties = {
    borderTop: `${borders.top.width}px ${borders.top.style} ${borders.top.color}`,
    borderRight: `${borders.right.width}px ${borders.right.style} ${borders.right.color}`,
    borderBottom: `${borders.bottom.width}px ${borders.bottom.style} ${borders.bottom.color}`,
    borderLeft: `${borders.left.width}px ${borders.left.style} ${borders.left.color}`,
    borderTopLeftRadius: `${radii.topLeft}px`,
    borderTopRightRadius: `${radii.topRight}px`,
    borderBottomRightRadius: `${radii.bottomRight}px`,
    borderBottomLeftRadius: `${radii.bottomLeft}px`,
  }

  return (
    <div className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-7">
        <h1 className="text-foreground text-xl font-semibold tracking-tight">Border</h1>
        <p className="text-muted-foreground mt-1 text-sm">独立调节四边边框与四角圆角，实时生成 CSS。</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(22rem,1.08fr)]">
        <section className="border-border bg-card rounded-lg border p-4 sm:p-5">
          <h2 className="text-foreground text-sm font-medium">边框</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
              <fieldset key={side} className="border-border rounded-lg border p-3">
                <legend className="text-foreground px-1 text-xs font-medium">{sideLabels[side]}</legend>
                <div className="space-y-3">
                  <RangeField
                    label="宽度"
                    value={borders[side].width}
                    min={0}
                    max={32}
                    onChange={(width) => setBorders((current) => ({ ...current, [side]: { ...current[side], width } }))}
                  />
                  <label className="block">
                    <span className="text-muted-foreground mb-1.5 block text-xs">样式</span>
                    <select
                      value={borders[side].style}
                      onChange={(event) =>
                        setBorders((current) => ({
                          ...current,
                          [side]: { ...current[side], style: event.target.value },
                        }))
                      }
                      className="border-border bg-background text-foreground h-9 w-full rounded-md border px-2 text-sm outline-none"
                    >
                      {borderStyles.map((style) => (
                        <option key={style} value={style}>
                          {style}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex items-center justify-between gap-3">
                    <span className="text-muted-foreground text-xs">颜色</span>
                    <input
                      type="color"
                      value={borders[side].color}
                      onChange={(event) =>
                        setBorders((current) => ({
                          ...current,
                          [side]: { ...current[side], color: event.target.value },
                        }))
                      }
                      className="border-border h-8 w-11 cursor-pointer rounded-md border bg-transparent p-1"
                      aria-label={`${sideLabels[side]}颜色`}
                    />
                  </label>
                </div>
              </fieldset>
            ))}
          </div>

          <div className="border-border mt-6 border-t pt-5">
            <h2 className="text-foreground text-sm font-medium">圆角</h2>
            <div className="mt-4 grid gap-x-5 gap-y-4 sm:grid-cols-2">
              {(['topLeft', 'topRight', 'bottomRight', 'bottomLeft'] as const).map((corner) => (
                <RangeField
                  key={corner}
                  label={cornerLabels[corner]}
                  value={radii[corner]}
                  min={0}
                  max={64}
                  onChange={(value) => setRadii((current) => ({ ...current, [corner]: value }))}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <section className="border-border bg-card rounded-lg border p-4 sm:p-5">
            <h2 className="text-foreground text-sm font-medium">预览</h2>
            <div className="mt-4 grid min-h-80 place-items-center rounded-lg bg-[#e8e8e8] p-6 sm:p-10">
              <article
                style={previewStyle}
                className="w-full bg-white p-6 text-[#202020] transition-[border-radius,border] duration-150"
              >
                <p className="text-xs font-medium tracking-wide text-[#737373] uppercase">Sample component</p>
                <h3 className="mt-3 text-xl font-semibold">Shape your interface</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f5f5f]">
                  Use each control to tune the edges and corners of this component.
                </p>
                <button type="button" className="mt-5 rounded-md bg-[#171717] px-3 py-2 text-sm font-medium text-white">
                  Preview action
                </button>
              </article>
            </div>
          </section>
          <CssCodeOutput code={cssCode} />
        </div>
      </div>
    </div>
  )
}
