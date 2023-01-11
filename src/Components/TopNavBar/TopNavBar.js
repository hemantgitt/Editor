import React from 'react';
import './TopNavBar.css';
import { memo } from 'react';

const TopNavBar = ({ primaryInfo }) => {
    return (

        <div className="navbar-card">
            <div className="nav nav-pills nav-fill">

                <div className="nav-item" id="file">

                    <i className="fa-solid fa-file-lines fa-2x"></i>
                </div>

                <button className="nav-item" id="sample">
                    {primaryInfo.file_name}
                </button>

            </div>
            <div className="profile-section">
                <div id="dana">

                    Hi, {primaryInfo.user_type}

                </div>


                <button className="nav-item" type="button" id="img1" data-bs-toggle="dropdown" aria-expanded="false">
                    {" "}
                    <img
                        src="/Images/blankpic.png"
                        width="40px"
                        height="40px"
                        alt="No img"
                    />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" >Profile</a></li>
                    <li><a className="dropdown-item" > Logout</a></li>


                </ul>


            </div>
        </div>
    )
}

export default memo(TopNavBar)