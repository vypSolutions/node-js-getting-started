const mongodb = require('mongodb').MongoClient;
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')
const MongoClient = require('mongodb').MongoClient;
const mongoURI = `mongodb+srv://${process.env.dbadmin}:${process.env.dbpassword}@${process.env.clustername}/${process.env.dbname}?retryWrites=true&w=majority`;
// console.log(mongoURI);
const options = {
    useUnifiedTopology: true,
    numberOfRetries: 10,
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useNewUrlParser: true
};
const conn = MongoClient.connect(mongoURI, options).then(ele => {
    console.log("Connected");
    global.mongodb = ele.db(process.env.dbname);
}
).catch(error => console.log(error));  
module.exports = {
    conn,
    mongoURI,
    uuidv4,
    moment
}