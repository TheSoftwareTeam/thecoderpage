import React, { useContext } from "react";
import './admin-home.scss'
import AdminContext from "../../context/AdminContext";
const AdminHome = () => {
  const { state } = useContext(AdminContext);
  return (
    <div id="admin-home-container">
      <table>
        <tbody>
        <tr>
                <td>👨🏻‍💻</td>
                <td>✉️</td>
                <td>❤️</td>
                <td> 💬</td>
            </tr>
            <tr>
                <td>{state.users.length}</td>
                <td>{state.problems.length}</td>
                <td>345</td>
                <td>{state.comments.length}</td>
            </tr>
           

        </tbody>
        </table>
    </div>
  );
};

export default AdminHome;
