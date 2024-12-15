<script setup>
import QRCode from 'qrcode'
import { uuid } from '@/utils/uuid'

defineOptions({
  name: 'QRCode',
})

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  // https://github.com/soldair/node-qrcode#qr-code-options
  options: {
    type: Object,
    default: () => ({}),
  },
  logo: {
    type: String,
  },
})

defineEmits(['update:modelValue'])

const QRCodeRef = ref(null)

const renderQRCode = () => {
  QRCode.toCanvas(
    unref(QRCodeRef),
    unref(props.modelValue),
    {
      errorCorrectionLevel: 'H', // L, M, Q, H
      margin: 0,
      width: 200,
      ...props.options,
    },
    (err, canvas) => {
      if (err) return

      const logo = new Image()
      logo.src = '/img/appicon_2.0.png'
      logo.onload = () => {
        const cw = canvas.width
        const dwh = canvas.width / 4
        const dxy = (cw - dwh) / 2

        const ctx = canvas.getContext('2d')
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
