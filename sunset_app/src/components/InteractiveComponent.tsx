// components/InteractiveComponent.tsx
'use client';

import React, { useState } from 'react';

const InteractiveComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
};

export default InteractiveComponent;