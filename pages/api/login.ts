// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize } from 'cookie'
import * as jose from 'jose'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { CookieSerializeOptions } from 'cookie'

import { ACCEPTED_CREDENTIAL, JWT_SECRET } from '../../lib/contants'

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

export default async function handler(
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

  const iat = Math.floor(Date.now() / 1000)
  const exp = iat + 60 // one minute

  const token = await new jose.SignJWT({
    username: ACCEPTED_CREDENTIAL.USERNAME,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(JWT_SECRET))

  res.setHeader('Set-Cookie', [serialize('session', token, COOKIE_CONFIG)])
  res.status(204).end()
}
