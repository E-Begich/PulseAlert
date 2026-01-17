module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    invoice_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    invoice_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    amount_due: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    issue_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM('Na cekanju', 'Placeno', 'Kasni'),
      defaultValue: 'Na cekanju',
    },
    reminder_sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'invoice',
    timestamps: false,
  });

  Invoice.associate = (models) => {
    Invoice.belongsTo(models.Patient, {
      foreignKey: 'patient_id',
      as: 'Patient',
    });

    //dodana restrikcija da se korisnik ne može obrisati ako ima račun
    Invoice.belongsTo(models.User, {
      foreignKey: {
        name: 'created_by',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      as: 'CreatedBy'
    });

    Invoice.hasMany(models.Payment, {
      foreignKey: 'invoice_id',
      as: 'Payments',
    });

    Invoice.hasMany(models.ActivityHistory, {
      foreignKey: 'invoice_id',
      as: 'Activities',
    });

    Invoice.hasMany(models.Document, {
      foreignKey: 'invoice_id',
      as: 'Documents',
    });

    Invoice.hasOne(models.Delivery, {
      foreignKey: 'invoice_id',
      as: 'Delivery',
    });
  };

  return Invoice;
};
