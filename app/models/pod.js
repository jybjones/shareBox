//this is where the tables are going to be created with//
module.exports = function(sequelize, DataTypes) {

	var pod = sequelize.define('pod', {
			name:       DataTypes.STRING,
			lat:        DataTypes.DECIMAL(9,6),
            lng:        DataTypes.DECIMAL(9,6),
            address1:   DataTypes.STRING,
            address2:   DataTypes.STRING,
            city:       DataTypes.STRING,
            postalCode: DataTypes.STRING
		},
		{
            timestamps: false,
			associate: function(models){
                pod.belongsTo(models.state);
			}
		}
	);

	return pod;
};
