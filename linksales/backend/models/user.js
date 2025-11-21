// models/User.js
import { DataTypes} from 'sequelize';
import { sequelize } from '../database/connection.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('Usuario', {
// Identificador único para a tabela Usuario
  id_usuario: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: true, // caso nem todo usuário seja cliente
  },

  id_comerciante: {
    type: DataTypes.INTEGER,
    allowNull: true // caso nem todo usuário seja comerciante
  },

  tipo_conta: {
    type: DataTypes.ENUM('cliente', 'comerciante', 'admin'), // ENUM para tipos fixos
    allowNull: false
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true // Validação extra de formato de email no modelo
    }
  },

  senha: {
    type: DataTypes.STRING(255), 
    allowNull: false
  }
}, {
  tableName: 'Usuario',
  timestamps: true, // Habilita rastreamento de tempo (createdAt/updatedAt)
  createdAt: 'data_cadastro', // Mapeia createdAt
  updatedAt: 'ultima_atualizacao', // Adiciona campo de atualização
  underscored: true, // Usa snake_case para os nomes dos campos

  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.senha = await bcrypt.hash(user.senha, salt);
    },
    beforeUpdate: async (user) => {
      if (user.changed('senha')) {
        const salt = await bcrypt.genSalt(10);
        user.senha = await bcrypt.hash(user.senha, salt);
      }
    }
  }
});

// Método de instância para verificar a senha (útil no Service)
User.prototype.checkPassword = function(password) {
    return bcrypt.compare(password, this.senha);
};

export default User;