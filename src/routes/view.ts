import { Router } from 'express'
import { Request, Response } from 'express'
import { User } from '../models/user'
import { Riwayat } from '../models/riwayat'

export const router = Router()

router.get('/signin', async (req: Request, res: Response) => {
  if (req.session.user) return res.redirect('/')

  return res.render('signin', {
    layout: 'layout',
    notification: req.flash('notification'),
  })
})

router.get('/request', async (req: Request, res: Response) => {
  const { user } = req.session

  if (!user) return res.redirect('/signin')

  const request = await Riwayat.findOne({
    peminjamNip: user.nip,
    isCompleted: false,
  })

  return res.render('request', {
    layout: 'layout',
    notification: req.flash('notification'),
    request,
  })
})

router.get('/riwayat', async (req: Request, res: Response) => {
  const { user } = req.session
  const { category, query } = req.query
  let riwayat: any

  if (!user) return res.redirect('/signin')

  riwayat = await Riwayat.find({ peminjamNip: user.nip })

  if (user.role === 'ADMIN') {
    if (!category) {
      return res.redirect('/')
    } else if (category === 'nip') {
      riwayat = await Riwayat.find({
        peminjamNip: { $regex: query, $options: 'i' },
      })
    } else if (category === 'name') {
      riwayat = await Riwayat.find({
        peminjamNama: { $regex: query, $options: 'i' },
      })
    }
  }

  return res.render('riwayat', {
    layout: 'layout',
    notification: req.flash('notification'),
    riwayat,
    category,
    query,
  })
})

router.get('/users', async (req: Request, res: Response) => {
  if (!req.session.user) return res.redirect('/signin')

  const { category, query } = req.query

  let users: any

  if (!category) {
    return res.redirect('/')
  } else if (category === 'nip') {
    users = await User.find({
      nip: { $regex: query, $options: 'i' },
      role: 'USER',
    })
  } else if (category === 'name') {
    users = await User.find({
      name: { $regex: query, $options: 'i' },
      role: 'USER',
    })
  }

  return res.render('users', {
    layout: 'layout',
    notification: req.flash('notification'),
    users,
    category,
    query,
  })
})

router.get('/permintaan', async (req: Request, res: Response) => {
  if (!req.session.user) return res.redirect('/signin')

  const { category, query } = req.query

  let permintaan: any

  if (!category) {
    return res.redirect('/')
  } else if (category === 'nip') {
    permintaan = await Riwayat.find({
      peminjamNip: { $regex: query, $options: 'i' },
      isResponded: false,
    })
  } else if (category === 'name') {
    permintaan = await Riwayat.find({
      peminjamNama: { $regex: query, $options: 'i' },
      isResponded: false,
    })
  }

  return res.render('permintaan', {
    layout: 'layout',
    notification: req.flash('notification'),
    permintaan,
    category,
    query,
  })
})

router.get('/edit-profile', async (req: Request, res: Response) => {
  if (!req.session.user) return res.redirect('/signin')

  const user = await User.findById(req.session.user.id)

  return res.render('profile', {
    layout: 'layout',
    notification: req.flash('notification'),
    user,
  })
})

router.get('/', async (req: Request, res: Response) => {
  if (!req.session.user) {
    req.flash('notification', 'Harap masuk untuk melanjutkan.')
    return res.redirect('/signin')
  }

  const users = await User.find({ role: 'USER' }).count()
  const permintaan = await Riwayat.find({ isResponded: false }).count()

  return res.render('home', {
    layout: 'layout',
    notification: req.flash('notification'),
    users,
    permintaan,
  })
})
