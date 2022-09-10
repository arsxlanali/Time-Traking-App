import React, { useState, useNavigate } from 'react'
import { viewProjects, deleteProject } from 'src/redux/Slice/projectSlice'
import Loader from "../../loader/Loader";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
// import { getEmployees } from 'src/redux/Slice/employeesSlice';
import {
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable
} from '@coreui/react'

import { useHistory } from 'react-router-dom'

const DemoTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //currentPage !== page && setPage(currentPage);
    // dispatch(getEmployees());
    dispatch(viewProjects());
  }, []);

  const { projects, loading } = useSelector((state) => state.viewProjects);
  console.log("this is projejct", projects)
  const projectsArray = projects.map(project => {
    return {
      ...project, assignTo: project['assignTo'].map((assign) => { return assign.name }), assignBy: project['assignBy'].name
    }
  })

  const history = useHistory();

  const [details, setDetails] = useState([])
  // const [items, setItems] = useState(usersData)

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }


  const fields = [

    { key: 'name', _style: { width: '15%' } },
    { key: 'description', _style: { width: '30%' } },

    { key: 'startDate', _style: { width: '15%' } },
    { key: 'assignBy', _style: { width: '15%' } },
    { key: 'assignTo', _style: { width: '30%' } },

    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      filter: false
    }
  ]

  return (
    <CCardBody>
      {
        loading ? (
          <Loader />
        ) : (
          <CDataTable
            items={projectsArray}
            fields={fields}
            columnFilter
            tableFilter
            cleaner
            itemsPerPageSelect
            itemsPerPage={5}
            hover
            sorter
            pagination
            // loading
            onRowClick={(item, index, col, e) => console.log(item, index, col, e)}
            onPageChange={(val) => console.log('new page:', val)}
            onPagesChange={(val) => console.log('new pages:', val)}
            onPaginationChange={(val) => console.log('new pagination:', val)}
            onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
            onSorterValueChange={(val) => console.log('new sorter value:', val)}
            onTableFilterChange={(val) => console.log('new table filter:', val)}
            onColumnFilterChange={(val) => console.log('new column filter:', val)}
            scopedSlots={{

              'edit':
                item => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => { toggleDetails(item._id) }}
                      >
                        {details.includes(item.id) ? 'Hide' : <i class="cil"></i>}
                      </CButton>
                    </td>
                  )
                },
              'show_details':
                item => {
                  return (
                    <td className="py-2">
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => { toggleDetails(item._id) }}
                      >
                        {details.includes(item._id) ? 'Hide' : 'Action'}
                      </CButton>
                    </td>
                  )
                },
              'details':
                item => {
                  return (
                    <>
                      <CCollapse show={details.includes(item._id)}>
                        <CCardBody>

                          <CButton size="sm" color="info" onClick={() => history.push('/editProject', item)}>
                            Edit
                          </CButton>
                          <CButton size="sm" color="danger" className="ml-1" onClick={() => dispatch(deleteProject(item._id))}>
                            Delete
                          </CButton>
                          <CButton
                            size="sm"
                            color="primary"
                            className="ml-1"
                            onClick={() => {
                              history.push(`/viewproject/${item._id}`, { item });
                            }}
                          >
                            View
                          </CButton>
                        </CCardBody>

                      </CCollapse>


                    </>
                  )
                }
            }}
          />
        )}
    </CCardBody>

  );
}

export default DemoTable
