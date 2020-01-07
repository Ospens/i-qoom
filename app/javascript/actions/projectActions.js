import axios from 'axios'
import { SubmissionError } from 'redux-form'
import {
  EDIT_PROJECT,
  SET_PAGE_TITLE,
  PROJECT_CREATED_SUCCESS,
  PROJECT_UPDATED_SUCCESS,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_EXIT,
  PROJECT_ADMIN_DELETED,
  PROJECT_ADMIN_UPDATED,
  TOGGLE_SIDEBAR,
  PROJECT_CODE_UPDATED,
  PROJECT_FETCH_SUCCESS,
  DMS_USERS_FETCHED
} from './types'
import { errorNotify, successNotify } from './notificationsActions'
import { paramsToFormData } from './documentsActions'

const projectCreated = payload => ({
  type: PROJECT_CREATED_SUCCESS,
  payload
})

const projectUpdated = payload => ({
  type: PROJECT_UPDATED_SUCCESS,
  payload
})

const projectsFetched = payload => ({
  type: PROJECTS_FETCH_SUCCESS,
  payload
})

const projectFetched = payload => ({
  type: PROJECT_FETCH_SUCCESS,
  payload
})

const adminDeleted = payload => ({
  type: PROJECT_ADMIN_DELETED,
  payload
})

const adminUpdated = payload => ({
  type: PROJECT_ADMIN_UPDATED,
  payload
})

export const exitProject = payload => ({
  type: PROJECT_EXIT,
  payload
})

export const projectCodeUpdated = payload => ({
  type: PROJECT_CODE_UPDATED,
  payload
})

export const setPageTitle = title => dispatch => {
  dispatch({
    type: SET_PAGE_TITLE,
    payload: title
  })
}

export const toggleSidebar = payload => dispatch => {
  dispatch({ type: TOGGLE_SIDEBAR, payload })
}

export const startUpdateProject = (values, afterUpdate) => (dispatch, getState) => {
  const { user: { token } } = getState()

  const headers = { headers: { Authorization: token } }

  let formData = new FormData()
  // TODO: change this
  delete values.logo
  if (values.billing_address) {
    values.creation_step = 'billing_address'
  } else if (values.company_data) {
    values.creation_step = 'company_data'
  } else if (values.name) {
    values.creation_step = 'name'
  }

  const formValues = {
    project: { ...values }
  }

  formData = paramsToFormData(formData, formValues, '')

  return (
    axios.put(`/api/v1/projects/${values.id}`, formData, headers)
      .then(response => {
        dispatch(projectUpdated(response.data))
        if (afterUpdate) afterUpdate(response.data)
      })
      .catch(({ response }) => {
        dispatch(errorNotify('Problem'))
        throw new SubmissionError(response.data)
      })
  )
}

export const startCreateProject = (values, afterCreate) => (dispatch, getState) => {
  const { user: { token } } = getState()

  const headers = { headers: { Authorization: token } }

  const request = {
    project: {
      ...values,
      creation_step: 'name'
    }
  }

  return (
    axios.post('/api/v1/projects', request, headers)
      .then(response => {
        dispatch(projectCreated(response.data))
        afterCreate(response.data)
      })
      .catch(({ response }) => {
        dispatch(errorNotify('Problem'))
        throw new SubmissionError(response.data)
      })
  )
}

const setProjectAccesses = (userId, moduleAccess, project) => {
  const accesses = []
  Object.keys(moduleAccess).forEach(k => {
    accesses[k] = moduleAccess[k].includes(project.id)
  })
  return {
    ...project,
    ...accesses,
    isAdmin: project.admins
      ? project.admins.findIndex(admin => admin.user_id === userId) > -1
      : false
  }
}

export const startFetchProjects = () => (dispatch, getState) => {
  const { user: { token, user_id: userId, module_access: moduleAccess } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get('/api/v1/projects', headers)
      .then(({ data }) => {
        const projects = data.map(project => setProjectAccesses(userId, moduleAccess, project))
        dispatch(projectsFetched(projects))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}

export const startFetchProject = id => (dispatch, getState) => {
  const { user: { token, user_id: userId, module_access: moduleAccess } } = getState()
  const headers = { headers: { Authorization: token } }
  return (
    axios.get(`/api/v1/projects/${id}`, headers)
      .then(response => {
        const project = setProjectAccesses(userId, moduleAccess, response.data)
        dispatch(projectFetched(project))
        return response
      })
      .catch(({ response }) => {
        if (response.status === 403) {
          dispatch(errorNotify('Problem', 'Access denied!'))
        } else {
          dispatch(errorNotify('Problem'))
        }
        return response
      })
  )
}

export const startEditProject = id => (dispatch, getState) => {
  const { user: { token, user_id: userId, module_access: moduleAccess } } = getState()
  const headers = { headers: { Authorization: token } }
  return (
    axios.get(`/api/v1/projects/${id}/edit`, headers)
      .then(response => {
        const project = setProjectAccesses(userId, moduleAccess, response.data)
        dispatch(({ type: EDIT_PROJECT, payload: project }))
        return response
      })
      .catch(({ response }) => {
        if (response.status === 403) {
          dispatch(errorNotify('Problem', 'Access denied!'))
        } else {
          dispatch(errorNotify('Problem'))
        }
        return response
      })
  )
}

export const startDeleteAdmin = (projectId, adminId) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.delete(`/api/v1/projects/${projectId}/admins/${adminId}`, headers)
      .then(response => {
        dispatch(successNotify('Projects', response.data.message))
        dispatch(adminDeleted(adminId))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}

export const starUpdateAdmin = (projectId, values) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }
  const request = {
    project: {
      admins: [values]
    }
  }

  return (
    axios.put(`/api/v1/projects/${projectId}`, request, headers)
      .then(response => {
        dispatch(projectUpdated(response.data))
        dispatch(successNotify('Projects', 'The project admin were successfully saved!'))
      })
      .catch(({ response }) => {
        dispatch(errorNotify('Problem'))
        throw new SubmissionError(response.data)
      })
  )
}

export const startResendConfirmAdmin = (projectId, adminId) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/admins/${adminId}/resend_confirmation`, headers)
      .then(() => {
        dispatch(successNotify('Projects', 'A new invitation has been sent to this address!'))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}

export const getAdminInfo = (projectId, adminId) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.get(`/api/v1/projects/${projectId}/admins/${adminId}/`, headers)
      .then(response => {
        dispatch(adminUpdated(response.data))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}

export const updateProjectCode = (projectId, projectCode) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.post(`/api/v1/projects/${projectId}/update_project_code`,
      { project_code: projectCode }, headers)
      .then(() => {
        dispatch(projectCodeUpdated(projectCode))
        dispatch(successNotify('Projects', 'Project code was updated!'))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}

export const dmsUsers = (projectId, teams = false) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }
  let url = `/api/v1/projects/${projectId}/dms_users`
  if (teams) {
    url += '?scope=teams'
  }
  return (
    axios.get(url, headers)
      .then(({ data }) => {
        dispatch({ type: DMS_USERS_FETCHED, payload: data })
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}

export const inviteMembers = (projectId, memberIds) => (dispatch, getState) => {
  const { user: { token } } = getState()
  const headers = { headers: { Authorization: token } }

  return (
    axios.post(`/api/v1/projects/${projectId}/invite`, { project_member_ids: memberIds }, headers)
      .then(() => {
        dispatch(successNotify('Projects', 'The invites was sent!'))
      })
      .catch(() => {
        dispatch(errorNotify('Problem'))
      })
  )
}
