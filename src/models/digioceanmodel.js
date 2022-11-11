const mongoose = require('mongoose');


const digiOceanSchema = new mongoose.Schema(
    {
        details: { type: String, required: true },
        your_Application: { type: String, required: true},
        your_Server: { type: String, },
        your_Project: { type: Number,  },
        server_size:{type: String, },
        location: { type: String,  },
        

    },{
        versionKey: false
    }
)

module.exports = mongoose.model('digiOcean', digiOceanSchema)
