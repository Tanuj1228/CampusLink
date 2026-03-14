import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <div className="hero-section">
      <h1>Welcome to the Ultimate Placement Platform</h1>
      <p>Connecting top talent with leading companies. Streamline your campus placements, discover opportunities, and manage applications in one place.</p>
      <div>
        <Link to="/register" className="btn-primary" style={{marginRight: '15px'}}>Get Started</Link>
        <Link to="/login" className="btn-outline">Login to Dashboard</Link>
      </div>
    </div>
  )
}
