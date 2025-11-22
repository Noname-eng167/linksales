import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

const Comerciante = sequelize.define('Comerciante', {
  id_comerciante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome_loja: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cpnj: { 
    type: DataTypes.CHAR(18),
    allowNull: false,
    unique: true
  },
  telefone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  status_comerciante: {
    type: DataTypes.STRING(50),
    defaultValue: 'Ativo',
    validate: {
      isIn: [['Ativo', 'Inativo']]
    }
  },
  // Chaves estrangeiras (Opcionais no cadastro inicial)
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Categoria',
      key: 'id_categoria'
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
  id_tipo_empresa: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Tipo_empresa', // Nome da tabela no banco
      key: 'id_tipo_empresa'
    }
  }
}, {
  tableName: 'Comerciante',
  timestamps: false, // Sua tabela SQL não tem created_at/updated_at
  underscored: true
});

export default Comerciante;