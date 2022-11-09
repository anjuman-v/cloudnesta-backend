
const mongoose = require('mongoose');

const mongoDB = "mongodb://localhost:27017/cloudnesta"


module.exports = ()=>mongoose.connect(mongoDB)