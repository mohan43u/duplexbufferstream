### DuplexBufferStream

A simple implementation of Stream.Duplex spec in Node.js.

### Example

##### tee.js

	var DuplexBufferStream = require('duplexbufferstream');
	var fs = require('fs');
	
	var tee = new DuplexBufferStream();
	process.stdin.pipe(tee).pipe(process.stdout);
	
	var teeout = process.argv.length > 2 ? fs.createWriteStream(process.argv[2]) : process.stderr;
	tee.on('data', function(chunk) {
		teeout.write(chunk);
	});

### Execution

	$ echo "hello world" | node tee.js tee.output.log; cat tee.output.log
	hello world
	hello world
	$
