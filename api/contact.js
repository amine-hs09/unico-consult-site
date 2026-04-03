export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, subject, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Champs requis manquants' })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return res.status(500).json({ error: 'Service email non configuré' })
  }

  const logoUrl = 'https://site-unico-ten.vercel.app/assets/logos/unico-official.png'

  // Email notification — simple text version as fallback
  const notificationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#F5F3FF;font-family:'Segoe UI',Roboto,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px">
    <div style="background:#FFFFFF;border-radius:16px 16px 0 0;padding:32px;text-align:center;border-bottom:3px solid #7C3AED">
      <img src="${logoUrl}" alt="Unico Consult" style="height:56px;width:auto;margin:0 auto">
    </div>
    <div style="background:#FFFFFF;padding:32px;border-radius:0 0 16px 16px">
      <h2 style="margin:0 0 4px;font-size:22px;color:#1E1B4B">Nouveau message</h2>
      <p style="margin:0 0 28px;font-size:14px;color:#9CA3AF">Via le formulaire de contact unico-consult.be</p>
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #F3F4F6;font-size:13px;color:#9CA3AF;width:100px;vertical-align:top">Nom</td>
          <td style="padding:14px 0;border-bottom:1px solid #F3F4F6;font-size:15px;color:#1E1B4B;font-weight:600">${name}</td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #F3F4F6;font-size:13px;color:#9CA3AF;vertical-align:top">Email</td>
          <td style="padding:14px 0;border-bottom:1px solid #F3F4F6;font-size:15px;color:#7C3AED"><a href="mailto:${email}" style="color:#7C3AED;text-decoration:none">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #F3F4F6;font-size:13px;color:#9CA3AF;vertical-align:top">Sujet</td>
          <td style="padding:14px 0;border-bottom:1px solid #F3F4F6;font-size:15px;color:#1E1B4B">${subject || 'Non specifie'}</td>
        </tr>
        <tr>
          <td style="padding:14px 0;font-size:13px;color:#9CA3AF;vertical-align:top">Message</td>
          <td style="padding:14px 0;font-size:15px;color:#1E1B4B;line-height:1.6">${message.replace(/\n/g, '<br>')}</td>
        </tr>
      </table>
      <div style="margin-top:28px;padding:16px;background:#F5F3FF;border-radius:10px;text-align:center">
        <a href="mailto:${email}?subject=Re: ${subject || 'Votre demande'}" style="display:inline-block;padding:10px 28px;background:#7C3AED;color:#FFFFFF;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none">Repondre a ${name}</a>
      </div>
    </div>
    <div style="padding:20px;text-align:center">
      <p style="margin:0;font-size:12px;color:#9CA3AF">Unico Consult SRL — Avenue Hippocrate 4, 1932 Sint-Stevens-Woluwe</p>
      <p style="margin:4px 0 0;font-size:12px;color:#9CA3AF">TVA BE 0735.798.943 — info@unico-consult.be</p>
    </div>
  </div>
</body>
</html>`

  try {
    // Send notification to Unico — this is the only critical email
    const notifRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Unico Consult <onboarding@resend.dev>',
        to: ['info@unico-consult.be'],
        subject: `[Contact] ${subject || 'Nouveau message'} — ${name}`,
        html: notificationHtml,
        reply_to: email
      })
    })

    const notifBody = await notifRes.json()

    if (!notifRes.ok) {
      console.error('Resend API error:', JSON.stringify(notifBody))
      // If the error is about the sender, give a clear message
      if (notifBody.message && notifBody.message.includes('verify')) {
        return res.status(500).json({
          error: 'Domaine email non verifie. Contactez-nous par telephone.',
          detail: notifBody.message
        })
      }
      return res.status(500).json({
        error: 'Erreur envoi email',
        detail: notifBody.message || 'Resend API error'
      })
    }

    console.log('Notification sent successfully:', notifBody.id)
    return res.status(200).json({ success: true })

  } catch (error) {
    console.error('Contact form error:', error.message || error)
    return res.status(500).json({ error: 'Erreur serveur. Veuillez reessayer.' })
  }
}
