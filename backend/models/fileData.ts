import mongoose from '../db/mongoose'
const {Schema, model} = mongoose

interface FileData {
  description: string
  createdAt: string
  updatedAt: string
  pictureName: string,
  isDeleted: boolean
}

const fileSchema = new Schema({
  description: String,
  createdAt: String,
  updatedAt: String,
  pictureName: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  collection: 'file_datas'
})

export default model<FileData>('File', fileSchema)