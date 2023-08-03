import './Blog.css'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

const PF = "http://localhost:5000/img/"

export default function Blog({post}) {

  return (
    <div className='blog-container' key={post.project_id}>
      {
        post.project_img_filename && (
          <img 
            src={ PF + post.project_img_filename } 
            alt=''
          />
        )          
      }
      <div className='blog-box'>
          <Link to={`/siglePost/${post.project_id}`} className='link-blog'>
            <span className='projectTitle'>
              {post.project_name}
            </span>
          </Link>
          <div className='category-box'>
              <Link to={`/cat/${post.cat_id}`}>{post.cat_name}</Link>
          </div>
          <p className='blog-desc'>
            {post.project_description}
          </p>
          <p className='blogdate'> {new Date(post.project_date).toDateString()}</p>
      </div>
    </div>
  )
}