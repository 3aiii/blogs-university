import { useLocation } from 'react-router-dom'
import './Spost.css'
import { useState ,useEffect} from 'react'
import axios from 'axios'

export default function Spost() {
    const location = useLocation().pathname.split('/')[2]
    const [singalPost,setSinglPost] = useState({})
    const PF = "http://localhost:5000/img/"
    
    const handleDownload = ()=>{
        axios.get(`http://localhost:5000/api/Post/PDF/${location}`,{
            responseType : 'blob'
        })
        .then((res) =>{
            const blob = new Blob([res.data],{type : 'application/pdf'})
            
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${singalPost.project_pdf_filename}`
            link.click()
            
            URL.revokeObjectURL(url)
        }).catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>{
      const fetchSinglePost = async ()=>{ 
        const res = await axios.get(`http://localhost:5000/api/Post/${location}`)
        setSinglPost(res.data.data[0]);
      }
      fetchSinglePost()
    //   console.log(singalPost);
    },[location])

    return (        
        <div className='spost'>
            <div className='main-spost'>
                <div className='topic-spost'>
                    {   
                        singalPost.project_img_filename && (
                            <img 
                                src= {`${PF}${singalPost.project_img_filename}`} 
                                alt='' 
                            />
                        )
                    }
                    <div className='Box-desc'>
                        <h4><b>Author : </b><span>{singalPost.user_fullname}</span></h4>
                        <p><b>Published : </b><span>{new Date(singalPost.project_date).toDateString()}</span></p>
                        <button onClick={handleDownload} className='btn-download'> Download File PDF </button>
                    </div>
                </div>
                <div className='topic-spost'>
                    <h1>{singalPost.project_name}</h1>
                    <p className='topic-desc'>
                        {singalPost.project_description}
                    </p>
                </div>
            </div>
        </div>
    )
}
