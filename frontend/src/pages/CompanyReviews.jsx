import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { graphql } from '../services/api'
import { Link } from 'react-router-dom'

export default function CompanyReviews() {
  const { user, loading } = useAuth()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (!user?.userType === 'company') window.location.href = '/login'
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    const data = await graphql(`
      query {
        getCompanyReviews(companyId: "${user.userId}") {
          rating
          comment
          student { name }
        }
      }
    `)
    setReviews(data.getCompanyReviews || [])
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">CampusLink</Link>
        <div className="nav-links">
          <Link to="/company" className="btn-outline">Back to Dashboard</Link>
          <button 
            className="btn-primary" 
            onClick={() => localStorage.clear() || (window.location.href = '/login')} 
            style={{background: '#dc3545'}}
          >
            Logout
          </button>
        </div>
      </nav>
      
      <div className="container">
        <h2 style={{borderBottom: '2px solid #dee2e6', paddingBottom: '10px'}}>
          What Students Are Saying
        </h2>
        <div id="reviews-list" style={{marginTop: '20px', display: 'grid', gap: '15px'}}>
          {reviews.length === 0 ? (
            <p style={{color: '#6c757d'}}>No reviews yet.</p>
          ) : (
            reviews.map(review => (
              <div 
                key={review.id}
                style={{
                  background: '#f8f9fa', 
                  padding: '15px', 
                  borderRadius: '8px', 
                  borderLeft: '4px solid #ffc107'
                }}
              >
                <h4 style={{margin: '0 0 10px 0'}}>
                  {review.student.name} 
                  <span style={{fontWeight: 'normal', marginLeft: '10px'}}>
                    {'⭐'.repeat(review.rating)}
                  </span>
                </h4>
                <p style={{margin: 0, color: '#495057'}}>"{review.comment}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
