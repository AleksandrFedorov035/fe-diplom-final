import data from "./data/data.json";
import ReviewItem from "./ItemSlide";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ReviewSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <Slider className="swiper" {...settings}>
      {data.map((element, index) => (
        <div key={index} className="slide">
          <ReviewItem element={element} />
        </div>
      ))}
    </Slider>
  );
}
