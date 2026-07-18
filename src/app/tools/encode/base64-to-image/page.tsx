import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = { title: '图片 ↔ Base64 | Vfan Lee' }

export default function Base64ToImagePage() {
  redirect('/tools/encode/image-base64')
}
