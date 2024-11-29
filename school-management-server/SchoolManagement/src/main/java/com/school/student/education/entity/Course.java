package com.school.student.education.entity;

import java.util.List;

import com.school.student.enrollment.entity.Enrollment;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "COURSE")
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String code;

	private String name;

	@OneToMany(mappedBy = "course")
	private List<CourseContent> courseContents;

	@OneToMany(mappedBy = "course")
	private List<Enrollment> enrollments;

	@OneToMany(mappedBy = "course")
	private List<Attendance> attendances;

	@OneToMany(mappedBy = "course")
	private List<Assessment> assessments;

	@OneToMany(mappedBy = "course")
	private List<CourseAssignment> courseAssignments;

}
