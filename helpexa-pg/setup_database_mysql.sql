-- Helpexa MySQL Migration Script
-- This script creates the schema and populates it with existing data

CREATE DATABASE IF NOT EXISTS `helpexa_db`;
USE `helpexa_db`;

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'User',
    isActive BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS hr_requests (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    date VARCHAR(20) NOT NULL,
    description TEXT,
    type VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS itsm_tickets (
    id VARCHAR(36) PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    priority VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Open',
    assignedTo VARCHAR(255) DEFAULT 'Unassigned',
    date VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS leave_balances (
    id VARCHAR(36) PRIMARY KEY,
    casual INT DEFAULT 8,
    sick INT DEFAULT 6,
    earned INT DEFAULT 4,
    userId VARCHAR(36) UNIQUE,
    FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS expense_items (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    amount DECIMAL(10,2),
    category VARCHAR(100),
    date VARCHAR(20),
    status VARCHAR(50) DEFAULT 'Pending'
);

CREATE TABLE IF NOT EXISTS approvals (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    requestor VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    type VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    provider VARCHAR(255),
    duration VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Not Started'
);

CREATE TABLE IF NOT EXISTS sessions (
    id VARCHAR(36) PRIMARY KEY,
    sessionId VARCHAR(255) NOT NULL,
    userId VARCHAR(36),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isActive BOOLEAN DEFAULT true,
    FOREIGN KEY (userId) REFERENCES users(id)
);

-- 2. Insert Initial Data

-- Users (Using hardcoded UUIDs for initial data consistency)
INSERT INTO users (id, username, password, role) VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'admin', 'admin', 'Admin');

-- Leave Balances
INSERT INTO leave_balances (id, casual, sick, earned, userId) VALUES (UUID(), 8, 6, 4, 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11');

-- HR Requests
INSERT INTO hr_requests (id, title, status, date) VALUES 
(UUID(), 'Casual Leave', 'Pending', '2026-05-14'),
(UUID(), 'Privilege Leave', 'Pending', '2026-05-14'),
(UUID(), 'Casual Leave', 'Pending', '2026-05-13'),
(UUID(), 'Casual Leave', 'Pending', '2026-05-13'),
(UUID(), 'Annual Leave Request', 'Approved', '2026-05-10'),
(UUID(), 'Salary Certificate', 'Pending', '2026-05-12');

-- ITSM Tickets
INSERT INTO itsm_tickets (id, category, priority, subject, description, status, assignedTo, date) VALUES 
(UUID(), 'Hardware', 'Urgent', 'laptop fan not working', 'laptop fan not working', 'Open', 'Unassigned', '2026-05-15'),
(UUID(), 'Hardware', 'Medium', 'Laptop battery issue', 'The laptop is not charging beyond 10% and getting very hot.', 'Open', 'Unassigned', '2026-05-15'),
(UUID(), 'Hardware', 'Medium', 'Laptop screen flickering', 'The screen flickers every few minutes.', 'In Progress', 'John Doe', '2026-05-14'),
(UUID(), 'Access', 'High', 'VPN Access Request', 'Need VPN access for remote work.', 'Resolved', 'Jane Smith', '2026-05-13');

-- Expense Items
INSERT INTO expense_items (id, title, amount, category, date, status) VALUES 
(UUID(), 'Office Supplies', 45.50, 'Stationery', '2026-05-10', 'Pending'),
(UUID(), 'Client Lunch', 120.00, 'Food', '2026-05-12', 'Approved');

-- Approvals
INSERT INTO approvals (id, requestor, title, status) VALUES 
(UUID(), 'Jane Smith', 'New Mac Studio Purchase', 'Pending'),
(UUID(), 'John Doe', 'Marketing Budget Q3', 'Pending');

-- Courses
INSERT INTO courses (id, title, provider, duration, status) VALUES 
(UUID(), 'NestJS Advanced Patterns', 'Internal', '4h', 'Not Started'),
(UUID(), 'Cloud Architecture', 'Coursera', '12h', 'In Progress');
