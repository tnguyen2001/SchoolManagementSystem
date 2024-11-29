package com.scms.stms.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("apis/test")
public class TestController {
	@GetMapping("user")
	public String helloUser() {
		return "Hello User";
	}

	@GetMapping("admin")
	public String helloAdmin() {
		return "Hello Admin";
	}
}
