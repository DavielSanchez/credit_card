require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const validateEnvVariables = () => {
    const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`Variables de entorno faltantes: ${missing.join(', ')}`);
    }
};

validateEnvVariables();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY, {
        auth: { persistSession: false }
    }
);

module.exports = supabase;