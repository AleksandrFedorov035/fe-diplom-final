const base = import.meta.env.BASE_URL;

export default function ListTicket({ el }) {
  const fromCity = el?.departure?.from?.city?.name || "";
  const toCity = el?.departure?.to?.city?.name || "";
  const fromStation = el?.departure?.from?.railway_station_name || "";
  const toStation = el?.departure?.to?.railway_station_name || "";
  const minPrice = el?.min_price || el?.departure?.min_price || 0;
  const hasWifi = !!el?.departure?.have_wifi;
  const isExpress = !!el?.departure?.is_express;
  const hasFirstClass = !!el?.departure?.have_first_class;

  return (
    <div className="listTicket">
      <div className="listTicket-header">
        <div className="fromToCity">
          <span>{fromCity}</span>
          <span>{toCity}</span>
        </div>
        <div className="railway-station">
          <span>{fromStation}</span>
          <span>{toStation}</span>
        </div>
      </div>
      <div className="listTicket-footer">
        <div className="icons">
          {hasWifi && <img src={base + "/trains-types/wifi.svg"} alt="wifi" />}
          {isExpress && (
            <img src={base + "/trains-types/rocket.svg"} alt="rocket" />
          )}
          {hasFirstClass && <img src={base + "/cap.svg"} alt="cap" />}
        </div>
        <div className="prices">
          <div>
            <span className="ot">от </span>
            <span className="price">{minPrice}</span>
            <span className="ruble">₽</span>
          </div>
        </div>
      </div>
    </div>
  );
}
