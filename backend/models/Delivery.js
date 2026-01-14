module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define('Delivery', {
    delivery_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Poslana','U tranzitu','Dostavljena','Vraca se'),
    },
    last_action: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'delivery',
    timestamps: false,
  });

  Delivery.associate = (models) => {
    Delivery.belongsTo(models.Invoice, {
      foreignKey: 'invoice_id',
      as: 'Invoice',
    });
  };

  return Delivery;
};
