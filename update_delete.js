const fs = require('fs');

const files = [
  'src/app/admin/crops/page.tsx',
  'src/app/admin/leafy-vegetables/page.tsx',
  'src/app/admin/edible-flowers/page.tsx',
  'src/app/admin/herbs/page.tsx',
  'src/app/admin/fruits/page.tsx',
  'src/app/admin/saffron/page.tsx',
  'src/app/admin/varieties/page.tsx'
];

for (let file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace delete().eq("id", id) with delete().eq("id", id).select()
    const regex = /const \{ error \} = await supabase\.from\("([^"]+)"\)\.delete\(\)\.eq\("id", id\);\s*if \(error\) throw error;/g;
    
    if (content.match(regex)) {
      content = content.replace(regex, 'const { data, error } = await supabase.from("$1").delete().eq("id", id).select();\n      if (error) throw error;\n      if (!data || data.length === 0) throw new Error("Could not delete. Check Supabase RLS DELETE policies for this table.");');
      fs.writeFileSync(file, content);
      console.log(`Updated ${file}`);
    }
  }
}
console.log('Done');
