import FileModel from '../models/fileData'
import type { NextFunction, Request, Response } from 'express'
import upload from '../middleware/upload'
import mongoose from '../db/mongoose'
import dbconf from '../db/config'

async function uploadFiles(req: Request, res: Response) {
  try {

    if (req.files == undefined || (req.files.length as number) <= 0) {
      return res.status(500).send({
        message: 'You must select a file(s).',
      })
    }

    const files = req.files as Array<Express.Multer.File>
    files.forEach(async (file) => {
      const newFile = new FileModel({
        description: req.body.description,
        createdAt: new Date().toString(),
        updatedAt: '',
        pictureName: file.filename,
      })

      await newFile.save()
    })

    return res.status(201).send({
      message: 'File has been uploaded.',
    })
  } catch (error) {
    console.error(error)

    if ((error as NodeJS.ErrnoException).code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).send({
        message: 'Too many files to upload.',
      })
    }

    res.status(500).send({
      message: 'Error when trying upload image: ' + (error as Error).message,
    })
  }
}


async function getListFiles(req: Request, res: Response) {
  try {
    const files = await FileModel.find({isDeleted: false})

    return res.status(200).send({
      message: 'List of files',
      files: files,
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      message: (error as Error).message,
    })
  }
}

async function createOrUpdateDesc(req: Request, res: Response) {
  try {
    await FileModel.findByIdAndUpdate(req.body._id, {
      $set: { description: req.body.description, updatedAt: new Date() },
    })

    res.status(201).send({
      message: 'Success',
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      message: (error as Error).message,
    })
  }
}

async function removeFile(req: Request, res: Response) {
  try {
    await FileModel.findByIdAndUpdate(req.query._id, {
      isDeleted: true,
    })

    res.status(200).send({
      message: `Success`,
    })
  } catch (error) {
    console.error(error)

    res.status(500).send({
      message: (error as Error).message,
    })
  }
}

export default {
  getListFiles,
  uploadFiles,
  createOrUpdateDesc,
  removeFile,
}
