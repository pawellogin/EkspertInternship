import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'
import '../styles/LoggedUserInformation.css'

function LoggedUserInformation() {
    const currentUser = AuthService.getCurrentUser();
    const currentUserRole = AuthService.getCurrentUserRole();

  return (
    <section className='logged-user-information'>
        <h1>{currentUser.username} Profile</h1>

        <div>Token: 
            {" "}
            {currentUser.token.substr(0, 10)}...{""}
            {currentUser.token.substr(currentUser.token.length - 10)}
        </div>

        <div>
            Role: {currentUserRole}
        </div>
    </section>
  )
}

export default LoggedUserInformation