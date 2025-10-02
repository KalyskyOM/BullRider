# Netlify Contact Form Setup Guide

## ✅ You've Enabled Netlify Forms
Great! However, our contact form uses a **custom Netlify Function** (not Netlify Forms) for better control, validation, and email delivery via Resend API.

## 📧 Email Delivery Setup (Resend API)

### Step 1: Get a Resend API Key
1. Go to [resend.com](https://resend.com) and sign up (free tier: 100 emails/day)
2. Verify your domain OR use their test domain for development
3. Navigate to **API Keys** in dashboard
4. Click **Create API Key**
5. Copy the key (starts with `re_...`)

### Step 2: Configure Netlify Environment Variables
1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your **BullRider** site
3. Navigate to **Site settings** → **Environment variables**
4. Click **Add a variable** and add these three:

| Key | Value | Example |
|-----|-------|---------|
| `RESEND_API_KEY` | Your Resend API key | `re_123abc...` |
| `CONTACT_TO_EMAIL` | Your private email (receives submissions) | `maelmassoutie@gmail.com` |
| `CONTACT_FROM_EMAIL` | Verified sender email | `contact@bullrider.pages.dev` or `no-reply@yourdomain.com` |

**Important Notes:**
- `CONTACT_FROM_EMAIL` must be verified in Resend (or use their test domain)
- For testing, you can use Resend's test domain: `onboarding@resend.dev`
- Keep `RESEND_API_KEY` secret - never commit it to Git

### Step 3: Redeploy Your Site
After adding environment variables:
1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete

### Step 4: Test the Contact Form
1. Visit your live site: `https://your-site.netlify.app`
2. Scroll to the **Contact** section (`/#contact`)
3. Fill out the form with test data
4. Submit and verify:
   - ✅ Success notification appears
   - ✅ Email arrives at `CONTACT_TO_EMAIL`
   - ✅ Check Netlify Functions logs for any errors

## 🔍 Troubleshooting

### Check Function Logs
1. Netlify Dashboard → **Functions** tab
2. Click on `contact` function
3. View recent invocations and logs

### Common Issues

**❌ "Email service error"**
- Check that `RESEND_API_KEY` is correct
- Verify `CONTACT_FROM_EMAIL` is verified in Resend
- Check Resend dashboard for error details

**❌ Form submits but no email**
- Verify all 3 environment variables are set
- Check Netlify Function logs for errors
- Confirm you redeployed after adding env vars

**❌ "Invalid email" or validation errors**
- Check browser console for details
- Ensure all required fields are filled
- Email must be valid format

## 🚀 Alternative: Without Email (Logs Only)

If you don't want to set up Resend right now:
- The form will still work and accept submissions
- Submissions are logged in Netlify Function logs
- No emails will be sent
- You can add email delivery later

To view submissions without email:
1. Netlify Dashboard → **Functions** → `contact`
2. Check logs for submission details

## 🔐 Security Features Already Implemented

✅ **Honeypot field** - Blocks basic spam bots  
✅ **Input validation** - Server-side length and format checks  
✅ **Rate limiting ready** - Can add Netlify rate limiting if needed  
✅ **No exposed emails** - All contact info hidden from scrapers  
✅ **Environment secrets** - API keys stored securely  

## 📝 Optional: Add Rate Limiting

To prevent spam/abuse, add to `netlify.toml`:

```toml
[[edge_functions]]
  path = "/api/contact"
  function = "rate-limit"
```

Then create `netlify/edge-functions/rate-limit.ts` with rate limiting logic.

## Need Help?

- **Resend Docs**: https://resend.com/docs
- **Netlify Functions**: https://docs.netlify.com/functions/overview/
- **Netlify Environment Variables**: https://docs.netlify.com/environment-variables/overview/
