import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

// Image metadata
export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

export default async function Icon() {
  // Read the original logo image file dynamically
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          borderRadius: '24%', // Gives a premium, rounded aesthetic
          overflow: 'hidden',
        }}
      >
        <img
          src={logoBase64}
          alt="Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '24%',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
