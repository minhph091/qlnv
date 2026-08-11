package com.minph091.qlnv.exception;

import lombok.Builder;

@Builder
public record ErrorResponse(String errorCode, String errorMessage) {
}
