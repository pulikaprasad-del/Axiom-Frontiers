# Deploy the final Axiom Frontier site

The Discussion Hub uses a serverless email backend. The website must be deployed on **Vercel or Netlify** for `/api/submit-discussion` to work.

## Vercel
1. Import this folder into Vercel.
2. Add environment variables:
   - `RESEND_API_KEY` — your Resend API key
   - `DISCUSSION_TO_EMAIL` — `pulika.prasad@gmail.com`
   - `RESEND_FROM_EMAIL` — `Axiom Frontier <onboarding@resend.dev>` for testing, or a sender on your verified Resend domain for production.
3. Deploy.
4. Open `discussion.html` on the deployed Vercel URL and submit a test.

## Netlify
1. Drag/drop or connect this folder to Netlify.
2. Add the same environment variables in Site configuration → Environment variables.
3. Deploy.
4. Test `discussion.html`.

Do not upload this project to a static-only host (such as GitHub Pages) if you need the Discussion Hub email submission to work; those hosts cannot execute the serverless email function.
