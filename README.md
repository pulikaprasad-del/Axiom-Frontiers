# Axiom Frontier

## Application form
All application CTAs, including the final **Apply to Axiom Frontier** button, open the live Google Form:

https://forms.gle/PGBQmmunrGD9YcRA6

The final CTA opens the form in a new tab so it cannot be trapped by the discussion-page navigation.

## Executive Discussion Hub email backend
The Discussion Hub no longer uses FormSubmit. It posts to `/api/submit-discussion`, which sends the submission server-side through **Resend** to:

`pulika.prasad@gmail.com`

The submitter's email is set as `Reply-To`, so replies go directly to the person who submitted the discussion request.

### Deploying with Vercel
1. Create a Resend account and an API key: https://resend.com/api-keys
2. Import this project into Vercel.
3. Add these Vercel environment variables:
   - `RESEND_API_KEY` = your Resend API key
   - `DISCUSSION_TO_EMAIL` = `pulika.prasad@gmail.com`
   - `RESEND_FROM_EMAIL` = `Axiom Frontier <onboarding@resend.dev>` for initial testing
4. Redeploy.
5. Submit a test discussion.

For production sending, verify your own domain in Resend and change `RESEND_FROM_EMAIL` to an address on that verified domain.

### Deploying with Netlify
This project also includes `netlify.toml` and a Netlify Function. Add the same environment variables in Netlify, then deploy the project. The `/api/submit-discussion` path is rewritten to the serverless function automatically.

### Important
Do **not** put `RESEND_API_KEY` in `discussion.html`, `script.js`, or any browser-side JavaScript. It must remain a server-side environment variable.
