const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

export default {
  connect_url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  multer_url: 'mongodb://127.0.0.1:27017/',
  database: "upload_db_2",
  imgBucket: "photos"
}