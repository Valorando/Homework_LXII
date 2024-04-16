import './PutComponent.css'
import React, { useState } from 'react';
import { editBook } from '../Services/api'; 

export default function PutComponent()
{
    const [editId, setEditId] = useState(''); 
    const [editBookId, setEditBookId] = useState(''); 
    const [editCountAvailable, setEditCountAvailable] = useState(''); 
    const [response, setResponse] = useState(null); 

    const handleEditBook = async () => { 
        if (!editId || !editBookId || editCountAvailable === '' || editCountAvailable < 0) {
            alert('Ошибка: '+ error);
            return;
        }
        try {
            const data = await editBook(parseInt(editId, 10), parseInt(editBookId, 10), parseInt(editCountAvailable, 10)); 
            setResponse('Процедура обновления значений успешно выполнена'); 
        } catch (error) {
            alert('Ошибка: '+ error);
        }
    };

    return(
        <div className='PutComponent'>
                <input
                    value={editId} 
                    onChange={(e) => setEditId(e.target.value)} 
                    placeholder="ID записи"
                />
                <input
                    value={editBookId} 
                    onChange={(e) => setEditBookId(e.target.value)} 
                    placeholder="Новый ID книги"
                />
                <input
                    type="number"
                    value={editCountAvailable} 
                    onChange={(e) => setEditCountAvailable(e.target.value)} 
                    placeholder="Новое количество на складе"
                />
                <button onClick={handleEditBook}>Отправить</button> 
                <hr />
                <p id='responce_header'>Ответ API</p>
                {response && (
                    <div id="response">
                        <p>{response}</p>
                    </div>
                )}

            </div>
    )
}
