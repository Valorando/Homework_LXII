import './DeleteComponent.css'
import React, { useState } from 'react';
import { deleteBook } from '../Services/api'; 

export default function DeleteComponent()
{
    const [deleteId, setDeleteId] = useState(''); 
    const [response, setResponse] = useState(null); 

    const handleDeleteBook = async () => { 
        if (!deleteId) {
            alert('Ошибка: '+ error);
            return;
        }
        try {
            await deleteBook(parseInt(deleteId, 10)); 
            setResponse('Процедура удаления записи успешно выполнена'); 
        } catch (error) {
            alert('Ошибка: '+ error);
        }
    };

    return(
        <div className='DeleteComponent'>
            <input
                    value={deleteId} 
                    onChange={(e) => setDeleteId(e.target.value)} 
                    placeholder="ID записи"
                />
                <button onClick={handleDeleteBook}>Отправить</button> 
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
