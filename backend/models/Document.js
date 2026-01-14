module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    document_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    file_type: DataTypes.STRING(20),
    upload_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'documents',
    timestamps: false,
  });

  Document.associate = (models) => {
    Document.belongsTo(models.Invoice, {
      foreignKey: 'invoice_id',
      as: 'Invoice',
    });
  };

  return Document;
};
