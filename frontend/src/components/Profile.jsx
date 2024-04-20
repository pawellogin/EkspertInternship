import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService'

function Profile() {
    const currentUser = AuthService.getCurrentUser();
    const currentUserRole = AuthService.getCurrentUserRole();
    let navigate = useNavigate();

    if(!currentUser) {
        navigate('/login');
    }

    const test = () => {
        console.log(currentUserRole);
    }





  return (
    <section className='profilePage'>
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

    // <div className='profile-page d-flex justify-content-center '>
    //     <div>
    //         <h1 className='justify-content-center'>Profile</h1>
    //         <div>Username: {currentUser.username}</div>

    //         <div>
    //             Token:{" "}
    //             {currentUser.token.substr(0, 10)}...{" "}
    //             {currentUser.token.substr(currentUser.token.length - 10)}
    //         </div>

    //         <div>
    //             Roles: {currentUserRole}
    //             {
    //                 <ul className='list-group'>
    //                 </ul>
    //             }
    //         </div>
    //         <button onClick={getRoles}></button>
    //     </div>

    // </div>
  )
}

export default Profile