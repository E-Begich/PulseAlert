module.exports = (sequelize, DataTypes) => {
  const ActivityHistory = sequelize.define('ActivityHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sent_method: {
      type: DataTypes.ENUM('Mail','SMS','Posta'),
    },
    action: {
      type: DataTypes.STRING(100),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'ActivityHistory',
    timestamps: false,
  });

  ActivityHistory.associate = (models) => {
    ActivityHistory.belongsTo(models.Invoice, {
      foreignKey: 'invoice_id',
      as: 'Invoice',
    });
  };

  return ActivityHistory;
};
