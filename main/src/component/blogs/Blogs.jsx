import Blog from '../blog/Blog'
import './Blogs.css'

export default function Blogs({post}) {
    return (
      <div className='blogs'>
        {
          post.map(p=>(
              p.project_status === 'Active' && (
                <Blog post={p} key={p.project_id}/>
              )           
          ))
        }
      </div>
  )
}