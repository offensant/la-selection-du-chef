import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';

const EXCEL_PATH = 'C:\\Users\\offen\\Desktop\\Produits_Weidian.xlsx';
const OUTPUT_JSON = './public/data.json';
const OUTPUT_IMG_DIR = './public/images';

async function parseExcel() {
  if (!fs.existsSync(OUTPUT_IMG_DIR)) {
    fs.mkdirSync(OUTPUT_IMG_DIR, { recursive: true });
  }

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXCEL_PATH);
  
  const worksheet = workbook.worksheets[0];
  const products = [];

  // We need to map images to rows. 
  // workbook.model.media contains all images. 
  // worksheet.getImages() returns array of { imageId, range, type, ... }
  const images = worksheet.getImages();
  
  // Create a map of row number to image file name
  const rowImageMap = {};
  
  for (const img of images) {
    // img.range.tl.nativeRow is the row index (0-based)
    const rowIdx = img.range.tl.nativeRow;
    const media = workbook.model.media.find(m => m.index === img.imageId);
    
    if (media) {
      const ext = media.extension || 'jpeg';
      const imgName = `product_${rowIdx}.${ext}`;
      const imgPath = path.join(OUTPUT_IMG_DIR, imgName);
      
      fs.writeFileSync(imgPath, media.buffer);
      rowImageMap[rowIdx] = `/images/${imgName}`;
    }
  }

  worksheet.eachRow((row, rowNumber) => {
    // Skip header
    if (rowNumber === 1) return;
    
    const name = row.getCell(1).text;
    const url = row.getCell(2).text;
    let price = row.getCell(3).text;
    
    if (!name && !url) return;
    
    if (price && !price.includes("¥") && !price.includes("€") && !price.includes("$")) {
      price = `¥${price}`;
    }

    const categories = ["Sneakers", "Tops", "Bottoms", "Accessories"];
    
    products.push({
      id: rowNumber,
      name: name || "Produit Inconnu",
      url: url || "",
      price: price || "N/A",
      image: rowImageMap[rowNumber - 1] || null, // -1 because nativeRow is 0-based
      category: categories[rowNumber % categories.length],
    });
  });

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(products, null, 2));
  console.log(`Successfully parsed ${products.length} products with their real images!`);
}

parseExcel().catch(console.error);
