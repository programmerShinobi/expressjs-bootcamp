const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_username: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    user_password: {
      type: DataTypes.TEXT,
      allowNull: false
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
