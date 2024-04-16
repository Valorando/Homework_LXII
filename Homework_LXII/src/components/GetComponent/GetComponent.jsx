import './GetComponent.css'
import React, { useState } from 'react';
import { getBook } from '../Services/api'; 

export default function GetComponent()
{
    const [getId, setGetId] = useState(''); 
    const [book, setBook] = useState(null); 

    const handleGetBook = async () => { 
        if (!getId) {
            alert('Ошибка: '+ error);
            return;
        }
        try {
            const data = await getBook(parseInt(getId, 10)); 
            setBook(data); 
        } catch (error) {
            alert('Ошибка: '+ error);
        }
    };

    return(
        <div className='GetComponent'>
                <input id='text1'
                    value={getId} 
                    onChange={(e) => setGetId(e.target.value)} 
                    placeholder="Введите ID книги"
                />
                <button onClick={handleGetBook}>Отправить</button> 
                <hr />
                <p id='responce_header'>Ответ API</p>
                {book && ( 
                <div id="response">
                    <p>Информация о запрошенной записи</p>
                    <p>ID: {book.id}</p> 
                    <p>Book ID: {book.bookId}</p> 
                    <p>Available Count: {book.countAvailable}</p> 
                </div>
            )}
        </div>
    )
}
