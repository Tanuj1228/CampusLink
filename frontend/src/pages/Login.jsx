// import { useState } from 'react'
// import { useAuth } from '../hooks/useAuth'
// import { Link, useNavigate } from 'react-router-dom'

// export default function Login() {
//   const [selectedRole, setSelectedRole] = useState('student')
//   const { login } = useAuth()
//   const navigate = useNavigate()

//   const handleLogin = async () => {
//     const email = document.getElementById('email').value
//     const password = document.getElementById('password').value
    
//     try {
//       await login(selectedRole, { email, password })
//       // Navigation handled by useAuth context
//     } catch (error) {
//       alert(error.message || error.error)
//     }
//   }

//   return (
//     <>
//       <nav className="navbar">
//         <Link to="/" className="logo">CampusLink</Link>
//         <div className="nav-links">
//           <Link to="/">Home</Link>
//           <Link to="/register" className="btn-outline">Sign Up</Link>
//         </div>
//       </nav>

//       <div className="form-container">
//         <h2>Login to Your Account</h2>
//         <div className="role-toggle">
//           <button 
//             className={`role-btn ${selectedRole === 'student' ? 'active' : ''}`} 
//             id="btn-student" 
//             onClick={() => setSelectedRole('student')}
//           >
//             Student
//           </button>
//           <button 
//             className={`role-btn ${selectedRole === 'company' ? 'active' : ''}`} 
//             id="btn-company" 
//             onClick={() => setSelectedRole('company')}
//           >
//             Company
//           </button>
//           <button 
//             className={`role-btn ${selectedRole === 'admin' ? 'active' : ''}`} 
//             id="btn-admin" 
//             onClick={() => setSelectedRole('admin')}
//           >
//             Admin
//           </button>
//         </div>

//         <input id="email" type="email" placeholder="Email Address" required />
//         <input id="password" type="password" placeholder="Password" required />
//         <button className="btn-primary" style={{width: '100%'}} onClick={handleLogin}>
//           Login
//         </button>
//         <p style={{textAlign: 'center', marginTop: '15px', fontSize: '14px'}}>
//           Don't have an account? <Link to="/register">Sign up</Link>
//         </p>
//       </div>
//     </>
//   )
// }


import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

export default function Login() {

  const [selectedRole, setSelectedRole] = useState("student")
  const { login } = useAuth()

  const handleLogin = async () => {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {

      await login(selectedRole, { email, password })

    } catch (error) {

      alert(error.message)

    }
  }

  return (
    <div className="form-container">

      <h2>Login</h2>

      <div className="role-toggle">

        <button
          className={selectedRole === "student" ? "active" : ""}
          onClick={() => setSelectedRole("student")}
        >
          Student
        </button>

        <button
          className={selectedRole === "company" ? "active" : ""}
          onClick={() => setSelectedRole("company")}
        >
          Company
        </button>

        <button
          className={selectedRole === "admin" ? "active" : ""}
          onClick={() => setSelectedRole("admin")}
        >
          Admin
        </button>

      </div>

      <input id="email" type="email" placeholder="Email" />
      <input id="password" type="password" placeholder="Password" />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>

    </div>
  )
}