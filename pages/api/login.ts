// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize } from 'cookie'
import jwt from 'jsonwebtoken'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { CookieSerializeOptions } from 'cookie'

import { ACCEPTED_CREDENTIAL } from '../../lib/contants'

type Data = {
  name: string
}

export const COOKIE_CONFIG: CookieSerializeOptions = {
  path: '/',
  domain: 'localhost',
  httpOnly: true,
  maxAge: 60,
  sameSite: 'lax',
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username, password } = JSON.parse(req.body)
  if (
    username !== ACCEPTED_CREDENTIAL.USERNAME ||
    password !== ACCEPTED_CREDENTIAL.PASSWORD
  ) {
    res.status(401).end()
  }

  const token = jwt.sign(
    {
      username: 'demo',
    },
    'secret',
    {
      expiresIn: 60,
    }
  )

  res.setHeader('Set-Cookie', [serialize('session', token, COOKIE_CONFIG)])
  res.status(204).end()
}
