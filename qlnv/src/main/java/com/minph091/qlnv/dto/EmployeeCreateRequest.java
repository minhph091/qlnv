package com.minph091.qlnv.dto;

import lombok.Builder;

@Builder
public record EmployeeCreateRequest(String name, Integer age, String address, Integer salary) {
}
