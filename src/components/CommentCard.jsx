
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { CommentSection } from './CommentSection';

const CommentCard = ({ id, name, commentMessage, isReply , onEdit, replies, onAddReply, onDelete}) => {
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [isEditing, setIsEditing] = useState(false);
    const [editedMessage, setEditedMessage] = useState(commentMessage);
    const [replySection, setReplySection] = useState(false);

    const commentRef = React.createRef();

    useEffect(() => {
        const today = moment();
        const day = today.format('D');
        const month = today.format('MMM');
        const year = today.format('YYYY');
        const suffix = day % 10 === 1 && day !== 11 ? 'st' :
            day % 10 === 2 && day !== 12 ? 'nd' :
                day % 10 === 3 && day !== 13 ? 'rd' : 'th';

        const formattedDate = `${day}${suffix} ${month} ${year}`;
        setDate(formattedDate);
    }, [])

    const handelEdit = () => {
        if (isEditing) {
            onEdit(id, editedMessage);
            setIsEditing(false);
        }
        else {
            setIsEditing(true);
        }
    }

    const renderReply = () => {
        setReplySection(!replySection);
    }

    const handleAddReply = (reply) => {
        onAddReply(id, reply);
        setReplySection(false); 
    };

    const handleDelete = () => {
        onDelete(id); // Call the delete function passed from parent
    };

    return (
        <>
            <div className='flex flex-col bg-slate-300 p-5' ref={commentRef}>
                <div className='flex flex-row'>
                    <div>{name}</div>
                    <div className='flex text-right'>
                        <div>
                            {date}
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex justify-start'>
                        {isEditing ? (
                            <input text='text' value={editedMessage} onChange={(e) => setEditedMessage(e.target.value)}></input>
                        ) : (commentMessage)}
                    </div>
                    <div className='flex justify-end'>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    {isReply && <button className='text-cyan-700' onClick={renderReply}>Reply</button>}
                    <button className='text-cyan-700' onClick={handelEdit}>{isEditing ? 'Save' : 'Edit'}</button>
                </div>
            </div>
            {
                replySection && <CommentSection header={"Reply"} styleClasses={""} handleEditor={handleAddReply} isReply={false}  />
                
            }
            {Array.isArray(replies) && replies.map((reply) => (
                <div key={reply.id} className='flex flex-col ml-8 bg-gray-200 p-4'>
                    <div className='flex flex-row'>
                        <div>{reply.name}</div>
                        <div className='flex text-right'>
                            <div>{moment(reply.timestamp).format('D MMM YYYY')}</div>
                        </div>
                    </div>
                    <div className='flex justify-start'>{reply.message}</div>
                </div>
            ))}
        </>
    );
}
export default CommentCard;