const path = require('path');
const fs = require('fs');
const paths = require('./paths');

const files = paths.entryPaths;
const rewrites = files.map(v => {
  const fileParse = path.parse(v.path);
  console.log('====================================');
  console.log(fileParse);
  console.log('====================================');
  return {
    from: new RegExp(`^\/${fileParse.base}`),
    to: `/build/${fileParse.base}`,
  };
});
console.log(rewrites);


// const appDirectory = fs.realpathSync(process.cwd());
// const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// (async () => {
//   const paths = await globby([path.resolve(__dirname, '../src/entries/'), '*.jsx']);
//   console.log('====================================');
//   console.log(paths);
//   console.log('====================================');
  
// })();

// const resolvePaths = path.resolve(__dirname, '../src/entries/');
// fs.readdir(resolvePaths, (err, files) => {
//   if (err) {
//     throw err;
//   }
//   const a = files.map((item) => `${resolvePaths}/${item}`);
//   console.log('====================================');
//   console.log(a);
//   console.log('====================================');
// });

// const getEntryFiles = () => {
//   const resolvePaths = path.resolve(__dirname, '../src/entries/');
//   return a = fs.readdirSync(resolvePaths).map((item) => `${resolvePaths}/${item}`);
// }

const getEntryPathAndName = () => {
  const resolvePaths = path.resolve(__dirname, '../src/entries/');
  const tempPath = fs.readdirSync(resolvePaths);
  return tempPath.map((item) => ({
    path: `../src/entries/${item.split('.')[0]}`,
    name: item.split('.')[0]
  }));
}

const getEntries = () => {
  let entry = {};
  const pathAndName = getEntryPathAndName();
  pathAndName.forEach(item=>{
    entry[item.name] = item.path;
  });
  return entry;
}

console.log('====================================');
console.log(getEntries());
console.log('====================================');
