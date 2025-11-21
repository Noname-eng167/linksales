// models/product.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

const Product = sequelize.define('Produto', {
  id_produto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome_produto: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  descricao: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  id_comerciante: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Comerciante', // Nome da tabela relacionada
      key: 'id_comerciante'
    }
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Categoria',
      key: 'id_categoria'
    }
  }
}, {
  tableName: 'Produto',
  timestamps: true, // Habilita createdAt e updatedAt
  underscored: true, // snake_case para os nomes dos campos
  createdAt: 'cadastro', // Mapeia createdAt para 'cadastro'
  updatedAt: 'ultima_atualizacao' // Adiciona um campo de atualização

});

export default Product;
