module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      komentar: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please enter your comment',
          },
        },
      },
      penulis: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      berita: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'News',
          key: 'id',
        },
      }
    })
    return Comment
  }
  
  
  