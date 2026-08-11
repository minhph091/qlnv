import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Manage.css";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BASE_URL } from "../config"
export default function Home() {
    const [data, setData] = useState([]);
    const idAdd = "-1";
    let [isSelectAll, setIsSelectAll] = useState(false)
    const [checkbox, setCheckbox] = useState([]);

    useEffect(() => {
        console.log("Danh sách checkbox:", checkbox);
    }, [checkbox]);

    function handleDelete(id) {
        const confirm = window.confirm(`Bạn có thực sự muốn xoá nhân viên có mã = ${id} ?`);

        if (confirm)
            axios.delete(BASE_URL + "/" + id).then((response) => {
                alert("Xoá thành công !");
                axios.get(BASE_URL).then((response) => setData(response.data));
            });
    }

    function handleCheckBox(id, isChecked) {

        if (isChecked) {
            setCheckbox(checkbox => [...checkbox, id])
        } else {
            setCheckbox(checkbox => checkbox.filter(element => element !== id));
        }

    }
    async function deleteMany() {
        if (checkbox.length == 0) {
            window.confirm(`Vui lòng chọn nhiều nhân viên`)
            return;
        };
        const confirmDelete = window.confirm(`Bạn có thực sự muốn xoá nhiều nhân viên có`);
        if (confirmDelete) {
            await Promise.all(
                checkbox.map(id =>
                    axios.delete(BASE_URL + "/" + id))
                )

            const response = await axios.get(BASE_URL)
            setData(response.data)
            setCheckbox([])
        }
    }

    function selectAll() {
        const allElement = document.querySelectorAll('.employee');
        allElement.forEach(element => {
            element.checked = !isSelectAll;
            handleCheckBox(element.name, !isSelectAll)
        })
        isSelectAll = setIsSelectAll(!isSelectAll);

    }

    useEffect(() => {
        axios
            .get(BASE_URL)
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className="container mt-5">
                <h3>Quản Lý Nhân Viên</h3>

                <div className="menu-button">
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
                                <input type="checkbox" className="text-center" onClick={() => selectAll()} />
                            </th>
                            <th className="text-center">ID</th>
                            <th className="text-center">Họ Và Tên</th>
                            <th className="text-center">Tuổi</th>
                            <th className="text-center">Lương</th>
                            <th className="text-center">Quê Quán</th>
                            <th className="text-center">Thao Tác</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((d) => (
                            <tr key={d.id}>
                                <td>
                                    <input type="checkbox" name={d.id} id="" className="employee" onChange={(e) => handleCheckBox(d.id, e.target.checked)} />
                                </td>
                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.age}</td>
                                <td>{d.salary}</td>
                                <td>{d.address}</td>
                                <td>
                                    <Link to={`/update/${d.id}`} className="btn btn-warning me-2">
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
