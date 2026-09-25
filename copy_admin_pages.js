const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'src', 'app', 'admin', 'leafy-vegetables', 'page.tsx');
const templateContent = fs.readFileSync(templatePath, 'utf8');

const targets = [
  {
    path: path.join(__dirname, 'src', 'app', 'admin', 'edible-flowers', 'page.tsx'),
    componentName: 'AdminEdibleFlowers',
    title: 'Edible Flowers',
    tableName: 'edible_flowers',
    revalidatePath: '/edible-flowers'
  },
  {
    path: path.join(__dirname, 'src', 'app', 'admin', 'herbs', 'page.tsx'),
    componentName: 'AdminHerbs',
    title: 'Herbs',
    tableName: 'herbs',
    revalidatePath: '/herbs'
  },
  {
    path: path.join(__dirname, 'src', 'app', 'admin', 'fruits', 'page.tsx'),
    componentName: 'AdminFruits',
    title: 'Fruits',
    tableName: 'fruits',
    revalidatePath: '/fruits'
  },
  {
    path: path.join(__dirname, 'src', 'app', 'admin', 'saffron', 'page.tsx'),
    componentName: 'AdminSaffron',
    title: 'Saffron',
    tableName: 'saffron',
    revalidatePath: '/saffron'
  }
];

for (const target of targets) {
  let content = templateContent;
  
  // Replace component name
  content = content.replace(/AdminLeafyVegetables/g, target.componentName);
  
  // Replace titles
  content = content.replace(/Leafy Vegetables/g, target.title);
  
  // Replace table name
  content = content.replace(/"leafy_vegetables"/g, `"${target.tableName}"`);
  content = content.replace(/leafy_vegetables\//g, `${target.tableName}/`); // For image upload path
  
  // Replace revalidate path
  content = content.replace(/\/leafy-vegetables/g, target.revalidatePath);
  
  fs.writeFileSync(target.path, content, 'utf8');
  console.log(`Updated ${target.path}`);
}
