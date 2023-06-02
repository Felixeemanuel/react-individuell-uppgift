import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config'
import User from '../components/users/User'

function Users() {

  // Empty array of state users
  const [users, setUsers] = useState([])


  useEffect(() => {

    //Fetch all users from Firebase 'users' collection
    const fetchUsers = async () => {
      try {
        const orderRef = collection(db, 'users');
        const querySnapshot = await getDocs(orderRef);
        // console.log(querySnapshot)
  
        const userData = querySnapshot.docs.map((doc) => ({
          userId: doc.id,
          city: doc.data().city,
          company: doc.data().company || '',
          email: doc.data().email,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          mobile: doc.data().mobile || '',
          postalCode: doc.data().postalCode,
          profilePic: doc.data().profilePic || '',
          strretName: doc.data().strretName,

          
        }));
  
        // Update state of users with the new user data
        setUsers(userData);
        console.log(userData);
      } catch (error) {
        console.log('Error fetching products: ', error);
      }
    };
  
    fetchUsers();
  }, []);

  return (
    <div className='usersContainer'>
      {
        // For each user in Users state, display
        users.map(user => 
        <User 
          key={user.userId} 
          user={user}
          />)
      }
    </div>
  )
}

export default Users