import { useContext, useRef } from 'react'
import './Login.css'
import { Context } from '../../Context/Context'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Login() {
    const userRef = useRef()
    const passwordRef = useRef()
    const TextFail = [
        'username และ password ไม่ถูกต้อง,<br>โปรดตรวจสอบอีกครั้ง !',
        'โปรดกรอก username !',
        'โปรดกรอก password !',
        'โปรดกรอก username และ password !'
    ]
    
    const {dispatch } = useContext(Context)

    // LOGIN LOGIC
    const handleSubmit = async (e) =>{
        const getItemFail = document.getElementById('fail-text')
        
        e.preventDefault()
        dispatch({type : "LOGIN_START"})

        try {
            const res = await axios.post("http://localhost:5000/api/Auth", {
                user_email : userRef.current.value,
                user_password : passwordRef.current.value
            })

            if (res){
                await Swal.fire({
                    title: 'ยินดีต้อนรับ!',
                    text : `คุณ ${res.data[0].user_fullname}`,
                    icon: 'success',    
                    timer: 1200,
                    timerProgressBar: true, 
                    showConfirmButton : false
                })

                dispatch({type : "LOGIN_SUCCESS", payload : res.data})
            }
        } catch (error) {
            // Auth login res to uesr 
            const userValue = userRef.current.value
            const passwordValue = passwordRef.current.value
            const getItemFailText  = 
                !userValue && !passwordValue ? TextFail[3] :
                !userValue ? TextFail[1] :
                !passwordValue ? TextFail[2] : 
                TextFail[0]

            getItemFail.classList.replace('hide','active')
            getItemFail.innerHTML = getItemFailText

            dispatch({type : "LOGIN_FAILURE"})
        }
    }

    return (
    <div className='login'>
        <div className='login-box'>
            <form onSubmit={handleSubmit}>
                <h1>LOGIN</h1>
                <input 
                    type='text'
                    placeholder='USERNAME'
                    className='login-user'
                    ref={userRef}
                />
                <input 
                    type='password'
                    placeholder='PASSWORD'
                    className='login-password'
                    ref={passwordRef}
                />
                <button type='submit' className='btn-login'>ยืนยัน</button>            
                <p className='login-p-fail hide' id='fail-text'></p>
            </form>
        </div>
    </div>
    )
}