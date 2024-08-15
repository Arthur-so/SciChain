import './ReviewUserItem.css';

function ReviewUserItem(props) {
    function rejectPost(){
        alert("Exclude");
    }

    function acceptPost(){
        alert("Accept");
    }

    function returnPost(){
        alert("Return feedback");
    }

    return (
        <article className="review-post">
            <div className='container-post'>
                <div>
                    <h3>{props.title}</h3>
                    <p>{props.file}</p>
                </div>
                <div>
                    <p>{props.description}</p>
                    <p>{props.visualizerLink}</p>
                </div>
                <div className={props.inv  ? '' : '-inv'}>
                    <button className="accept-button" onClick={() => acceptPost()}>Y</button>
                    <button className="exclude-button" onClick={() => rejectPost()}>X</button>
                    <button className="feedback-button" onClick={() => returnPost()}>-</button>
                </div>
            </div>
            <div className={props.inv  ? 'container-post' : 'container-post -inv'}>
                <textarea className="story" rows="4" cols="120" placeholder='Write a feedback...'></textarea>
            </div>
        </article>);
}

export default ReviewUserItem;