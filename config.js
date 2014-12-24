var path = require('path');

module.exports = {
    "server": {
        "port": 8000,
        "ip": "0.0.0.0",
        dbDirectory: path.join(__dirname, 'data'),
        "secret": "BoilerPi",
        "users": [
            {
                "username": "yo",
                "password": "yo"
            },
            {
                "username": "user",
                "password": "password"
            }
        ]
    },
    "cronJobParam": "00 * * * * *",
    "recordPin": 12,
    "recordTimeInterval": 200,
    "stepperPins": {
        "blue": 29,
        "pink": 31,
        "yellow": 33,
        "orange": 35
    },
    "stepperDefaultConfig": {
        minStep: 0,
        maxStep: 200,
        position: 0
    }
};