var raspberry = process.env.NODE_ENV === 'raspberry';

module.exports.raspberry = raspberry;
module.exports.mongodb = raspberry ? 'mongodb://localhost:27017/boilerpi' : 'mongodb://192.168.0.21:27017/boilerpi'