import { connect } from "mongoose";

const db = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    const conn = await connect(process.env.MONGODB_URI);
    // console.log(conn);
    console.log(`*** Connected to MongoDB ***`);
  } catch (err) {
    console.error(`*** Unable to connect to MongoDB: ${err.message} ***`);
  }
};

export default db;
