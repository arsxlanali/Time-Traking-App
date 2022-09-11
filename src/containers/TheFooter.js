import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      {/* <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</a>
        <span className="ml-1">&copy; 2022 creativeLabs.</span>
      </div> */}
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://thedevcorporate.com" target="_blank" rel="noopener noreferrer">The Dev Corporate</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
