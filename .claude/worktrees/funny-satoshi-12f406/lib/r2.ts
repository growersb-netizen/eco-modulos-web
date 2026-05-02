import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export async function uploadImagen(
  file: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const key = `uploads/${Date.now()}-${filename}`
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: file,
      ContentType: contentType,
    })
  )
  return `${process.env.R2_PUBLIC_URL}/${key}`
}

export async function eliminarImagen(url: string): Promise<void> {
  const key = url.replace(`${process.env.R2_PUBLIC_URL}/`, '')
  await r2.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    })
  )
}
