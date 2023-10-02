import mongoose from 'mongoose';

import config from './config';

class Database {

  async connectToDatabase() {
    try {
      await mongoose.connect(config.MONGODB_URI, {
        autoIndex: true,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

}

export default new Database();
