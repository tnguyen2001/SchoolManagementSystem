package com.school.student.enrollment.entity;

import java.util.List;

import com.school.auth.entity.User;
import com.school.student.education.entity.Assessment;
import com.school.student.education.entity.Attendance;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "STUDENT")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	private String studentCode;

	@NotBlank(message = "Phone number is mandatory")
	@Column(name = "phone_number")
	private String phoneNo;
	private String address;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(mappedBy = "student")
	private List<Enrollment> enrollments;

	@OneToMany(mappedBy = "student")
	private List<Attendance> attendances;
	
	@OneToMany(mappedBy = "student")
	private List<Assessment> assessments;

}
