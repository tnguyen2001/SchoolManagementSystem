package com.school.student.education.entity;

import java.math.BigDecimal;

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
@Table(name = "ASSESSMENT")
public class Assessment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	private String name;
	
	private BigDecimal grade;
	
	private String remark;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@MapsId("id")
	@JoinColumn(name = "course_id")
	private Course course;

	@ManyToOne(cascade = CascadeType.ALL)
	@MapsId("id")
	@JoinColumn(name = "student_id")
	private Student student;

}
