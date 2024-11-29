package com.school.student.education.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.school.student.education.entity.Assessment;

@RepositoryRestResource(path = "assessments")
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
}
