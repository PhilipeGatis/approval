export type base64Decoded = {
  username?: string
  password?: string
}

const base64parse = (auth: string | undefined): base64Decoded | undefined => {
  if (!auth) {
    return undefined
  }

  const result: base64Decoded = {}

  const parts = auth.split(' ')

  const scheme = parts[0]
  if (scheme !== 'Basic') {
    return undefined
  }

  const decoded = new Buffer(parts[1], 'base64').toString('utf8')
  const colon = decoded.indexOf(':')

  result.username = decoded.substr(0, colon)
  result.password = decoded.substr(colon + 1)

  return result;
};

export default base64parse
