import { Request, Response } from 'express'
import { Riwayat } from '../models/riwayat'
import { open } from 'openurl'

export const create = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const { name, nip } = req.session.user
    const { id } = req.body

    const dosir = await Riwayat.findById(id)

    if (dosir) {
      await Riwayat.findByIdAndUpdate(id, {
        $set: {
          isCompleted: true,
        },
      })
    }

    await new Riwayat({ peminjamNama: name, peminjamNip: nip }).save()

    req.flash(
      'notification',
      'Permintaan dosir berhasil dibuat, silahkan menunggu persetujuan admin.'
    )
    console.log('[SERVER]: New dosir request from user.')
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat membuat permintaan dosir, coba lagi.'
    )
    console.error('[SERVER]: Dosir Request error.', error)
    return res.redirect('back')
  }
}

export const terima = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    const dosir = await Riwayat.findById(id)

    if (!dosir) {
      req.flash('notification', 'Dosir tidak ditemukan.')
      console.log('[SERVER]: Dosir not found.')
      return res.redirect('back')
    }

    await Riwayat.findByIdAndUpdate(id, {
      $set: {
        waktuRespond: Date.now(),
        isResponded: true,
        isAccepted: true,
      },
    })

    req.flash(
      'notification',
      `Permintaan dosir atas nama ${dosir.peminjamNama} diterima.`
    )
    console.log(`[SERVER]: ${dosir.peminjamNama} dosir accepted.`)
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat menerima permintaan dosir, coba lagi.'
    )
    console.error('[SERVER]: Dosir Accept error.', error)
    return res.redirect('back')
  }
}

export const tolak = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    const dosir = await Riwayat.findById(id)

    if (!dosir) {
      req.flash('notification', 'Dosir tidak ditemukan.')
      console.log('[SERVER]: Dosir not found.')
      return res.redirect('back')
    }

    await Riwayat.findByIdAndUpdate(id, {
      $set: {
        waktuRespond: Date.now(),
        isResponded: true,
      },
    })

    req.flash(
      'notification',
      `Permintaan dosir atas nama ${dosir.peminjamNama} ditolak.`
    )
    console.log('[SERVER]: New dosir request from user.')
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat menolak permintaan dosir, coba lagi.'
    )
    console.error('[SERVER]: Dosir Refuse error.', error)
    return res.redirect('back')
  }
}

export const download = async (req: Request, res: Response) => {
  try {
    const { id } = req.query

    const dosir = await Riwayat.findById(id)

    if (!dosir) {
      req.flash('notification', 'Dosir tidak ditemukan.')
      console.log('[SERVER]: Dosir not found.')
      return res.redirect('back')
    }

    await Riwayat.findByIdAndUpdate(id, {
      $set: {
        waktuDownload: Date.now(),
        isDownloaded: true,
      },
    })

    const uri = `${req.protocol}://${req.hostname}:${process.env.PORT}${req.session.user.uri}`

    await open(uri)

    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat mendonwload dosir, coba lagi.'
    )
    console.error('[SERVER]: Download Dosir error.', error)
    return res.redirect('back')
  }
}

export const search = async (req: Request, res: Response) => {
  try {
    const { category, query, permintaan } = req.body

    if (permintaan) {
      if (category === 'nip') {
        return res.redirect(`/permintaan?category=${category}&query=${query}`)
      }
      if (category === 'name') {
        return res.redirect(`/permintaan?category=${category}&query=${query}`)
      }
    }

    if (category === 'nip') {
      return res.redirect(`/riwayat?category=${category}&query=${query}`)
    }
    if (category === 'name') {
      return res.redirect(`/riwayat?category=${category}&query=${query}`)
    }

    req.flash(
      'notification',
      'Terjadi kesalahan saat melakukan pencarian, coba lagi.'
    )
    console.log('[SERVER]: User search error.')
    return res.redirect('back')
  } catch (error) {
    req.flash(
      'notification',
      'Terjadi kesalahan saat melakukan pencarian, coba lagi.'
    )
    console.error('[SERVER]: User search error.', error)
    return res.redirect('/')
  }
}
