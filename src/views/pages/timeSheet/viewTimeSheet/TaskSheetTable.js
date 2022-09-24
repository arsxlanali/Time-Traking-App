import React from 'react'
import {
  CCard,
  CCol,
  CRow,
} from '@coreui/react'
import SheetTable from './SheetTable'

const TaskSheetTable = () => {
  return (
    <CRow>
      <CCol sm="12">
        <CCard>
          <SheetTable />
        </CCard>

      </CCol>
    </CRow>
  )
}

export default TaskSheetTable
