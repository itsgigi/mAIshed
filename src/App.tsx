import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Homepage from './pages/Homepage';
import UiElements from './pages/UiElements';
import Hooks from './pages/Hooks';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/ui" element={<UiElements />} />
        <Route path="/hooks" element={<Hooks />} />
        {/* <Route path="/:type" element={<Homepage />} /> */}
      </Routes>
    </Layout>
  )
}

export default App