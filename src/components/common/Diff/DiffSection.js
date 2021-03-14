import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import semver from 'semver'
import Diff from './Diff'

const Title = styled.h1`
  margin-top: 0.5em;
`

const DiffSection = ({
  diff,
  getDiffKey,
  title,
  completedDiffs,
  isDoneSection,
  fromVersion,
  toVersion,
  handleCompleteDiff,
  selectedChanges,
  onToggleChangeSelection,
  diffViewStyle,
  appName,
  doneTitleRef
}) => {
  const [areAllCollapsed, setAllCollapsed] = useState(undefined)

  return (
    <div>
      {title && completedDiffs.length > 0 && (
        <Title ref={doneTitleRef}>{title}</Title>
      )}

      {diff.map(diffFile => {
        const diffKey = getDiffKey(diffFile)
        const isDiffCompleted = completedDiffs.includes(diffKey)

        // If it's the "done" section, it shouldn't show if it's not completed
        if (isDoneSection !== isDiffCompleted) {
          return null
        }

        // This is here because there was a change in the line-endings of the
        // `gradlew.bat` from version 0.61 to 0.62 which showed the entire file
        // as a big change
        if (
          diffFile.oldPath.match(/gradlew.bat/) &&
          diffFile.newPath.match(/gradlew.bat/)
        ) {
          return null
        }

        return (
          diffFile?.oldRevision && (
            <Diff
              key={`${diffFile.oldRevision}${diffFile.newRevision}`}
              {...diffFile}
              // otakustay/react-diff-view#49
              type={diffFile.type === 'new' ? 'add' : diffFile.type}
              diffKey={diffKey}
              diffViewStyle={diffViewStyle}
              fromVersion={fromVersion}
              toVersion={toVersion}
              isDiffCompleted={completedDiffs.includes(diffKey)}
              onCompleteDiff={handleCompleteDiff}
              selectedChanges={selectedChanges}
              onToggleChangeSelection={onToggleChangeSelection}
              areAllCollapsed={areAllCollapsed}
              setAllCollapsed={setAllCollapsed}
              appName={appName}
            />
          )
        )
      })}
    </div>
  )
}

export default DiffSection
