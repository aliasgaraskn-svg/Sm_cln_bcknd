const { Client } = require('pg');

async function setup() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Aliasgar110',
    database: 'postgres',
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL');
    
    // Clear all tables
    const tables = ['sessions', 'chat_messages', 'leave_balances', 'hr_requests', 'itsm_tickets', 'expense_items', 'approval_items', 'courses', 'users'];
    for (const table of tables) {
      await client.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
    }

    // Re-create tables
    await client.query(`
      CREATE TABLE users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) DEFAULT 'Employee',
          "isActive" BOOLEAN DEFAULT true,
          create_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE chat_messages (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          role VARCHAR(50) NOT NULL,
          text TEXT NOT NULL,
          "toolsUsed" TEXT,
          "userId" UUID REFERENCES users(id),
          create_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE hr_requests (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title VARCHAR(255),
          status VARCHAR(50),
          "startDate" VARCHAR(20),
          "endDate" VARCHAR(20),
          description TEXT,
          type VARCHAR(50),
          "userId" UUID REFERENCES users(id),
          create_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE itsm_tickets (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          category VARCHAR(100),
          priority VARCHAR(50),
          subject VARCHAR(255),
          description TEXT,
          status VARCHAR(50) DEFAULT 'Open',
          "assignedTo" VARCHAR(255),
          "openDate" VARCHAR(100),
          "closeDate" VARCHAR(100),
          "userId" UUID REFERENCES users(id),
          create_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE expense_items (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title VARCHAR(255),
          status VARCHAR(50),
          amount VARCHAR(50),
          "userId" UUID REFERENCES users(id),
          create_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE approval_items (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title VARCHAR(255),
          requestor VARCHAR(255),
          status VARCHAR(50) DEFAULT 'Pending',
          "userId" UUID REFERENCES users(id),
          create_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE courses (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          title VARCHAR(255),
          provider VARCHAR(255),
          duration VARCHAR(100),
          status VARCHAR(50),
          "userId" UUID REFERENCES users(id),
          create_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE leave_balances (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          casual INT DEFAULT 8,
          sick INT DEFAULT 6,
          earned INT DEFAULT 4,
          "userId" UUID UNIQUE REFERENCES users(id),
          create_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          update_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE sessions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          "sessionId" VARCHAR(255) NOT NULL,
          "userId" UUID REFERENCES users(id),
          "isActive" BOOLEAN DEFAULT true,
          "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert 5 Users
    const usernames = ['admin', 'user1', 'user2', 'user3', 'user4'];
    const userIds = [];
    for (const u of usernames) {
      const res = await client.query(`INSERT INTO users (username, password, role) VALUES ('${u}', '${u}', '${u === 'admin' ? 'Admin' : 'Employee'}') RETURNING id`);
      userIds.push(res.rows[0].id);
    }

    // Initialize data for each user
    for (let i = 0; i < userIds.length; i++) {
      const uid = userIds[i];
      const uname = usernames[i];

      // Balances - Correctly deducted (8 - 1 casual = 7)
      await client.query(`INSERT INTO leave_balances ("userId", casual, sick, earned) VALUES ('${uid}', 7, 6, 4)`);

      // HRMS - One Approved Casual leave already taken
      await client.query(`INSERT INTO hr_requests (title, status, "startDate", "endDate", type, "userId", description) 
      VALUES ('May Day Off', 'Approved', '2026-05-01', '2026-05-01', 'Casual', '${uid}', 'Pre-approved leave')`);

      // ITSM
      await client.query(`INSERT INTO itsm_tickets (category, priority, subject, status, "openDate", "userId") VALUES ('Hardware', 'Medium', 'Laptop Setup', 'Open', '2026-05-15T10:00:00Z', '${uid}')`);

      // Expenses
      await client.query(`INSERT INTO expense_items (title, status, amount, "userId") VALUES ('Travel for ${uname}', 'Pending', '$150', '${uid}')`);

      // Approvals
      await client.query(`INSERT INTO approval_items (title, requestor, status, "userId") VALUES ('Budget review', 'Manager', 'Pending', '${uid}')`);

      // Learning
      await client.query(`INSERT INTO courses (title, status, "userId") VALUES ('Safety Training', 'In Progress', '${uid}')`);
    }

    console.log('Database rebuilt with consistent dynamic data!');
  } catch (err) {
    console.error('Error in setup:', err);
  } finally {
    await client.end();
  }
}

setup();
