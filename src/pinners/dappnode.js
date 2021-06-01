const { create: ipfsHttp, globSource } = require('ipfs-http-client')
const all = require('it-all')

module.exports = {
  name: 'DAppNode',
  builder: async () => {
    return ipfsHttp({
      host: 'ipfs.dappnode',
      port: '5001',
      protocol: 'http'
    })
  },
  pinDir: async (api, dir) => {
    const response = await all(api.addAll(globSource(dir, { recursive: true })))
    return response.pop().cid.toString()
  },
  pinHash: async (api, hash) => {
    return api.pin.add(hash)
  }
}
