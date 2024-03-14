import "dotenv/config";

export const development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  define: {
    underscored: true,
    timestamps: true
  }
}