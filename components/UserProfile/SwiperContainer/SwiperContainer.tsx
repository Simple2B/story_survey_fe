import React, { ReactElement } from 'react';
import { Navigation, Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "../../Home/Home.module.css";
import Success from '../Success/Success';

const SwiperContainer = ({setSlide, survey, answers, handleChangeAnswer}): ReactElement => {
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
                                    {
                                        index === (survey.questions.length - 1) ?
                                        <Success survey={survey} styles={styles.isSuccess}/>
                                        :
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
