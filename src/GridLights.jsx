import { useEffect, useState } from 'react';

const TOTAL = 9;
const GRID_SIZE = 3;

export default function GridLights() {
  const [activeCells, setActiveCells] = useState(new Set());
  const [activationOrder, setActivationOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleClick = (index) => {
    // TODO: Implement click logic
    let list = [...activationOrder]
    if (list.indexOf(index) < 0) { 
      list.push(index)
      setActiveCells((prev) => { 
        return new Set([...prev, index])
      })
    }
    if (list.length == 9) { 
      console.log('setting Deactivating')
      setIsDeactivating(true)
    }
    setActivationOrder(list)
  };

  useEffect(() => {
    console.log('calling startReverseDeactivation', isDeactivating)

    if (isDeactivating) { 
      startReverseDeactivation(activationOrder)
    }
   }, [isDeactivating])

  const startReverseDeactivation = (order) => {
    // TODO: Implement reverse deactivation
    let list = [...order]
    list.forEach((_, i) => {
      setTimeout(() => {
        const newList = list.slice(0, list.length - i - 1);
        setActiveCells(new Set(newList));
      }, i * 100);
    });
    setTimeout(() => {
      setActivationOrder([]);
      setIsDeactivating(false);
    }, list.length * 100);
  };

  const resetGrid = () => {
    // TODO: Implement reset logic
    setActivationOrder([])
    setActiveCells(new Set([]))
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
                  className={`cell col ${activeCells.has(index) ? 'active' : ''}`}
                  onClick={() => handleClick(index)}
                  data-testid={`cell-${index}`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
