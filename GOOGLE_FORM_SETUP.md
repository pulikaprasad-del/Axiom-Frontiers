# Axiom Frontier — Google Form

The live application form is:

https://forms.gle/PGBQmmunrGD9YcRA6

All application CTAs, including the final button at the bottom of the main page, open this form. The final button opens it in a new tab.

## Discussion submissions

The Executive Discussion Hub no longer uses FormSubmit. It sends submissions to the site backend at `/api/submit-discussion`, which delivers them through Resend to:

`pulika.prasad@gmail.com`

The submitter's preferred email is used as `Reply-To`, so you can reply directly from your inbox.

See `README.md` for the Resend environment variables and Vercel/Netlify deployment steps.
