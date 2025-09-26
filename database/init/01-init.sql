-- Database is already created by POSTGRES_DB environment variable
-- No need to create it here

-- Create user if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'hr_user') THEN
        CREATE ROLE hr_user LOGIN PASSWORD 'hr_password';
    END IF;
END
$$;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE hr_management TO hr_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO hr_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO hr_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO hr_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO hr_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO hr_user;
