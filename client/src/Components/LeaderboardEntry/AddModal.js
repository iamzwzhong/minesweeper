import React, {useState} from 'react';
import {secondsToTimer} from '../../helpers';

import './Modal.css'

const AddModal = ({winner, modalVisible, onClick, score, bombs}) => {

    const [name, setName] = useState("");
    let difficulty = "";

    if (!modalVisible || !winner) {
        return null;
    }

    if (bombs === 10) {
        difficulty = "Beginner";
    }
    else if (bombs === 40) {
        difficulty = "Intermediate";
    }
    else if (bombs === 99) {
        difficulty = "Expert";
    }

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = {name, difficulty, score};
            const response = await fetch("/leaderboards", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            if (response.status === 200) {
                alert('Successfully added entry');
                setName("");
                onClick();
            }

        } catch (error) {
            alert('Failed to add entry. Check console for error message.');
            console.error(error.message);
        }
    }

    

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClick}>&times;</span>
                <form className="form" onSubmit={onSubmitForm}>
                    <div className="form-items">You win!</div>
                    <input type = "text" className = "input form-items" placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
                    <div className="form-items">Difficulty: {difficulty}</div>
                    <div className="form-items">Timer: {secondsToTimer(score)}</div>
                    <button className = "form-items">Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddModal;