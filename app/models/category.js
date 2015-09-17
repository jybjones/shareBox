//this is where the tables are going to be created with//
module.exports = function(sequelize, DataTypes) {

	var category = sequelize.define('category', {
			name:            DataTypes.STRING,
			description:     DataTypes.TEXT
		},
		{
			associate: function(models){
				//category.belongsTo(models.userProfile);
			}
		}
	);

	return category;
};
