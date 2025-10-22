import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TransactionsList } from './pages/TransactionsList';
import { TransactionDetail } from './pages/TransactionDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TransactionsList />} />
        <Route path="/transaction/:id" element={<TransactionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
