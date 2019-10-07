fs = require('fs');
path = require('path');
modelDir = __dirname;

files = fs.readdirSync(modelDir);
console.log(files, "files");
if (files){
  files.forEach((file)=>{
    file = file.split('.')[0];
    if (file.indexOf('index') == -1){
      console.log(`exporting ${file}`);
      module.exports[file] = require(path.join(modelDir, file))
    }
  })
}


