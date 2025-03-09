import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const data = await request.json();
  const { image } = data;

  if (!image) {
    return NextResponse.json({ message: 'Image is required' }, { status: 400 });
  }

  try {
    const uploadResult = await cloudinary.uploader.upload(image, {
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json(
      { message: 'Error uploading image' },
      { status: 500 }
    );
  }
}
