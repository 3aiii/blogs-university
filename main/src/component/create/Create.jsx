import { useContext, useState } from 'react'
import './Create.css'
import axios from 'axios'
import { Context } from '../../Context/Context'
import Swal from 'sweetalert2'

export default function Create() {
  const [project_name,setTitle] = useState('')
  const [project_description,setDesc] = useState('')
  const [cat_id,setBranch] = useState('')
  const [project_img_filename,setfile_img] = useState(null)
  const [project_pdf_filename,setfile_pdf] = useState(null)
  const {user} = useContext(Context)

  // Auth PDF file
  const handleFileChange = (e) =>{
    const file = e.target.files[0]
    
    if(file){
      const allowedPDF = /(\.pdf)$/i
      if(!allowedPDF.exec(file.name)){
        e.target.value = ''
        return ;
      }
      setfile_pdf(e.target.files[0])
    }
  }
  
  // Auth Img file
  const handleImgChange = (e) =>{
    const file = e.target.files[0]
    console.log(file);
    
    if(file){
      const allowedImg = /(\.png|jpg)$/i
      if(!allowedImg.exec(file.name)){
        e.target.value = ''
        return ;
      }
      setfile_img(e.target.files[0])
    }
  }
  
  const HandleSubmit = async(e)=>{     
    e.preventDefault()

    if(!cat_id){
      const fail_cat = document.getElementById('failText')
      fail_cat.classList.replace('hide','active')
      
    } else{
      const data = new FormData()
      data.append('user_id',user[0].user_id)
      data.append('project_name',project_name)
      data.append('project_description',project_description)
      data.append('project_img_filename',project_img_filename)
      data.append('project_pdf_filename',project_pdf_filename)
      data.append('cat_id',cat_id)

      if(data){
        await Swal.fire({
          title: 'คุณต้องการบันทึกหรือไม่!',
          text: 'กรุณาตรวจสอบข้อมูลอีกครั้งก่อนกดปุ่มตกลง',
          icon: 'question',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก',
          showCancelButton : true,
          preConfirm: async ()=>{
            try {
              const res = await axios.post('http://localhost:5000/api/Post/create',data,{
                headers : {
                  "Content-Type": "multipart/form-data",
                }
              })
              await Swal.fire({
                title: 'บันทึก Project เสร็จสิ้น',
                text: 'ทุกคนจะเห็น project ของคุณได้ก็ต่อเมื่ออาจารย์ที่ปรึกษา Approve ให้',
                icon: 'success',
                confirmButtonText: 'ตกลง',
                showCancelButton : false,
                timer: 1200
              })
              window.location.replace("http://localhost:3000/")
            } catch (error) {
              console.error("Error:",error)
            }
          }});
      } else{
        Swal.showValidationMessage('โปรดใส่ข้อมูลให้ครบถ้วน !')
      }
    }
  }
  return (
    <div className='create'>
        <div className='create-blog'>
            <form className='form-input' encType='multipart/form-data' onSubmit={HandleSubmit} >
                <h1>กรอกข้อมูล Project</h1>
                <label>ชื่อ Project</label>
                <input type='text' className='btn-input-create' onChange={(e)=> setTitle(e.target.value)} required/>
                <label>สาขาที่ท่านศึกษา</label>
                <select value={cat_id} onChange={(e)=> setBranch(e.target.value)} required>
                    <option value="0">กรุณาเลือก</option>
                    <option value="1">สิ่งแวดล้อมเมืองและอุตสาหกรรม</option>
                    <option value="2">วิทยาศาสตร์เครื่องสำอาง</option>
                    <option value="3">อาชีวอนามัยและความปลอดภัย</option>
                    <option value="4">วิทยาการคอมพิวเตอร์</option>
                    <option value="5">เทคโนโลยีเคมี</option>
                    <option value="6">วิทยาการข้อมูลและการวิเคราะห์</option>
                    <option value="7">วิทยาศาสตร์และเทคโนโลยีสิ่งแวดล้อม</option>
                    <option value="8">คณิตศาสตร์</option>
                    <option value="9">ฟิสิกส์</option>
                    <option value="10">เทคโนโลยีสารสนเทศ</option>
                </select>               
                <p className='p-no-file hide' id='failText'>* กรุณาเลือก สาขาที่ท่านศึกษา !</p>               
                <label htmlFor='fileProject'>File Project</label>
                <input type='file' className='btn-input-create' id='fileProject' onChange={handleFileChange} required />
                {
                  !project_pdf_filename && ( 
                    <p className='p-no-file'>* กรุณาเลือก file ทีเป็น PDF เท่านั้น!</p> 
                  
                  )
                }
                <label htmlFor='fileImg'>รูปปก Project</label>
                <input type='file' className='btn-input-create' id='fileImg' onChange={handleImgChange} required />
                {!project_img_filename && ( <p className='p-no-file'>* กรุณาเลือก file ที่เป็น PNG ,JPG</p> )}
                {
                  project_img_filename && (
                    <img 
                      src={URL.createObjectURL(project_img_filename)} 
                      alt=''
                      className='img-show'
                    />                   
                  )
                }
                <label>คำอธิบาย Project</label>
                <textarea className='btn-input-create' onChange={(e)=> setDesc(e.target.value)} required ></textarea>
                <button id="myButton" type='submit' className='btn-submit'>ยืนยัน</button>
            </form>
        </div>
    </div>
  )
}