import { DataTypes } from 'sequelize'
import db from '../config/db.js'
import TvSeriesIntervals from './tv-series-interval.js'

const TvSeries = db.define(
  'TvSeries',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    channel: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  },
  {
    tableName: 'tv_series',
    timestamps: true,
    underscored: true
  }
)

TvSeriesIntervals.belongsTo(TvSeries, {
  foreignKey: 'tv_series_id',
  targetKey: 'id'
})

TvSeries.hasMany(TvSeriesIntervals, {
  foreignKey: 'tv_series_id',
  sourceKey: 'id',
  as: 'schedules'
})

export default TvSeries
