import './reviews.css'
import ReviewSlider from './Slider'


export default function Reviews() {
    return (
        <section className="reviews" id='reviews'>
            <div className="container">
                <h2>отзывы</h2>
                <ReviewSlider />
            </div>
        </section>
    )
}
