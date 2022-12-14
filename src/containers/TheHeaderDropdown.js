import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { clearEmployee } from 'src/redux/Slice/employeesSlice'
import { clearLogin } from 'src/redux/Slice/loginSlice'
import { clearProjects } from 'src/redux/Slice/projectSlice'
import { clearTimeSheet } from 'src/redux/Slice/viewTimeSheetSlice'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const role = localStorage.getItem('Role')
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/images.png'}
            className="c-avatar-img"
            alt="Avatar Image"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>{role}</strong>
        </CDropdownItem>
        {/* <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem> */}

        <CDropdownItem onClick={
          () => {
            localStorage.clear();
            dispatch(clearEmployee())
            dispatch(clearProjects())
            dispatch(clearLogin())
            dispatch(clearTimeSheet())
            history.push('/login');
          }
        }>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
