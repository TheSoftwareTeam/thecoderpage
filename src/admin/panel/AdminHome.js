import React, { useContext, useEffect } from "react";
import "./admin-home.scss";
import AdminContext from "../../context/AdminContext";
import {  FaUsers, FaComments ,FaHeart } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import Chart from 'chart.js/auto';
import { BiSolidCategoryAlt } from "react-icons/bi";
const AdminHome = () => {
  const { state } = useContext(AdminContext);



  useEffect(() => {
    // Etkileşim Grafiği
    const interactionChart = new Chart(document.getElementById('lineChart'), {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Etkileşim Grafiği',
          borderColor: 'rgba(75, 192, 192, 1)',
          data: [65, 59, 80, 81, 56, 55, 40],
        }],
      },
    });

    // Çalışanlar Grafiği
    const employeesChart = new Chart(document.getElementById('doughnut'), {
      type: 'doughnut',
      data: {
        labels: ['Kullanıcılar', 'Problemler', 'Beğeni'],
        datasets: [{
          data: [state.users.length, state.problems.length, 68],
          backgroundColor: ['#36A2EB', '#FCFF63', '#FF5656'],
        }],
      },
    });

    // Unmount işlemi
    return () => {
      interactionChart.destroy();
      employeesChart.destroy();
    };
  }, [state]);
  return (
  
     

      <div id="admin-home-container">
        <div className="cards">
          <div className="card">
            <div className="card-content">
              <div className="number">{state.users.length}</div>
              
              <div className="card-name">Kullanıcılar</div>
            </div>
            <div className="icon-box">
            <i className="logo" style={{color:"lightblue"}}><FaUsers /></i>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="number">{state.problems.length}</div>
              
              <div className="card-name">Problemler</div>
            </div>
            <div className="icon-box">
            <i className="logo" style={{color:"yellow"}}><MdReportProblem /></i>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="number">68</div>
             
              <div className="card-name">Beğeni sayısı</div>
            </div>
            <div className="icon-box">
            <i className="logo" style={{color:"red"}}><FaHeart  /></i>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="number">{state.comments.length}</div>
           
              <div className="card-name">Yorum sayısı</div>
            </div>
            <div className="icon-box">
            <i className="logo" style={{color:"cadetblue"}}><FaComments /></i>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="number">2</div>
              
              <div className="card-name">Aktif Kullanıcı</div>
            </div>
            <div className="icon-box">
            <i className="logo" style={{color:"lightblue"}}><FaUsers /></i>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="number">6</div>
              
              <div className="card-name">Çözülmüş Problemler</div>
            </div>
            <div className="icon-box">
            <i className="logo" style={{color:"yellow"}}><MdReportProblem /></i>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="number">1505</div>
             
              <div className="card-name">Toplam izlenme</div>
            </div>
            <div className="icon-box">
            <i className="logo" style={{color:"red"}}></i>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <div className="number">6</div>
           
              <div className="card-name">Kategoriler </div>
            </div>
            <div className="icon-box">
            <i className="logo" style={{color:"coral"}}><BiSolidCategoryAlt /></i>
            </div>
          </div>
        </div>
        <div className="charts">
        <div className="chart">
          <h2>Etkileşim</h2>
          <div>
            <canvas id="lineChart"></canvas>
          </div>
        </div>
        <div className="chart doughnut-chart">
          <h2>Grafik</h2>
          <div>
            <canvas id="doughnut"></canvas>
          </div>
        </div>
      </div>
      </div>

  );
};

export default AdminHome;
