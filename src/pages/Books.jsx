import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Books = () => {
    const [books,setBooks] = useState([])

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("https://bookstorebackend-0411.onrender.com/books");
                setBooks(res.data);
            } catch (err) {
                console.log(err);
                
            }
        }
        fetchAllBooks();
    },[]);

    const handleDelete = async (id) => {
      try {
        await axios.delete("https://bookstorebackend-0411.onrender.com/books/"+id);
        window.location.reload();
      } catch (err) {
        console.log(err);
        
      }
    };

  return (
    <div>
      <h1>Moses book App</h1>
      <div className="books">
        {books.map(book=>(
            <div className="book" key={book.id}>
                {book.cover && <img src={book.cover}  alt=""/>}
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>{book.price}</span>
                <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                <button className="Update" > <Link to={`/update/${book.id}`}>Update</Link> </button>
            </div>
        ))};
      </div>
      <button><Link to="/add">Add new book</Link></button>
    </div>
  )
}

export default Books
