const Company = require('./Company');
const Student = require('./Student');
const Job = require('./Job');
const Application = require('./Application');
const Admin = require('./Admin');
const Review = require('./Review');
const Interview = require('./Interview');
const sequelize = require('../config/database');

Company.hasMany(Job, { foreignKey: 'companyId', onDelete: 'CASCADE' });
Job.belongsTo(Company, { foreignKey: 'companyId' });

Application.belongsTo(Student, { foreignKey: 'studentId' });
Application.belongsTo(Job, { foreignKey: 'jobId' });
Student.hasMany(Application, { foreignKey: 'studentId' });
Job.hasMany(Application, { foreignKey: 'jobId' });

Company.hasMany(Review, { foreignKey: 'companyId' });
Review.belongsTo(Company, { foreignKey: 'companyId' });
Student.hasMany(Review, { foreignKey: 'studentId' });
Review.belongsTo(Student, { foreignKey: 'studentId' });

Application.hasOne(Interview, { foreignKey: 'applicationId' });
Interview.belongsTo(Application, { foreignKey: 'applicationId' });

module.exports = { sequelize, Company, Student, Job, Application, Admin, Review, Interview };