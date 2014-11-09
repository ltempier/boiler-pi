var raspberry = process.env.NODE_ENV === 'raspberry';

module.exports.raspberry = raspberry;
module.exports.dateFormat = "YYYY/MM/DD hh:mm:ss"
module.exports.redis = raspberry ?  {port: 6379, ip: '127.0.0.1', options: {}} : {port: 6379, ip: '192.168.0.21', options: {}}

