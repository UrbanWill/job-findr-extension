import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    console.log('content view loaded');
  }, []);

  return <div className="bg-red-500 p-2 fixed right-0 bottom-0 z-50">content view</div>;
}
