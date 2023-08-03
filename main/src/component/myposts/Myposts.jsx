import { useContext, useEffect, useState } from 'react'
import './Myposts.css'
import { Context } from '../../Context/Context'
import axios from "axios"
import { Link } from 'react-router-dom'

export default function Myposts() {
  const {user} = useContext(Context)  
  const Myid = user[0].user_id
  const PF = "http://localhost:5000/img/"
  const [mypost,setMypost] = useState([])

  console.log(mypost);
  useEffect(()=>{
    const FetchMyPost = async() => {
      const res = await axios.get(`http://localhost:5000/api/Post/allpost?mypost=${Myid}`)
      setMypost(res.data.data)
    }
    FetchMyPost()
  },[Myid])
  
  return (
    <div className='Myposts'>
      {
        mypost.length === 0 && (
          <div className='h1-div'>
            <h1 className='h1-no-data'> You don't have any posts of your own. </h1>
          </div>
        )
      }
      {
        mypost.map(e =>(
          <div className='blog-container' key={e.project_id}>
          {
            e.project_img_filename && (
              <img 
                src={ PF + e.project_img_filename } 
                alt=''
              />
            )          
          }
          <div className='blog-box'>
              <Link to={`/siglePost/${e.project_id}`} className='link-blog'>
                <span className='projectTitle'>
                  {e.project_name}
                </span>
              </Link>
              <div className='category-box'>
                  <Link to={`/cat/${e.cat_id}`}>{e.cat_name}</Link>
              </div>
              <p className='blog-desc'>
                {e.project_description}
              </p>
              <p className='blogdate'> {new Date(e.project_date).toDateString()}</p>
            </div>
          </div>          
        ))
      }
    </div>
  )
}
