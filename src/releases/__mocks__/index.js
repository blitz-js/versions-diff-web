const fixtureVersions = []

jest.setMock(
  '../index.js',
  fixtureVersions.map(version => ({
    version
  }))
)
