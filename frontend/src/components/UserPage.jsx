import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import UserService from '../services/UserService';


function UserPageEdit() {
    
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        try{
            const response = await UserService.getUser(userId);
            // console.log("fetched user: ", response.data);
            setUser(response.data);
        }catch(error){
            console.error("Error fetching user :", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <section>
    <h2>User Page</h2>

    <div className='container'>
        <div className='card-columns'>
            {user && (
                <div className="card">
                    <div className='card-body'>
                        <h5 className="card-title">{user.username}</h5>
                        <p className="card-text">Role: {user.userRole}</p>
                        <p className="card-text">First Name: {user.firstName}</p>
                        <p className="card-text">Last Name: {user.lastName}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
</section>
  )
}

export default UserPageEdit