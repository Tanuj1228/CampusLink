const Company = require('./Company');
const Student = require('./Student');
const Job = require('./Job');
const Application = require('./Application');
const sequelize = require('../config/database');

Company.hasMany(Job, { foreignKey: 'companyId', onDelete: 'CASCADE' });
Job.belongsTo(Company, { foreignKey: 'companyId' });

Student.belongsToMany(Job, { through: Application, foreignKey: 'studentId' });
Job.belongsToMany(Student, { through: Application, foreignKey: 'jobId' });

Application.belongsTo(Student, { foreignKey: 'studentId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });
Student.hasMany(Application, { foreignKey: 'studentId' });
Job.hasMany(Application, { foreignKey: 'jobId' });

module.exports = { sequelize, Company, Student, Job, Application };