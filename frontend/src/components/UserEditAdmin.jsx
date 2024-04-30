import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react';
import UserService from '../services/UserService';
import '../styles/UserEditAdmin.css'


function UserEditAdmin() {
    const navigate = useNavigate();

    const { userId } = useParams();
    const [user, setUser] = useState(null);

    const [username, setUsername] = useState('');
    const [userRole, setUserRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [isUserUpdated, setIsUserUpdated] = useState(false);
    const [errorMassage, setErrorMassage] = useState('');
    const [showDeleteConfirmationAlert, setShowDeleteConfirmationAlert] = useState(false);

    const fetchData = async () => {
        try{
            const response = await UserService.getUser(userId);
            // console.log("fetched user: ", response.data);
            setUser(response.data);
        }catch(error){
            console.error("Error fetching user :", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.patchUser(
                userId,
                username,
                firstName,
                lastName,
                userRole,
            );
            setIsUserUpdated(true);
            setTimeout(() => {
                setIsUserUpdated(false);
            }, 1000);
        } catch (error) {
            if (error.response?.status === 409) {
                setErrorMassage('User already exists in the database!');
                setTimeout(() => {
                    setErrorMassage('');
                }, 1500);
            }
            console.error('Error while submitting user:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try{
            UserService.deleteUser(userId).then(() =>
                fetchData());

            setShowDeleteConfirmationAlert(true);
            setTimeout(() => {
                setShowDeleteConfirmationAlert(false);
                navigate('/manageUsers');
            },1000)
        }catch(error){
            console.error("Error while deleting user: ", error);
        }
    }

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setUserRole(user.userRole);
            setFirstName(user.firstName);
            setLastName(user.lastName);
        }
    }, [user]);

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <section className="user-edit-admin">
            <h2>User Page</h2>
            <div className="container">
                <form onSubmit={handleSubmit} className="user-edit-admin-form">
                    <div className="card user-edit-admin-form-main">
                        <div className="card-body user-edit-admin-form-inputs">
                            <label htmlFor="username">Username:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className='form-control user-edit-admin-input'
                            />
                            <label htmlFor="use rRole">Role:</label>
                            <input
                                type="text"
                                id="userRole"
                                value={userRole}
                                onChange={(e) => setUserRole(e.target.value)}
                                className='form-control user-edit-admin-input'
                            />
                            <label htmlFor="firstName">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className='form-control user-edit-admin-input'
                            />
                            <label htmlFor="lastName">Last Name:</label>
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className='form-control user-edit-admin-input'
                            />
                        </div>
                        <div className="user-edit-admin-form-buttons">
                            {isUserUpdated ? (
                                <button className="btn btn-secondary user-edit-admin-user-saved">Saved!</button>
                            ) : (
                                <button className="btn btn-secondary user-edit-admin-save" type="submit">Save</button>
                            )}
                            <button 
                                onClick={(e) => handleDeleteUser(userId)} 
                                to="/manageUsers" 
                                className="btn btn-danger user-edit-admin-delete" 
                                >
                                    Delete User
                            </button>
                        </div>
                    </div>
                </form>
                {showDeleteConfirmationAlert && (
                    <div className="alert alert-success user-edit-admin-alert user-edit-admin-alert-deleted">User deleted from database!</div>
                )}
                {errorMassage && (
                    <div className="alert alert-danger user-edit-admin-alert user-edit-admin-alert-conflict">
                        {errorMassage}
                    </div>
                )}  
            </div>
        </section>
  )
}

export default UserEditAdmin