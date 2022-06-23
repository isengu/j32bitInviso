package com.j32bit.inviso.repository;

import com.j32bit.inviso.domain.User;
import com.j32bit.inviso.domain.UserApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserApplicationRepository extends JpaRepository<UserApplication, Long>, JpaSpecificationExecutor<UserApplication> {
    @Query("SELECT ua.user FROM UserApplication ua WHERE ua.application.id = :applicationId")
    List<User> getAssignedUsersOfApplication(@Param("applicationId") Long applicationId);
}
