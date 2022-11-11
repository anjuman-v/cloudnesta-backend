const mongoose = require('mongoose');


const awsSchema = new mongoose.Schema(
    {
        details: { type: String, required: true},
        your_Application: { type: String, required: true},
        your_Server: { type: String, required: true},
        your_Project: { type: Number, required: true },
        server_size:{type: String, },
        bandwith:{type: String, },
        applicationWebFileStorage:{type: String, },
        databaseStorage:{type: String, },
        location: { type: String,  },
        

    },{
        versionKey: false
    }
)

module.exports = mongoose.model('aws', awsSchema)
