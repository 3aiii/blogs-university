import React from 'react'
import SpostAdv from '../../component/spostadv/SpostAdv'
import TopbarBackadv from '../../component/topbar-backadv/TopbarBackadv'

export default function SingalAdv() {
  return (
    <>
        <TopbarBackadv/>
        <div className='SingalAdv'>
          <SpostAdv/>
        </div>
    </>
  )
}
