import { ReactElement } from "react";
import "./style.css";

export interface IRatingProps {
    rating: number;
    maxRating?: number;
    badRating?: number;
}

const DEFAULT_MAX_RATING: number = 5;
const DEFAULT_BAD_RATING: number = 3;

const Rating = ({
    rating,
    maxRating = DEFAULT_MAX_RATING,
    badRating = DEFAULT_BAD_RATING,
}: IRatingProps): ReactElement => {
    const integerRating: number = Math.floor(rating);

    const isBadRating: boolean = integerRating <= badRating;

    if (!isBadRating) {
        return (
            <span className="rating-wrapper">{`${rating}/${maxRating}`}</span>
        );
    }

    return (
        <span className="rating-wrapper">
            <span className="rating bad">{rating}</span>
            <span className="max-rating">{`/${maxRating}`}</span>
        </span>
    );
};

export default Rating;
