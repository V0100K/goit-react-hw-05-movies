import s from '../Reviews/Reviews.module.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMovieReviews } from '../../servises/api';

const Reviews = ({ setError}) => {

    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // setReviews([]);
        getMovieReviews(movieId).then((data) =>
            !data ? setReviews('No reviews') : setReviews(data.results))
            .catch((err) => setError(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (reviews.length > 0) {
        return(
            <ul className={s.reviews}>
                {reviews.map((reviwe) => <li className={s.reviewsItem} key={reviwe.id}>
                    <h2 className={s.reviewsTitle}>{reviwe.author}</h2>
                    <p className={s.reviewsDescr}>{reviwe.content}</p>
                </li>)}
            </ul>)
    }

    else {
        return (<p className={s.noneReview}>This movie hadn't any reviwes.</p>)
    }

    // return (

    //   <ul className={s.reviews}>
    //     {reviews.length > 0 ? reviews.map((reviwe) => <li className={s.reviewsItem} key={reviwe.id}>
    //       <h2 className={s.reviewsTitle}>{reviwe.author}</h2>
    //       <p className={s.reviewsDescr}>{reviwe.content}</p>
    //     </li>) : <p className={s.noneReview}>This movie hadn't any reviwes.</p>}
    //   </ul>
    // )
}

export default Reviews;