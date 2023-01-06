const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_firstname: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    user_middlename: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    user_lastname: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    user_email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_id_pk",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
