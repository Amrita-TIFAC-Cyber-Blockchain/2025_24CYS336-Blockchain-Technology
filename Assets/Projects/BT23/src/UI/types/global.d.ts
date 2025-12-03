interface EthereumProvider {
  isMetaMask?: boolean
  request: (args: { method: string; params?: unknown[] }) => Promise<any>
}

interface Window {
  ethereum?: EthereumProvider
}
