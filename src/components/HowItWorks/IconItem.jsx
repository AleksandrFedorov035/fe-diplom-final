const base = import.meta.env.BASE_URL;

export default function IconItem({ item }) {
  return (
    <div className="list-element">
      <img src={base + item.url} alt="img" />
      <p>{item.text}</p>
    </div>
  );
}
