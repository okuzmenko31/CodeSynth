import "../../../styles/components/pages/main/FAQS.scss";
import Question from "../../UI/QuestionTemplate";

const FAQS = () => {
    return (
        <div id="faqs" className="questions-container">
            <div className="questions-header">
                <p className="big-text">FAQs</p>
            </div>

            <div className="questions-block">
                <Question answer="dsadas" question="dsadads" />
                <Question answer="dsadas" question="dsadads" />
                <Question answer="dsadas" question="dsadads" />
                <Question answer="dsadas" question="dsadads" />
                <Question answer="dsadas" question="dsadads" />
            </div>
        </div>
    );
};

export default FAQS;
