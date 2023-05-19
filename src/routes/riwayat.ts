import { Router } from 'express'
import * as riwayat from '../controllers/riwayat'

export const router = Router()

router.post('/', riwayat.create)

router.put('/', riwayat.terima)

router.patch('/', riwayat.tolak)

router.get('/download', riwayat.download)

router.post('/search', riwayat.search)
