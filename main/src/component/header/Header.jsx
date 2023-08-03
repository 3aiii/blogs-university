import './Header.css'


export default function Header() {
  return (
    <div className='header'>
      <div className='header-submain'>
        <h2>Lorem Ipsum</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting 
          industry. Lorem Ipsum has been the industry's standard dummy text 
          ever since the 1500s, when an unknown printer took a galley of 
          type and scrambled it to make a type specimen book. It has
        </p>
      </div>
      <div className='header-blog'>
        <div className='header-main'>
          <div className='header-main-box'>
            <img src='https://cdn.pixabay.com/photo/2015/04/23/22/01/mountains-736886_1280.jpg' alt=''/>
            <div className='header-main-box-topic'>
              <h3 className='header-topic-minor'>Lorem Ipsum</h3>
              <p> 
                Lorem Ipsum is simply dummy text of the printing and typesetting 
                industry. Lorem Ipsum has been the industry's standard dummy text 
                ever since the 1500s, when an unknown printer took a galley of </p>
              <a href='#' className='btn-link'>Click</a>
            </div>
          </div>
        </div>
        <div className='header-main'>
          <div className='header-main-box'>
            <img src='https://cdn.pixabay.com/photo/2023/06/04/15/51/mountains-8040132_1280.jpg' alt=''/>
            <div className='header-main-box-topic'>
              <h3 className='header-topic-minor'>Lorem Ipsum</h3>
              <p> 
                Lorem Ipsum is simply dummy text of the printing and typesetting 
                industry. Lorem Ipsum has been the industry's standard dummy text 
                ever since the 1500s, when an unknown printer took a galley of </p>
              <a href='#' className='btn-link'>Click</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
