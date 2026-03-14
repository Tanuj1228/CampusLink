import { Link } from 'react-router-dom'

export default function Navbar() {
  const userType = localStorage.getItem('userType')
  
  return (
    <nav className="navbar"> {/* Your existing navbar CSS */}
      <Link to="/" className="navbar-brand">CampusLink</Link>
      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        
        {userType === 'student' && (
          <>
            <Link to="/student-dashboard">Dashboard</Link>
            <Link to="/student-profile">Profile</Link>
            <Link to="/company-reviews">Reviews</Link>
          </>
        )}
        
        {userType === 'company' && (
          <>
            <Link to="/company">Dashboard</Link>
          </>
        )}
        
        {userType === 'admin' && (
          <Link to="/admin">Admin</Link>
        )}
        
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  )
}
