import React, { useContext, useEffect, useReducer, useRef } from 'react'
import { Avatar } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.jpg'
import { AuthContext } from '../AppContext/AppContext'
import { collection, doc, setDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore'
import {db} from '../firebase/firebase'
import { PostsReducer, postActions, postsState } from '../AppContext/PostReducer'
import Comment from './Comment'

function CommentSection({postId}) {


    const comment = useRef('')
    const {user, userData} = useContext(AuthContext)
    const commentRef = doc(collection(db, 'posts', postId, 'comments'))
    const [state, dispatch] = useReducer(PostsReducer, postsState)
    const {ADD_COMMENT, HANDLE_ERROR} = postActions





    const addComment = async(e) => {
        e.preventDefault()
        if(comment.current.value !== ''){
            try{
                await setDoc(commentRef, {
                    id: commentRef.id,
                    comment: comment.current.value,
                    image: user?.photoURL,
                    name: user?.displayName?.split(' '[0] || userData?.name?.charAt(0)?.toUpperCase() + userData?.name?.slice()),
                    timestamp: serverTimestamp()
                })
                comment.current.value = ""
            }catch(err){
                dispatch({
                    type:HANDLE_ERROR
                })
                console.log(err.message)
            }
        }
    }


    useEffect(()=> {
        const getComments = async () => {
            try{
                const collectionOfComments = collection(db, `posts/${postId}/comments`)
                const q = query(collectionOfComments, orderBy('timestamp', 'desc'))
                await onSnapshot(q, (doc)=> {
                    dispatch({
                        type:ADD_COMMENT, 
                        comments: doc.docs.map((item) => item.data())
                    })
                })
            }catch(err){
                dispatch({
                    type:HANDLE_ERROR
                })
                console.log(err.message)
            }
        }
        return () => getComments()
    },[postId, ADD_COMMENT, HANDLE_ERROR])



  return (
    <div className='flex flex-col bg-white w-full py-2 rounded-b-3xl mt-[-20px] '>
        <div className='flex items-center'>
            <div className='mx-2'>
                <Avatar src={user?.photoURL || avatar} size='sm' variant='circular' className='rounded-full size-12' ></Avatar>
            </div>
            <div className='w-full pr-2'>
                <form className='flex items-center w-full' onSubmit={addComment}>
                    <input label='Username' name='comment' className='w-full rounded-2xl outline-none border-0 p-2 bg-gray-100' ref={comment} placeholder='Write a comment...' type='text' />
                <button type='submit' className='hidden' >
                    Submit
                </button>
                </form>
            </div>
        </div>
        {state.comments?.map((comment, index) => {
            return <Comment key={index} image={comment.image} name={comment.name} comment={comment.comment} />
        } )}
    </div>
  )
}

export default CommentSection