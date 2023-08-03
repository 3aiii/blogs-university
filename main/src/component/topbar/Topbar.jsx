import { useContext } from 'react';
import './Topbar.css'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';

export default function Topbar() {
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
    <div className='Topbar'>
      <Link to='/'>
        <img src='https://rimu.dusit.ac.th/upload/logo1.png' alt=''/>
      </Link>
      <div className='Topbar-action-box'>
        <p>Welcome <b>{user[0].user_fullname}</b></p>
        <Link to='/Mypost' className='btn-mypost'>My Post</Link>      
        <Link to='/upload' className='btn-upload'>Upload</Link>
        <a onClick={handleLogout} className='btn-logout'>Logout</a>
      </div>
    </div>
  )
}