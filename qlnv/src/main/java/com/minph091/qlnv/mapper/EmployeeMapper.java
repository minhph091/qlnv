package com.minph091.qlnv.mapper;

import com.minph091.qlnv.dto.EmployeeCreateRequest;
import com.minph091.qlnv.dto.EmployeeResponse;
import com.minph091.qlnv.dto.EmployeeUpdateRequest;
import com.minph091.qlnv.entity.Employee;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    // Xử lý riêng cho phần PATCH
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEmployeeFromUpdateRequest(EmployeeUpdateRequest request, @MappingTarget Employee entity);


    EmployeeResponse toEmployeeResponse(Employee entity);

    Employee toEmployeeFromCreateRequest(EmployeeCreateRequest request);

    // PUT
    void toEmployeeFromUpdateRequest(EmployeeUpdateRequest request,@MappingTarget Employee entity);
}
