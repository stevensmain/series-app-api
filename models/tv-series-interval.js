import { DataTypes } from 'sequelize'
import db from '../config/db.js'

const TvSeriesIntervals = db.define(
  'TvSeriesIntervals',
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tv_series_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'TvSeries',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    week_day: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    show_time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  },
  {
    tableName: 'tv_series_intervals',
    timestamps: true,
    underscored: true
  }
)

export default TvSeriesIntervals
