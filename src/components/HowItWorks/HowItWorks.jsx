import "./HowItWorks.css";
import IconItem from "./IconItem";

export default function HowItWorks() {
  const icons = [
    {
      url: "/monitor-icon.png",
      text: `Удобный заказ на сайте`,
    },
    {
      url: "/home-icon.png",
      text: `Нет необходимости ехать в офис`,
    },
    {
      url: "/global-icon.png",
      text: `Огромный выбор направлений`,
    },
  ];

  return (
    <section className="how-it-works" id="howitworks">
      <div className="hiw-header">
        <h2>Как это работает</h2>
        <a href="/">Узнать больше</a>
      </div>
      <div className="content">
        <ul>
          {icons.map((item, index) => {
            return (
              <li key={index}>
                <IconItem item={item} index={index} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
