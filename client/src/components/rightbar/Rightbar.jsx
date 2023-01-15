import "./rightbar.scss"

function Rightbar() {
  return (
    <div className="rightBar">
     <div className="container">
      <div className="item">
        <span>Suggestions For You</span>
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/14683121/pexels-photo-14683121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <span>Lisbeth Salander</span>
          </div>
          <div className="buttons">
            <button>Follow</button>
            <button>Dismiss</button>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <span>Liv Summer</span>
          </div>
          <div className="buttons">
            <button>Follow</button>
            <button>Dismiss</button>
          </div>
        </div>
      </div>
      <div className="item">
        <span>Latest Activities</span>
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/14683121/pexels-photo-14683121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <p>
              <span>Lisbeth Salander</span> <br/>Changed her cover picture
            </p>      
          </div>
          <span>1 min ago</span>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/14683121/pexels-photo-14683121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <p>
              <span>Lisbeth Salander</span><br/> Changed her cover picture
            </p>      
          </div>
          <span>1 min ago</span>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/14683121/pexels-photo-14683121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <p>
              <span>Lisbeth Salander</span> <br/>Changed profile picture
            </p>      
          </div>
          <span>1 min ago</span>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/14683121/pexels-photo-14683121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <p>
              <span>Lisbeth Salander</span><br/> Liked photo
            </p>      
          </div>
          <span>1 min ago</span>
        </div> 
      </div>
      <div className="item">
        <span>Online Friends</span>
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/14683121/pexels-photo-14683121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <div className="online"></div>
            <span>Lisbeth Salander</span>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/14683121/pexels-photo-14683121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <div className="online"></div>
            <span>Lisbeth Salander</span>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/14683121/pexels-photo-14683121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <div className="online"></div>
            <span>Lisbeth Salander</span>
          </div>
        </div>
        <div className="user">
          <div className="userInfo">
            <img src="https://images.pexels.com/photos/14683121/pexels-photo-14683121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <div className="online"></div>
            <span>Lisbeth Salander</span>
          </div>
        </div>
        </div>
     </div>
    </div>
  )
}

export default Rightbar