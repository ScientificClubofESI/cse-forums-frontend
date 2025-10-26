import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload API route for cloudinary
export async function POST(request) {
  console.log('- Upload API called!');
  console.log('- Environment variables check:');
  console.log('- CLOUD_NAME:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  console.log('- API_KEY:', process.env.CLOUDINARY_API_KEY ? '***SET***' : 'NOT SET');
  console.log('- API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '***SET***' : 'NOT SET');
  
  try {
    const data = await request.formData();
    const file = data.get('file');
    const uploadType = data.get('type'); // 'profile' or 'content'

    console.log('File received:', file ? file.name : 'No file');
    console.log('Upload type:', uploadType);

    if (!file) {
      console.log('No file uploaded');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log('File converted to buffer, size:', buffer.length);

    // Upload to Cloudinary
    console.log('Starting Cloudinary upload...');
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: uploadType === 'profile' ? 'cse_forums/profiles' : 'cse_forums/content',
          transformation: [
            {
              width: uploadType === 'profile' ? 400 : 800,
              height: uploadType === 'profile' ? 400 : 600,
              crop: 'limit',
              quality: 'auto',
              format: 'auto'
            }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}