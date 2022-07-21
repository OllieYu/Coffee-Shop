import React from 'react'

function enterButton({ initEnter }) {
  return (
    <button
      onClick={() => initEnter()}
      type="button"
      className="nes-btn is-primary"
      style={{ alignSelf: 'center' }}
    >
      !ｯﾞｸ(╹ꇴ╹๑) ENTER (๑╹ꇴ╹)ｸﾞｯ!
    </button>
  )
}

export default enterButton