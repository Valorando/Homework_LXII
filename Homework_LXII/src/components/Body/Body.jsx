import React, { useState } from 'react';
import './Body.css';
import GetComponent from '../GetComponent/GetComponent';
import PostComponent from '../PostComponent/PostComponent';
import PutComponent from '../PutComponent/PutComponent';
import DeleteComponent from '../DeleteComponent/DeleteComponent';

export default function Body() {
    const [selectedSection, setSelectedSection] = useState('get');

    const handleSectionClick = (sectionId) => {
        setSelectedSection(sectionId);
    };
    
    return (
        <div className='Body'>
            <div className='Navigation'>
            <section id='get' onClick={() => handleSectionClick('get')} style={{ backgroundColor: selectedSection === 'get' ? 'rgb(83, 83, 255)' : 'rgb(41, 41, 41)' }}>Получить</section>
            <section id='post' onClick={() => handleSectionClick('post')} style={{ backgroundColor: selectedSection === 'post' ? 'rgb(68, 187, 68)' : 'rgb(41, 41, 41)' }}>Добавить</section>
            <section id='put' onClick={() => handleSectionClick('put')} style={{ backgroundColor: selectedSection === 'put' ? 'rgb(255, 174, 23)' : 'rgb(41, 41, 41)' }}>Изменить</section>
            <section id='delete' onClick={() => handleSectionClick('delete')} style={{ backgroundColor: selectedSection === 'delete' ? 'rgb(255, 89, 67)' : 'rgb(41, 41, 41)' }}>Удалить</section>
            </div>
            <div className='Content'>
                {selectedSection === 'get' && <GetComponent />}
                {selectedSection === 'post' && <PostComponent />}
                {selectedSection === 'put' && <PutComponent />}
                {selectedSection === 'delete' && <DeleteComponent />}
            </div>
        </div>
    );
}

