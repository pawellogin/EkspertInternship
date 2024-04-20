import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import AuthHeader from '../services/AuthHeader';

const ManageUsers = () => {

    const [userPage, setUserPage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData(AuthService.getCurrentUser.token);
    }, []);

    const fetchData = async (token) => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/users", {
                headers: {
                    Authorization: 'Bearer ${token}'
                }
            });


            setUserPage(response.data);
            setLoading(false);
        } catch(error) {
            console.error('Error fetching data: ',error );
        }
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {/* Render userPage data here */}
                    {/* For example, you can map over userPage.content and display user information */}
                    {userPage.content.map(user => (
                        <div key={user.id}>
                            <p>{user.firstName} {user.lastName}</p>
                            {/* Display other user information as needed */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageUsers