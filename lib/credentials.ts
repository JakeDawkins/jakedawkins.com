// Certification status is decided at build time. The weekly scheduled rebuild
// (.github/workflows/scheduled-rebuild.yml) makes the switch go live on its own.

export type Credential = {
  name: string;
  shortName: string;
  issuer: string;
  /** `YYYY`. */
  earned: string;
  /** `YYYY-MM`. Treated as expired from the first of that month. */
  expires: string;
};

const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

/** `CV_TODAY=2026-12-02 npm run build` previews the site as of another date. */
export const buildDate = () => (process.env.CV_TODAY ? new Date(process.env.CV_TODAY) : new Date());

export function credentialStatus(c: Credential, now = buildDate()) {
  const expiresOn = new Date(`${c.expires}-01T00:00:00Z`);
  const expired = now >= expiresOn;
  const until = monthYear.format(expiresOn);
  return {
    expired,
    until,
    /** The years held, e.g. "2023 – 2026". Stays true after expiry even if a copy (like the committed PDF) isn't regenerated. */
    note: `${c.earned} – ${c.expires.slice(0, 4)}`,
  };
}
