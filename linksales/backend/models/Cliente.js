import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';


const Cliente = sequelize.define('Cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(30),
    allowNull: false
  },
  cpf: {
    type: DataTypes.CHAR(14),
    allowNull: false,
    unique: true,
    // Opcional: Adicionar validação de regex do CPF aqui se quiser reforçar
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  nascimento: {
    type: DataTypes.DATEONLY, // Usa apenas a data (sem hora)
    allowNull: true
  },
  // Chaves estrangeiras (Opcionais no cadastro inicial)
  id_loja_favorita: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Comerciante',
      key: 'id_comerciante'
    }
  },
  id_endereco: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Endereco',
      key: 'id_endereco'
    }
  },
  id_cartao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Cartoes',
      key: 'id_cartao'
    }
  }
}, {
  tableName: 'Cliente',
  timestamps: false,
  underscored: true
});

export default Cliente;