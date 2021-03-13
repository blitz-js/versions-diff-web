import semver from 'semver/preload'
import versions from './releases'

const RN_DIFF_REPO = 'blitz-js/versions-diff'
const DEFAULT_APP_NAME = 'BlitzDiffApp'

export const RELEASES_URL = `https://raw.githubusercontent.com/${RN_DIFF_REPO}/master/RELEASES`

export const getDiffPatchURL = ({ fromVersion, toVersion }) =>
  `https://raw.githubusercontent.com/${RN_DIFF_REPO}/diffs/diffs/${fromVersion}..${toVersion}.diff`

// `path` must contain `RnDiffApp` prefix
export const getBinaryFileURL = ({ version, path }) =>
  `https://github.com/${RN_DIFF_REPO}/raw/release/${version}/${path}`

export const removeAppPathPrefix = (path, appName) =>
  path.replace(new RegExp(`${appName || DEFAULT_APP_NAME}/`), '')

export const replaceWithProvidedAppName = (path, appName) => {
  if (!appName) {
    return path
  }

  return path
    .replace(new RegExp(DEFAULT_APP_NAME, 'g'), appName)
    .replace(
      new RegExp(DEFAULT_APP_NAME.toLowerCase(), 'g'),
      appName.toLowerCase()
    )
}

export const getVersionsInDiff = ({ fromVersion, toVersion }) => {
  const cleanedToVersion = semver.valid(semver.coerce(toVersion))

  return versions.filter(({ version }) => {
    const cleanedVersion = semver.coerce(version)

    // `cleanedVersion` can't be newer than `cleanedToVersion` nor older (or equal) than `fromVersion`
    return (
      semver.compare(cleanedToVersion, cleanedVersion) !== -1 &&
      ![0, -1].includes(semver.compare(cleanedVersion, fromVersion))
    )
  })
}

const baseChangelogURL =
  'https://github.com/blitz-js/releases/blob/master/CHANGELOG.md'
export const getChangelogURL = ({ version }) =>
  `${baseChangelogURL}#v${version.replace('.', '')}0`

// settings constants
export const SHOW_LATEST_RCS = 'Show latest release candidates'
