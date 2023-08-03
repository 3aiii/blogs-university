import React, { useContext } from 'react'
import { Context } from '../../Context/Context'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

export default function TopbarBackadv() {
    const {user} = useContext(Context)

  return (
    <div className='TopbarBack'>
        <Link to='/Homeadv'>
            <img src='https://rimu.dusit.ac.th/upload/logo1.png' alt=''/>
        </Link>          
        <div className='Topbar-action-box'>
            <p>Welcome <b>{user[0].tea_adva_fullname}</b></p>
            <Link to='/Homeadv' className='btn-back'>Back</Link>
        </div>
    </div> 
    )
}
