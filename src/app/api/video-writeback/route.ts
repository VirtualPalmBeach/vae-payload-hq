import { NextRequest } from 'next/server'
import { getPayload } from 'payload'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-writeback-secret')
  
  if (!secret || secret !== process.env.N8N_WRITEBACK_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, data } = await req.json()
  const payload = await getPayload()

  try {
    await payload.update({
      collection: 'reals',
      id,
      data,
      overrideAccess: true,
      depth: 0,
    })
    
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ error: 'Update failed' }, { status: 500 })
  }
}