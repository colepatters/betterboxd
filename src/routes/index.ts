import { Router } from 'express'
import cookieParser from 'cookie-parser'

import apiRouter from './api'
import auth from '../services/auth-middleware'
import { User } from '../models'
import search from '../services/tmdb/search'

const router = Router()
router.use('/api', apiRouter)
router.use(cookieParser())
router.use(auth)

router.get('/', async (req, res) => {
  res.render('index')
})

router.get('/signin', async (req, res) => {
  res.render('signin', { ...req.query })
})

router.get('/register', async (req, res) => {
  res.render('register')
})

router.get('/sessionexpired', async (req, res) => {
  res.render('session-expired')
})

router.get('/profile', async (req, res) => {
  if (!res.locals.signedIn) {
    res.redirect(`/signin?backTo=${encodeURIComponent('/profile')}`)
    return
  }

  const user = await User.getFromSessionToken(res.locals.sessionId)

  if (!user) {
    res.status(500).send('Could not find your user profile')
    return
  }

  res.render('profile', user.dataValues)
})

router.get('/test', async (req, res) => {
  const searchRes = await search('Cars')

  res.json(searchRes)
})

export default router
