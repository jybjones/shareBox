//this is where the tables are going to be created with//
module.exports = function(sequelize, DataTypes) {

	var image = sequelize.define('image', {
            public_id:      DataTypes.STRING,
            version:        DataTypes.STRING,
			url:            DataTypes.STRING
		},
		{
			associate: function(models){
				image.belongsTo(models.item);
			}
		}
	);

	return image;
};
