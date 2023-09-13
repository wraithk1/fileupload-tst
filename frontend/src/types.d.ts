interface MyFile {
  createdAt: string
  description: string
  isDeleted: boolean
  pictureName: string
  updatedAt: string
  _id: string
}

interface Data {
  message: string
  files: MyFile[]
}

interface DataContext {
  isLoading: boolean
  error: unknown
  data?: Data
}