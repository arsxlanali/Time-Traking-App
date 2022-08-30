import React from 'react'
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DemoTable from './sheetDemoTable'
import { DocsLink } from 'src/reusable'

const AdvancedTables = () => {
  return (
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-grid" /> Time Sheet
            <DocsLink name="CDataTable" />
          </CCardHeader>
          <DemoTable />
        </CCard>

      </CCol>
    </CRow>
  )
}

export default AdvancedTables
