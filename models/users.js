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
      allowNull: false,
      unique: "username_u"
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    user_firstname: {
      type: DataTypes.STRING(150),
      allowNull: false
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
      allowNull: false,
      unique: "user_email_u"
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_email_u",
        unique: true,
        fields: [
          { name: "user_email" },
        ]
      },
      {
        name: "user_id_pk",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "username_u",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
};
