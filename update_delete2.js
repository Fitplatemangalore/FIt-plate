const fs = require('fs');

const files = [
  'src/app/admin/blogs/page.tsx',
  'src/app/admin/gallery/page.tsx',
  'src/app/admin/recipes/page.tsx',
  'src/app/admin/testimonials/page.tsx',
  'src/app/admin/uses/page.tsx',
  'src/app/admin/video/page.tsx'
];

for (let file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Some use record.id, some use id
    const regex1 = /const \{ error \} = await supabase\.from\("([^"]+)"\)\.delete\(\)\.eq\("id", id\);\s*if \(error\) throw error;/g;
    
    if (content.match(regex1)) {
      content = content.replace(regex1, 'const { data, error } = await supabase.from("$1").delete().eq("id", id).select();\n      if (error) throw error;\n      if (!data || data.length === 0) throw new Error("Could not delete. Check Supabase RLS DELETE policies for this table.");');
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    }
  }
}
console.log('Done');
