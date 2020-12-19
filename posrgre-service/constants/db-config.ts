import  Seq from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

export const sequelize = new Seq.Sequelize(`postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`)

