interface BlogNotificationOptions {
  postTitle: string
  postSlug: string
  postExcerpt: string
  coverImageUrl?: string
  authorName: string
  category: string
  readTimeMinutes: number
}

export function blogNotificationEmail(opts: BlogNotificationOptions): {
  subject: string
  html: string
} {
  const postUrl = `https://omneride.com/blog/${opts.postSlug}`

  return {
    subject: `New from OmneRide: ${opts.postTitle}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${opts.postTitle}</title>
</head>
<body style="margin:0;padding:0;background:#F8F9FC;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F9FC;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0F2447;border-radius:16px 16px 0 0;padding:24px 40px;text-align:center;">
              <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">
                <span style="color:#F5A623;">Omne</span>Ride
              </h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.5);font-size:12px;text-transform:uppercase;letter-spacing:1px;">New Blog Post</p>
            </td>
          </tr>

          <!-- Cover image -->
          ${opts.coverImageUrl ? `
          <tr>
            <td style="background:#0F2447;padding:0;">
              <img src="${opts.coverImageUrl}" alt="${opts.postTitle}" width="580" style="width:100%;max-width:580px;display:block;object-fit:cover;height:240px;" />
            </td>
          </tr>` : ''}

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;border:1px solid #e5e7eb;border-top:none;">

              <!-- Category + read time -->
              <div style="margin-bottom:16px;">
                <span style="display:inline-block;background:#FEF3C7;color:#92400E;font-size:11px;font-weight:600;padding:4px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:0.5px;">${opts.category}</span>
                <span style="color:#9ca3af;font-size:12px;margin-left:10px;">⏱ ${opts.readTimeMinutes} min read</span>
              </div>

              <h2 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#0F2447;line-height:1.3;">
                ${opts.postTitle}
              </h2>

              <p style="margin:0 0 8px;font-size:13px;color:#9ca3af;">By ${opts.authorName}</p>

              <div style="width:48px;height:3px;background:#F5A623;border-radius:2px;margin:20px 0;"></div>

              <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#4b5563;">
                ${opts.postExcerpt}
              </p>

              <!-- CTA -->
              <div style="text-align:center;margin-bottom:32px;">
                <a href="${postUrl}" style="display:inline-block;background:#0F2447;color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:50px;">
                  Read the full post →
                </a>
              </div>

              <hr style="border:none;border-top:1px solid #f3f4f6;margin-bottom:24px;" />

              <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;text-align:center;">
                You're receiving this because you're on the OmneRide waitlist.<br/>
                <a href="https://omneride.com" style="color:#6b7280;">Visit our website</a> ·
                <a href="mailto:hello@omneride.et?subject=Unsubscribe" style="color:#6b7280;">Unsubscribe</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                © ${new Date().getFullYear()} OmneRide Technologies PLC · Addis Ababa, Ethiopia
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  }
}
