import Navbar from '../Navbar/Navbar'
import React, {useState, useEffect, useRef, useContext} from 'react'
import nature from '../../assets/images/nature.jpg'
import { Tooltip, Avatar } from '@material-tailwind/react'
import avatar from '../../assets/images/avatar.jpg'
import remove from '../../assets/images/delete.png'
import { AuthContext } from '../AppContext/AppContext'
import { arrayRemove, collection, getDocs, query, where, updateDoc, doc, orderBy, serverTimestamp, setDoc, addDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';




function ChatMessenger() {
  const [input, setInput] = useState("");
  let [data, setData] = useState([])
  const {user, userData} = useContext(AuthContext)
  const friendList = userData?.friends;
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [value, setValue] = useState('')
  const messagesRef  = collection(db, 'messages')




  const startChatWithUser = async (selectedUserId) => {
    try {
      setSelectedUser(selectedUserId);
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      await addDoc(messagesRef, {
        senderId: user.uid,
        receiverId: selectedUser,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: serverTimestamp(),
      });
      setValue('');
      // Обновляем список сообщений после успешной отправки
      fetchMessages();
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchMessages = async () => {
    if (!selectedUser) return;
    try {
      const q = query(
        collection(db, 'messages'),
        where('senderId', '==', user.uid),
        where('receiverId', '==', selectedUser),
        orderBy('createdAt')
      );
      const querySnapshot = await getDocs(q);
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      setData(messages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };


  useEffect(() => {
    fetchMessages();
  }, [selectedUser]);
 


  // FRIENDS AND SEARCH
  const searchFriends = (data) => {
    return data.filter((item) =>
      item["name"].toLowerCase().includes(input.toLowerCase())
    );
  };

  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      friends: arrayRemove({ id: id, name: name, image: image }),
    });
  };
// END FRIENDS AND SEARCH

  return (
    <div className='w-full' style={{ margin: 0, padding: 0 }}>
      <div className='fixed top-0  w-full bg-white z-40' >
        {/* Navbar component */}
        <Navbar />
      </div>
  
      <div className='flex bg-gray-100 flex-col  h-screen'>
        <div className='flex  flex-col h-screen w-[20%]  mt-12'>
          <div className='flex  flex-col items-center relative'>
              <img src={nature} alt='nature' className='h-28 w-full rounded-r-xl object-cover' />
        
          <div className='absolute -bottom-4'>
              <Tooltip content='Profile' placement='top'>
                  <Avatar src={userData?.image ? userData?.image : avatar} className='z-30 w-20 h-20 object-cover rounded-full' size='md' />
              </Tooltip>
          </div>
          </div>
          <div className='flex flex-col items-center pt-6'>
              <p className='font-roboto font-medium text-md mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                  {user?.email || userData?.email}
              </p>
              <p className='font-roboto font-medium text-md mb-2 text-gray-700 no-underline tracking-normal leading-none'>
                  {user?.name || userData?.name}
              </p>
             
          </div>
          <input
          className="border-0 outline-none mt-4 h-[30px] mx-4 rounded-xl"
          name="input"
          value={input}
          type="text"
          placeholder=" Search friends"
          onChange={(e) => setInput(e.target.value)}
        ></input>
          {friendList?.length > 0 ? (
          searchFriends(friendList)?.map((friend) => {
            return (
              <div
              className="flex items-center justify-between hover:bg-gray-100 mt-2 border border-gray-300 rounded p-2 duration-300 ease-in-out"
              key={friend.id}
              onClick={()=> startChatWithUser(friend.id, user.uid)}
            >
              <div className="flex items-center my-2 cursor-pointer">
                <div className="flex items-center">
                  <Avatar
                    className='rounded-full size-12'  
                    src={friend?.image || avatar}
                    alt="avatar"
                  ></Avatar>
                  <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
                    {friend.name}
                  </p>
                </div>
              </div>



                <div className="mr-4">
                  <img
                    onClick={() =>
                      removeFriend(friend.id, friend.name, friend.image)
                    }
                    className="cursor-pointer"
                    src={remove}
                    alt="deleteFriend"
                  ></img>
                </div>
              </div>
            );
          })
        ) : (
          <p className="mt-10 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            Add friends to check their profile
          </p>
        )}
      </div>
     
    
        {/* Main chat area in the center */}
            <div className='flex-auto  w-[60%] absolute  left-[20%] top-14 bg-gray-100 rounded-xl p-4 mt-4 '>
              <div className='w-80% mx-auto'>
              <div className='mb-4'>
                <div className='flex flex-col py-4 mx-4 px-4 bg-white rounded-3xl'>
                    {/* <div className='flex items-center pb-4 ml-2'>
                        <Avatar size='sm' variant='circular' alt='avatar' src={  userData?.photoURL } /> 
                        <div className='flex flex-col'>
                            <p className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>name</p>
                         
                            <p className='ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>Published: timestamp</p>
                        </div>
                 
                    </div> */}
                    
                       <div>
                        
                        {data.map((message) => (
                          <div key={message.id}>
                            <p  className='ml-4 py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>{message.text}</p>
                            {/* Дополнительная информация о сообщении, если это необходимо */}
                          </div>
                        ))}
                      </div>
                      <div>

                      </div>


                    <div className=''>
                        {/* <div className='ml-4 pb-[60%] font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none'>
                          
                          {messages && messages.map((msg) => 
                          <ChatMessage key={msg.id} message={msg} />)}
                        </div> */}
                      
                    </div>
                    <div className='flex justify-around items-center pt-4'>
                      <TextField 
                        value={value}
                        fullWidth
                        rowsMax={2} 
                        variant={'outlined'}
                        onChange={e => setValue(e.target.value)}
                        />
                    <Button onClick={sendMessage} variant={'outlined'}>
                      Send
                    </Button>
                     
            
                    </div>
                </div>
                </div>
              </div>
        </div>
    
        {/* Sidebar on the right */}
       
      </div>
  </div>
  
  )
}

export default ChatMessenger