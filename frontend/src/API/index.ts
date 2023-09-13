import Axios from 'axios'

const instance = Axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/api` || 'http://localhost:8080/api',
})

async function getFiles() {
  const { data } = await instance.get('/files')
  return data
}

async function uploadFiles(payload: FormData) {
  const { data } = await instance.post('/files', payload)
  return data
}

interface UpdateDescPayload {
  _id: string
  description: string
}

async function updateOrCreateDescription(payload: UpdateDescPayload) {
  const { data } = await instance.put('/files', JSON.stringify(payload), {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}

interface DeletePayload {
  _id: string
}

async function deleteFile(payload: DeletePayload) {
  const { data } = await instance.delete('/files?_id=' + payload._id)
  return data
}

export default {
  uploadFiles,
  updateOrCreateDescription,
  deleteFile,
  getFiles,
}
