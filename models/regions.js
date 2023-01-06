const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('regions', {
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    region_name: {
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: "NULL"
    }
  }, {
    sequelize,
    tableName: 'regions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_region_id",
        unique: true,
        fields: [
          { name: "region_id" },
        ]
      },
    ]
  });
};
