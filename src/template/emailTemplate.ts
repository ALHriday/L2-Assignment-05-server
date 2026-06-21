export const emailTemplate = (url: string) => {
    return `
                <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Email Verification</title>
</head>

<body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:30px 0;">
<tr>
<td align="center">

<table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;text-align:center;box-shadow:0 2px 6px rgba(0,0,0,0.08);background:#6708E4">

<h1 style="margin-bottom:10px;color:#FFFFFF;background:#A32ACF;font-size:40px;padding:10px">Medi-Store</h1>
<tr>
<td>

<h2 style="margin-bottom:10px;color:#FFFFFF;">Verify Your Email</h2>

<p style="color:#FFFFFF;font-size:14px;margin-bottom:30px;">
Thanks for signing up. Please confirm your email address by clicking the button below.
</p>

<a href="${url}" 
style="background:#2563eb;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:14px;display:inline-block;font-weight:700;">
Verify Email
</a>

<p style="margin-top:30px;color:#FFFFFF;font-size:12px;">
If you did not create this account, you can safely ignore this email.
</p>

<p style="color:#ffffff;">${url}</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
                `
}

