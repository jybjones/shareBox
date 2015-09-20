//this is where the tables are going to be created with//
module.exports = function(sequelize, DataTypes) {

	var state = sequelize.define('state', {
            code:      DataTypes.STRING,
			state:     DataTypes.STRING
		},
		{
			associate: function(models){
			}
		}
	);

	return state;
};
