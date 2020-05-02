module.exports = {
  mongodb: {
    url: "mongodb://mongodb:27017",
    databaseName: "todo",
    options: {
      useNewUrlParser: true
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js"
};