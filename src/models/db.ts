import { connect } from "mongoose";

const connectDB = async (url: string) => {
  return await connect(url, {
    autoIndex: true,
  });
};

export default connectDB;
