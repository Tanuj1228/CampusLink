const { Job, Application, Student, Company, Review, Interview } = require('../models');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const resolvers = {
  Query: {
    getJobs: async (_, { category, limit = 10, offset = 0 }) => {
      const where = category ? { category } : {};
      return await Job.findAll({ where, limit, offset });
    },
    getJob: async (_, { id }) => {
      return await Job.findByPk(id);
    },
    getCompanyJobs: async (_, { companyId }) => {
      return await Job.findAll({ where: { companyId } });
    },
    getApplicants: async (_, { jobId }) => {
      const apps = await Application.findAll({ 
        where: { jobId },
        include: [{ model: Student }, { model: Interview }] 
      });
      return apps.map(app => ({
        id: app.id,
        status: app.status,
        resume_link: app.resume_link,
        jobId: app.jobId,
        student: app.Student,
        interview: app.Interview
      }));
    },
    getCompanyReviews: async (_, { companyId }) => {
       const reviews = await Review.findAll({ where: { companyId }, include: [{ model: Student }] });
       return reviews.map(r => ({ id: r.id, rating: r.rating, comment: r.comment, student: r.Student }));
    }
  },
  Mutation: {
    createJob: async (_, { title, description, category, jd_link, companyId }, context) => {
      const job = await Job.create({ title, description, category, jd_link, companyId });
      if (context.io) {
        context.io.emit('new_job_alert', job);
      }
      return job;
    },
    applyForJob: async (_, { jobId, studentId, resume_link }) => {
      return await Application.create({ jobId, studentId, resume_link });
    },
    updateApplicationStatus: async (_, { applicationId, status }) => {
      const application = await Application.findByPk(applicationId, { include: [Student, Job] });
      application.status = status;
      await application.save();

      if (process.env.SENDGRID_API_KEY) {
        const msg = {
            to: application.Student.email,
            from: process.env.SENDGRID_SENDER_EMAIL, 
            subject: `Application Update: ${application.Job.title}`,
            text: `Your application status has been updated to: ${status}`,
        };
        try { 
          await sgMail.send(msg); 
        } catch (error) { 
          console.error('SendGrid Error:', error.response ? error.response.body : error); 
        }
      }
      return application;
    },
    scheduleInterview: async (_, { applicationId, interview_date, meeting_link }) => {
      const interview = await Interview.create({ applicationId, interview_date, meeting_link });
      await Application.update({ status: 'Interviewing' }, { where: { id: applicationId } });
      return interview;
    },
    addReview: async (_, { companyId, studentId, rating, comment }) => {
      return await Review.create({ companyId, studentId, rating, comment });
    }
  }
};

module.exports = resolvers;