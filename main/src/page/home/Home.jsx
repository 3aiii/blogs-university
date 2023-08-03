import './Home.css'
import Header from '../../component/header/Header'
import Topbar from '../../component/topbar/Topbar'
import Blogs from '../../component/blogs/Blogs'
import Sidebar from '../../component/sidebar/Sidebar'
import axios from "axios"
import { useEffect, useState } from 'react'

export default function Home() {
  const [allPost,setAllPost] = useState([])
  const [post,setPost] = useState([])
  const [loading, setLoading] = useState(false)
  const [search,setSearch] = useState('')
  const [currentPage,setCurrentPage] = useState(1)
  const [postPerPage,setPostPerPage] = useState(9)
  
  const indexofLastPost = currentPage * postPerPage
  const indexofFirstPost = indexofLastPost - postPerPage

  const fetchPost = async (page)=>{
    setLoading(true)
    let url = `http://localhost:5000/api/Post?`
    
    if (search){
      const pageinate = document.getElementById('pagination') 
      pageinate.classList.replace('active','hide')
      url += `&search=${search}`
    }

    if(page){
      url += `&page=${page}`
    }

    const res = await axios.get(url)
    setPost(res.data.data)
    setLoading(false)
  }
  // ALL DATA
  const fetchAllPost = async () =>{
    const res = await axios.get('http://localhost:5000/api/Post/allpost')
    setAllPost(res.data.data)
    setLoading(false)
  }

  // PAGEINATE 
  const paginate = (pagenum)=>{
    setCurrentPage(pagenum)
    fetchPost()
  }
  
  // SEARCH DATA 
  const onSearchSubmit = (e) =>{
    e.preventDefault()
    fetchPost()
  }
  
  useEffect(()=>{
    fetchPost(currentPage)
    fetchAllPost()
  },[currentPage])

  console.log(post);
  return (
    <>
      <div className='main-home'>
        <Topbar/>
        <Header/>
        <div className='container-search'>
          <form onSubmit={onSearchSubmit}>
            <input 
              type='text' 
              className='input-search'
              placeholder='Search...'
              value={search}  
              onChange={(e)=> setSearch(e.target.value)}
            />
            <button className='btn-search' type='submit' ><i class="IconSearch fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>      
      </div>
      <div className='home' id='blog'>      
        <Sidebar/>
        {
          post.length === 0 ? (
            <div className='h1-container'>
              <h1 className='h1-empty-data'> This page has no data available. </h1>
            </div>          
          ) : ( 
            <Blogs post ={post}/>
          )
        }
      </div>
      <div className='pagination active' id='pagination'>
        {
          post.length <= 9 && (                
            Array.from({ length: Math.ceil(allPost.length / postPerPage) }).map((item, index) => (
            <span
              key={index}
              onClick={() => {
                paginate(index + 1);
              }}            
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </span>
          )))
        }
      </div>
    </>
  )
}
