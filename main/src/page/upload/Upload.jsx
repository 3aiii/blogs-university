import Sidebar from '../../component/sidebar/Sidebar'
import TopbarBack from '../../component/topbar-back/TopbarBack'
import Create from '../../component/create/Create'
import './Upload.css'

export default function Upload() {
  return (
    <>
      <TopbarBack/>
      <div className='upload'>
          <Sidebar/>
          <Create/>
      </div>
    </>
  )
}
