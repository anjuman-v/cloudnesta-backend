
const mongoose = require('mongoose');

const mongoDB = "mongodb+srv://cloudenesta:cloudenesta@cluster0cloudenesta.tdlznux.mongodb.net/?retryWrites=true&w=majority"


module.exports = ()=>mongoose.connect(mongoDB)



//bhut gnde ho