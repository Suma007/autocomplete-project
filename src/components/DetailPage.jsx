import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DetailPage = () => {
    const { name } = useParams();
    const [itemDetails, setItemDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/fetchData?q=${name}`);
                if (response.data) {
                    setItemDetails(response.data);
                } else {
                    setError('No data found');
                }
            } catch (error) {
                setError('Error fetching data: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [name]);

    const handleBack = () => {
        navigate(-1);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className="container">
                <button className="btn btn-outline-primary mb-3" onClick={handleBack}>Back</button>
                <div>{error}</div>
            </div>
        );
    }

    if (!itemDetails || !itemDetails.albums || itemDetails.albums.length === 0) {
        return (
            <div className="container">
                <button className="btn btn-outline-primary mb-3" onClick={handleBack}>Back</button>
                <div>No albums found for this artist.</div>
            </div>
        );
    }

    return (
        <div className="container">
            <button className="btn btn-outline-primary mb-3" onClick={handleBack}>Back</button>
            <h1>Artist Name: {itemDetails.name}</h1>
            <br />
            <div className='accordion'>
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
                <br />
            </div>
        </div>
    );
};

export default DetailPage;
