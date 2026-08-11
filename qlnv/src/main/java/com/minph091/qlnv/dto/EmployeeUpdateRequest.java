package com.minph091.qlnv.dto;

import lombok.Builder;

@Builder
public record EmployeeUpdateRequest(String name, Integer age, String address, Integer salary) {
}
