<script setup lang="ts">
import type { QRCodeProps } from './types'

import QRCode from 'qrcode'
import { uuid } from '@/utils/uuid'

defineOptions({
  name: 'QRCode',
})

const props = withDefaults(defineProps<QRCodeProps>(), {
  modelValue: '',
  options: () => ({}),
  logo: '',
})

const emit = defineEmits<{
  (event: 'update:modelValue'): void
}>()

const QRCodeRef = ref<HTMLCanvasElement | null>(null)

const renderQRCode = () => {
  const canvas = unref(QRCodeRef)
  if (!canvas) return

  QRCode.toCanvas(
    canvas,
    unref(props.modelValue),
    {
      errorCorrectionLevel: 'H', // L, M, Q, H
      margin: 0,
      width: 200,
      ...props.options,
    },
    err => {
      if (err) return

      const logo = new Image()
      logo.src = props.logo || '/img/appicon_2.0.png'
      logo.onload = () => {
        const cw = canvas.width
        const dwh = cw / 4
        const dxy = (cw - dwh) / 2

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.imageSmoothingEnabled = false
        ctx.drawImage(logo, dxy, dxy, dwh, dwh)
      }
    },
  )
}

watch(
  () => props.modelValue,
  () => nextTick(renderQRCode),
  { immediate: true },
)
</script>

<template>
  <canvas :id="`QRCode_` + uuid()" ref="QRCodeRef"></canvas>
</template>
