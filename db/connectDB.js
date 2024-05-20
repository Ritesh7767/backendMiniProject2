const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        let connectionInstance = await mongoose.connect('mongodb+srv://ritesh776782:Ritesh7767@cluster0.nde7hq2.mongodb.net/miniProject')
        console.log("Database connection Successfull .. !!", connectionInstance.connection.host)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectDB