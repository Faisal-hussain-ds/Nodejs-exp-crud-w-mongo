const mongoose = require("mongoose");
const { MongoDB_url } = process.env;
mongoose.set('strictQuery', false);
exports.connect = () => {
  mongoose
    .connect(MongoDB_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    })
    .then(() => {
      console.log("Database has been connected");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
