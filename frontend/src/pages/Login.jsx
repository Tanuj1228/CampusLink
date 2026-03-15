

// import { useState } from 'react'
// import { useAuth } from '../hooks/useAuth'
// import { Link } from 'react-router-dom'

// export default function Login() {

//   const [selectedRole, setSelectedRole] = useState("student")
//   const { login } = useAuth()

//   const handleLogin = async () => {

//     const email = document.getElementById("email").value
//     const password = document.getElementById("password").value

//     try {

//       await login(selectedRole, { email, password })

//     } catch (error) {

//       alert(error.message)

//     }
//   }

//   return (
//     <div className="form-container">

//       <h2>Login</h2>

//       <div className="role-toggle">

//         <button
//           className={selectedRole === "student" ? "active" : ""}
//           onClick={() => setSelectedRole("student")}
//         >
//           Student
//         </button>

//         <button
//           className={selectedRole === "company" ? "active" : ""}
//           onClick={() => setSelectedRole("company")}
//         >
//           Company
//         </button>

//         <button
//           className={selectedRole === "admin" ? "active" : ""}
//           onClick={() => setSelectedRole("admin")}
//         >
//           Admin
//         </button>

//       </div>

//       <input id="email" type="email" placeholder="Email" />
//       <input id="password" type="password" placeholder="Password" />

//       <button onClick={handleLogin}>
//         Login
//       </button>

//       <p>
//         Don't have an account? <Link to="/register">Register</Link>
//       </p>

//     </div>
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
    <div className="login-page">

      <div className="login-box">

        <h2 className="login-title">
          Welcome Back
        </h2>

        <p className="login-subtitle">
          Sign in to continue to your CampusLink dashboard
        </p>

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

        <input
          id="email"
          type="email"
          placeholder="Enter your email"
        />

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
        />

        <button
          className="btn-primary login-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="login-register">
          Don’t have an account?{" "}
          <Link to="/register">
            Create one
          </Link>
        </p>

      </div>

    </div>
  )
}