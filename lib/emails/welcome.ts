export function welcomeEmail(fullName: string, role: string): { subject: string; html: string } {
  const firstName = fullName.split(' ')[0]
  const roleLabel =
    role === 'traveller' ? 'carry parcels as a traveller'
    : role === 'sender'  ? 'send items between cities'
    : 'both travel and send'

  return {
    subject: `You're on the OmneRide waitlist, ${firstName}! 🇪🇹`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to OmneRide</title>
</head>
<body style="margin:0;padding:0;background:#F8F9FC;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F9FC;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#0F2447;border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                <span style="color:#F5A623;">Omne</span>Ride
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">Ethiopia's Peer-to-Peer Delivery Network</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:40px;border-radius:0 0 16px 16px;border:1px solid #e5e7eb;border-top:none;">

              <!-- Gold accent bar -->
              <div style="width:48px;height:4px;background:#F5A623;border-radius:2px;margin-bottom:28px;"></div>

              <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:#0F2447;">
                You're in, ${firstName}! 🎉
              </h2>

              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">
                You've been added to the OmneRide waitlist. You signed up to <strong style="color:#0F2447;">${roleLabel}</strong> — we'll make sure you get priority access when we launch in your area.
              </p>

              <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#4b5563;">
                Here's what happens next:
              </p>

              <!-- Steps -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                ${[
                  ['📬', 'Launch notification', "You'll be the first to know when OmneRide opens in your city."],
                  ['🎁', 'Founding member perks', 'Early users get reduced fees and exclusive badges on their profile.'],
                  ['📢', 'Blog updates', "We'll send you stories, guides, and progress updates along the way."],
                ].map(([icon, title, desc]) => `
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:36px;font-size:20px;vertical-align:top;padding-top:2px;">${icon}</td>
                        <td style="padding-left:12px;">
                          <p style="margin:0 0 4px;font-weight:600;color:#0F2447;font-size:14px;">${title}</p>
                          <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">${desc}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`).join('')}
              </table>

              <!-- CTA -->
              <div style="text-align:center;margin-bottom:32px;">
                <a href="https://omneride.com" style="display:inline-block;background:#F5A623;color:#0F2447;font-weight:700;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:50px;">
                  Visit OmneRide →
                </a>
              </div>

              <p style="margin:0;font-size:13px;color:#9ca3af;line-height:1.6;">
                You're receiving this because you signed up at omneride.com.
                No spam — we'll only contact you with launch news and updates.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                © ${new Date().getFullYear()} OmneRide Technologies PLC · Addis Ababa, Ethiopia<br/>
                <a href="mailto:hello@omneride.et" style="color:#6b7280;text-decoration:none;">hello@omneride.et</a>
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
