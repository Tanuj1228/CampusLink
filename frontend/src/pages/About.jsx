import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      {/* Navbar becomes shared component, not repeated */}
      
      <div className="container" style={{textAlign: 'center', padding: '60px 20px'}}>
        <h2>About SupersetClone</h2>
        <p style={{maxWidth: '800px', margin: '20px auto', color: '#6c757d', lineHeight: '1.6'}}>
          We are dedicated to bridging the gap between academia and industry. Our platform enables 
          universities to automate campus placements and helps companies discover top-tier talent 
          effortlessly. With a powerful matching engine, real-time notifications, and structured 
          job management, SupersetClone is redefining the hiring ecosystem.
        </p>
      </div>

      {/* Footer becomes shared component, not repeated */}
    </>
  )
}
