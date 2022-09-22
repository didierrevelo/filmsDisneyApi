const ENGINE_DB = process.env.ENGINE_DB;

const properties = ENGINE_DB === "nosql" ? "./nosql" : "./mysql";

const models = {
  CharacterModels: require(`${properties}/characters`),
  MovieModels: require(`${properties}/movies`),
  StorageModels: require(`${properties}/storage`),
  UsersModels: require(`${properties}/users`),
  GenderModels: require(`${properties}/gender`),
}

module.exports = models;
