import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailPage = () => {
    const { name } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/fetchData?q=${name}`);
                setItemDetails(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [name]);

    if (!itemDetails) {
        return <div>Loading...</div>;
    }
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div class="container">
            <button className="btn btn-outline-primary mb-3" onClick={handleBack}>Back</button>
            <h1>Artist Name: {itemDetails.name}</h1>
            <br/>
            <div className='accordion' >
                {itemDetails.albums.map((album, index) => (
                    <div key={index} className="accordion-item">
                        <h2 className='accordion-header'>Album name - {album.title}</h2>
                        <div className='accordion-body'>
                            <p>{album.description}</p>
                            <span>The songs in the album are:</span>
                            <ul>
                                {album.songs.map((song, index) => (
                                    <li key={index}>{song.title} - {song.length}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
                <br/>
            </div>
        </div>
    );
};

export default DetailPage;
