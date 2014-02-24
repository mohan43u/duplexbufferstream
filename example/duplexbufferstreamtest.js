var DuplexBufferStream = require('../lib/duplexbufferstream');
var fs = require('fs');

var input = fs.createReadStream(process.argv[1]);
var duplexbufferstream = new DuplexBufferStream();

input.pipe(duplexbufferstream).pipe(process.stdout);
