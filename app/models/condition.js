//this is where the tables are going to be created with//
module.exports = function(sequelize, DataTypes) {

	var condition = sequelize.define('condition', {
			name:            DataTypes.STRING,
			description:     DataTypes.TEXT
		},
		{
			associate: function(models){
			}
		}
	);

	return condition;
};
