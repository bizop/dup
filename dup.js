import fs from 'fs/promises';
import path from 'path';

const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf-8'));
const dependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies
};

const ignoredDirs = ['node_modules', '.git', 'dist', 'build'];
const fileExtensions = ['.js', '.jsx', '.ts', '.tsx', '.vue'];

async function scanDirectory(dir) {
  const usedPackages = new Set();
  const checkedFiles = [];

  async function scan(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory() && !ignoredDirs.includes(entry.name)) {
        await scan(fullPath);
      } else if (entry.isFile() && fileExtensions.includes(path.extname(entry.name))) {
        checkedFiles.push(fullPath);
        const content = await fs.readFile(fullPath, 'utf-8');
        for (const pkg of Object.keys(dependencies)) {
          if (content.includes(`from '${pkg}'`) || content.includes(`from "${pkg}"`)) {
            usedPackages.add(pkg);
          }
        }
      }
    }
  }

  await scan(dir);
  return { usedPackages, checkedFiles };
}

const { usedPackages, checkedFiles } = await scanDirectory('.');
const unusedPackages = Object.keys(dependencies).filter(pkg => !usedPackages.has(pkg));

console.log('Files checked:');
checkedFiles.forEach(file => console.log(`- ${file}`));

console.log('\nPotentially unused packages:');
unusedPackages.forEach(pkg => console.log(`- ${pkg}`));

console.log(`\nTotal files checked: ${checkedFiles.length}`);
console.log(`Total packages: ${Object.keys(dependencies).length}`);
console.log(`Used packages: ${usedPackages.size}`);
console.log(`Potentially unused packages: ${unusedPackages.length}`);
