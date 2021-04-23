module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your full name',
        },
        len: {
          msg: 'Require full name length 3 - 32',
          args: [3, 32],
        },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'username',
        msg: 'username already taken',
      },
      validate: {
        notNull: {
          msg: 'Please enter your username',
        },
        len: {
          msg: 'Require username length 3 - 12',
          args: [3, 12],
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your password',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'email',
        msg: 'email already taken',
      },
      validate: {
        notNull: {
          msg: 'Please enter your email',
        },
        isEmail: {
          msg: 'Please enter a valid email',
        },
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your role',
        },
        isIn: {
          msg: 'Please enter a valid role',
          args: [['user', 'admin']],
        },
      },
    },
  })
  return User
}


