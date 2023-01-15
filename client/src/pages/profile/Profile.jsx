import "./profile.scss"
import { FacebookTwoTone, LinkedIn, Instagram, Pinterest, Twitter, Place, Language, EmailOutlined, MoreVert } from "@mui/icons-material"
import Posts from "../../components/posts/Posts"
import { useContext, useState } from "react"
import { useQuery, useQueryClient, useMutation } from "react-query"
import axios from "axios"
import { useLocation } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Update from "../../components/update/Update"
function Profile() {

    const [openUpdate, setOpenUpdate] = useState(false)
    const {currentUser} = useContext(AuthContext)
    const userId = parseInt(useLocation().pathname.split("/")[2])
    const {isLoading, err, data} = useQuery('user', async ()=>{
        const res = await axios.get("http://localhost:8800/api/user/find/"+ userId, {withCredentials:true})
        return res.data
    })

    //Getting a user's all followers
    const {isLoading:rIsLoading, data:relationshipData} = useQuery('relationships', async()=>{
        const res = await axios.get("http://localhost:8800/api/relationship/getfollower?follower="+ userId, {withCredentials:true})
        return res.data
    })
   
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (following) => {
            if (following) axios.delete("http://localhost:8800/api/relationship/deleteFollower?userId="+ userId, {withCredentials:true})
             axios.post("http://localhost:8800/api/relationship/addFollower", {userId}, {withCredentials:true}) 
        },
        {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(["relationships"]);
        },
        }
    );

    const handleFollow = () =>{
        mutation.mutate(relationshipData.includes(currentUser.id))
    }
    

  return (
    <div className="profile">
        {isLoading ? "loading" : <>
        <div className="images">
                <img src={"/upload/"+data.coverPic} className="cover" />
                <img src={"/upload/"+data.profilePic} className="profilePic" />
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        <a href="http://facebook.com">
                            <FacebookTwoTone fontSize="medium" />
                        </a>
                        <a href="http://linkedin.com">
                            <LinkedIn fontSize="medium"/>
                        </a>
                        <a href="http://instagram.com">
                            <Instagram fontSize="medium"/>
                        </a>
                        <a href="http://pinterest.com">
                            <Pinterest fontSize="medium" />
                        </a>
                        <a href="http://twitter.com">
                            <Twitter fontSize="medium" />
                        </a>

                    </div>
                    <div className="center">
                        <span>{data.name}</span>
                        <div className="info">
                            <div className="item">
                                <Place fontSize="small" />
                                <span>{data.city}</span>
                            </div>
                            <div className="item">
                                <Language fontSize="small" />
                                <span>{data.website}</span>
                            </div>                      
                        </div>
                        {rIsLoading ? "loading" : (userId === currentUser.id ? 
                        (<button onClick={()=>setOpenUpdate(true)}>Update</button> ): 
                        (<button onClick={handleFollow}>{relationshipData.includes(currentUser.id) ? "Following" : "Follow" }</button>))} 
                    </div>
                    <div className="right">
                        <EmailOutlined/>
                        <MoreVert/>
                    </div>
                </div>
                <Posts userId={userId} />
            </div>
        </>}
         { openUpdate && <Update setOpenUpdate = {setOpenUpdate} user={data} />  }     
    </div>
  )
}

export default Profile