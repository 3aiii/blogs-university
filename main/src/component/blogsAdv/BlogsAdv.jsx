import BlogAdv from '../blogAdv/BlogAdv'
import './BlogsAdv.css'

export default function BlogsAdv({post}) {
  return (
    <div className='BlogsAdv'>
        {
          post.map((e)=>(
              e.project_status === 'Pending' && (
                <BlogAdv posts = {e} key={e.project_id}/>
              )
          ))
        }
    </div>
  )
}
