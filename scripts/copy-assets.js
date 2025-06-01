import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, '../eshopper-1.0.0/eshopper-1.0.0');
const targetDir = path.join(__dirname, '../public');

// Copy images
fs.copySync(
  path.join(sourceDir, 'img'),
  path.join(targetDir, 'img')
);

// Copy CSS
fs.copySync(
  path.join(sourceDir, 'css'),
  path.join(targetDir, 'css')
);

// Copy JS
fs.copySync(
  path.join(sourceDir, 'js'),
  path.join(targetDir, 'js')
);

console.log('Assets copied successfully!'); 