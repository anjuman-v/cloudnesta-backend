const mongoose = require('mongoose');


const gcpSchema = new mongoose.Schema(
    {
        details: { type: String, required: true },
        your_Application: { type: String, required: true},
        your_Server: { type: String, required: true},
        your_Project: { type: Number, required: true },
        server_size:{type: String, required: true},
        bandwith:{type: String, required: true},
        applicationWebFileStorage:{type: String, required: true},
        databaseStorage:{type: String, required: true},
        location: { type: String, required: true },
        

    },{
        versionKey: false
    }
)

module.exports = mongoose.model('gcp', gcpSchema)
