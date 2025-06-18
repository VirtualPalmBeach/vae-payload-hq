'use client'

import React, { useState } from 'react'
import { Button } from '@payloadcms/ui'

interface CloudinaryProcessButtonProps {
  data?: {
    id?: string
    cloudinaryTags?: string
    processingStatus?: string
    thumbnails?: { [key: string]: string } | null
  }
  field?: unknown
  path?: string
}

export const CloudinaryProcessButton: React.FC<CloudinaryProcessButtonProps> = ({ data }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [message, setMessage] = useState('')

  const documentId = data?.id
  const cloudinaryTags = data?.cloudinaryTags
  const processingStatus = data?.processingStatus
  const thumbnails = data?.thumbnails

  const shouldShowButton =
    cloudinaryTags && (!thumbnails || processingStatus === 'ready' || processingStatus === 'error')

  if (!shouldShowButton) {
    return null
  }

  const handleProcess = async () => {
    setIsProcessing(true)
    setMessage('')

    try {
      const response = await fetch('/admin/api/process-cloudinary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ documentId }),
      })

      const result = await response.json()

      if (response.ok) {
        setMessage('Processing completed successfully! Refresh to see results.')
      } else {
        setMessage(`Error: ${result.error}`)
      }
    } catch (_error) {
      setMessage('Failed to process Cloudinary data')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div
      style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
    >
      <div style={{ marginBottom: '0.5rem' }}>
        <Button onClick={handleProcess} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Generate Thumbnails'}
        </Button>
      </div>
      {message && (
        <p style={{ marginTop: '0.5rem', color: message.includes('Error') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  )
}
