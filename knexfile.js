require('dotenv').config();
module.exports = {
    development: {
     client: 'pg',
        connection: 'postgres://localhost/alltrapnation-db'
 },
 production:{
        client: 'pg',
        connection: process.env.DATABASE_URL + '?ssl=true'
    }
};
