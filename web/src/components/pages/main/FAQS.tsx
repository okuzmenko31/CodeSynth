import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cone from "../../../assets/cone.png";
import { faqsData } from "../../../data/faqs";
import "../../../styles/components/pages/main/FAQS.scss";
import Question from "../../UI/QuestionTemplate";

export type QuestionType = {
    question: string;
    answer: string;
};

const FAQS = () => {
    const [faqs, setFaqs] = useState<QuestionType[]>([]);
    const staticData = useSelector(
        (state: any) => state.staticReducer.staticData
    );

    const getFaqs = async () => {
        if (!staticData) {
        } else {
            setFaqs(faqsData);
        }
    };

    useEffect(() => {
        getFaqs();
    }, []);
    return (
        <div id="faqs" className="questions-container">
            <div className="questions-header">
                <div className="particle">
                    <img src={Cone} alt="cone" />
                </div>
                <p className="big-text capitalize bold">FAQs</p>
            </div>

            <div className="questions-block">
                {faqs &&
                    faqs.map((faq: QuestionType, index: number) => (
                        <Question
                            key={index}
                            answer={faq.answer}
                            question={faq.question}
                        />
                    ))}
            </div>
        </div>
    );
};

export default FAQS;
