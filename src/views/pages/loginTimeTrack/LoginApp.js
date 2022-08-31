import React, { useState, useEffect } from 'react'
import { login } from 'src/redux/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'



function LoginApp() {

  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePas(event) {
    setPassword(event.target.value);
  }

  const dispatch = useDispatch()
  const { entities, loading } = useSelector((state) => state.login)


  if (loading) return <p>Loading...</p>

  const navigate = () => {
    history.push('/dashboard')
  }
  
  const onSubmit = () => {
    let data = {
      email,
      password
    }
      dispatch(login({ data,navigate }))
  }
  return (

    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" autoComplete="email" onChange={handleEmail} required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" onChange={handlePas} required />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={onSubmit}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>

  )
}

export default LoginApp
