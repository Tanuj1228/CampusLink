import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { graphql } from '../services/api'
import { Link } from 'react-router-dom'

export default function Admin() {
  const { user, loading } = useAuth()
  const [analytics, setAnalytics] = useState({})
  const [pendingJobs, setPendingJobs] = useState([])
  const [allJobs, setAllJobs] = useState([])
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '' })

  useEffect(() => {

    if (loading) return
  
    if (!user || user.userType !== "admin") {
      window.location.href = "/login"
      return
    }
  
    fetchAnalytics()
    fetchPendingJobs()
  
  }, [user, loading])


  const fetchAnalytics = async () => {
    const data = await graphql(`query { getAdminAnalytics { totalStudents totalJobs totalApplications totalHired } }`)
    setAnalytics(data.getAdminAnalytics)
  }

  const fetchPendingJobs = async () => {
    const data = await graphql(`query { getPendingJobs { id title companyId category description jd_link } }`)
    setPendingJobs(data.getPendingJobs || [])
  }

  const updateJobStatus = async (jobId, status) => {
    await graphql(`mutation { updateJobStatus(jobId: "${jobId}", status: "${status}") { id } }`)
    fetchPendingJobs()
    fetchAnalytics()
  }

  const handleNoticeSubmit = async (e) => {
    e.preventDefault()
    await graphql(`mutation { createNotice(title: "${noticeForm.title}", content: "${noticeForm.content.replace(/\n/g, '\\n')}") { id } }`)
    alert('Notice broadcasted successfully!')
    setNoticeForm({ title: '', content: '' })
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      <nav className="navbar" style={{backgroundColor: '#343a40'}}>
        <Link to="/" className="logo" style={{color: '#fff'}}>CampusLink Admin</Link>
        <button className="btn-primary" onClick={() => {
  localStorage.clear()
  window.location.href = "/login"
}} style={{background: '#dc3545'}}>
          Exit Admin
        </button>
      </nav>

      <div className="container" style={{flexGrow: 1, maxWidth: '1400px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px'}}>
        <div>
          <h2 style={{color: '#343a40', borderBottom: '2px solid #dee2e6', paddingBottom: '10px'}}>Placement Overview</h2>
          
          <div style={{display: 'flex', gap: '20px', marginBottom: '30px'}}>
            <div style={{flex: 1, background: '#fff', padding: '15px', borderRadius: '8px', borderLeft: '5px solid #0d6efd', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
              <h5 style={{margin: 0, color: '#6c757d'}}>Students</h5>
              <h2 style={{margin: '5px 0 0 0', color: '#343a40'}}>{analytics.totalStudents || 0}</h2>
            </div>
            {/* Repeat for jobs, apps, hired */}
          </div>

          <div style={{marginBottom: '30px'}}>
            <h3 style={{color: '#dc3545'}}>Pending Job Approvals</h3>
            <div style={{display: 'grid', gap: '15px'}}>
              {pendingJobs.length === 0 ? (
                <p style={{color: '#6c757d'}}>No pending jobs for approval.</p>
              ) : (
                pendingJobs.map(job => (
                  <div key={job.id} style={{background: '#fff', border: '1px solid #ffc107', padding: '15px', borderRadius: '8px'}}>
                    <h4 style={{margin: 0}}>{job.title}</h4>
                    <p style={{margin: '5px 0', fontSize: '13px', color: '#6c757d'}}>
                      Category: {job.category} | Company ID: {job.companyId}
                    </p>
                    <p style={{fontSize: '14px'}}>{job.description}</p>
                    <a href={job.jd_link} target="_blank" style={{fontSize: '13px', color: '#0d6efd'}}>
                      View JD Link
                    </a>
                    <div style={{marginTop: '15px', display: 'flex', gap: '10px'}}>
                      <button className="btn-primary" style={{background: '#28a745', padding: '5px 15px'}}
                        onClick={() => updateJobStatus(job.id, 'Approved')}>
                        Approve & Broadcast
                      </button>
                      <button className="btn-primary" style={{background: '#dc3545', padding: '5px 15px'}}
                        onClick={() => updateJobStatus(job.id, 'Rejected')}>
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div>
          <div style={{background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: '20px'}}>
            <h3>Post Campus Notice</h3>
            <form onSubmit={handleNoticeSubmit}>
              <input
                type="text"
                placeholder="Notice Title"
                value={noticeForm.title}
                onChange={(e) => setNoticeForm({...noticeForm, title: e.target.value})}
                required
                style={{width: '100%', marginBottom: '10px'}}
              />
              <textarea
                rows="6"
                placeholder="Write announcement details here..."
                value={noticeForm.content}
                onChange={(e) => setNoticeForm({...noticeForm, content: e.target.value})}
                required
                style={{width: '100%', marginBottom: '10px'}}
              />
              <button type="submit" className="btn-primary" style={{width: '100%'}}>
                Broadcast Notice
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
