-- First, add user_id column as nullable
ALTER TABLE todos
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Get the first user's id from auth.users table and set it as default for existing records
UPDATE todos
SET user_id = (SELECT id FROM auth.users LIMIT 1)
WHERE user_id IS NULL;

-- Now make the column NOT NULL
ALTER TABLE todos
ALTER COLUMN user_id SET NOT NULL;

-- Add RLS (Row Level Security) policies
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own todos
CREATE POLICY "Users can only see their own todos" ON todos
FOR ALL
USING (auth.uid() = user_id);

-- Create index on user_id for better performance
CREATE INDEX idx_todos_user_id ON todos(user_id); 