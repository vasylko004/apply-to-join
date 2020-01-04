'use strict';
module.exports = (sequelize, DataTypes) => {
  const apply_to_join_files = sequelize.define('apply_to_join_files', {
    form_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    path: DataTypes.STRING
  }, {});
  apply_to_join_files.associate = function(models) {
    // associations can be defined here
  };
  return apply_to_join_files;
};