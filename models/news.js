module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define('News', {
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the title',
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
    kategori: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the category',
        },
      },
    },
    isi: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the news',
        },
      },
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter year',
        },
        len: {
          msg: 'invalid year',
          args: [4,4],
        },
      },
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Input the thumbnail',
        },
      },
    }
  })
  return News
}


