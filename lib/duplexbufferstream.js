var Duplex = require('stream').Duplex;
var Buffer = require('buffer').Buffer;
var util = require('util');

var DuplexBufferStream = function(options) {
    this.isWriteFinished = false;
    this.flush = function() { this.chunks = [] };
    this.flush();
    Duplex.call(this, options);
    this.on('finish', function() {
	this.isWriteFinished = true;
	this.emit('readable');
    });
};

util.inherits(DuplexBufferStream, Duplex);

DuplexBufferStream.prototype._read = function(size) {
    var joined = Buffer.concat(this.chunks);
    size = joined.length > size ? size : joined.length;
    this.flush();
    this.chunks.push(joined.slice(size));
    var chunk = joined.slice(0, size);
    if(this.isWriteFinished && chunk.length == 0) {
	this.push(null);
	this.isWriteFinished = false;
    }
    else
	this.push(chunk);
}

DuplexBufferStream.prototype._write = function(chunk, encoding, callback) {
    if(typeof(chunk) == 'string') {
	var chunkbuffer = new Buffer(chunk.length);
	chunkbuffer.write(chunk, encoding);
    }
    else
	chunkbuffer = chunk;
    this.chunks.push(chunk);
    this.emit('readable');
    if(callback) callback();
}

exports = module.exports = DuplexBufferStream;
