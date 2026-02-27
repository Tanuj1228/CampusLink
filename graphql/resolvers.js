const { Job, Application } = require('../models');

const resolvers = {
  Query: {
    getJobs: async (_, { category }) => {
      if (category) {
        return await Job.findAll({ where: { category } });
      }
      return await Job.findAll();
    },
    getJob: async (_, { id }) => {
      return await Job.findByPk(id);
    },
    getApplicants: async (_, { jobId }) => {
      return await Application.findAll({ where: { jobId } });
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
    applyForJob: async (_, { jobId, studentId }) => {
      return await Application.create({ jobId, studentId });
    }
  }
};

module.exports = resolvers;