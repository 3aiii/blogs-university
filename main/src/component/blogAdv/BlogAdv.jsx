import './BlogAdv.css'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
  
const PF = "http://localhost:5000/img/"

export async function HandleApprove(posts) {
    const postData = {
      proId: posts.project_id
    };
  
    await Swal.fire({
      title: 'คุณต้องการเผยแผร่ project นี้หรือไม่!',
      text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
      icon: 'question',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
      showCancelButton: true,
      preConfirm: async () => {
        await axios.put('http://localhost:5000/api/Post/approve', postData);
        await Swal.fire({
          title: 'ได้เผยแผร่ Project เสร็จสิ้น',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          showCancelButton: false,
          timer: 1200
        });
        window.location.replace('/HomeAdv');
      }
    });
  }
  
  export async function HandleReject(posts) {
    const postData = {
      proId: posts.project_id
    };
  
    await Swal.fire({
      title: 'คุณต้องการให้แก้ project นี้หรือไม่!',
      text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
      icon: 'question',
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
      showCancelButton: true,
      preConfirm: async () => {
        await axios.put('http://localhost:5000/api/Post/reject', postData);
        await Swal.fire({
          title: 'ได้ reject Project เสร็จสิ้น',
          icon: 'success',
          confirmButtonText: 'ตกลง',
          showCancelButton: false,
          timer: 1200
        });
        window.location.replace('/HomeAdv');
      }
    });
  }
  

export default function BlogAdv({posts}) {

    const postData = {
        proId : posts.project_id
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
    
    return (
        <>
            <div className='BlogAdv' key={posts.project_id}>
                {
                    posts.project_img_filename && (
                        <img 
                            src={ PF + posts.project_img_filename } 
                            alt=''
                        />
                    )          
                }
                <div className='blog-box'>
                    <Link to={`/siglePostAdv/${posts.project_id}`} className='link-blog'>
                        <span className='projectTitleADV'>
                            {posts.project_name}
                        </span>
                    </Link>
                    <p className='blog-desc'>
                        {posts.project_description}
                    </p>
                    <p className='blogdate'> {new Date(posts.project_date).toDateString()}</p>
                </div>
                <div className='container-button'>
                    <button className="approve-button" onClick={HandleApprove}>Approve</button>
                    <button className="reject-button" onClick={HandleReject}>Reject</button>
                </div>
            </div>
        </>
    )
}

