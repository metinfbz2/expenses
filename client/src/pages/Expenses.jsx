import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Balance } from '../components/Balance';
import { IncomeExpenses } from '../components/IncomeExpenses';
import { TransactionList } from '../components/TransactionList';
import { AddTransaction } from '../components/AddTransaction';
import { GlobalProvider } from '../context/GlobalState';

function Expenses() {
  const auth = getAuth();
  
  const [formData, setFormData] = useState({});
  
  //const { name, email } = formData;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData({
          name: user.displayName || '',
          email: user.email || '',
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate('/sign-in');
  };
 

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">Gelir Gider Takip</p>
        <button className="logOut" type="logout" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
      <GlobalProvider>      
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
      </main>
    </div>
  );
}

export default Expenses;
