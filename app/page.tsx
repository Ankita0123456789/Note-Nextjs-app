'use client';
import React, { useEffect, useState } from "react";
import { collection, addDoc, doc, getDoc, query, onSnapshot, QuerySnapshot, deleteDoc } from "firebase/firestore";
import { db } from './firebase';

interface defaultIF {
  list: any;
  total: number;
}

export default function Home() {
  const [state, setState] = useState<defaultIF>({
    list: [
      // { name: 'Coffee', price: 10 }
    ],
    total: 0,
  });

  const [item, setItem] = useState({
    name: '',
    price: ''
  })
  // Add item to database
  const addItem = async (e: any) => {
    e.preventDefault();
    if (item.name !== '' && item.price !== '') {
      // setState({ ...state, list: [...state.list, item] });
      await addDoc(collection(db, 'items'), {
        name: item.name.trim(),
        price: item.price,
      });
      setItem({ name: '', price: '' });
    }
  }

  //Read items from database
  useEffect(() => {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr: any = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id })
      });
      state.list = itemsArr;
      // Read total
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce((sum: any, item: any) => sum + parseFloat(item.price), 0);
        state.total = totalPrice
      }
      setState({ ...state });
      calculateTotal();
      return () => unsubscribe();
    })
  }, [])

  //delete items from database
  const deleteItem = async (id: any) => {
    await deleteDoc(doc(db, 'items', id));
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 ">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>
        <div className='bg-slate-800 p-4 rounded-lg mt-3'>
          <form className="grid grid-cols-6 items-center text-black">
            <input value={item.name} onChange={(e) => setItem({ ...item, name: e.target.value })} className='col-span-3 p-3 border' type="text" placeholder='Enter Item' />
            <input value={item.price} onChange={(e) => setItem({ ...item, price: e.target.value })} className='col-span-2 p-3 border mx-3' placeholder='Enter Amount' />
            <button onClick={addItem} className='text-white bg-slate-800 hover:bg-slate-900 p-3 text-xl' type='submit'>
              Add more
            </button>
          </form>
          <ul>
            {state.list.map((item: any, id: number) => (
              <li key={id} className="my-4 w-full flex justify-between bg-slate-950">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span className="text-center">{item.price}</span>
                </div>
                <button onClick={() => deleteItem(item.id)} className="ml-8 p-4 border-l-2 border-slate-900 border-slate-800 w-60">Delete</button>
              </li>
            ))}
          </ul>
          {
            state.list?.length > 0 ? (
              <div className="my-4 w-full flex justify-center">
                <span>Total</span>
                <span className="mx-auto">INR {state.total}</span>
              </div>
            ) : ''
          }
        </div>
      </div>
    </main>
  )
}

