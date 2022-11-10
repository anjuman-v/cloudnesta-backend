const mongoose = require('mongoose');


const linodeSchema = new mongoose.Schema(
    {
        details: { type: String, required: true },
        your_Application: { type: String, required: true},
        your_Server: { type: String, required: true},
        your_Project: { type: Number, required: true },
        server_size:{type: String, required: true},
        location: { type: String, required: true },
        

    },{
        versionKey: false
    }
)

module.exports = mongoose.model('linode', linodeSchema)
