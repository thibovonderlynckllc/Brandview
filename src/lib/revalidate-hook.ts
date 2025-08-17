export const revalidateHook = async ({ req, doc, collection }: any) => {
  // Trigger revalidation when content changes
  if (req.headers && process.env.REVALIDATION_SECRET) {
    try {
      const revalidateUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/revalidate`;

      const response = await fetch(revalidateUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REVALIDATION_SECRET}`,
        },
        body: JSON.stringify({
          collection: collection?.slug,
          slug: doc.slug,
          action: 'update',
        }),
      });

      if (!response.ok) {
        console.warn(`Failed to revalidate after ${collection?.slug} change:`, response.statusText);
      } else {
        console.log(`Successfully triggered revalidation for ${collection?.slug}: ${doc.slug}`);
      }
    } catch (error) {
      console.warn('Error triggering revalidation:', error);
    }
  }
};
