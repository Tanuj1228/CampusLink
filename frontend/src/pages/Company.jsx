import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { graphql } from "../services/api"

export default function Company() {
  const navigate = useNavigate()
  const companyId = localStorage.getItem("companyId")

  const [companyJobs, setCompanyJobs] = useState([])
  const [reviews, setReviews] = useState([])
  const [applicants, setApplicants] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)

  const [showSelectPrompt, setShowSelectPrompt] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const [modalData, setModalData] = useState({
    appId: "",
    date: "",
    time: "",
    link: ""
  })

  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    category: "",
    jd_link: ""
  })

  /* =========================
        AUTH CHECK
  ========================= */

  useEffect(() => {
    if (!companyId) {
      navigate("/login")
      return
    }

    fetchCompanyJobs()
    fetchReviews()
  }, [companyId])

  /* =========================
        FETCH COMPANY JOBS
  ========================= */

  const fetchCompanyJobs = async () => {
    try {
      const data = await graphql(`
        query {
          getCompanyJobs(companyId: "${companyId}") {
            id
            title
            status
          }
        }
      `)

      setCompanyJobs(data?.getCompanyJobs || [])
    } catch (err) {
      console.error("Error fetching jobs", err)
    }
  }

  /* =========================
        FETCH REVIEWS
  ========================= */

  const fetchReviews = async () => {
    try {
      const data = await graphql(`
        query {
          getCompanyReviews(companyId: "${companyId}") {
            id
            rating
            comment
            student {
              name
            }
          }
        }
      `)

      setReviews(data?.getCompanyReviews || [])
    } catch (err) {
      console.error("Error fetching reviews", err)
    }
  }

  /* =========================
        FETCH APPLICANTS
  ========================= */

  const fetchApplicants = async (jobId, jobTitle) => {
    setShowSelectPrompt(false)

    try {
      const data = await graphql(`
        query {
          getApplicants(jobId: "${jobId}") {
            id
            status
            resume_link
            student {
              name
              email
              skills
              portfolio_link
            }
          }
        }
      `)

      setApplicants(data?.getApplicants || [])
      setSelectedJob({ id: jobId, title: jobTitle })
    } catch (err) {
      console.error("Error fetching applicants", err)
    }
  }

  /* =========================
        CREATE JOB
  ========================= */

  const handleJobSubmit = async (e) => {
    e.preventDefault()

    try {
      await graphql(`
        mutation {
          createJob(
            title: "${jobForm.title}",
            description: "${jobForm.description}",
            category: "${jobForm.category}",
            jd_link: "${jobForm.jd_link}",
            companyId: "${companyId}"
          ) {
            id
          }
        }
      `)

      alert("Job submitted to Placement Cell for approval!")

      setJobForm({
        title: "",
        description: "",
        category: "",
        jd_link: ""
      })

      fetchCompanyJobs()
    } catch (err) {
      alert("Error creating job")
    }
  }

  /* =========================
        UPDATE STATUS
  ========================= */

  const updateStatus = async (applicationId, status) => {
    try {
      await graphql(`
        mutation {
          updateApplicationStatus(
            applicationId: "${applicationId}",
            status: "${status}"
          ) {
            id
          }
        }
      `)

      if (selectedJob) {
        fetchApplicants(selectedJob.id, selectedJob.title)
      }
    } catch (err) {
      alert("Error updating status")
    }
  }

  /* =========================
        INTERVIEW MODAL
  ========================= */

  const openScheduleModal = (appId, jobId, jobTitle) => {
    setModalData({ appId, date: "", time: "", link: "" })
    setSelectedJob({ id: jobId, title: jobTitle })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const submitSchedule = async () => {
    if (!modalData.date || !modalData.time || !modalData.link) {
      alert("Please fill in all details.")
      return
    }

    try {
      const formattedDateTime = new Date(
        `${modalData.date}T${modalData.time}`
      ).toISOString()

      await graphql(`
        mutation {
          scheduleInterview(
            applicationId: "${modalData.appId}",
            interview_date: "${formattedDateTime}",
            meeting_link: "${modalData.link}"
          ) {
            id
          }
        }
      `)

      alert("Interview scheduled!")
      closeModal()

      if (selectedJob) {
        fetchApplicants(selectedJob.id, selectedJob.title)
      }
    } catch (err) {
      alert("Error scheduling interview")
    }
  }

  /* =========================
        LOGOUT
  ========================= */

  const logout = () => {
    localStorage.clear()
    navigate("/login")
  }

  /* =========================
        STATUS COLORS
  ========================= */

  const getStatusColor = (status) =>
    status === "Approved" ? "#28a745" : "#ffc107"

  const getApplicantStatusColor = (status) => {
    const colors = {
      Pending: "#6c757d",
      Shortlisted: "#17a2b8",
      Interviewing: "#0d6efd",
      Hired: "#28a745",
      Rejected: "#dc3545"
    }

    return colors[status] || "#6c757d"
  }

  return (
    <div>
      {/* Your existing JSX UI can stay here */}
    </div>
  )
}