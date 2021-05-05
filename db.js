const { Sequelize, DataTypes } = require('sequelize')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const config = require('./config')

const sequelize = new Sequelize('ako', config.DB_USER, config.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mariadb',
  logging: config.production ? false : console.log
})

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set (val) {
      this.setDataValue('email', val.toLowerCase())
    }
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get () {
      return `${this.firstName} ${this.lastName}`
    },
    set (value) {
      throw new Error('Do not try to set the `fullName` value!')
    }
  }
})

const Workshop = sequelize.define('Workshop', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  host: {
    type: DataTypes.STRING,
    allowNull: true
  },
  slot: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  maxPeople: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

const Push = sequelize.define('Push', {
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expirationTime: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  p256dh: {
    type: DataTypes.STRING,
    allowNull: true
  },
  auth: {
    type: DataTypes.STRING,
    allowNull: true
  }
})

Workshop.belongsToMany(User, {
  through: 'UserWorkshops',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})
User.belongsToMany(Workshop, {
  through: 'UserWorkshops',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

const sessionStore = new SequelizeStore({
  db: sequelize
})

async function init () {
  return await sequelize.sync({force: true})
}
module.exports = { User, Workshop, Push, init, sessionStore }