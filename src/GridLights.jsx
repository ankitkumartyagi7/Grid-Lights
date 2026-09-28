import { useEffect, useState } from 'react';

const GRID_SIZE = 3;
const TOTAL = GRID_SIZE * GRID_SIZE;

export default function GridLights() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleClick = (index) => {
    if (isDeactivating || order.includes(index)) return;

    const nextOrder = [...order, index];
    setOrder(nextOrder);

    if (nextOrder.length === TOTAL) {
      setTimeout(() => setIsDeactivating(true), 1000);
    }
  };

  useEffect(() => {
    if (!isDeactivating) return;

    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = prev.slice(0, -1);

        if (next.length === 0) {
          clearInterval(interval);
          setIsDeactivating(false);
        }

        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isDeactivating]);

  const resetGrid = () => {
    setOrder([]);
    setIsDeactivating(false);
  };

  return (
    <div className="main-container">
      <h1 className="grid-title">Grid Lights</h1>

      <button onClick={resetGrid} data-testid="reset-btn">
        Reset Grid
      </button>

      <div className="cinema-hall" data-testid="grid-lights">
        {Array.from({ length: GRID_SIZE }, (_, row) => (
          <div className="row" key={row}>
            {Array.from({ length: GRID_SIZE }, (_, col) => {
              const index = row * GRID_SIZE + col;

              return (
                <div
                  key={index}
                  className={`cell col ${
                    order.includes(index) ? 'active' : ''
                  }`}
                  onClick={() => handleClick(index)}
                  data-testid={`cell-${index}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}