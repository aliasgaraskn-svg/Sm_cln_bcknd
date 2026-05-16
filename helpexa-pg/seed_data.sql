-- Seed Data for Helpexa (Enterprise Dataset)
-- 1. Users
INSERT IGNORE INTO users (id, username, password, role, isActive) VALUES
('u1', 'admin', 'admin123', 'ADMIN', 1),
('u2', 'jdoe', 'password', 'EMPLOYEE', 1),
('u3', 'asmith', 'password', 'MANAGER', 1);

-- 2. Leave Balances
INSERT IGNORE INTO leave_balances (id, userId, casual, sick, earned) VALUES
('lb1', 'u1', 12, 8, 15),
('lb2', 'u2', 10, 5, 20),
('lb3', 'u3', 8, 10, 12);

-- 3. HR Requests (25 entries)
INSERT IGNORE INTO hr_requests (id, userId, type, startDate, endDate, status, description) VALUES
('hr1', 'u2', 'Casual', '2026-01-10', '2026-01-12', 'APPROVED', 'Family function'),
('hr2', 'u2', 'Sick', '2026-02-05', '2026-02-06', 'APPROVED', 'Viral fever'),
('hr3', 'u2', 'Earned', '2026-03-15', '2026-03-20', 'REJECTED', 'Project deadline'),
('hr4', 'u2', 'Casual', '2026-04-12', '2026-04-12', 'APPROVED', 'Doctor appointment'),
('hr5', 'u2', 'Sick', '2026-05-01', '2026-05-03', 'PENDING', 'Flu'),
('hr6', 'u1', 'Earned', '2026-06-01', '2026-06-10', 'APPROVED', 'Summer vacation'),
('hr7', 'u1', 'Sick', '2026-01-20', '2026-01-21', 'APPROVED', 'Migraine'),
('hr8', 'u3', 'Casual', '2026-02-14', '2026-02-14', 'APPROVED', 'Personal work'),
('hr9', 'u3', 'Earned', '2026-07-05', '2026-07-15', 'PENDING', 'Annual leave'),
('hr10', 'u2', 'Casual', '2026-08-10', '2026-08-11', 'PENDING', 'Home renovation'),
('hr11', 'u3', 'Sick', '2026-03-10', '2026-03-11', 'APPROVED', 'Cold'),
('hr12', 'u2', 'Earned', '2026-09-01', '2026-09-05', 'PENDING', 'Trip to mountains'),
('hr13', 'u1', 'Casual', '2026-10-15', '2026-10-15', 'APPROVED', 'Bank work'),
('hr14', 'u3', 'Sick', '2026-11-20', '2026-11-22', 'APPROVED', 'Fever'),
('hr15', 'u2', 'Casual', '2026-12-24', '2026-12-26', 'PENDING', 'Christmas break'),
('hr16', 'u3', 'Earned', '2026-04-05', '2026-04-10', 'REJECTED', 'Audit week'),
('hr17', 'u2', 'Sick', '2026-05-20', '2026-05-20', 'APPROVED', 'Dentist'),
('hr18', 'u1', 'Earned', '2026-11-01', '2026-11-15', 'PENDING', 'Global conference'),
('hr19', 'u3', 'Casual', '2026-06-15', '2026-06-15', 'APPROVED', 'Parents visiting'),
('hr20', 'u2', 'Earned', '2026-08-20', '2026-08-25', 'PENDING', 'Sibling wedding'),
('hr21', 'u1', 'Sick', '2026-02-28', '2026-03-01', 'APPROVED', 'Back pain'),
('hr22', 'u3', 'Earned', '2026-12-01', '2026-12-10', 'PENDING', 'End of year rest'),
('hr23', 'u2', 'Casual', '2026-01-30', '2026-01-30', 'APPROVED', 'Property registration'),
('hr24', 'u1', 'Sick', '2026-04-15', '2026-04-16', 'APPROVED', 'Eye infection'),
('hr25', 'u3', 'Casual', '2026-09-12', '2026-09-12', 'PENDING', 'School meeting');

-- 4. ITSM Tickets (25 entries)
INSERT IGNORE INTO itsm_tickets (id, userId, subject, description, category, priority, status) VALUES
('it1', 'u2', 'VPN Disconnecting', 'VPN drops every 10 mins', 'Network', 'High', 'Open'),
('it2', 'u2', 'Monitor Flickering', 'Second monitor flickers', 'Hardware', 'Medium', 'Resolved'),
('it3', 'u2', 'Access to Jira', 'Need access to PRJ-123', 'Access', 'Low', 'Closed'),
('it4', 'u3', 'Outlook not syncing', 'Emails not updating', 'Software', 'High', 'Open'),
('it5', 'u1', 'New Laptop Request', 'Current laptop is slow', 'Hardware', 'Medium', 'In Progress'),
('it6', 'u2', 'Printer Setup', 'Install printer drivers', 'Hardware', 'Low', 'Resolved'),
('it7', 'u3', 'Shared Drive Access', 'Finance folder access', 'Access', 'High', 'Open'),
('it8', 'u1', 'Zoom Audio Issue', 'Mic not working in Zoom', 'Software', 'Medium', 'Resolved'),
('it9', 'u2', 'Keyboard Replacement', 'Sticky keys on laptop', 'Hardware', 'Low', 'Open'),
('it10', 'u3', 'Password Reset', 'Locked out of system', 'Access', 'Urgent', 'Closed'),
('it11', 'u1', 'Software License', 'Adobe Acrobat needed', 'Software', 'Medium', 'Open'),
('it12', 'u2', 'WiFi Speed', 'Slow WiFi in Cabin 4', 'Network', 'Medium', 'In Progress'),
('it13', 'u3', 'Teams Crashing', 'App closes unexpectedly', 'Software', 'High', 'Resolved'),
('it14', 'u1', 'Mouse Replacement', 'Wireless mouse broken', 'Hardware', 'Low', 'Open'),
('it15', 'u2', 'GitLab Permissions', 'Dev repo access', 'Access', 'High', 'In Progress'),
('it16', 'u3', 'Blue Screen Error', 'System crashed twice', 'Software', 'Urgent', 'Open'),
('it17', 'u1', 'Battery Draining', 'Laptop lasts only 1 hour', 'Hardware', 'Medium', 'Open'),
('it18', 'u2', 'Excel Macro Error', 'Macros not running', 'Software', 'Low', 'Resolved'),
('it19', 'u3', 'Firewall Block', 'Access to specific URL', 'Network', 'High', 'Open'),
('it20', 'u1', 'USB Port Not Working', 'Right side port dead', 'Hardware', 'Low', 'Open'),
('it21', 'u2', 'SSL Certificate', 'Internal dev site error', 'Network', 'High', 'Resolved'),
('it22', 'u3', 'Docking Station', 'Need dual monitor dock', 'Hardware', 'Medium', 'In Progress'),
('it23', 'u1', 'Intranet Login', 'LDAP authentication error', 'Access', 'High', 'Open'),
('it24', 'u2', 'VS Code Plugin', 'Request for Copilot', 'Software', 'Low', 'Open'),
('it25', 'u3', 'Headset Request', 'Noise cancelling needed', 'Hardware', 'Medium', 'Resolved');

-- 5. Expense Items (25 entries)
INSERT IGNORE INTO expense_items (id, userId, title, amount, status) VALUES
('ex1', 'u2', 'Business Lunch', '45.50', 'APPROVED'),
('ex2', 'u2', 'Flight to NY', '450.00', 'APPROVED'),
('ex3', 'u2', 'Hotel - 2 Nights', '320.00', 'PENDING'),
('ex4', 'u3', 'Client Dinner', '120.00', 'APPROVED'),
('ex5', 'u3', 'Taxi Fare', '15.00', 'REJECTED'),
('ex6', 'u1', 'AWS Training', '299.00', 'APPROVED'),
('ex7', 'u2', 'Stationery', '25.00', 'APPROVED'),
('ex8', 'u3', 'Conference Fee', '500.00', 'PENDING'),
('ex9', 'u1', 'Keyboard Purchase', '80.00', 'APPROVED'),
('ex10', 'u2', 'Team Outing', '200.00', 'REJECTED'),
('ex11', 'u3', 'Fuel Reimbursement', '65.00', 'APPROVED'),
('ex12', 'u1', 'Monitor Stand', '40.00', 'PENDING'),
('ex13', 'u2', 'Internet Bill', '50.00', 'APPROVED'),
('ex14', 'u3', 'Mobile Bill', '35.00', 'APPROVED'),
('ex15', 'u1', 'Book - Refactoring', '45.00', 'APPROVED'),
('ex16', 'u2', 'Uber to Airport', '28.00', 'PENDING'),
('ex17', 'u3', 'Office Chair', '150.00', 'REJECTED'),
('ex18', 'u1', 'Docker Desktop', '120.00', 'APPROVED'),
('ex19', 'u2', 'Client Gift', '75.00', 'APPROVED'),
('ex20', 'u3', 'Printing Service', '12.00', 'PENDING'),
('ex21', 'u1', 'GitHub Pro', '12.00', 'APPROVED'),
('ex22', 'u2', 'Parking Charges', '10.00', 'APPROVED'),
('ex23', 'u3', 'Courier Service', '18.00', 'APPROVED'),
('ex24', 'u1', 'Laptop Sleeve', '30.00', 'PENDING'),
('ex25', 'u2', 'Coffee with Client', '15.00', 'APPROVED');

-- 6. Courses (10 entries)
INSERT IGNORE INTO courses (id, title, provider, duration, status, userId) VALUES
('c1', 'React Masterclass', 'Coursera', '10 hours', 'Active', 'u1'),
('c2', 'Leadership 101', 'Internal', '5 hours', 'Active', 'u1'),
('c3', 'Python for Data', 'Udemy', '20 hours', 'Active', 'u1'),
('c4', 'Agile Essentials', 'Internal', '3 hours', 'Active', 'u1'),
('c5', 'Cyber Security', 'LinkedIn', '8 hours', 'Active', 'u1'),
('c6', 'Communication', 'Internal', '4 hours', 'Active', 'u1'),
('c7', 'AWS Practitioner', 'Amazon', '12 hours', 'Active', 'u1'),
('c8', 'Project Management', 'PMI', '15 hours', 'Active', 'u1'),
('c9', 'Time Management', 'Internal', '2 hours', 'Active', 'u1'),
('c10', 'Conflict Resolution', 'Internal', '6 hours', 'Active', 'u1');
