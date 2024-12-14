import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
  style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222323',
    color: '#f0f6f0',
    fontSize: 20,
    fontWeight: 600,
  }}
>
  <div style={{ marginTop: 40 }}>all outcomes are the same</div>
</div>

      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    console.error('Failed to generate the image:', e instanceof Error ? e.message : String(e))
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
