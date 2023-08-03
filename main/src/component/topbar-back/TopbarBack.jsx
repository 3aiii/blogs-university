import { useContext } from 'react';
import './TopbarBack.css'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Context } from '../../Context/Context';


export default function TopbarBack() {
  const {user} = useContext(Context)  

    return (
      <div className='TopbarBack'>
        <Link to='/'>
          <img src='https://rimu.dusit.ac.th/upload/logo1.png' alt=''/>
        </Link>          
        <div className='Topbar-action-box'>
            <p>Welcome <b>{user[0].user_fullname}</b></p>
            <Link to='/' className='btn-back'>Back</Link>
        </div>
      </div>  
    )
  }
  