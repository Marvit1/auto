export async function connectWallet() {
  if (typeof window === 'undefined') return { success: false, error: 'no_window' }
  const provider: any = (window as any).ethereum
  if (!provider) return { success: false, error: 'no_metamask' }

  try {
    if (typeof provider.request === 'function') {
      const accounts = await provider.request({ method: 'eth_requestAccounts' })
      return { success: true, accounts }
    }
    if (typeof provider.connect === 'function') {
      const result = await provider.connect()
      return { success: true, result }
    }
    return { success: false, error: 'no_request_method' }
  } catch (err: any) {
    return { success: false, error: err?.message || String(err) }
  }
}
