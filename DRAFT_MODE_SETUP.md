# Draft Mode Setup Guide

This project now supports Draft Mode for previewing draft content from your Payload CMS before publishing.

## Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
PREVIEW_SECRET=your-secure-preview-secret-here
```

### Generating a Secure Secret

You can generate a secure preview secret using one of these methods:

1. **Using OpenSSL (recommended):**

   ```bash
   openssl rand -base64 32
   ```

2. **Using Node.js:**

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

3. **Online generator:**
   Visit https://generate-secret.vercel.app/32

## How Draft Mode Works

### 1. Preview Routes

- **Preview Route**: `/preview` - Used by Payload CMS admin to enter draft mode
- **Draft Route**: `/api/draft` - Alternative draft mode endpoint with secret validation

### 2. CMS Integration

In your Payload CMS admin panel, you'll now see a "Preview" button on your content entries. This button will:

1. Open a preview URL with authentication
2. Enable draft mode for your session
3. Redirect you to the live page showing draft content

### 3. Content Collections with Draft Mode

The following collections now support draft mode:

- **Pages** (home, about, services, rates, contact, portfolio)
- **Portfolio** (individual portfolio entries)

### 4. Draft Mode Features

- **Secure Authentication**: Only authenticated CMS users can enable draft mode
- **Session-based**: Draft mode is enabled via cookies for your browser session
- **Override Access**: Draft mode bypasses normal access restrictions
- **Real-time Preview**: See changes immediately without publishing

## Usage

### For Content Editors

1. Log into your Payload CMS admin panel
2. Edit any page or portfolio entry
3. Click the "Preview" button to see your changes live
4. Make edits and refresh the preview to see updates
5. When satisfied, publish your changes

### For Developers

The draft mode is automatically handled in all page components. When draft mode is active:

- `draftMode().isEnabled` returns `true`
- Database queries include `draft: true` and `overrideAccess: true`
- Unpublished content becomes visible

## Testing Draft Mode

### Manual Testing

1. Visit `/api/draft?secret=YOUR_PREVIEW_SECRET&slug=home&collection=pages`
2. You should be redirected to the homepage with draft mode enabled
3. Check your browser's developer tools - you should see a `__prerender_bypass` cookie

### CMS Testing

1. Create a draft page or portfolio entry in your CMS
2. Use the preview button to view it
3. The draft content should be visible even though it's not published

## Troubleshooting

### Common Issues

1. **"Invalid token" error**: Check that your `PREVIEW_SECRET` environment variable matches
2. **"You are not allowed to preview"**: Ensure you're logged into the CMS
3. **Draft content not showing**: Verify the page component includes draft mode logic

### Debugging

Check the browser's developer tools:

- Look for the `__prerender_bypass` cookie when draft mode is active
- Check the Network tab for authentication errors
- Verify the preview URL includes the correct parameters

## Security Notes

- Keep your `PREVIEW_SECRET` confidential
- Only authenticated CMS users can enable draft mode
- Draft mode is session-based and doesn't affect other users
- Preview URLs expire and require authentication
