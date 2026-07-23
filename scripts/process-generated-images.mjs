import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

const DOWNLOADS = 'C:/Users/PC/Downloads'
const PUBLIC = 'C:/Users/PC/eco-modulos-web/public'

const jobs = [
  // Heroes (1920x600 banners, or 1920x1080 for home, 1200x630 for OG)
  { src: 'Gemini_Generated_Image_1xklh71xklh71xkl.png', dest: 'hero-home.jpg', w: 1920, h: 1080 },
  { src: 'Gemini_Generated_Image_6q4isv6q4isv6q4i.png', dest: 'hero-modulos.jpg', w: 1920, h: 600 },
  { src: 'Gemini_Generated_Image_itnqw4itnqw4itnq.png', dest: 'hero-piscinas.jpg', w: 1920, h: 600 },
  { src: 'Gemini_Generated_Image_3e99zb3e99zb3e99.png', dest: 'hero-financiacion.jpg', w: 1920, h: 600 },
  { src: 'Gemini_Generated_Image_cq3k08cq3k08cq3k.png', dest: 'hero-obras.jpg', w: 1920, h: 600 },
  { src: 'Gemini_Generated_Image_myd74tmyd74tmyd7.png', dest: 'hero-combo.jpg', w: 1920, h: 600 },
  { src: 'Gemini_Generated_Image_hl6dfjhl6dfjhl6d.png', dest: 'og-image.jpg', w: 1200, h: 630 },
  // Modulos (800x600 product photos)
  { src: 'Gemini_Generated_Image_i6gyk3i6gyk3i6gy.png', dest: 'img/modulos/studio-18.jpg', w: 800, h: 600 },
  { src: 'Gemini_Generated_Image_256v5a256v5a256v.png', dest: 'img/modulos/quincho-36.jpg', w: 800, h: 600 },
  { src: 'Gemini_Generated_Image_1428au1428au1428.png', dest: 'img/modulos/glamping-18.jpg', w: 800, h: 600 },
  { src: 'Gemini_Generated_Image_bznzklbznzklbznz.png', dest: 'img/modulos/deposito-18.jpg', w: 800, h: 600 },
  { src: 'Gemini_Generated_Image_mqfozlmqfozlmqfo.png', dest: 'img/modulos/oficina-18.jpg', w: 800, h: 600 },
  { src: 'Gemini_Generated_Image_j4lcidj4lcidj4lc.png', dest: 'img/modulos/2dorm-54.jpg', w: 800, h: 600 },
  { src: 'Gemini_Generated_Image_w3qt3gw3qt3gw3qt.png', dest: 'img/modulos/3dorm-72.jpg', w: 800, h: 600 },
]

async function run() {
  for (const job of jobs) {
    const srcPath = path.join(DOWNLOADS, job.src)
    const destPath = path.join(PUBLIC, job.dest)
    fs.mkdirSync(path.dirname(destPath), { recursive: true })
    await sharp(srcPath)
      .resize(job.w, job.h, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(destPath)
    const stat = fs.statSync(destPath)
    console.log(`${job.dest}: ${(stat.size / 1024).toFixed(0)} KB`)
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
