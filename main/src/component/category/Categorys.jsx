import './Categorys.css'
import { Link } from 'react-router-dom'

export default function Categorys({Categorys}) {
  const PF = "http://localhost:5000/img/"
  return (
    <div className='Categorys'>
      {
        Categorys.length === 0 && (
          <div className='h1-div'>
            <h1 className='h1-no-data'> This page has no data available. </h1>
          </div>
        )
      }
      {
        Categorys.map(e =>(
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
