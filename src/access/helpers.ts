import type { Access, PayloadRequest } from 'payload'

const roleCache = new WeakMap<PayloadRequest, string | undefined>()

async function getRole(req: PayloadRequest): Promise<string | undefined> {
  if (!req.user?.id) return undefined

  const cached = roleCache.get(req)
  if (cached !== undefined) return cached

  try {
    const user = await req.payload.findByID({
      collection: 'users',
      id: req.user.id,
      overrideAccess: true,
      depth: 0,
    })
    const role =
      typeof (user as { role?: unknown }).role === 'string'
        ? (user as { role?: string }).role
        : undefined
    roleCache.set(req, role)
    return role
  } catch (error) {
    console.error('Failed to resolve user role:', error)
    roleCache.set(req, undefined)
    return undefined
  }
}

export const isAdmin: Access = async ({ req }) => (await getRole(req)) === 'admin'

export const isAdminOrDesigner: Access = async ({ req }) => {
  const role = await getRole(req)
  return role === 'admin' || role === 'designer'
}

export const isAdminOrEditor: Access = async ({ req }) => {
  const role = await getRole(req)
  return role === 'admin' || role === 'editor'
}

export const canRead: Access = () => true

export const canCreate: Access = async ({ req }) => (await getRole(req)) === 'admin'

export const canUpdate: Access = async ({ req }) => (await getRole(req)) === 'admin'

export const canDelete: Access = async ({ req }) => (await getRole(req)) === 'admin'
