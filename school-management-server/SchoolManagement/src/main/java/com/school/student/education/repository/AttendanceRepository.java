package com.school.student.education.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.school.student.education.entity.Attendance;

@RepositoryRestResource(path = "attendances")
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
}
