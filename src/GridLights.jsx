import { useEffect, useState } from 'react';

const GRID_SIZE = 3;
const TOTAL = GRID_SIZE * GRID_SIZE;

export default function GridLights() {
  const [activationOrder, setActivationOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  // Derived value — no separate state needed
  const activeCells = new Set(activationOrder);

  const handleClick = (index) => {
    if (isDeactivating || activeCells.has(index)) return;

    const nextOrder = [...activationOrder, index];
    setActivationOrder(nextOrder);

    if (nextOrder.length === TOTAL) {
      setIsDeactivating(true);
    }
  };

  useEffect(() => {
    if (!isDeactivating) return;

    const timers = activationOrder.map((_, i) =>
      setTimeout(() => {
        setActivationOrder(
          activationOrder.slice(0, activationOrder.length - i - 1)
        );
      }, i * 100)
    );

    timers.push(
      setTimeout(() => {
        setActivationOrder([]);
        setIsDeactivating(false);
      }, activationOrder.length * 100)
    );

    return () => timers.forEach(clearTimeout);
  }, [isDeactivating]);

  const resetGrid = () => {
    setActivationOrder([]);
    setIsDeactivating(false);
  };

  return (
    <div className="main-container">
      <h1 className="grid-title">Grid Lights</h1>

      <div className="button-section">
        <button onClick={resetGrid} data-testid="reset-btn">
          Reset Grid
        </button>
      </div>

      <div className="cinema-hall" data-testid="grid-lights">
        {Array.from({ length: GRID_SIZE }, (_, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: GRID_SIZE }, (_, colIdx) => {
              const index = rowIdx * GRID_SIZE + colIdx;

              return (
                <div
                  key={index}
                  className={`cell col ${
                    activeCells.has(index) ? 'active' : ''
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