package com.school.student.enrollment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.school.student.enrollment.entity.Enrollment;

@RepositoryRestResource(path = "enrollments")
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

}
