import { Sequelize } from 'sequelize';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sequelize PostgreSQL connection
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});


// Database connection and sync
export async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connection established successfully.');
    
    // Sync models (be careful with force in production)
    await sequelize.sync({ alter: true });
    console.log('Models synced with database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
