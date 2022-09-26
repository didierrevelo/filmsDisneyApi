const { sequelize } = require("./config");
const Character = require("../src/models/mysql/characters");
const Movie = require("../src/models/mysql/movies");
const Gender = require("../src/models/mysql/gender");
const { UsersModels } = require("../src/models");
const { tokenSign } = require('../src/utils/handleJwt');
const { encrypt, decrypt } = require("../src/utils/handlePassword");

/**
 * this is the default configuration for the conect to the database mysql
 */

/**
 * authenticate the connection to the database
 * if the connection is successful, the console will show the messAge
 * "Connection has been established successfully."
 *  and if the connection is not successful, the console will show the messAge
 * "Unable to connect to the database:"
 */
const dbConnectMysql = async (options = {}) => {
  try {
    await sequelize.authenticate();
    Character.belongsToMany(Movie, {
      as: "movies",
      through: "CharactersMovies",
    });
    Movie.belongsToMany(Character, {
      as: "characters",
      through: "CharactersMovies",
    });
    Movie.belongsTo(Gender, { foreignKey: "Gender" });

    if (options.mockdata === "true") {
      mockData(sequelize);
    } else {
      await sequelize.sync({
        /**
         * force: true will drop the table if it already exists and create the new tables.
         * force: false will not drop the table if it already exists
         */
        force: true,
        alter: false,
      });
    }
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

async function mockData(sequelize) {
  await sequelize.sync({ force: true });
  let req = {
    name: "didier revelo",
    email: "didierrevelo@gmail.com",
    password: "142536",
  };
  const hashPassword = await encrypt(req.password);
  const body = { ...req, password: hashPassword };
  const dataUser = await UsersModels.create(body);
  dataUser.set("password", undefined, { strict: false });

  const reql = {
    email: "didierrevelo@gmail.com",
    password: "142536",
  };
  const dataUserl = await UsersModels.findOne({ email: reql.email });

  const hashPasswordl = await dataUserl.get("password");
  const check = await decrypt(reql.password, hashPasswordl);

  dataUser.set("password", undefined, { strict: false });
  const data = {
    token: await tokenSign(dataUserl),
    user: dataUserl,
  };
  console.log({token: data.token});

  const char1 = await Character.create({
    Name: "jhoselinw",
    Age: 23,
    Weight: 72,
    History: "holamundo",
    Movie: "guerra Mundial z",
    mediaId: "2",
  });
  const char2 = await Character.create({
    Name: "Minie",
    Age: 40,
    Weight: 72,
    History: "holamundo",
    Movie: "guerra Mundial z",
    mediaId: "2",
  });
  const char3 = await Character.create({
    Name: "Donald",
    Age: 50,
    Weight: 72,
    History: "holamundo",
    Movie: "guerra Mundial z",
    mediaId: "2",
  });
  const movie1 = await Movie.create({
    Title: "guerra mundial z",
    Date: 23102005,
    Score: 5,
    associated_characters: "1",
    mediaId: "2",
  });
  const movie2 = await Movie.create({
    Title: "Matrix",
    Date: 23102005,
    Score: 5,
    associated_characters: "1",
    mediaId: "2",
  });
  const movie3 = await Movie.create({
    Title: "Back to the future",
    Date: 23102005,
    Score: 5,
    associated_characters: "1",
    mediaId: "2",
  });
  const Gender1 = await Gender.create({
    Name: "adventure",
    Movie: "guerra Mundial z",
    mediaId: "1",
  });
  const Gender2 = await Gender.create({
    Name: "thriller",
    Movie: "guerra Mundial z",
    mediaId: "1",
  });

  await char1.addMovies([movie1, movie2]);
  await char2.addMovies([movie1, movie2, movie3]);
  await char3.addMovies([movie3]);
  await char1.save();
  await char2.save();
  await char3.save();

  await movie1.setGender(Gender1);
  await movie2.setGender(Gender2);
  await movie3.setGender(Gender1);
  await movie1.save();
  await movie2.save();
  await movie3.save();


  await movie1.setCharacters([char1, char2]);
  await movie2.setCharacters([char1]);
  await movie3.setCharacters([char2, char3]);
  await movie1.save();
  await movie2.save();
  await movie3.save();
}

module.exports = {
  dbConnectMysql,
};
