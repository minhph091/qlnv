import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Home() {
    const [data, setData] = useState([]);
    const idAdd = "-1";

    const [checkbox, setCheckbox] = useState([]);

    function handleDelete(id) {
        const confirm = window.confirm(`Bạn có thực sự muốn xoá nhân viên có mã = ${id} ?`);

        if (confirm)
            axios.delete("http://localhost:3000/employees/" + id).then((response) => {
                alert("Xoá thành công !");
                axios.get("http://localhost:3000/employees").then((response) => setData(response.data));
            });
    }

    function handleCheckBox(id) {
        if (!checkbox.includes(id)) {
            checkbox.push(id);
        } else {
            let index = checkbox.findIndex((a) => a == id);
            checkbox[index] = -1;
        }
        console.log(checkbox);
    }
    function deleteMany() {
        const confirm = window.confirm(`Bạn có thực sự muốn xoá nhiều nhân viên có`);
        if (confirm) {
            checkbox.map((id) => {
                if (id != -1) {
                    axios.delete("http://localhost:3000/employees/" + id);
                }
                return 0;
            });
            axios.get("http://localhost:3000/employees").then((response) => setData(response.data));
        }
    }

    useEffect(() => {
        axios
            .get("http://localhost:3000/employees")
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className="container mt-5">
                <h3>Quản Lý Nhân Viên</h3>

                <div class="menu-button">
                    {" "}
                    <Link to={`/update/${idAdd}`} className="btn btn-primary">
                        Thêm mới nhân viên
                    </Link>
                    <button onClick={() => deleteMany()} className="btn btn-warning">
                        Delete all
                    </button>
                </div>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" />
                            </th>
                            <th>ID</th>
                            <th>Họ Và Tên</th>
                            <th>Tuổi</th>
                            <th>Lương</th>
                            <th>Quê Quán</th>
                            <th>Thao Tác</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((d) => (
                            <tr key={d.id}>
                                <td>
                                    <input type="checkbox" name={d.id} id="" onClick={() => handleCheckBox(d.id)} />
                                </td>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.age}</td>
                                <td>{d.salary}</td>
                                <td>{d.address}</td>
                                <td>
                                    <Link to={`/update/${d.id}`} className="btn btn-warning">
                                        Cập nhật
                                    </Link>

                                    <button onClick={() => handleDelete(d.id)} className="btn btn-danger">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Home;
