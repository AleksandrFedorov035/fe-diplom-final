const base = import.meta.env.BASE_URL;

export default function LogoLine() {
  return (
    <div className="logoLine">
      <div className="logoLine-container">
        <a href="/" className="logo-logoLine">
          Лого
        </a>
        <img src={base + "/footer-arrow.png"} alt="arrow" />
        <span>2018 WEB</span>
      </div>
    </div>
  );
}
