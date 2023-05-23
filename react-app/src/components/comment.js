import '../App.css';

const Comment = (props) => {

  
return (
    <div className='comment'>
        <div className='commentHeader'>
            <div className='commentImage'>
                <p style={{'color': 'grey'}}>Img</p>
            </div>
            <div className='commentName'>
                <p style={{'color': 'grey'}}>{props.data.name}</p>
            </div>
        </div>
        <div className='commentText'>
            <p>{props.data.text}</p>
        </div>
        <div className='commentDate'>
            <p>{props.data.timestamp}</p>
        </div>
        <div className='commentLine'></div>
    </div>
)};
  
export default Comment;