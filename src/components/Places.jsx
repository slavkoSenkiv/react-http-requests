export default function Places({ title, fallbackText, places, onSelectPlace }) {
  return (
    <div className="places-category">
      <h2>{title}</h2>
      <ul className="places">
        {places.length === 0 ? (
          <p className="fallback-text">{fallbackText}</p>
        ) : (
          places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
