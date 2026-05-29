import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.join(process.cwd(), 'public', 'images');
const dataFile = path.join(process.cwd(), 'public', 'data.json');

async function convertImages() {
  const files = fs.readdirSync(imagesDir);
  let convertedCount = 0;

  for (const file of files) {
    if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png')) {
      const inputPath = path.join(imagesDir, file);
      const outputFilename = file.replace(/\.(jpeg|jpg|png)$/i, '.webp');
      const outputPath = path.join(imagesDir, outputFilename);

      await sharp(inputPath)
        .webp({ quality: 80 }) // 80 is a good balance for web
        .toFile(outputPath);
      
      console.log(`Converted ${file} to ${outputFilename}`);
      
      // Optionally delete old file
      fs.unlinkSync(inputPath);
      convertedCount++;
    }
  }

  // Update data.json
  const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  const updatedData = data.map(product => {
    if (product.image) {
      product.image = product.image.replace(/\.(jpeg|jpg|png)$/i, '.webp');
    }
    return product;
  });

  fs.writeFileSync(dataFile, JSON.stringify(updatedData, null, 2));

  console.log(`Done! Converted ${convertedCount} images and updated data.json.`);
}

convertImages().catch(console.error);
