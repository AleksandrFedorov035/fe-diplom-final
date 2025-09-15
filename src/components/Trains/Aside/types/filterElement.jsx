const base = import.meta.env.BASE_URL;

export default function FilterElement({ el, checked, onChange }) {
  const onSwitchClick = (e) => {
    const checkbox = e.target.previousElementSibling;
    const nextChecked = !checkbox.checked;
    if (typeof onChange === "function") onChange(nextChecked);
  };

  return (
    <div className="filter">
      <img src={base + el.url} alt={el.text} />
      <span>{el.text}</span>
      <div className="switch" onClick={onSwitchClick}>
        <input
          type="checkbox"
          id={`switch_${el.id}`}
          className="switch__control"
          readOnly
          checked={!!checked}
        />
        <label htmlFor={`switch_${el.id}`} className="switch__toggle"></label>
      </div>
    </div>
  );
}
