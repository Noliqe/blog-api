import { useNavigate } from 'react-router-dom';
import '../App.css';

const Post = (props) => {
    const navigate = useNavigate();

    const ButtonClick = () => {
        navigate(`/posts/${props.data._id}`)
    }
  
return (
    <div className='post'>
        <div className='postContainer'>
            <div className='postImageContainer'>
                <p className='postImage'>Image</p>
            </div>
            <div className='postTitleAndPara'>
                <h3>{props.data.title}</h3>
                <p>{props.data.text.substring(0, 100)}...</p>
            </div>
            <div className='postLink'>
                <button onClick={() => {ButtonClick()}}>Read</button>
            </div>
        </div>
    </div>
)};
  
export default Post;