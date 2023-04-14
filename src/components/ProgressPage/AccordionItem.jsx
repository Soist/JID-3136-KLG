import React, {useRef, useState} from 'react';

const AccordionItem = ({ results }) => {

    const [clicked, setClicked] = useState(false);
    const contentEl = useRef();

    const { unit, progress } = results;

    const handleToggle = () => {
        setClicked((prev) => !prev);
    };

    return (
        <li className={`accordion_item ${clicked ? "active" : ""}`}>
            <button className="button" onClick={handleToggle}>
                {unit}
                <span className="control">{clicked ? "∨" : ">"} </span>
            </button>

            <div
                ref={contentEl}
                className="answer_wrapper"
                style={
                    clicked
                        ? { height: contentEl.current.scrollHeight }
                        : { height: "0px" }
                }
            >
                <div className="answer">{progress}</div>
            </div>
        </li>
    );
};

export default AccordionItem;
