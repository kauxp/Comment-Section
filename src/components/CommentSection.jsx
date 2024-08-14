import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import Sort from "./Sort";
import { v4 as uuidv4 } from 'uuid'; 

const CommentSection = ({ header, styleClasses, handleEditor, isReply }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [comments, setComments] = useState([]);
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        // Load comments from local storage on component mount
        const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
        setComments(storedComments);
    }, []);
    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    const handleSortChange = (order) => {
        setSortOrder(order);
        sortComments(order);
    };

    const sortComments = (order) => {
        const sortedComments = [...comments].sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setComments(sortedComments);
    };

    const handlePostComment = () => {
        if (name.trim() && message.trim()) {
            const newComment=([
                ...comments,
                {
                    id: uuidv4(),
                    name,
                    message,
                    timestamp: new Date().toISOString(),
                    replies: [] 
                }
            ]);
            const updatedComments = [...comments, newComment];
            setComments(updatedComments);
            localStorage.setItem('comments', JSON.stringify(updatedComments));
            setName('');
            setMessage('');
        }
        if (handleEditor) {
            // handleEditor(false);
        }
    }
    const handleEdit = (id, newMessage) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === id
                    ? { ...comment, message: newMessage }
                    : comment
            )
        );
        localStorage.setItem('comments', JSON.stringify(comments));
    };

    const handleAddReply = (commentId, reply) => {
        const updatedComments=(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId
                    ? { ...comment, replies: [...comment.replies, reply] }
                    : comment
            )
        );
        setComments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
    };

    const handleDelete = (id) => {
        const updatedComments = comments.filter(comment => comment.id !== id);
        setComments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
    };

    return (
        <div className="p-6 w-full">
            <div className={styleClasses + " h-[20vh] bg-gray-400 flex flex-col p-5"}>
                <div className="flex justify-start mb-2">{header}</div>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mb-2"></input>
                <input type="text" placeholder="Comment" value={message} onChange={(e) => setMessage(e.target.value)} ></input>
                <div className="flex justify-end">
                    <button onClick={handlePostComment} className=" w-[6vh] bg-cyan-600 mt-2 rounded-sm text-white">POST</button>
                </div>
            </div>
            <div>
                <Sort onSortChange={handleSortChange} />
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <CommentCard
                            id={comment.id}
                            name={comment.name}
                            commentMessage={comment.message}
                            isReply={isReply}
                            onEdit={handleEdit}
                            replies={comment.replies}
                            onAddReply={handleAddReply}
                            onDelete={handleDelete}
                        />

                    </div>
                ))}
            </div>

        </div>
    )
}
export { CommentSection };
