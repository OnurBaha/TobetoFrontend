import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import Navi from '../../components/navbar/Navi';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BASE_API_URL } from '../../enviroment/enviroment';

interface Question {
    surveyID: number;
    id: number;
    text: string;
    type: string;
}

export default function SuccessModel1() {
    const auth = useSelector((state: any) => state.auth);
    const userID = auth.user.id;
    const [currentSection, setCurrentSection] = useState(1);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [answeredQuestions, setAnsweredQuestions] = useState(0);
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleRadioChange = (questionId: any, value: any) => {
        const isQuestionAlreadyAnswered = answers.hasOwnProperty(questionId);
        setAnswers({ ...answers, [questionId]: value });
        if (!isQuestionAlreadyAnswered) {
            setAnsweredQuestions(answeredQuestions + 1);
        }
    };

    const handlePrevClick = () => {
        if (currentSection > 1) {
            setCurrentSection(currentSection - 1);
        }
    };

    const handleNextClick = () => {
        if (currentSection < totalQuestionCount / 10) { // Assuming each section has 10 questions
            setCurrentSection(currentSection + 1);
        }
    };
    const handleFinishClick = async () => {
        const addSurveyAnswerRequests = Object.entries(answers).map(([questionId, answerValue]) => ({
            userID: userID,
            surveyID: 1, 
            questionID: parseInt(questionId),
            answerValue: answerValue,
        }));

        const response = await axios.post(`${BASE_API_URL}Surveys/SubmitAnswers`, addSurveyAnswerRequests);
        // Handle the response
    };
    const totalQuestionCount = 80;

    const progressWidth = (answeredQuestions / totalQuestionCount) * 100;
    useEffect(() => {
        const sectionQuestions = questions.slice((currentSection - 1) * 10, currentSection * 10);
        const allAnswered = sectionQuestions.every(question => answers.hasOwnProperty(question.id));
        setAllQuestionsAnswered(allAnswered);
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}Surveys/surveys/1`);
                const { surveyQuestions } = response.data;
                const formattedQuestions = surveyQuestions.map((questionData: any) => ({
                    id: questionData.questionId,
                    text: questionData.questionText,
                }));
                setQuestions(formattedQuestions);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchQuestions();
    }, [currentSection, questions, answers]);

    const sectionQuestions = questions.slice((currentSection - 1) * 10, currentSection * 10);

    return (
        <div>
            <Navi />
            <main>
                <div className="bg-light">
                    <div className="container px-7 pt-10 pb-5">
                        <h6 className="text-center f-size-24 text-secondary">
                            Tobeto İşte Başarı Modeli{' '}
                        </h6>
                    </div>
                </div>
                <section className="bg-light py-2">
                    <div className="container mb-6">
                        <div className="p-6 mb-6 bg-white rounded shadow">
                            <div className="progress mt-5 mw-3xl mx-auto mb-10" style={{ height: "25px", borderRadius: "30px" }}>
                                <div className="progress-bar" role="progressbar" aria-valuenow={progressWidth} aria-valuemin={0} aria-valuemax={100} style={{ width: `${progressWidth}%`, borderRadius: "30px" }}>
                                    {progressWidth.toFixed(2)}%
                                </div>
                            </div>
                            <div className="row">
                                <div className="table-responsive">
                                    <table className="table tbt-table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Tobeto İşte Başarı Modeli</th>
                                                <th scope="col" style={{ textAlign: "center" }}>--</th>
                                                <th scope="col" style={{ textAlign: "center" }}>-</th>
                                                <th scope="col" style={{ textAlign: "center" }}>0</th>
                                                <th scope="col" style={{ textAlign: "center" }}>+</th>
                                                <th scope="col" style={{ textAlign: "center" }}>++</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sectionQuestions.map((question) => (
                                                <tr key={question.id}>
                                                    <td className="d-flex gap-1" style={{ paddingRight: "40px" }}>
                                                        <b>{question.id}-</b>
                                                        <span><p>{question.text}</p></span>
                                                    </td>
                                                    {[1, 2, 3, 4, 5].map(value => (
                                                        <td key={value}>
                                                            <input
                                                                className="form-check-input mx-2"
                                                                type="radio"
                                                                name={question.id.toString()}
                                                                value={value.toString()}
                                                                checked={answers[question.id] === value.toString()}
                                                                onChange={() => handleRadioChange(question.id, value.toString())}
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-12 text-center mt-4">
                                <button className="btn btn-primary d-inline-block" style={{ marginRight: "10px" }} onClick={handlePrevClick} disabled={currentSection === 1}>Geri</button>
                                {currentSection < totalQuestionCount / 10 ? (
                                    <button className="btn btn-primary d-inline-block" onClick={handleNextClick} disabled={!allQuestionsAnswered}>İleri</button>
                                ) : (

                                    <Link to="/profilim/degerlendirmeler/rapor/tobeto-iste-basari-modeli/1" className="btn btn-primary d-inline-block" onClick={handleFinishClick}>
                                        Değerlendirmeyi Bitir
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
