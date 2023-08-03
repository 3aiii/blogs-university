import React from 'react'
import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';


export default function TopbarAdv() {
    const {user,dispatch} = useContext(Context)  

    const handleLogout = async () =>{
      await Swal.fire({
        title: 'คุณต้องการจะออกจากระบบหรือไม่?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ออกจากระบบ',
        confirmButtonColor: '#d33',
        cancelButtonText: 'ยกเลิก',
        preConfirm: () =>{
          dispatch({type : "LOGOUT"})
        }
      })
    }

    return (
      <div className='Topbar' >
        <Link to='/HomeAdv'>
          <img src='https://rimu.dusit.ac.th/upload/logo1.png' alt=''/>
        </Link>
        <div className='Topbar-action-box'>
          <p>Welcome <b>{user[0].tea_adva_fullname}</b></p>
          <a onClick={handleLogout} className='btn-logout'>Logout</a>
        </div>
      </div>
    )
}
