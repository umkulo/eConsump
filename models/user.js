module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.TEXT,
        surname: type.TEXT,
        email: type.TEXT,
        password: type.TEXT
    })
}