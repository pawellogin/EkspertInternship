import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import AuthHeader from '../services/AuthHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const UsersPage = () => {

    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 3;

    const fetchData = async () => {
        try{
            const response = await UserService.getUsersPage(currentPage - 1, usersPerPage);
            setUsers(response.data.content);
            // console.log(users);
        }catch(error){
            console.error("Error fetching users: ",error);
        }
    };

    const changeToPreviousPage = () => {
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }

    const changeToNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const changeToPageOne = () => {
        setCurrentPage(1);
    }

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <section>
            <h2>Users Page</h2>
            <div className='user-edit-container'>
                <Link type="button" className="btn btn-secondary" to="TODO">Add New User</Link>
            </div>

            <div className='container'>
                <div className='card-columns UsersPage-cards-container '>
                {users && users.map(user => (
                        <Link to={`${user.id}`} key={user.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">{user.username}</h5>
                                <p className="card-text">Role: {user.userRole}</p>
                                <p className="card-text">First Name: {user.firstName}</p>
                                <p className="card-text">last Name: {user.lastName}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="btn-container">
                        <button type="button" className="btn btn-secondary" onClick={changeToPreviousPage}><FontAwesomeIcon icon={faArrowLeft} /></button>
                        <div className='current-page-number btn btn-secondary' onClick={changeToPageOne}>{currentPage}</div> 
                        <button type="button" className="btn btn-secondary" onClick={changeToNextPage}><FontAwesomeIcon icon={faArrowRight} /></button>                
                    </div>
            </div>

        </section>
    );
};

export default UsersPage