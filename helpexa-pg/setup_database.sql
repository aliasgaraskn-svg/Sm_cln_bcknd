-- Helpexa PostgreSQL Migration Script
-- This script creates the schema and populates it with existing data

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'User',
    "isActive" BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS hr_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    date VARCHAR(20) NOT NULL,
    description TEXT,
    type VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS itsm_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Open',
    "assignedTo" VARCHAR(255) DEFAULT 'Unassigned',
    date VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS leave_balances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    casual INT DEFAULT 8,
    sick INT DEFAULT 6,
    earned INT DEFAULT 4,
    "userId" UUID UNIQUE REFERENCES users(id)
);

-- Initialize balances for existing users
INSERT INTO leave_balances ("userId") 
SELECT id FROM users 
ON CONFLICT ("userId") DO NOTHING;

CREATE TABLE IF NOT EXISTS expense_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    amount NUMERIC,
    category VARCHAR(100),
    date VARCHAR(20),
    status VARCHAR(50) DEFAULT 'Pending'
);

CREATE TABLE IF NOT EXISTS approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    requestor VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    type VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    provider VARCHAR(255),
    duration VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Not Started'
);

CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "sessionId" VARCHAR(255) NOT NULL,
    "userId" UUID REFERENCES users(id),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN DEFAULT true
);

-- 2. Insert Initial Data

-- Users
INSERT INTO users (username, password, role) VALUES ('admin', 'admin', 'Admin');

-- HR Requests (Migrated from hr.json)
INSERT INTO hr_requests (title, status, date) VALUES 
('Casual Leave', 'Pending', '2026-05-14'),
('Privilege Leave', 'Pending', '2026-05-14'),
('Casual Leave', 'Pending', '2026-05-13'),
('Casual Leave', 'Pending', '2026-05-13'),
('Annual Leave Request', 'Approved', '2026-05-10'),
('Salary Certificate', 'Pending', '2026-05-12');

-- ITSM Tickets (Migrated from itsm.json)
INSERT INTO itsm_tickets (category, priority, subject, description, status, "assignedTo", date) VALUES 
('Hardware', 'Urgent', 'laptop fan not working', 'laptop fan not working', 'Open', 'Unassigned', '2026-05-15'),
('Hardware', 'Medium', 'Laptop battery issue', 'The laptop is not charging beyond 10% and getting very hot.', 'Open', 'Unassigned', '2026-05-15'),
('Hardware', 'Medium', 'Laptop screen flickering', 'The screen flickers every few minutes.', 'In Progress', 'John Doe', '2026-05-14'),
('Access', 'High', 'VPN Access Request', 'Need VPN access for remote work.', 'Resolved', 'Jane Smith', '2026-05-13');

-- Expense Items (Migrated from static data)
INSERT INTO expense_items (title, amount, category, date, status) VALUES 
('Office Supplies', 45.50, 'Stationery', '2026-05-10', 'Pending'),
('Client Lunch', 120.00, 'Food', '2026-05-12', 'Approved');

-- Approvals (Migrated from static data)
INSERT INTO approvals (title, requestor, status) VALUES 
('New Mac Studio Purchase', 'Jane Smith', 'Pending'),
('Marketing Budget Q3', 'John Doe', 'Pending');

-- Courses
INSERT INTO courses (title, provider, duration, status) VALUES 
('NestJS Advanced Patterns', 'Internal', '4h', 'Not Started'),
('Cloud Architecture', 'Coursera', '12h', 'In Progress');
