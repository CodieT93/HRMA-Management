-- Sample data for HR Management Application
-- This file contains additional sample data that can be loaded after the initial seed

-- Insert additional departments
INSERT INTO departments (name, description, created_at, updated_at) VALUES
('Human Resources', 'Human Resources Department', NOW(), NOW()),
('Finance', 'Finance and Accounting Department', NOW(), NOW()),
('Operations', 'Operations and Logistics Department', NOW(), NOW()),
('Customer Success', 'Customer Success and Support Department', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Insert additional positions
INSERT INTO positions (title, department, description, created_at, updated_at) VALUES
('HR Specialist', 'Human Resources', 'Handles recruitment and employee relations', NOW(), NOW()),
('Financial Analyst', 'Finance', 'Analyzes financial data and prepares reports', NOW(), NOW()),
('Operations Manager', 'Operations', 'Manages day-to-day operations', NOW(), NOW()),
('Customer Success Manager', 'Customer Success', 'Ensures customer satisfaction and retention', NOW(), NOW()),
('DevOps Engineer', 'Engineering', 'Manages infrastructure and deployment', NOW(), NOW()),
('UI/UX Designer', 'Engineering', 'Designs user interfaces and experiences', NOW(), NOW())
ON CONFLICT (title, department) DO NOTHING;

-- Insert sample skills
INSERT INTO skills (name, category, created_at, updated_at) VALUES
('Leadership', 'Soft Skills', NOW(), NOW()),
('Communication', 'Soft Skills', NOW(), NOW()),
('Problem Solving', 'Soft Skills', NOW(), NOW()),
('Team Management', 'Soft Skills', NOW(), NOW()),
('Project Management', 'Soft Skills', NOW(), NOW()),
('Agile/Scrum', 'Methodology', NOW(), NOW()),
('DevOps', 'Technical', NOW(), NOW()),
('Cloud Computing', 'Technical', NOW(), NOW()),
('Machine Learning', 'Technical', NOW(), NOW()),
('Data Analysis', 'Technical', NOW(), NOW()),
('Sales', 'Business', NOW(), NOW()),
('Marketing', 'Business', NOW(), NOW()),
('Customer Service', 'Business', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;

-- Insert leave policies
INSERT INTO leave_policies (leave_type, max_days_per_year, carry_over_days, created_at, updated_at) VALUES
('annual', 20, 5, NOW(), NOW()),
('sick', 10, 0, NOW(), NOW()),
('personal', 5, 0, NOW(), NOW()),
('maternity', 90, 0, NOW(), NOW()),
('paternity', 14, 0, NOW(), NOW()),
('bereavement', 5, 0, NOW(), NOW()),
('unpaid', 30, 0, NOW(), NOW())
ON CONFLICT (leave_type) DO NOTHING;

-- Insert performance review templates
INSERT INTO performance_review_templates (name, description, questions, created_at, updated_at) VALUES
('Standard Review', 'Standard performance review template', 
 '[
   {"question": "What were your main achievements this quarter?", "type": "text"},
   {"question": "What challenges did you face?", "type": "text"},
   {"question": "What are your goals for next quarter?", "type": "text"},
   {"question": "How would you rate your overall performance?", "type": "rating", "scale": 5}
 ]', NOW(), NOW()),
('Manager Review', 'Performance review template for managers',
 '[
   {"question": "How well did you lead your team?", "type": "rating", "scale": 5},
   {"question": "What team achievements are you most proud of?", "type": "text"},
   {"question": "How did you develop your team members?", "type": "text"},
   {"question": "What leadership challenges did you overcome?", "type": "text"}
 ]', NOW(), NOW())
ON CONFLICT (name) DO NOTHING;
