package com.school.student.education.entity;

import java.sql.Timestamp;

import com.school.student.enrollment.entity.Student;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ATTENDANCE")
public class Attendance {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String status;

	private String remarks;

	private Timestamp attendanceDate;

	@ManyToOne(cascade = CascadeType.ALL)
	@MapsId("id")
	@JoinColumn(name = "course_id")
	private Course course;

	@ManyToOne(cascade = CascadeType.ALL)
	@MapsId("id")
	@JoinColumn(name = "student_id")
	private Student student;

}
