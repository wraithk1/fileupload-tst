import util from 'util'
import multer from 'multer'
import dbconf from '../db/config'
import mongoose from '../db/mongoose'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

const upload = multer({ storage })
export default upload