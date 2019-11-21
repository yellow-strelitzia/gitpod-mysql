var mysql  = require('mysql');
const util = require('util');
const {
  performance
} = require('perf_hooks');

const main = async () => {
  var pool = null;
  try {
    pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    connectionLimit : 10,
  });
  } catch (err) {
    console.error('error creating pool: ' + err.stack);
    return;
  }
  console.log('pool created');

  try {
    pool.query = util.promisify(pool.query);

    var records = await pool.query('SELECT 1');
    console.log('query completed');
    await pool.query('CREATE DATABASE IF NOT EXISTS blobtestdb');
    console.log('database created or already exists');
    await pool.query('USE blobtestdb');
    console.log('database selected');
    await pool.query('CREATE TABLE IF NOT EXISTS blobtestdb.blobtest (id bigint, value longblob)');
    console.log('table created or already exists');
    const column = { id: Date.now(), value: Buffer.alloc(1024000) };
    const st = performance.now()
    await pool.query('INSERT INTO blobtest SET ?', column);
    const ed = performance.now()
    console.log('data inserted , elapsed => ' + String(ed-st) + 'ms');

    pool.end();
  } catch (err) {
    console.error('error occured: ' + err.stack);
  }
}

main();
