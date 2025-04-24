import React, { useContext, useState } from 'react';
import "./sidebar.css";
import { assets } from '../../assets/assets';  // Ensure this path is correct
import { Context } from '../../context/Context';  // Ensure this path is correct

const Sidebar = () => {
    const [extended, setExtended] = useState(false);  // State for toggling sidebar visibility
    const { onSent, prevPrompt, setRecentPrompt } = useContext(Context);  // Destructuring context values

    const Loadprompt = async (prompt) => {
        if (prompt && prompt.trim() !== "") {  // Ensure prompt is not empty
            setRecentPrompt(prompt);
            await onSent(prompt);
        } else {
            console.error("Selected prompt is empty!");
        }
    };

    return (
        <div className='sidebar'>
            <div className="top">
                {/* Top of the sidebar (Menu and New Chat section) */}
                <img
                    src={assets.menu_icon}
                    className='menu'
                    alt="Menu"
                    onClick={() => setExtended(prev => !prev)}  // Toggle the expanded state
                />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="New Chat" />
                    {extended ? <p>New chat</p> : null}
                </div>

                {extended ? (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {/* Ensure prevPrompt is not null or undefined */}
                        {Array.isArray(prevPrompt) && prevPrompt.length > 0 ? (
                            prevPrompt.map((item, index) => (
                                <div
                                    key={index}
                                    className="recent-entry"
                                    onClick={() => {
                                        Loadprompt(item);
                                    }}
                                >
                                    <img src={assets.message_icon} alt="Message Icon" />
                                    <p>{item}</p>
                                </div>
                            ))
                        ) : (
                            <p>No recent prompts.</p>  // Fallback message when no recent prompts
                        )}
                    </div>
                ) : null}
            </div>

            {/* Bottom of the sidebar (Help, Activity, Settings sections) */}
            <div className="bottom">
                <div className="bottom-item">
                    <img src={assets.question_icon} alt="Help Icon" />
                    {extended ? <p>Help</p> : null}
                </div>

                <div className="bottom-item">
                    <img src={assets.history_icon} alt="History Icon" />
                    {extended ? <p>Activity</p> : null}
                </div>

                <div className="bottom-item">
                    <img src={assets.setting_icon} alt="Setting Icon" />
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
