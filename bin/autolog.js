const program = require('commander');
const info = require('../package.json');
const fs = require('fs');

program.version(info.version);

program
  .option('-n,--name')
  .description('specific file to log')
  .action(function (type, options) {
    // fs.readFileSync()
    console.log(type)
    console.log(options)
  })
