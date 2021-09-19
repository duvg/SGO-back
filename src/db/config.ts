import * as mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN);
    } catch (error) {
        throw new Error('Error to initialize database');
    }
}

export default dbConnection;