# Microsoft Clarity activation

This repository carries an **inactive-by-default** Clarity integration. No
Microsoft account is created and no visitor data is sent until a real project
identifier is placed in the production deployment environment.

## Before activation

1. The site owner creates or selects the Esteban Moreno Media project in the
   Microsoft Clarity web interface and confirms the correct canonical domain:
   `estebanmorenomedia.com`.
2. Confirm that the published privacy notice's Clarity disclosure remains
   accurate for the owner's legal/privacy requirements. The tag honors Global Privacy Control
   and Do Not Track, but that does not replace legal review.
3. Do not put the identifier in source code, a local `.env` file committed to
   git, preview deployments, or another brand's Vercel project.

## Vercel configuration

In the `esteban-media` Vercel project's **Production** environment only, add:

```
NEXT_PUBLIC_CLARITY_PROJECT_ID=<the identifier shown in that Clarity project>
```

The identifier is public when a browser loads the tag; `NEXT_PUBLIC_` is
required because Next.js renders this static site at build time. It is still
kept out of git so the deployment, not source, controls activation. Redeploy
production after adding it. Leave the variable absent to keep Clarity disabled.

## Production verification

After a production deploy, verify all of the following:

1. On `https://estebanmorenomedia.com/`, a normal browser request loads exactly
   one `https://www.clarity.ms/tag/<project-id>` request.
2. On a Vercel preview URL, an automation user agent, and a browser with GPC or
   Do Not Track enabled, that request is absent.
3. Submit no real personal information during the check. Inspect the Clarity
   dashboard's masking settings and a test session to confirm form text and
   contact details are not readable.
4. Check `/privacy` and `/es/privacidad` live to confirm the disclosure and
   Microsoft Privacy Statement link render.
5. Record the deployment URL, Clarity project name, and checks in the Esteban
   vault. Do not call conversion measurement operational until one test session
   appears in Clarity and the existing GA4 lead events still pass their gate.

## Rollback

Remove `NEXT_PUBLIC_CLARITY_PROJECT_ID` from the Production environment and
redeploy. The component then renders no Clarity script.
