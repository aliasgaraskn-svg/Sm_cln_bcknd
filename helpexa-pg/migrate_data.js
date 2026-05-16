const { Client } = require('pg');
const mysql = require('mysql2/promise');

const pgConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'Aliasgar110',
  database: 'postgres',
};

const mysqlConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Aliasgar110',
  database: 'helpexa_db',
};

async function migrate() {
  const pgClient = new Client(pgConfig);
  let mysqlConn;

  try {
    console.log('Connecting to databases...');
    await pgClient.connect();
    mysqlConn = await mysql.createConnection(mysqlConfig);
    console.log('Connected successfully.');

    const { rows: tableRows } = await pgClient.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    const tables = tableRows.map(r => r.table_name);
    console.log(`Found ${tables.length} tables in PostgreSQL: ${tables.join(', ')}`);

    for (const table of tables) {
      console.log(`\nProcessing table: ${table}...`);

      const { rows: colRows } = await pgClient.query(
        "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = $1 AND table_schema = 'public' ORDER BY ordinal_position",
        [table]
      );

      let mysqlCreateSql = `CREATE TABLE IF NOT EXISTS \`${table}\` (\n`;
      const colDefs = colRows.map(col => {
        let type = '';
        switch (col.data_type) {
          case 'uuid': type = 'VARCHAR(36)'; break;
          case 'character varying': type = 'VARCHAR(255)'; break;
          case 'text': type = 'TEXT'; break;
          case 'boolean': type = 'TINYINT(1)'; break;
          case 'integer': type = 'INT'; break;
          case 'timestamp without time zone': type = 'DATETIME'; break;
          case 'timestamp with time zone': type = 'DATETIME'; break;
          case 'numeric': type = 'DECIMAL(10,2)'; break;
          default: type = 'VARCHAR(255)';
        }
        
        let def = `  \`${col.column_name}\` ${type}`;
        if (col.is_nullable === 'NO') def += ' NOT NULL';
        if (col.column_name === 'id') def += ' PRIMARY KEY';
        return def;
      });
      mysqlCreateSql += colDefs.join(',\n') + '\n)';

      await mysqlConn.execute('SET FOREIGN_KEY_CHECKS = 0');
      await mysqlConn.execute(mysqlCreateSql);

      const { rows: dataRows } = await pgClient.query(`SELECT * FROM ${table}`);
      if (dataRows.length === 0) {
        console.log(`No data to migrate for ${table}.`);
        continue;
      }

      await mysqlConn.execute(`TRUNCATE TABLE \`${table}\``);

      const columns = colRows.map(c => c.column_name);
      const placeholders = columns.map(() => '?').join(', ');
      const insertSql = `INSERT INTO \`${table}\` (\`${columns.join('`, `')}\`) VALUES (${placeholders})`;

      for (const row of dataRows) {
        const values = columns.map(col => {
          let val = row[col];
          if (val === null) return null;
          if (typeof val === 'boolean') return val ? 1 : 0;
          if (val instanceof Date) return val; // mysql2 handles Date objects correctly
          if (Array.isArray(val)) return val.join(','); // Handle simple-array
          if (typeof val === 'object') return JSON.stringify(val);
          return val;
        });
        await mysqlConn.execute(insertSql, values);
      }

      console.log(`Successfully migrated ${dataRows.length} rows for ${table}.`);
    }

    await mysqlConn.execute('SET FOREIGN_KEY_CHECKS = 1');
    console.log('\nMigration completed successfully!');
  } catch (err) {
    console.error('\nMigration failed:', err);
  } finally {
    await pgClient.end();
    if (mysqlConn) await mysqlConn.end();
  }
}

migrate();
