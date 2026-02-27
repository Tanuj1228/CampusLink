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
    bio: String
    skills: String
    education: String
    projects: String
    portfolio_link: String
  }

  type Application {
    id: ID!
    status: String!
    resume_link: String!
    jobId: ID!
    student: Student
    interview: Interview
  }

  type Review {
    id: ID!
    rating: Int!
    comment: String
    student: Student
  }

  type Interview {
    id: ID!
    interview_date: String!
    meeting_link: String!
  }

  type Analytics {
    totalStudents: Int
    totalJobs: Int
    totalApplications: Int
    totalHired: Int
  }

  type Query {
    getJobs(category: String, limit: Int, offset: Int): [Job]
    getJob(id: ID!): Job
    getCompanyJobs(companyId: ID!): [Job]
    getApplicants(jobId: ID!): [Application]
    getCompanyReviews(companyId: ID!): [Review]
    getStudent(id: ID!): Student
    getAdminAnalytics: Analytics
  }

  type Mutation {
    createJob(title: String!, description: String!, category: String!, jd_link: String!, companyId: ID!): Job
    applyForJob(jobId: ID!, studentId: ID!, resume_link: String!): Application
    updateApplicationStatus(applicationId: ID!, status: String!): Application
    scheduleInterview(applicationId: ID!, interview_date: String!, meeting_link: String!): Interview
    addReview(companyId: ID!, studentId: ID!, rating: Int!, comment: String): Review
    updateStudentProfile(id: ID!, bio: String, skills: String, education: String, projects: String, portfolio_link: String): Student
  }
`;

module.exports = typeDefs;