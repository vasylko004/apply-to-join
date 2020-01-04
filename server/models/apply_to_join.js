'use strict';
module.exports = (sequelize, DataTypes) => {
  const apply_to_join = sequelize.define('apply_to_join', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.STRING
  }, {});
  apply_to_join.associate = function(models) {
    // associations can be defined here
    
  };
  return apply_to_join;
};