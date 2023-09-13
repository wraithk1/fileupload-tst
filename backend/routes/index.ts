import express, { Router } from 'express'
import type { Express } from 'express'
import upload from '../middleware/upload'

import controller from '../controllers/upload'

export default function (app: Express) {
  const router = Router()
  /**
   * TODO: route '/' return index.html - fix this
   */
  router.get('/', controller.getListFiles)
  router.post('/', upload.array('uploadFiles'), controller.uploadFiles)
  router.put('/', controller.createOrUpdateDesc)
  router.delete('/', controller.removeFile)

  app.use('/api/files', router)
}
