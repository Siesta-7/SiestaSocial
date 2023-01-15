import "./post.scss";
import { FavoriteBorderOutlined, FavoriteOutlined, TextsmsOutlined, ShareOutlined, MoreHoriz } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import {useContext, useState } from "react";
import moment from "moment"
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Post = ({post}) => {

  const {currentUser} = useContext(AuthContext)
  const [commentOpen, setCommentOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const {isLoading, err, data } = useQuery(['likes', post.id], async()=>{
    const res = await axios.get("http://localhost:8800/api/like/getlike?postId="+ post.id, {withCredentials:true})
    return res.data
  })

  const queryClient = useQueryClient();

  const mutation = useMutation(
      (liked) => {
      if(liked)  axios.delete("http://localhost:8800/api/like/deletelike?postId="+ post.id, {withCredentials:true})
       axios.post("http://localhost:8800/api/like/addlike", {postId:post.id}, {withCredentials:true});
      
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const deleteMutation = useMutation(
    (postId)=>{
     axios.delete("http://localhost:8800/api/post/deletepost/"+ postId, {withCredentials:true})
  },
  {
    onSuccess:()=>{
      // Invalidate and refetch
      queryClient.invalidateQueries(["posts"]);
    }
  })

  const handleLike = ()=>{ 
    mutation.mutate(data.includes(currentUser.id))
  }

  const handleMenu = ()=>{
    setOpenMenu(!openMenu)
  }

  const handleDelete = ()=>{
    deleteMutation.mutate(post.id)
    
  }
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/"+post.profilePic} />
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{textDecoration:"none", color:"inherit"}} >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHoriz onClick ={handleMenu}/>
          { openMenu && (post.userId === currentUser.id && <button onClick={handleDelete}>Delete</button>)}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/"+ post.img} />
        </div>
        <div className="info">
          <div className="item">
            
            {isLoading ? ("loading") : data.includes(currentUser.id) ?  (

            <FavoriteOutlined style={{color:"red"}} onClick={handleLike}/>) : (

            <FavoriteBorderOutlined onClick={handleLike} /> )}
            {data && data.length} Likes
             
          </div>
          <div className="item" onClick={()=>{setCommentOpen(!commentOpen)}} >
            <TextsmsOutlined/>
            Comments
          </div>
          <div className="item">
            <ShareOutlined/>
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} /> }
      </div>    
    </div>
  )
}

export default Post