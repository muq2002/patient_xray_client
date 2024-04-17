import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientForm from './patient/PatientForm';
import PatientTable from './patient/PatientTable';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientTable />} />
        <Route path="/add" element={<PatientForm />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
