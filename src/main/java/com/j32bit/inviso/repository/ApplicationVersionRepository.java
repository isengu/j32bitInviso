package com.j32bit.inviso.repository;

import com.j32bit.inviso.domain.*;
import com.j32bit.inviso.dto.response.ApplicationStructureNameDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ApplicationVersionRepository extends JpaRepository<ApplicationVersion, Long>, JpaSpecificationExecutor<ApplicationVersion> {

    /**
     * Get all of active(status=1) applications.
     *
     * @return List of {@link ApplicationVersion}
     */
    @Query("SELECT new com.j32bit.inviso.domain.ApplicationVersion(" +
            "a.id, a.createdAt, a.updatedAt, a.name, a.description, a.shortName, a.version, a.application) " +
            "FROM ApplicationVersion a WHERE a.version = (SELECT MAX(a1.version) FROM " +
            "ApplicationVersion a1 WHERE a1.application.id = a.application.id)")
    List<ApplicationVersion> getAll();

    // TODO silinenleri almayacak sekilde guncelle
    @Query("SELECT a From ApplicationVersion a " +
            "Where a.application = :userApplication " +
            "AND a.version = (SELECT MAX(a1.version) FROM ApplicationVersion a1 " +
            "WHERE a.application = a1.application)")
    Optional<ApplicationVersion> getLastVersionOfUserApplication(@Param("userApplication") Application application);

    @Query("SELECT new com.j32bit.inviso.dto.response.ApplicationStructureNameDto(av.name, av.application.id) " +
            "FROM ApplicationVersion av LEFT JOIN UserApplication ua ON (ua.application.id = av.application.id) " +
            "WHERE av.version = (SELECT MAX(av1.version) FROM ApplicationVersion av1 " +
            "WHERE av1.application.id = av.application.id) AND ua.user.username = :username")
    List<ApplicationStructureNameDto> getStructureNamesOfUser(@Param("username") String username);

    // TODO currently `correlated subquery` is being used, bad performance, make improvement
    // this type of query is also used in ApplicationVersionSpecification, so make sure to improve that too.
    // https://stackoverflow.com/a/47516321/13891083
    @Query("SELECT new com.j32bit.inviso.dto.response.ApplicationStructureNameDto(av.name, av.application.id) " +
            "FROM ApplicationVersion av WHERE av.status = 0 AND av.version = (SELECT MAX(av1.version) FROM ApplicationVersion av1 " +
            "WHERE av1.application.id = av.application.id)")
    List<ApplicationStructureNameDto> getStructureNames();

    @Query("SELECT MAX(av.version) FROM ApplicationVersion av WHERE av.application.id = :applicationId")
    BigDecimal getLastVersionNumberById(@Param("applicationId") Long applicationId);

    /**
     *
     * @param applicationId
     * @param version
     * @return
     */
    @Query("SELECT new com.j32bit.inviso.domain.ApplicationVersion(av.id, av.createdAt, av.updatedAt," +
            "av.name, av.description, av.shortName, av.version, av.application) FROM ApplicationVersion av " +
            "LEFT OUTER JOIN Application a ON av.application.id = a.id WHERE a.id = :applicationId " +
            "AND av.version = :version")
    Optional<ApplicationVersion> findAppInfoByApplicationIdAndVersion(Long applicationId, BigDecimal version);

    Optional<ApplicationVersion> findByApplicationIdAndVersion(Long applicationId, BigDecimal version);

}