const base = import.meta.env.BASE_URL;

export default function ReviewItem({ element }) {
  return (
    <div className="review-item">
      <img src={base + element.src} alt="image-review" />
      <div className="review-content">
        <span className="review-title">{element.user}</span>
        <p>
          <span className="quotesLT">“</span> {element.text}{" "}
          <span className="quotesRB">”</span>
        </p>
      </div>
    </div>
  );
}
