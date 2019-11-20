import React from 'react';
import Star from '@material-ui/icons/Star';
import './style.css';

export default function ReviewComponent({ratting, text, name, date}){

    function renderStars() {
		return range(0, 5).map((num, idx) => {
			const isChecked = (num < ratting);

			return (
				<MyStar
					key={idx}
					index={idx}
					isChecked={isChecked}
                />
			);
		});
	}

    return (
        <div className="slideshow-container">
            <div className="quoteSlides fade">
                <div>
                    {renderStars()}
                </div>
                <p>{text}</p>
                <p className="author">{name || ""}  - {date}</p>
            </div>
        </div>
    );
}

const MyStar = (props) => {

	const fullCss = `fa-star ${props.isChecked ? 'fa-star_checked' : 'fa-star_nonactive'}`;
	return (
        <Star  className={fullCss}/>
	);
};

function range(start, end) {
	const res = [];
	for (let i = start; i < end; i++) {
		res.push(i);
	}

	return res;
}