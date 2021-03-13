// this line HAAAAAAAAS to go
const versions = []

export default versions.map(version => ({
  ...require(`./${version}`).default,
  version
}))
