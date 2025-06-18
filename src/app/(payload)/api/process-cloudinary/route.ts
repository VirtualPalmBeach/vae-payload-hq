import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { v2 as cloudinary } from 'cloudinary'

export async function POST(request: NextRequest) {
  try {
    const { documentId } = await request.json()

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID required' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Get the document
    const doc = await payload.findByID({
      collection: 'reals',
      id: documentId,
    })

    if (!doc.cloudinaryTags) {
      return NextResponse.json({ error: 'No Cloudinary tags found' }, { status: 400 })
    }

    // Update status to processing
    await payload.update({
      collection: 'reals',
      id: documentId,
      data: { processingStatus: 'processing' },
    })

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })

    // Process Cloudinary data (same logic as before)
    const tags = doc.cloudinaryTags.split(',').map((tag: string) => tag.trim())
    const expression = tags.map((tag: string) => `tags:${tag}`).join(' AND ')

    const searchResult = await cloudinary.search
      .expression(`${expression} AND resource_type:video`)
      .sort_by('created_at', 'desc')
      .max_results(1)
      .execute()

    if (searchResult.resources && searchResult.resources.length > 0) {
      const video = searchResult.resources[0]

      const transformSizes = [
        { width: 480, name: 'small' },
        { width: 768, name: 'medium' },
        { width: 1280, name: 'large' },
      ]

      const thumbnails: { [key: string]: string } = {}
      for (const size of transformSizes) {
        thumbnails[size.name] = cloudinary.url(video.public_id, {
          resource_type: 'video',
          start_offset: '1.5',
          crop: 'fill',
          aspect_ratio: '9:16',
          width: size.width,
          quality: 'auto',
          fetch_format: 'auto',
        })
      }

      // Update document with results
      await payload.update({
        collection: 'reals',
        id: documentId,
        data: {
          cloudinaryPublicId: video.public_id,
          posterPublicId: video.public_id,
          thumbnails: thumbnails,
          processingStatus: 'complete',
          regenerateThumbnails: false,
        },
      })

      return NextResponse.json({ success: true, message: 'Cloudinary data processed successfully' })
    } else {
      await payload.update({
        collection: 'reals',
        id: documentId,
        data: { processingStatus: 'error' },
      })

      return NextResponse.json({ error: 'No videos found for tags' }, { status: 404 })
    }
  } catch (error) {
    console.error('Cloudinary processing error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
