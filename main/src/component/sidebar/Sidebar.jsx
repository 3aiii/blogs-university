import { useEffect, useState } from 'react'
import './Sidebar.css'
import axios from "axios"
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

export default function Sidebar() {
    const [cat,setCat] = useState([])

    useEffect(()=>{
        const fetchCat = async ()=>{
            const res = await axios.get('http://localhost:5000/api/Category')
            setCat(res.data)
        }
        fetchCat()
    },[])

    return (
        <div className='sidebar'>
            <div className='sidebar-Item'>
                <h2>CATEGORY</h2>
                <ul>
                    {   
                        cat.map((e)=> (
                            <Link 
                                className='link' 
                                to={"/cat/"+e.cat_id}
                                key={e.cat_id}
                            >
                                <i class="IconCategory fa-solid fa-angle-right"></i>{e.cat_name}
                        </Link>))
                    }
                </ul>
            </div>
            <div className='sidebar-Item'>
                <h2> ABOUT FACULTY</h2>
                <img src='https://upload.wikimedia.org/wikipedia/th/thumb/0/0b/Logo-Scienc%2CTechnology_Suan_Dusit.png/200px-Logo-Scienc%2CTechnology_Suan_Dusit.png' alt=''/>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>
            <div className='sidebar-Item'>
                <h2>FOLLOWS</h2>
                <div className='link'>
                    <a href='https://www.facebook.com/dusit.ac.th' target='_blank'><i class="IconLink fa-brands fa-facebook"></i>FACEBOOK</a>
                    <a href='https://www.dusit.ac.th/home/' target='_blank'><i class="IconLink fa-solid fa-house"></i>WEBSIDE</a>
                </div>
            </div>
        </div>
    )
}
