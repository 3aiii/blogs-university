import { useLocation } from 'react-router-dom'
import './SpostAdv.css'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';

export default function SpostAdv() {
    const location = useLocation().pathname.split('/')[2]
    const [singalPost,setSinglPost] = useState({})
    const PF = "http://localhost:5000/img/"
    // const PDf = "http://localhost:5000/pdf/"

    const postData = {
        proId : singalPost.project_id
    }

    const HandleApprove = async () =>{
        await Swal.fire({
            title: 'คุณต้องการเผยแผร่ project นี้หรือไม่!',
            text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
            icon: 'question',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
            showCancelButton : true,
            preConfirm: async ()=>{
                axios.put('http://localhost:5000/api/Post/approve', postData)
                await Swal.fire({
                    title: 'ได้เผยแผร่ Project เสร็จสิ้น',
                    icon: 'success',
                    confirmButtonText: 'ตกลง',
                    showCancelButton : false,
                    timer: 1200
                })
                window.location.replace('/HomeAdv')
            }
        })
    }   

    const HandleReject = async () =>{
        await Swal.fire({
            title: 'คุณต้องการให้แก้ project นี้หรือไม่!',
            text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
            icon: 'question',
            confirmButtonText: 'ตกลง',
            cancelButtonText: 'ยกเลิก',
            showCancelButton : true,
            preConfirm: async ()=>{
                axios.put('http://localhost:5000/api/Post/reject', postData)
                await Swal.fire({
                    title: 'ได้ reject Project เสร็จสิ้น',
                    icon: 'success',
                    confirmButtonText: 'ตกลง',
                    showCancelButton : false,
                    timer: 1200
                })
                window.location.replace('/HomeAdv')
            }
        })
    }


    // Functin Download PDF 
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
    console.log(singalPost);
    return (
        <div className='SpostAdv'>
            <div className='main-SpostAdv'>
                <div className='topic-SpostAdv'>
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
                        <p><b>Branch : </b>{singalPost.cat_name}</p>
                        <button onClick={handleDownload} className='btn-download'> Download File PDF </button>
                    </div>
                </div>
                <div className='topic-SpostAdv-desc'>
                    <h1>{singalPost.project_name}</h1>
                    <p className='topic-desc'>
                        {singalPost.project_description}
                    </p>
                    <div className='container-button-adv'>
                        <button className="approve-button" onClick={HandleApprove}>Approve</button>
                        <button className="reject-button" onClick={HandleReject}>Reject</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
