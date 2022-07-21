import React, { Fragment } from 'react'

export default function progressBar({ progress }) {
  return (
    <Fragment>
      <span style={{ alignSelf: 'center' }}>Boiling the water...</span>
      <progress
        style={{ width: '60vw', alignSelf: 'center' }}
        className="nes-progress is-error"
        value={progress}
        max="100"
      />
    </Fragment>
  )
}
