import React, { useEffect, useState } from 'react'
import UserService from '../services/UserService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSearch  } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles/UsersListAdmin.css'

const UsersPageAdmin = () => {

    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(3);
    const [searchQuery, setSearchQuery] = useState('')

    const fetchDataByPage = async () => {
        try{
            const response = await UserService.getUsersPage(currentPage - 1, usersPerPage);
            setUsers(response.data.content);
        }catch(error){
            console.error("Error fetching users: ",error);
        }
    };

    const fetchDataAllAndFilter = async () => {
        try{
            const response = await UserService.getUsersPage(0,0);
            const allUsers = response.data.content;
            setUsers(allUsers);

            if(searchQuery){
                setUsers(allUsers.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase())));
            }
            
        }catch(error){
            console.error("Error fetch all users with filter: ", error);
        }
    }

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

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleSearchButtonClick = () => {
        if(searchQuery){
            fetchDataAllAndFilter();
        }else {
            fetchDataByPage();
        }
    }

    useEffect(() => {
        fetchDataByPage();
    }, [currentPage, usersPerPage]);

    return (
        <section className='users-page-admin'>
            <h1>Admin Users Page</h1>
            <div className='user-edit-container-buttons'>
                <div>
                    <Link type="button" className="btn btn-secondary" to="/register">Add New User</Link>
                </div>
            
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="usersPerPage"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        >
                            Users Per Page
                    </button>
                    <div className="dropdown-menu" aria-labelledby='usersPerPage'>
                        <button className="dropdown-item" type='button' onClick={() => setUsersPerPage(3)}>3</button>
                        <button className="dropdown-item" type='button' onClick={() => setUsersPerPage(5)}>5</button>
                        <button className="dropdown-item" type='button' onClick={() => setUsersPerPage(15)}>15</button>
                    </div>
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button type="button" className="btn btn-secondary" onClick={handleSearchButtonClick}><FontAwesomeIcon icon={faSearch} /></button>
                </div>

            </div>

            <div className='container products-page-admin-containers-items'>
                <div className='card-columns '>
                {users && users.map(user => (
                        <Link to={`${user.id}`} key={user.id} className="card user-page-admin-user">
                            <div className="card-body">
                                <h5 className="card-title">{user.username}</h5>
                                <p className="card-text">Role: {user.userRole}</p>
                                <p className="card-text">First Name: {user.firstName}</p>
                                <p className="card-text">last Name: {user.lastName}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="users-page-admin-navigation">
                        <button type="button" className="btn btn-secondary" onClick={changeToPreviousPage}><FontAwesomeIcon icon={faArrowLeft} /></button>
                        <div className='current-page-number btn btn-secondary' onClick={changeToPageOne}>{currentPage}</div> 
                        <button type="button" className="btn btn-secondary" onClick={changeToNextPage}><FontAwesomeIcon icon={faArrowRight} /></button>                
                    </div>
            </div>

        </section>
    );
};

export default UsersPageAdmin