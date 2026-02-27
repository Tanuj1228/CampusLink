const typeDefs = `#graphql
  type Job {
    id: ID!
    title: String!
    description: String!
    category: String!
    jd_link: String!
    companyId: ID!
  }

  type Student {
    id: ID!
    name: String!
    email: String!
  }

  type Application {
    id: ID!
    status: String!
    jobId: ID!
    student: Student
  }

  type Query {
    getJobs(category: String): [Job]
    getJob(id: ID!): Job
    getCompanyJobs(companyId: ID!): [Job]
    getApplicants(jobId: ID!): [Application]
  }

  type Mutation {
    createJob(title: String!, description: String!, category: String!, jd_link: String!, companyId: ID!): Job
    applyForJob(jobId: ID!, studentId: ID!): Application
  }
`;

module.exports = typeDefs;