import './PostComponent.css'
import React, { useState } from 'react';
import { postBook } from '../Services/api'; 

export default function PostComponent()
{
    const [createId, setCreateId] = useState(''); 
    const [bookId, setBookId] = useState(''); 
    const [countAvailable, setCountAvailable] = useState(''); 
    const [response, setResponse] = useState(null); 

    const handlePostBook = async () => { 
        if (!createId || !bookId || countAvailable === '' || countAvailable < 0) {
            alert('Ошибка: '+ error);
            return;
        }
        try {
            const data = await postBook(parseInt(createId, 10), parseInt(bookId, 10), parseInt(countAvailable, 10)); // Заменил postPerson на postBook
            setResponse(data); 
        } catch (error) {
            alert('Ошибка: '+ error);
        }
    };

    return(
        <div className='PostComponent'>
             <input
                    value={createId} 
                    onChange={(e) => setCreateId(e.target.value)} 
                    placeholder="ID записи"
                />
                <input
                    value={bookId} 
                    onChange={(e) => setBookId(e.target.value)} 
                    placeholder="ID книги"
                />
                <input
                    type="number"
                    value={countAvailable} 
                    onChange={(e) => setCountAvailable(e.target.value)} 
                    placeholder="Количество на складе"
                />
                <button onClick={handlePostBook}>Отправить</button> 
                <hr />
                <p id='responce_header'>Ответ API</p>
                {response && (
                <div id="response">
                    <p>Вы создали новую запись</p>
                    <p>ID: {response.id}</p>
                    <p>Book ID: {response.bookId}</p>
                    <p>Available Count: {response.countAvailable}</p>
                </div>
            )}

        </div>
    )
}
