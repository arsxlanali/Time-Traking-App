import React from 'react'
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import SheetTable from './sheetTable'
import { DocsLink } from 'src/reusable'

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
