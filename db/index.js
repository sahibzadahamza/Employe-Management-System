import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `\n MongoDB Connected!! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection Failed", error);
  }
};

export default connectDB;
