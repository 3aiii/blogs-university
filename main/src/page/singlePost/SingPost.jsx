import { useContext, useEffect, useState } from 'react'
import Sidebar from '../../component/sidebar/Sidebar'
import Spost from '../../component/spost/Spost'
import TopbarBack from '../../component/topbar-back/TopbarBack'
import './SingPost.css'
import { Context } from '../../Context/Context'

export default function SingPost() {
  
  return (
    <>
      <TopbarBack/>
      <div className='singlepost'>
        <Sidebar/>
        <Spost/>
      </div>
    </>
  )
}
