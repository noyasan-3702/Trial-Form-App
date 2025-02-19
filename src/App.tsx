
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import TakeAttendance from './TakeAttendance';
import ExperiencerList from './ExperiencerList';
import AllList from './AllList';
import AttendanceList from './AttendanceList';
import Menu from './Menu';
import './App.css';

function App() {

  return (
    <>
    <Router basename="/School-App">
      <div className="menu-area">
        <Menu/>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/TakeAttendance" element={<TakeAttendance />} />
          <Route path="/ExperiencerList" element={<ExperiencerList />} />
          <Route path="/AllList" element={<AllList />} />

          <Route path="/AttendanceList" element={<AttendanceList />} />
        </Routes>
      </div>
    </Router>
    </>
    );
  }

  export default App;

