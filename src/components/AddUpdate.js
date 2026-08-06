import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./AddUpdate.css";
function AddUpdate() {
    const { id } = useParams();
    const [inputData, setInputData] = useState({
        name: "",
        age: "",
        address: "",
        salary: "",
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let temp = {};

        if (!inputData.name.trim()) {
            temp.name = "Họ tên không được để trống";
        }

        if (!inputData.age) {
            temp.age = "Tuổi không được để trống";
        } else if (isNaN(inputData.age) || Number(inputData.age) <= 0) {
            temp.age = "Tuổi phải là số lớn hơn 0";
        }


        if (!inputData.salary) {
            temp.salary = "Lương không được để trống";
        } else if (isNaN(inputData.salary) || Number(inputData.salary) < 0) {
            temp.salary = "Lương phải là số";
        }


        if (!inputData.address.trim()) {
            temp.address = "Địa chỉ không được để trống";
        }

        setErrors(temp);

        return Object.keys(temp).length === 0;
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (id !== "-1") {
            axios
                .get("http://localhost:3000/employees/" + id)
                .then((response) => setInputData(response.data))
                .catch((error) => console.log(error));
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        if (id !== "-1") {
            axios.put("http://localhost:3000/employees/" + id, inputData).then((response) => {
                alert("Cập nhật thành công !");
                navigate("/home");
            });
        } else {
            axios.post("http://localhost:3000/employees", inputData).then((response) => {
                alert("Thêm mới thành công !");
                navigate("/home");
            });
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="form-add containeer m-5 p-5 w-50">
                <h2>{id === "-1" ? "Thêm mới" : "Cập nhật"}</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">Họ tên:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={inputData.name}
                            className="form-control"
                            onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
                        />
                        {errors.name && <p className="error">{errors.name}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="age">Tuổi:</label>
                        <input
                            id="age"
                            name="age"
                            type="text"
                            value={inputData.age}
                            className="form-control"
                            onChange={(e) => setInputData({ ...inputData, age: e.target.value })}
                        />
                        {errors.age && <p className="error">{errors.age}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="salary">Lương:</label>
                        <input
                            id="salary"
                            name="salary"
                            type="text"
                            value={inputData.salary}
                            className="form-control"
                            onChange={(e) => setInputData({ ...inputData, salary: e.target.value })}
                        />
                        {errors.salary && <p className="error">{errors.salary}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                            Địa chỉ:
                        </label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={inputData.address}
                            className="form-control"
                            onChange={(e) => setInputData({ ...inputData, address: e.target.value })}
                        />
                        {errors.address && <p className="error">{errors.address}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary me-2">
                        Submit
                    </button>
                    <Link to="/" className="btn btn-warning">
                        Cancel
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default AddUpdate;
