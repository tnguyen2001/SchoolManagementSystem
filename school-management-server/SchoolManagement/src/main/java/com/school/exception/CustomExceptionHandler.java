package com.school.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.school.exception.dto.ErrorResponseDTO;

@RestControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorResponseDTO handlerNotFoundException(NotFoundException ex, WebRequest req) {
		return new ErrorResponseDTO(HttpStatus.NOT_FOUND, ex.getMessage());
	}

	@ExceptionHandler(BadRequestException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponseDTO handlerBadRequestException(BadRequestException ex, WebRequest req) {
		return new ErrorResponseDTO(HttpStatus.BAD_REQUEST, ex.getMessage());
	}

	@ExceptionHandler(InternalException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorResponseDTO handlerInternalException(InternalException ex, WebRequest req) {
		return new ErrorResponseDTO(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
	}

}
