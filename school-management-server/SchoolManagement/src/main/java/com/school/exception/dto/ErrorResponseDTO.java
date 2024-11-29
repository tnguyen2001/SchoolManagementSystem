package com.school.exception.dto;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponseDTO {
	
    @JsonProperty("error_code")
    private HttpStatus errorCode;

    @JsonProperty("error_message")
    private String errorMessage;
    
}
