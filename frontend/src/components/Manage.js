import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Manage.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BASE_URL } from "../config";

export default function Home() {
    const [data, setData] = useState([]);
    const idAdd = "-1";

    const [isSelectAll, setIsSelectAll] = useState(false);
    const [checkbox, setCheckbox] = useState([]);
    const [search, setSearch] = useState("");

    // Theo dõi danh sách checkbox
    useEffect(() => {
        console.log("Danh sách checkbox:", checkbox);
    }, [checkbox]);

    // Lấy danh sách nhân viên
    useEffect(() => {
        axios
            .get(BASE_URL)
            .then((response) => setData(response.data))
            .catch((error) => console.log(error));
    }, []);

    // Xóa một nhân viên
    function handleDelete(id) {
        const confirmDelete = window.confirm(
            `Bạn có thực sự muốn xoá nhân viên có mã = ${id} ?`
        );

        if (confirmDelete) {
            axios
                .delete(BASE_URL + "/" + id)
                .then(() => {
                    alert("Xoá thành công!");

                    return axios.get(BASE_URL);
                })
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    // Xử lý checkbox từng nhân viên
    function handleCheckBox(id, isChecked) {
        if (isChecked) {
            setCheckbox((checkbox) => [...checkbox, id]);
        } else {
            setCheckbox((checkbox) =>
                checkbox.filter((element) => element !== id)
            );
        }
    }

    // Xóa nhiều nhân viên
    async function deleteMany() {
        if (checkbox.length === 0) {
            window.alert("Vui lòng chọn nhân viên cần xoá");
            return;
        }

        const confirmDelete = window.confirm(
            `Bạn có thực sự muốn xoá ${checkbox.length} nhân viên đã chọn?`
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await Promise.all(
                checkbox.map((id) =>
                    axios.delete(BASE_URL + "/" + id)
                )
            );

            const response = await axios.get(BASE_URL);

            setData(response.data);
            setCheckbox([]);
            setIsSelectAll(false);

            alert("Xoá thành công!");
        } catch (error) {
            console.log(error);
            alert("Có lỗi xảy ra khi xoá!");
        }
    }

    // Chọn / bỏ chọn tất cả
    function selectAll() {
        const newSelectAll = !isSelectAll;

        setIsSelectAll(newSelectAll);

        if (newSelectAll) {
            const allIds = filteredData.map((d) => d.id);
            setCheckbox(allIds);
        } else {
            setCheckbox([]);
        }
    }

    // Lọc dữ liệu theo từ khóa tìm kiếm
    const filteredData = data.filter((d) => {
        const keyword = search.toLowerCase().trim();

        if (!keyword) {
            return true;
        }

        return (
            String(d.id).toLowerCase().includes(keyword) ||
            String(d.name).toLowerCase().includes(keyword) ||
            String(d.address).toLowerCase().includes(keyword)
        );
    });

    return (
        <>
            <div className="container mt-5">
                <h3>Quản Lý Nhân Viên</h3>

                <div className="menu-button mb-3">
                    <Link
                        to={`/update/${idAdd}`}
                        className="btn btn-primary me-2"
                    >
                        Thêm mới nhân viên
                    </Link>

                    <button
                        onClick={deleteMany}
                        className="btn btn-warning"
                    >
                        Delete all
                    </button>
                </div>

                {/* Search */}
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm theo ID, họ tên hoặc quê quán..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    className="text-center"
                                    checked={isSelectAll}
                                    onChange={selectAll}
                                />
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
                        {filteredData.map((d) => (
                            <tr key={d.id}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={d.id}
                                        className="employee"
                                        checked={checkbox.includes(d.id)}
                                        onChange={(e) =>
                                            handleCheckBox(
                                                d.id,
                                                e.target.checked
                                            )
                                        }
                                    />
                                </td>

                                <td>{d.id}</td>
                                <td>{d.name}</td>
                                <td>{d.age}</td>
                                <td>{d.salary}</td>
                                <td>{d.address}</td>

                                <td>
                                    <Link
                                        to={`/update/${d.id}`}
                                        className="btn btn-warning me-2"
                                    >
                                        Cập nhật
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleDelete(d.id)
                                        }
                                        className="btn btn-danger"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Không tìm thấy */}
                {filteredData.length === 0 && (
                    <div className="text-center mt-3">
                        Không tìm thấy nhân viên phù hợp.
                    </div>
                )}
            </div>
        </>
    );
}