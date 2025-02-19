
import { Link } from "react-router-dom";
import { IconContext } from 'react-icons' //IconContextをインポート
import { FaHouseChimney } from "react-icons/fa6";
import { FaPersonWalking } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { GoPersonAdd } from "react-icons/go";
import { BsQrCode } from "react-icons/bs";
import './App.css'

function Menu() {

  return (
    <nav>
        <Link to="/Dashboard">
            <div className="link-box">
                <label className="link-icon">
                <IconContext.Provider value={{ color: '#000', size: '30px' }}>
                    <FaHouseChimney />
                </IconContext.Provider>
                </label>
                <label className="link-text">
                    <h1>ダッシュボード</h1>
                </label>
            </div>
        </Link>
        <Link to="/TakeAttendance">
            <div className="link-box">
                <label className="link-icon">
                <IconContext.Provider value={{ color: '#000', size: '30px' }}>
                    <FaPersonWalking />
                </IconContext.Provider>
                </label>
                <label className="link-text">
                    <h1>出席確認</h1>
                </label>
            </div>
        </Link>
        <Link to="/ExperiencerList">
            <div className="link-box">
                <label className="link-icon">
                <IconContext.Provider value={{ color: '#000', size: '30px' }}>
                    <GoPersonAdd />
                </IconContext.Provider>
                </label>
                <label className="link-text">
                    <h1>体験者情報</h1>
                </label>
            </div>
        </Link>
        <Link to="/AllList">
            <div className="link-box">
                <label className="link-icon">
                <IconContext.Provider value={{ color: '#000', size: '30px' }}>
                    <GoPeople />
                </IconContext.Provider>
                </label>
                <label className="link-text">
                    <h1>生徒一覧</h1>
                </label>
            </div>
        </Link>
        <Link to="/QRcodeReading">
            <div className="link-box">
                <label className="link-icon">
                <IconContext.Provider value={{ color: '#000', size: '30px' }}>
                    <BsQrCode />
                </IconContext.Provider>
                </label>
                <label className="link-text">
                    <h1>QR出席</h1>
                </label>
            </div>
        </Link>
    </nav>
    );
  }

  export default Menu;