/**
 * 通知工具 — 占位模块，供旧代码兼容性引用
 * sweetalert2 已移除，通知功能由各组件内联处理
 */

export const showError = async (message: string, _title?: string): Promise<void> => {
  console.error('[showError]', _title, message)
}

export const showWarning = async (message: string, _title?: string): Promise<void> => {
  console.warn('[showWarning]', _title, message)
}

export const showSuccess = async (_message: string, _title?: string, _timer?: number): Promise<void> => {
  // no-op: UI components handle success feedback inline
}

export const showInfo = async (message: string, _title?: string): Promise<void> => {
  console.info('[showInfo]', _title, message)
}

export const showConfirm = async (
  _message: string,
  _title?: string,
  _confirmButtonText?: string,
  _cancelButtonText?: string,
): Promise<boolean> => {
  return window.confirm(_message)
}
