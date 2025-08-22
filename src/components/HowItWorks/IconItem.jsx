export default function IconItem({ item }) {
    return (
        <div className="list-element">
            <img src={item.url} alt="img" />
            <p>{item.text}</p>
        </div>
    )
}
