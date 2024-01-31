import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Avatar } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.jpg'
import like from '../../assets/images/like.png'
import comment from '../../assets/images/comment.png'
import remove from '../../assets/images/delete.png'
import { AuthContext } from '../AppContext/AppContext'
import { PostsReducer, postActions, postsState } from '../AppContext/PostReducer'
import { addDoc, arrayUnion, collection, updateDoc, where } from 'firebase/firestore'
import { setDoc, doc, getDocs, deleteDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import addFriend from '../../assets/images/add-friend.png'
import CommentSection from './CommentSection'


function PostCard({uid, id, logo, name, text, email, image, timestamp}) {

    const {user} = useContext(AuthContext)
    const [state, dispatch] = useReducer(PostsReducer, postsState)
    const likesRef = doc(collection(db, "posts", id, 'likes'));
    const likesCollection = collection(db, "posts", id, "likes");
    const {ADD_LIKE, HANDLE_ERROR} = postActions
    const [open, setOpen] = useState(false)
    const singlePostDocument = doc(db, 'posts', id)

    const handleOpen = (e) => {
      e.preventDefault()
      setOpen(!open)
    }


    const addUser = async() => {

        try{
            const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
            const doc = await getDocs(q)
            const data = doc.docs[0].ref
            await updateDoc(data, {
                friends: arrayUnion({
                    id: uid,
                    image: logo,
                    name: name,
                })
            })
        }catch(err){
            console.log(err.message)
        }
    }

    const handleLike = async(e) => {
        e.preventDefault();
        const q = query(likesCollection, where("id", "==", user?.uid));
        const querySnapshot = await getDocs(q);
        
        const likesDocId = await querySnapshot?.docs[0]?.id;
        try {
          if (likesDocId !== undefined) {
            const deleteId = doc(db, "posts", id, "likes", likesDocId);
            await deleteDoc(deleteId);
          } else {
            await setDoc(likesRef, {
              id: user?.uid,
            });
          }
        } catch (err) {
          alert(err.message);
          console.log(err.message);
        }
      };


      const deletePost = async(e) => {
        e.preventDefault()
        try{
          if(user?.uid === uid){
            await deleteDoc(singlePostDocument)
          }else{
            alert('You cant delete other users posts')
          }
        }catch(err){
          console.log(err.message)
        }
      }





      useEffect(() => {
        const getLikes = async () => {
          try {
            const q = collection(db, "posts", id, "likes");
            
            await onSnapshot(q, (doc) => {
              dispatch({
                type: ADD_LIKE,
                likes: doc.docs.map((item) => item.data()),
              });
            });
          } catch (err) {
            dispatch({ type: HANDLE_ERROR });
            alert(err.message);
            console.log(err.message);
          }
        };
        return () => getLikes();
      }, [id, ADD_LIKE, HANDLE_ERROR]);


  return (
    <div className='mb-4'>
        <div className='flex flex-col py-4 mx-4 px-4 bg-white rounded-3xl'>
            <div className='flex items-center pb-4 ml-2'>
                <Avatar size='sm' variant='circular' alt='avatar' src={  logo || avatar} /> 
                <div className='flex flex-col'>
                    <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>{name}</p>
                    <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>{email}</p>
                    <p className='ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>Published: {timestamp}</p>
                </div>
            {user?.uid !== uid && 
                <div 
                onClick={addUser}
                 className='w-full flex justify-end cursor-pointer mr-10'>
                    <img src={addFriend} alt='addFriend' className='hover:bg-blue-100 rounded-xl p-2' />
                </div>}
            </div>
            <div className=''>
                <p className='ml-4 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
                    {text}
                </p>
                {image && <img src={image} alt='postImage' className='h-[800px] w-full' />}
            </div>
            <div className='flex justify-around items-center pt-4'>
                <button 
                onClick={handleLike}
                 className='  border-none flex items-center cursor-pointer rounded-lg p-2 bg-white hover:bg-gray-100 '>
                    <img src={like} className='h-8 mr-4' alt='/' />
                    <span>Likes:</span>
                    {state.likes?.length > 0 && state?.likes?.length}
                </button>
                <div className='flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-100 ' onClick={handleOpen}>
                    <div className='flex items-center cursor-pointer'>
                        <img src={comment} alt='comment' className='h-8 mr-4' />
                        <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>Comments</p>
                    </div>
                </div>  
                <div className='flex place-items-center hover:bg-gray-100 cursor-pointer rounded-lg p-2' onClick={deletePost}>
                    <img src={remove} alt='delete' className='h-8 mr-4' />
                    <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>Delete</p>
                </div>
            </div>
        </div>
        <div className='px-4 '>
          {open && <CommentSection postId={id} /> }
        </div>
    </div>
  )
}

export default PostCard