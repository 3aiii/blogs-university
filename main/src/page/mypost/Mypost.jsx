import Myposts from '../../component/myposts/Myposts'
import Sidebar from '../../component/sidebar/Sidebar'
import TopbarBack from '../../component/topbar-back/TopbarBack'
import './Mypost.css'

export default function Mypost() {
  return (
    <>
        <TopbarBack/>
        <div className='mypost-container'>
            <Sidebar/>
            <Myposts/>
        </div>
    </>
  )
}
