import { BrowserRouter, Routes, Route } from "react-router-dom";
import PatientForm from './patient/PatientForm';
import PatientTable from './patient/PatientTable';
import PatientProfile from "./patient/PatientProfile";
import PatientReport from "./patient/PatientReport";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PatientTable />} />
        <Route path="/add" element={<PatientForm />} />
        <Route path="/patients/:id" element={<PatientProfile />} />
        <Route path="/report/:uuid" element={<PatientReport />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
