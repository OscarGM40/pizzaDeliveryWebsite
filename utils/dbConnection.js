import mongoose from 'mongoose';

const MONGODB_URL = process.env.NEXT_PUBLIC_MONGO_URI;

if(!MONGODB_URL) {
  throw new Error('MONGODB_URL must be defined');
}
/* global se usa para mantener una cache connection entre hot reloads en modo development. */
let cached = global.mongoose;

if(!cached) {
  cached = global.mongoose = { conn:null, promise:null};
}

async function dbConnect(){
  if(cached.conn) {
    return cached.conn;
  }
  if(!cached.promise) {
    const opts = { 
      bufferCommands:false,
    }
    
    cached.promise = mongoose.connect(MONGODB_URL, opts)
    .then(conn => { return conn; })
    .catch(err => { throw err; });
  }
    
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;