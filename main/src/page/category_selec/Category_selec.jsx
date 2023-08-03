import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Category_selec.css'
import axios from 'axios'
import Topbar from '../../component/topbar/Topbar'
import Sidebar from '../../component/sidebar/Sidebar'
import Categorys from '../../component/category/Categorys'

export default function Category_selec() {
    const [catid ,setCatid] = useState([])
    const locationCategory = useLocation().pathname.split('/')[2]

    useEffect(()=>{
        const fetchCatgory = async ()=>{ 
          const res = await axios.get(`http://localhost:5000/api/Category/cat/${locationCategory}`)
          setCatid(res.data);
        }
        fetchCatgory()
    },[locationCategory])
    
    return (
        <>
            <Topbar/>
            <div className='Main-Category'>      
                <Sidebar/>
                <Categorys Categorys = {catid}/>
            </div>
        </>
    )
}
