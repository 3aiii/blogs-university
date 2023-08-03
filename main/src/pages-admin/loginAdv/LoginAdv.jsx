import axios from 'axios'
import { Context } from '../../Context/Context'
import './LoginAdv.css'
import { useContext, useRef } from 'react'
import Swal from 'sweetalert2'

export default function LoginAdv() {
    const TextFail = [
        'username และ password ไม่ถูกต้อง,<br>โปรดตรวจสอบอีกครั้ง !',
        'โปรดกรอก username !',
        'โปรดกรอก password !',
        'โปรดกรอก username และ password !'
    ]

    const userRef = useRef()
    const passRef = useRef()
    const {dispatch} = useContext(Context)
    
    const HandleLoginAdv = async(e) =>{
        const getItemFail = document.getElementById('fail-text-adv')
        
        e.preventDefault()
        dispatch({type : "LOGIN_START"})
        try {
            const res = await axios.post('http://localhost:5000/api/Auth/Adv',{
                tea_adv_username : userRef.current.value,
                tea_adv_password : passRef.current.value
            })
            
            if(res){
                await Swal.fire({
                    title: 'ยินดีต้อนรับ!',
                    text : `คุณ ${res.data[0].tea_adva_fullname}`,
                    icon: 'success',    
                    timer: 1200,
                    timerProgressBar: true, 
                    showConfirmButton : false
                })
                dispatch({type : "LOGIN_SUCCESS",payload : res.data})
            }
           
        } catch (error) {
            const userValue = userRef.current.value
            const passValue = passRef.current.value
            const getItemFailText  = 
                !userValue && !passValue ? TextFail[3] :
                !userValue ? TextFail[1] :
                !passValue ? TextFail[2] : 
                TextFail[0]

            getItemFail.classList.replace('hide','active')
            getItemFail.innerHTML = getItemFailText

            dispatch({type : "LOGIN_FAILURE"})
        }
    }

    return (
    <div className='LoginAdv'>
        <div className='LoginAdv-box'>
            <form onSubmit={HandleLoginAdv}>
                <h1>LOGIN ADV</h1>
                <input 
                    type='text'
                    placeholder='USERNAME'
                    className='LoginAdv-user'
                    ref = { userRef }
                />
                <input 
                    type='password'
                    placeholder='PASSWORD'
                    className='LoginAdv-password'
                    ref = { passRef }

                />
                <button type='submit' className='btn-login'>ยืนยัน</button>            
                <p className='LoginAdv-p-fail hide' id='fail-text-adv'></p>
            </form>
        </div>
    </div>
    )
}