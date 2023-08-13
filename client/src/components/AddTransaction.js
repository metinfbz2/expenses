import React, {useState, useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      // Clean up the subscription when the component unmounts
      unsubscribe();
    };
  }, []);


  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      text,
      amount: +amount,
      email
    }
    setEmail(user.email)
    addTransaction(newTransaction);
  }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="form-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label
          >
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  )
}
