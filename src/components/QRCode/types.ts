export interface QRCodeOptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H'
  margin?: number
  width?: number
}

export interface QRCodeProps {
  modelValue: string
  options: QRCodeOptions
  logo?: string
}
