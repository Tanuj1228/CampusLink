const typeDefs = `#graphql
  type Job {
    id: ID!
    title: String!
    description: String!
    category: String!
    jd_link: String!
    companyId: ID!
  }

  type Application {
    id: ID!
    status: String!
    jobId: ID!
    studentId: ID!
  }

  type Query {
    getJobs(category: String): [Job]
    getJob(id: ID!): Job
    getApplicants(jobId: ID!): [Application]
  }

  type Mutation {
    createJob(title: String!, description: String!, category: String!, jd_link: String!, companyId: ID!): Job
    applyForJob(jobId: ID!, studentId: ID!): Application
  }
`;

module.exports = typeDefs;