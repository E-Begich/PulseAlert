module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    patient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    oib: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
    },
    address: DataTypes.STRING(100),
    city: DataTypes.STRING(50),
    postal_code: DataTypes.STRING(10),
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'patient',
    timestamps: false,
  });

  Patient.associate = (models) => {
    Patient.hasMany(models.Invoice, {
      foreignKey: 'patient_id',
      as: 'Invoices',
    });
  };

  return Patient;
};
