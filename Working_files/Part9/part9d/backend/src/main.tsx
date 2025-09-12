import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import type { JSX } from 'react';

interface WelcomeProps {
  name: string;
};

const Welcome = (props: WelcomeProps) => {
  return <h1>Hello, {props.name}</h1>;
};

createRoot(document.getElementById('root')!).render(<Welcome name='Sarah' />);
