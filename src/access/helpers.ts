import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => Boolean(user && user.role === 'admin')

export const isAdminOrDesigner: Access = ({ req: { user } }) => Boolean(user && ['admin', 'designer'].includes(user.role))

export const isAdminOrEditor: Access = ({ req: { user } }) => Boolean(user && ['admin', 'editor'].includes(user.role))

export const canRead: Access = () => true

export const canCreate: Access = ({ req: { user } }) => Boolean(user && user.role === 'admin')

export const canUpdate: Access = ({ req: { user } }) => Boolean(user && user.role === 'admin')

export const canDelete: Access = ({ req: { user } }) => Boolean(user && user.role === 'admin')