package com.minph091.qlnv.service;

import com.minph091.qlnv.dto.EmployeeCreateRequest;
import com.minph091.qlnv.dto.EmployeeUpdateRequest;
import com.minph091.qlnv.entity.Employee;
import com.minph091.qlnv.exception.UserNotFoundException;
import com.minph091.qlnv.mapper.EmployeeMapper;
import com.minph091.qlnv.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    private EmployeeRepository employeeRepository;
    private EmployeeMapper employeeMapper;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, EmployeeMapper employeeMapper) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
    }

    @Transactional
    public Optional<Employee> getEmployeeById(int id) {
        return employeeRepository.findById(id);
    }

    @Transactional
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Transactional
    public Employee addEmployee(EmployeeCreateRequest request) {
        Employee employee = new Employee();
        employee = employeeMapper.toEmployeeFromCreateRequest(request);
        employeeRepository.save(employee);
        return employee;
    }

    @Transactional
    public void deleteEmployee(int id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(()
                -> new UserNotFoundException("Không tìm thấy người dùng"));
        employeeRepository.delete(employee);
    }

    @Transactional
    public Employee updateEmployee(Integer id, EmployeeUpdateRequest request) {
        Employee employee = employeeRepository.findById(id).orElseThrow(()
                -> new UserNotFoundException("Không tìm thấy người dùng"));
        employeeMapper.toEmployeeFromUpdateRequest(request, employee);
        employeeRepository.save(employee);
        return employee;
    }

}
