import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    console.log("==========> error: ", error);
    throw new Error("Error connecting to database");
  }
};

export default connect;
