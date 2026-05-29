import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./public/data.json', 'utf-8'));

function detectCategory(name) {
  const n = name.toLowerCase();
  if (n.includes('claquette') || n.includes('slide')) return 'Slides';
  if (n.includes('sac') || n.includes('bag') || n.includes('backpack')) return 'Accessoires';
  if (n.includes('jordan') || n.includes('aj1') || n.includes('aj 1')) return 'Jordan';
  if (n.includes('dunk') || n.includes('air force') || n.includes('af1') || n.includes('air max') || n.includes('nike') || n.includes('mind') || n.includes('nocta')) return 'Nike';
  if (n.includes('louis vuitton') || n.includes('lv')) return 'Louis Vuitton';
  if (n.includes('dior')) return 'Dior';
  if (n.includes('balenciaga')) return 'Balenciaga';
  if (n.includes('new balance') || n.includes('nb')) return 'New Balance';
  if (n.includes('adidas') || n.includes('samba') || n.includes('yeezy')) return 'Adidas';
  if (n.includes('prada') || n.includes('gucci') || n.includes('hermes') || n.includes('burberry')) return 'Luxe';
  if (n.includes('asics')) return 'Asics';
  return 'Autres';
}

const updated = data.map(p => ({
  ...p,
  category: detectCategory(p.name),
}));

fs.writeFileSync('./public/data.json', JSON.stringify(updated, null, 2));

const cats = {};
updated.forEach(p => { cats[p.category] = (cats[p.category] || 0) + 1; });
console.log('Categories:', cats);
console.log(`Updated ${updated.length} products.`);
