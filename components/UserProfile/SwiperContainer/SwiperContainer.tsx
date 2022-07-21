import React, { ReactElement } from 'react';
import { Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "../../Home/Home.module.css";

const SwiperContainer = ({setSlide, survey, answers, handleChangeAnswer, infoMessageForAnswer}): ReactElement => {
    console.log("SwiperContainer: infoMessageForAnswer ", infoMessageForAnswer)
    return (
        <Swiper
            pagination={{
            type: "custom",
            }}
            navigation={{
                prevEl: '.prev',
                nextEl: '.nextSwiper',
            }}
            onSlideChange={(swiper) => setSlide(swiper.activeIndex)}
            modules={[Pagination, Navigation]}
            className={styles.containerQuestion}
        >
                {
                    survey.questions.length > 0 && (
                        survey.questions.map((item, index) => {
                            return (
                                <SwiperSlide key={index} onClick={() => console.log("SwiperSlide") }>
                                    <div className={styles.questionBlock}>
                                        <div key={index} className={styles.question}>{index+1}). {item.question}</div>
                                        <div className={styles.answerContainer}>
                                            <textarea 
                                                placeholder="Put you answer" 
                                                value={answers[index].answer} 
                                                onChange={(e) => handleChangeAnswer(e, index)}
                                                name={item.question} 
                                                id={item.question} 
                                                cols={30} 
                                                rows={10}
                                            >
                                            </textarea>
                                        </div>
                                    </div>
                                    { 
                                        infoMessageForAnswer.message !== "" &&
                                        <div className={styles.containerMessageInfoForAnswer}>
                                            <div className={styles.messageInfoForAnswer}>
                                                {/* {infoMessageForAnswer.message} */}
                                                You already answered the {index-1 !== -1 && survey.questions[index-1].question}
                                            </div>
                                        </div>
                                        
                                    }
                                </SwiperSlide>
                            )
                        })
                    )
                }
        </Swiper>
        
    )
}

export default SwiperContainer;
