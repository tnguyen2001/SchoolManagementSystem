package com.school.exception;

import java.util.stream.Collectors;

import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.school.exception.dto.ErrorResponseDTO;

import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final String RECORD_NOT_FOUND = "Record not found!";

    // Handle constraint violation error
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponseDTO> handleConstraintViolationException(ConstraintViolationException e) {
        String errorMessages = e.getConstraintViolations().stream().map(violation -> violation.getMessage())
                .collect(Collectors.joining(", "));
        ErrorResponseDTO errorResponseDTO = new ErrorResponseDTO(HttpStatus.BAD_REQUEST, errorMessages);
        return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
    }

    // Handle not found error
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDTO> handleNotFoundException(ResourceNotFoundException e) {
        return new ResponseEntity<>(new ErrorResponseDTO(HttpStatus.NOT_FOUND, RECORD_NOT_FOUND),
                HttpStatus.NOT_FOUND);
    }

    // SQL Server Exception
    // @ExceptionHandler
    // public ResponseEntity<ErrorResponse>
    // handleSQLServerException(SQLServerException e) {
    // return new ResponseEntity<>(new
    // ErrorResponse(HttpStatus.NOT_FOUND, "Record not found!"),
    // HttpStatus.NOT_FOUND);
    // }
}
