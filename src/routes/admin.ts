import { Router } from 'express'
import * as admin from '../controllers/admin'
import { upload } from '../utils/multer'

export const router = Router()

router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  admin.add
)

router.delete('/', admin.remove)

router.put(
  '/',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
  ]),
  admin.edit
)

router.post('/search', admin.search)
