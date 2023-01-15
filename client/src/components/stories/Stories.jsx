import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import "./stories.scss"

const Stories = () => {

    const {currentUser} = useContext(AuthContext)

    //TEMPORARY dummy data



    const stories = [
        {
            id:1,
            name:"Lisa Cherry",
            img:"https://images.pexels.com/photos/14244641/pexels-photo-14244641.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"  
        },
        {
            id:2,
            name:"Lisa Cherry",
            img:"https://images.pexels.com/photos/14244641/pexels-photo-14244641.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"  
        },
        {
            id:3,
            name:"Lisa Cherry",
            img:"https://images.pexels.com/photos/14244641/pexels-photo-14244641.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"  
        },
        {
            id:4,
            name:"Lisa Cherry",
            img:"https://images.pexels.com/photos/14244641/pexels-photo-14244641.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"  
        }

    ]
  return (
    <div className="stories">
    <div className="story">
        <img src={"/upload/"+currentUser.profilePic} />
        <span>{currentUser.name}</span>
        <button>+</button>
    </div>
    {stories.map((story)=>(
        <div className="story" key={story.id}>
            <img src={story.img}/>
            <span>{story.name}</span>
        </div>
        )
    )}
    </div>
  )
}

export default Stories