'use client';

import React, { useState, useCallback } from 'react';
import { useFormFields } from '@payloadcms/ui';

interface DirectUploadProps {
  path?: string;
  name?: string;
  label?: string;
  required?: boolean;
}

export default function DirectUpload(props: DirectUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{
    filename: string;
    url: string;
    mimeType: string;
    filesize: number;
  } | null>(null);
  
  // Get form fields context with proper selector
  const formData = useFormFields(([fields, dispatch]) => ({ fields, dispatch }));
  const { fields, dispatch: dispatchFields } = formData;

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Step 1: Get presigned URL
      const presignedResponse = await fetch('/api/r2-presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          fileSize: file.size,
        }),
      });

      if (!presignedResponse.ok) {
        throw new Error('Failed to get presigned URL');
      }

      const { presignedUrl, publicUrl, filename, originalFilename } = await presignedResponse.json();

      // Step 2: Upload directly to R2
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to R2');
      }

      // Step 3: Store uploaded file info and update form fields
      const defaultName = originalFilename.split('.')[0];
      const defaultAlt = defaultName;

      const fileInfo = {
        filename: originalFilename, // Show original filename in UI
        url: publicUrl,
        mimeType: file.type,
        filesize: file.size,
      };

      setUploadedFile(fileInfo);

      // Update form fields - use original filename for display, unique filename is stored in URL
      dispatchFields({ type: 'UPDATE', path: 'filename', value: originalFilename });
      dispatchFields({ type: 'UPDATE', path: 'url', value: publicUrl });
      dispatchFields({ type: 'UPDATE', path: 'mimeType', value: file.type });
      dispatchFields({ type: 'UPDATE', path: 'filesize', value: file.size });
      dispatchFields({ type: 'UPDATE', path: 'name', value: defaultName });
      dispatchFields({ type: 'UPDATE', path: 'alt', value: defaultAlt });
      
      setUploadProgress(100);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [dispatchFields]);

  const handleRemove = useCallback(() => {
    setUploadedFile(null);
    dispatchFields({ type: 'UPDATE', path: 'filename', value: '' });
    dispatchFields({ type: 'UPDATE', path: 'url', value: '' });
    dispatchFields({ type: 'UPDATE', path: 'mimeType', value: '' });
    dispatchFields({ type: 'UPDATE', path: 'filesize', value: 0 });
    dispatchFields({ type: 'UPDATE', path: 'name', value: '' });
    dispatchFields({ type: 'UPDATE', path: 'alt', value: '' });
  }, [dispatchFields]);

  // Use local state for display, fallback to form fields
  const displayFile = uploadedFile || (fields?.filename?.value ? {
    filename: String(fields.filename.value || ''),
    url: String(fields.url?.value || ''),
    mimeType: String(fields.mimeType?.value || ''),
    filesize: Number(fields.filesize?.value || 0),
  } : null);

  const hasFile = Boolean(displayFile);

  return (
    <div className="field-type upload">
      <label className="field-label">
        Direct Upload to R2
      </label>
      
      {error && (
        <div className="error" style={{ color: 'red', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {!hasFile && !uploading && (
        <div className="upload-placeholder">
          <input
            type="file"
            onChange={handleFileSelect}
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            style={{ marginBottom: '1rem' }}
          />
          <p style={{ fontSize: '0.875rem', color: '#666' }}>
            Direct upload to R2 - supports files up to 500MB
          </p>
        </div>
      )}

      {uploading && (
        <div className="uploading" style={{ padding: '1rem', border: '1px dashed #ccc' }}>
          <p>Uploading... {uploadProgress}%</p>
          <div style={{ 
            width: '100%', 
            height: '8px', 
            backgroundColor: '#f0f0f0', 
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${uploadProgress}%`,
              height: '100%',
              backgroundColor: '#007acc',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      )}

      {hasFile && !uploading && displayFile && (
        <div className="uploaded-file" style={{ 
          padding: '1rem', 
          border: '1px solid #ddd', 
          borderRadius: '4px',
          marginTop: '1rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{displayFile.filename}</strong>
              <p style={{ margin: '0.5rem 0', fontSize: '0.875rem', color: '#666' }}>
                {displayFile.mimeType} • {Math.round(displayFile.filesize / 1024)} KB
              </p>
              {displayFile.url && displayFile.mimeType.startsWith('image/') && (
                <img 
                  src={displayFile.url} 
                  alt={displayFile.filename} 
                  style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                />
              )}
            </div>
            <button
              type="button"
              onClick={handleRemove}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
