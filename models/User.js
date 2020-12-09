const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: 0,
    },
        data: {
        type:[Object]
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const data = new mongoose.Schema({
  url: {
    unique: true,
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});

const connnectDB = async () => {
  const uri =
    "mongodb+srv://Uwaish55:Uwaish55@cluster0.uujh1.azure.mongodb.net/Akshay?retryWrites=true&w=majority";
  mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
};
const User = mongoose.model("User", user);
const Data = mongoose.model("Data", data);
module.exports = {User, connnectDB, Data};
