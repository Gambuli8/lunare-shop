import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export default function loginHandler(req, res) {
  const { email, password } = req.body

  if (email === 'lunarejewelry.shop@gmail.com') {
    const token = jwt.sign(
      {
        email: 'lunarejewelry.shop@gmail.com',
        username: 'Admin'
      },
      'secret'
    )
  }

  const serialized = serialize('myTokenName', token)

  res.setHeader('Set-Cookie', serialized)
  return res.json()
}
