import './HomeAdv.css'
import TopbarAdv from '../../component/topbarAdv/TopbarAdv'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import BlogsAdv from '../../component/blogsAdv/BlogsAdv'
import { Context } from '../../Context/Context'
import './HomeAdv.css'

export default function HomeAdv() {
  const [post,setPost] = useState([])
  const {user} = useContext(Context)
  const advpost = user[0].tea_adv_id
  const FetchData = async () =>{
    const res = await axios.get(`http://localhost:5000/api/Post?advpost=${advpost}`)
    setPost(res.data.data)
  }
  
  useEffect(()=>{
    FetchData()
  },[])
  
  return (
    <>
      <TopbarAdv/>
      <div className='HomeAdv'>
          {
            post.length === 0 ? (
              <div className='h1-container-adv'>
                <h1 className='h1-empty-data-adv'> This page has no data available. </h1>
              </div>          
            ) : (
                <BlogsAdv post ={post}/>         
              )
          }
      </div>
    </>
  )
}
