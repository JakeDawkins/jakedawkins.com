import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { STAGE_META, TYPE_META } from '@/lib/garden-meta';
import { getGardenPost, getLocalSlugs } from '@/lib/garden';
import { site } from '@/lib/site';

// Social card for each blog post, rendered at build time to /og/<slug>/image.png.
const size = { width: 1200, height: 630 };
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getLocalSlugs().map((slug) => ({ slug }));
}

const fonts = Promise.all([
  readFile(join(process.cwd(), 'assets/fonts/newsreader-500.woff')),
  readFile(join(process.cwd(), 'assets/fonts/geist-500.woff')),
]);

const STAGE_COLOR = { seedling: '#65a30d', budding: '#16a34a', evergreen: '#166534', outdated: '#8a857c' } as const;

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = getGardenPost((await params).slug)!;
  const [serif, sans] = await fonts;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#fbfaf6',
          color: '#1d1c1a',
          fontFamily: 'Geist',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: '#8a857c', letterSpacing: 2 }}>
          <span style={{ textTransform: 'uppercase' }}>{TYPE_META[post.type].label}</span>
          <span>·</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, color: STAGE_COLOR[post.stage] }}>
            <span style={{ width: 14, height: 14, borderRadius: 7, background: STAGE_COLOR[post.stage] }} />
            {STAGE_META[post.stage].label} · {STAGE_META[post.stage].plain}
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontFamily: 'Newsreader', fontSize: post.title.length > 50 ? 64 : 80, lineHeight: 1.05, letterSpacing: -1.5 }}>
            {post.title}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: '#57534c', maxWidth: 960 }}>{post.description}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                background: '#1d1c1a',
                color: '#fbfaf6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              JD
            </div>
            <span style={{ fontFamily: 'Newsreader', fontSize: 32 }}>{site.name}</span>
          </div>
          <span style={{ color: '#c2410c' }}>jakedawkins.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Newsreader', data: serif, weight: 500, style: 'normal' },
        { name: 'Geist', data: sans, weight: 500, style: 'normal' },
      ],
    },
  );
}
