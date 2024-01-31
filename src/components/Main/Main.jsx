import React, {useRef, useContext, useState, useReducer, useEffect} from 'react'
import { Avatar, Button } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.jpg'
import live from '../../assets/images/live.png'
import smile from '../../assets/images/smile.png'
import addImage from '../../assets/images/add-image.png'
import { AuthContext } from '../AppContext/AppContext'
import { setDoc, doc, collection, documentId, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { PostsReducer, postActions, postsState } from '../AppContext/PostReducer'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { type } from '@testing-library/user-event/dist/type'
import {Alert, Popover} from '@material-tailwind/react'
import PostCard from './PostCard'
import  EmojiPicker  from 'emoji-picker-react';





function Main() {
  



  const {user, userData} = useContext(AuthContext)
  const text = useRef('')
  const scrollRef = useRef('')
  const [image, setImage] = useState(null)
  const [file, setFile] = useState(null)
  const collectionRef = collection(db, 'posts')
  const postRef = doc(collection(db, 'posts'))
  const document = postRef.id
  const [state, dispatch] = useReducer(PostsReducer, postsState)
  const {SUBMIT_POST, HANDLE_ERROR} = postActions
  const [progressBar, setProgressBar] = useState(0)
  const [emojiPicker, setEmojiPicker] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [postText, setPostText] = useState('');
  
  const handleEmojiSelect = (event) => {
    setPostText((prevText) => prevText + event.emoji);
    setSelectedEmoji(event.native);

  };
console.log('Selected emoji:', selectedEmoji)

  const handleUpload = (e) => {
    setFile(e.target.files[0])
  }




  const handleSubmitPost = async(e) => {
    e.preventDefault()
    if(text.current.value !== ''){
    try{
     
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp()
        })
        text.current.value = ''
       
    }catch(err){
      dispatch({
        type: HANDLE_ERROR,

      })
      console.log(err.message)
    }
  }
    else{
      dispatch({
        type: HANDLE_ERROR
      })
    }
  }

  const storage = getStorage()
  const metadata = {
    contentType: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml']
  }


  const submitImage = async () => {
    const fileType = metadata.contentType.includes(file['type']);
    console.log('file', file);
    if (!file) return; // Добавьте эту проверку, чтобы избежать отправки изображения, если файл не был выбран
  
    if (fileType) {
      try {
        const storageRef = ref(storage, `image/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata.contentType);
        await uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgressBar(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImage(downloadURL);
            });
          }
        );
      } catch (err) {
        dispatch({
          type: HANDLE_ERROR,
        });
        console.log(err.message);
      }
    }
  };
  
  


  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "desc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc?.docs?.map((item) => item?.data()),
        });
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
        setImage(null);
        setFile(null);
        setProgressBar(0);
      });
    };
    
    return () => postData();
  }, [SUBMIT_POST]);
    



  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col py-4 w-[90%] bg-white rounded-3xl shadow-lg'>
        <div className='flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full'>
          <Avatar src={userData?.image || avatar} size='sm' className='w-12 h-12' variant='circular' alt='avatar' ></Avatar>
          <form className='w-full' onSubmit={handleSubmitPost}>
            <div className='flex justify-between items-center'>
              <div className='w-full ml-4'>
                <input 
                onChange={(e) => setPostText(e.target.value)}
                value={postText} 
                ref={text} 
                placeholder='Write post...' 
                className=' block py-2.5 px-0  text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer w-full bg-white rounded-md' type='text' name='text'  />
              </div>
              <div className='mx-4'>
                {image && <img alt='previewImage' src={image} className='h-24 rounded-xl'></img>}
              </div>
              <div className='mr-4'>
                <Button onClick={handleSubmitPost} className=' bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-500 text-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' variant='text' type='submit' >
                  Share
                </Button>
              </div>
            </div>
          </form>
        </div>
        <span className='bg-blue-700 py-1 rounded-md' style={{width:`${progressBar}%`}}>
          {}
        </span>
        <div className='flex justify-around items-center pt-4'>
          <div className='flex items-center'>
                <label htmlFor='addImage' className='cursor-pointer flex items-center'>
                  <img src={addImage} alt='addimg' className='h-10 mr-4' />
                  <input onChange={handleUpload} id='addImage' type='file' style={{display:'none'}} />
                </label>
                {file && 
                <Button onClick={submitImage} variant='text' className='bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-500 text-blue-500 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2'  type='submit'>
                  Upload
                </Button> }
          </div>
          <div className='flex items-center'>
            <img src={live} alt='live' className='h-10 mr-4' />
            <p className='font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none'>Live</p>
          </div>
          <div className='flex items-center' >
            <img src={smile}  alt='smile' className='h-10 mr-4 cursor-pointer z-20'onClick={()=> setEmojiPicker(!emojiPicker)}   />
           
              {emojiPicker && (

                <div  className='absolute z-10 pl-10' >            
                    <EmojiPicker onEmojiClick={handleEmojiSelect} lazyLoadEmojis={true} />
                </div>
            
                )}
          
          </div>
        </div>
      </div>
      <div className='flex flex-col py-4 w-full'>
        {state.error 
        ? <div className='flex justify-center items-center'><Alert color='red'>Something went wrong, try again...</Alert></div> 
        : <div>{state?.posts?.length > 0 && state?.posts?.map((post, index) => {
          return <PostCard 
          logo={post?.logo} 
          id={post?.documentId} 
          key={index} 
          uid={post?.uid} 
          name={post?.name} 
          image={post?.image} 
          email={post?.email} 
          text={post?.text} 
          timestamp={new Date(
            post?.timestamp?.toDate()
          )?.toUTCString()}
          />
        })}</div>}
      </div>
      <div ref={scrollRef} >
        {/* ref for later */}
      </div>
    </div>
  )
}

export default Main