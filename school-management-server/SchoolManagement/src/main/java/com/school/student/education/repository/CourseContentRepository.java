package com.school.student.education.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.school.student.education.entity.CourseContent;

@RepositoryRestResource(path = "course_contents")
public interface CourseContentRepository extends JpaRepository<CourseContent, Long> {

}
