import { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

export function useHandleModule() {
  const [moduleName, setModuleName] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [userUID, setUserUID] = useState('');
  const [userName, setUserName] = useState('');
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/');
        return;
      }
      const q = query(collection(db, 'users'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        setUserName(userData.name);
        setUserUID(userDoc.id);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'modules'), (snapshot) => {
      const updatedModules = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setModules(updatedModules);
    });

    return () => unsubscribe();
  }, []);

  const onCreateModule = async (e) => {
    e.preventDefault();
    if (!moduleName || !moduleDescription) return alert('Fill in all fields');
    try {
      await addDoc(collection(db, 'modules'), {
        name: moduleName,
        description: moduleDescription,
        createdBy: userUID,
        createdByName: userName,
        createdAt: new Date(),
      });
      setModuleName('');
      setModuleDescription('');
    } catch (error) {
      console.error('Error adding module:', error);
    }
  };

  const deleteModule = async (id) => {
    await deleteDoc(doc(db, 'modules', id));
  };

  const updateModule = async (id, name, description) => {
    await updateDoc(doc(db, 'modules', id), {
      name,
      description,
    });
  };

  return {
    moduleName,
    setModuleName,
    moduleDescription,
    setModuleDescription,
    onCreateModule,
    modules,
    deleteModule,
    updateModule,
  };
}
