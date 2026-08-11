package com.minph091.qlnv.controller;

import com.minph091.qlnv.dto.EmployeeCreateRequest;
import com.minph091.qlnv.dto.EmployeeResponse;
import com.minph091.qlnv.dto.EmployeeUpdateRequest;
import com.minph091.qlnv.entity.Employee;
import com.minph091.qlnv.exception.UserNotFoundException;
import com.minph091.qlnv.mapper.EmployeeMapper;
import com.minph091.qlnv.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {
    private final EmployeeService employeeService;
    private final EmployeeMapper employeeMapper;

    public EmployeeController(EmployeeService employeeService, EmployeeMapper employeeMapper) {
        this.employeeService = employeeService;
        this.employeeMapper = employeeMapper;
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable Integer id) {
        Employee employee = employeeService.getEmployeeById(id).orElseThrow(()
                -> new UserNotFoundException("Employee with id " + id + " not found"));
        EmployeeResponse response = employeeMapper.toEmployeeResponse(employee);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();
        List<EmployeeResponse> response = employees.stream()
                .map(employeeMapper::toEmployeeResponse).toList();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/employees")
    public ResponseEntity<EmployeeResponse> createEmployee(@RequestBody EmployeeCreateRequest request) {
        Employee employee = employeeService.addEmployee(request);
        EmployeeResponse response = employeeMapper.toEmployeeResponse(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Integer id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployee(@PathVariable Integer id,
                                                           @RequestBody EmployeeUpdateRequest request) {
        Employee employee = employeeService.updateEmployee(id, request);
        EmployeeResponse response = employeeMapper.toEmployeeResponse(employee);
        return ResponseEntity.status(HttpStatus.OK).body(response);

    }


}
