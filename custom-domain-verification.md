# Custom domain setup record

Date: 2026-10-18

Repository: `aspiece/Career-Essentials-Module`

## Before correction

- Pages source: Deploy from a branch, `main`, `/ (root)`.
- Recoverable source baseline: `f6232067daf764409417ca6a2ec42ab766c74e89`.
- Root `CNAME`: absent (GitHub contents API returned 404).
- Pages displayed: `careeressentials.geneseelearninglab.com/` is not properly formatted.
- Configured domain: none; published URL remained `https://aspiece.github.io/Career-Essentials-Module/`.

## Intended correction

Set the Pages custom domain to `careeressentials.geneseelearninglab.com` with no scheme, path, or trailing slash. Preserve the CNAME in future uploads. This setup change does not publish pending local lesson revisions.

## Hosting baseline

DreamHost DNS-only site `careeressentials.geneseelearninglab.com` showed two custom records before correction:

| Name | Type | Value |
|---|---|---|
| `@` | ALIAS | `aspiece.github.io` |
| `www` | CNAME | `aspiece.github.io` |

The ALIAS flattens to GitHub Pages' four IPv4 addresses. GitHub's Pages validator returned `InvalidARecordError` and requested a CNAME pointing to `aspiece.github.io` for this custom subdomain.

## Applied corrections

- Saved the correctly formatted custom domain in GitHub Settings → Pages. GitHub created root `CNAME` in commit `80666e21fc72986812eb0a3f675081cad0b9a144`; fetched the file and confirmed its exact hostname and blob SHA `1c26ee89380bf12977d6287a1c7f3032196b42d2`.
- Added the same `CNAME` to the local module folder so future content uploads preserve it.
- Removed the conflicting `@` ALIAS from the DreamHost DNS-only subdomain entry. DreamHost does not permit CNAME at `@` in that view, so added `careeressentials` CNAME → `aspiece.github.io` in the parent `geneseelearninglab.com` DNS view. DreamHost confirmed “Record added successfully!” The two views edit the same parent DNS zone.
- Preserved `www.careeressentials`, `ai`, `print`, parent-domain address records, and nameservers.
- Reloaded `https://careeressentials.geneseelearninglab.com/` and confirmed the Career Essentials module homepage renders. No browser security bypass was used.
- Final observation: DreamHost was still processing the DNS update. Its authoritative server had not yet exposed the new CNAME during the first check. GitHub's DNS result still reflected the prior ALIAS/A setup; Enforce HTTPS remained disabled while certificate issuance was pending. The corrected records are saved, but final DNS validation and HTTPS enforcement remain pending external propagation.
- Verified the GitHub commit changes only `CNAME`; pending Lesson 2/3 local revisions were not published.
- DNS evidence: `C:/Users/aspie/.codex/visualizations/2026/10/18/01a1507b-ed01-7502-a859-31a20d65eaa1/career-essentials-dns-corrected.png`.
- Next check: after propagation, use GitHub Settings → Pages → Check again. Enable Enforce HTTPS when the certificate is available. GitHub documents up to 24 hours for DNS changes and for the enforcement option to become available; do not repeatedly remove/re-add the domain while DNS is processing.

Reference: [GitHub custom-domain management](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Recovery

To return to the prior default Pages URL, remove the custom domain in Settings → Pages. The lesson baseline is preserved at the commit above. Do not revert unrelated commits or publish pending lesson edits during domain maintenance.
