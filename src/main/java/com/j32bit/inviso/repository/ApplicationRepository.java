package com.j32bit.inviso.repository;

import com.j32bit.inviso.domain.Application;
import com.j32bit.inviso.domain.Component;
import com.j32bit.inviso.domain.Option;
import com.j32bit.inviso.domain.Validation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long>, JpaSpecificationExecutor<Application> {

    @Query("SELECT c FROM Component c")
    List<Component> getAllComponents();

    @Query("SELECT o FROM Option o")
    List<Option> getAllOptions();

    @Query("SELECT v FROM Validation v")
    List<Validation> getAllValidations();

}
