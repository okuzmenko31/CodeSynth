import React from "react";
import "../../styles/components/UI/Question.css"


const Question = ({question, answer}: {question: string, answer: string}) => {
    const toggleActive = (e: any) => {
        e.target.classList.toggle('active')
    }
    return (
        <div className="question-block">
            <div onClick={toggleActive} className="question mid-text">
                {question}
            </div>

            <div className="answer small-text">
                {answer}
            </div>
        </div>
    )
}

export default Question;