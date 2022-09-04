export const ACCEPTED_CREDENTIAL = {
  USERNAME: 'demo',
  PASSWORD: 'demo',
}

// demo only, for prod it should come from env
export const JWT_SECRET = 'secret123'

export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN ?? 'localhost'
