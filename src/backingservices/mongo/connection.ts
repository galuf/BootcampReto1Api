import mongoose from "mongoose";

let endpointMongoDB = process.env.ENDPOINT_MONGO_DB;

const ProfileMongoDB = mongoose.createConnection(endpointMongoDB);

export { ProfileMongoDB };
