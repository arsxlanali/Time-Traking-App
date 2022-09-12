import React from 'react'
import {
  CCard,
  CCol,
  CRow,
} from '@coreui/react'
import ProjectTable from './projectTable'

const ProjectsTable = () => {
  return (
    <CRow>
      <CCol sm="12">
        <CCard>
          <ProjectTable />
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProjectsTable
