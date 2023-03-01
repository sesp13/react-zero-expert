const { connect } = require('mongoose');

const dbConnection = async () => {
  try {
    await connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db online");
  } catch (error) {
    console.log(error);
    throw new Error('Error during db init');
  }
};

module.exports = {
  dbConnection,
};
