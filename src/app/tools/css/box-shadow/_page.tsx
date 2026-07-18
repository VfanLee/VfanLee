'use client'

import { useMemo, useRef, useState, type CSSProperties } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { CssCodeOutput } from '@/components'
import { Button } from '@/components/ui'

type ShadowLayer = {
  id: string
  x: number
  y: number
  blur: number
  spread: number
  color: string
  opacity: number
  inset: boolean
}

const initialLayer: ShadowLayer = {
  id: 'shadow-1',
  x: 0,
  y: 12,
  blur: 32,
  spread: -12,
  color: '#000000',
  opacity: 28,
  inset: false,
}

function rgbaFromHex(hex: string, opacity: number) {
  const normalized = hex.replace('#', '')
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((part) => `${part}${part}`)
          .join('')
      : normalized
  const red = Number.parseInt(expanded.slice(0, 2), 16)
  const green = Number.parseInt(expanded.slice(2, 4), 16)
  const blue = Number.parseInt(expanded.slice(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${(opacity / 100).toFixed(2)})`
}

function formatShadow(layer: ShadowLayer) {
  return `${layer.inset ? 'inset ' : ''}${layer.x}px ${layer.y}px ${layer.blur}px ${layer.spread}px ${rgbaFromHex(layer.color, layer.opacity)}`
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

export default function BoxShadowPage() {
  const [layers, setLayers] = useState<ShadowLayer[]>([initialLayer])
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(initialLayer.id)
  const nextLayerNumber = useRef(2)
  const selectedLayer = layers.find((layer) => layer.id === selectedLayerId) ?? null
  const shadowValue = layers.length > 0 ? layers.map(formatShadow).join(', ') : 'none'
  const cssCode = useMemo(
    () => `box-shadow: ${layers.length > 0 ? layers.map(formatShadow).join(',\n  ') : 'none'};`,
    [layers],
  )

  const updateSelectedLayer = (updates: Partial<ShadowLayer>) => {
    if (!selectedLayerId) return

    setLayers((current) => current.map((layer) => (layer.id === selectedLayerId ? { ...layer, ...updates } : layer)))
  }

  const addLayer = () => {
    const id = `shadow-${nextLayerNumber.current}`
    nextLayerNumber.current += 1
    const layer: ShadowLayer = { ...initialLayer, id, y: 8, blur: 20, spread: -8, opacity: 20 }
    setLayers((current) => [...current, layer])
    setSelectedLayerId(id)
  }

  const removeLayer = (id: string) => {
    const removedIndex = layers.findIndex((layer) => layer.id === id)
    const nextLayers = layers.filter((layer) => layer.id !== id)
    setLayers(nextLayers)
    setSelectedLayerId((current) => {
      if (current !== id) return current
      return nextLayers[removedIndex]?.id ?? nextLayers[removedIndex - 1]?.id ?? null
    })
  }

  const previewStyle: CSSProperties = { boxShadow: shadowValue }

  return (
    <div className="w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mb-7">
        <h1 className="text-foreground text-xl font-semibold tracking-tight">Box Shadow</h1>
        <p className="text-muted-foreground mt-1 text-sm">叠加和调节多层阴影，实时生成 CSS。</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(22rem,1.08fr)]">
        <section className="border-border bg-card rounded-lg border p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-foreground text-sm font-medium">阴影图层</h2>
            <Button type="button" variant="secondary" size="sm" onClick={addLayer}>
              <Plus />
              新增图层
            </Button>
          </div>

          {layers.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {layers.map((layer, index) => (
                <div key={layer.id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setSelectedLayerId(layer.id)}
                    aria-pressed={selectedLayerId === layer.id}
                    className={`h-8 rounded-l-md border px-3 text-xs transition-colors ${
                      selectedLayerId === layer.id
                        ? 'border-foreground/25 bg-muted text-foreground'
                        : 'border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    图层 {index + 1}
                  </button>
                  <button
                    type="button"
                    onClick={() => removeLayer(layer.id)}
                    className="border-border text-muted-foreground hover:bg-muted hover:text-foreground -ml-px flex size-8 items-center justify-center rounded-r-md border transition-colors"
                    aria-label={`删除图层 ${index + 1}`}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground mt-4 text-sm">暂无阴影图层。新增图层即可开始调节。</p>
          )}

          {selectedLayer && (
            <div className="border-border mt-6 border-t pt-5">
              <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                <RangeField
                  label="水平偏移"
                  value={selectedLayer.x}
                  min={-64}
                  max={64}
                  onChange={(x) => updateSelectedLayer({ x })}
                />
                <RangeField
                  label="垂直偏移"
                  value={selectedLayer.y}
                  min={-64}
                  max={64}
                  onChange={(y) => updateSelectedLayer({ y })}
                />
                <RangeField
                  label="模糊半径"
                  value={selectedLayer.blur}
                  min={0}
                  max={128}
                  onChange={(blur) => updateSelectedLayer({ blur })}
                />
                <RangeField
                  label="扩散半径"
                  value={selectedLayer.spread}
                  min={-64}
                  max={64}
                  onChange={(spread) => updateSelectedLayer({ spread })}
                />
                <RangeField
                  label="不透明度"
                  value={selectedLayer.opacity}
                  min={0}
                  max={100}
                  unit="%"
                  onChange={(opacity) => updateSelectedLayer({ opacity })}
                />
                <div className="flex items-end justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedLayer.inset}
                      onChange={(event) => updateSelectedLayer({ inset: event.target.checked })}
                      className="accent-foreground size-4"
                    />
                    <span className="text-foreground">Inset</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs">颜色</span>
                    <input
                      type="color"
                      value={selectedLayer.color}
                      onChange={(event) => updateSelectedLayer({ color: event.target.value })}
                      className="border-border h-8 w-11 cursor-pointer rounded-md border bg-transparent p-1"
                      aria-label="阴影颜色"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
          <section className="border-border bg-card rounded-lg border p-4 sm:p-5">
            <h2 className="text-foreground text-sm font-medium">预览</h2>
            <div className="mt-4 grid min-h-80 place-items-center rounded-lg bg-[#e8e8e8] p-6 sm:p-10">
              <article
                style={previewStyle}
                className="w-full rounded-xl bg-white p-6 text-[#202020] transition-shadow duration-150"
              >
                <p className="text-xs font-medium tracking-wide text-[#737373] uppercase">Sample component</p>
                <h3 className="mt-3 text-xl font-semibold">Build depth with layers</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f5f5f]">
                  Stack subtle shadows to give an interface a clear visual hierarchy.
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
