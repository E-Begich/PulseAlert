module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    payment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.ENUM('Gotovina','Kartica','Bankovni prijenos'),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'payment',
    timestamps: false,
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Invoice, {
      foreignKey: 'invoice_id',
      as: 'Invoice',
    });
  };

  return Payment;
};
