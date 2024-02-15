import "../../styles/components/UI/Question.scss";

const Question = ({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) => {
    const toggleActive = (e: any) => {
        e.target.classList.toggle("active");
    };
    return (
        <div className="question-block">
            <div onClick={toggleActive} className="question">
                {question}
                <div className="question-caret">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                    >
                        <path
                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                            fill="currentColor"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="answer small-text">{answer}</div>
        </div>
    );
};

export default Question;
