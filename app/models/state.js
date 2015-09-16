//this is where the tables are going to be created with//
module.exports = function(sequelize, DataTypes) {

	var state = sequelize.define('state', {
			name:            DataTypes.STRING,
			description:     DataTypes.TEXT
		},
		{
			associate: function(models){
			}
		}
	);

	return state;
};
