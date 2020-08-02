const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const db =  await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
	        useUnifiedTopology: true, 
	        useFindAndModify: false

        });

        console.log(`MongoDB Atlas connected!: ${db.connection.host}`);
        
        
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}


module.exports = connectDB;