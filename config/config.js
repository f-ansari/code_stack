require('dotenv').config()
module.exports = {
  development: {
    database: 'code_stack_development',
    dialect: 'postgres'
  },
  test: {
    database: 'code_stack_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
