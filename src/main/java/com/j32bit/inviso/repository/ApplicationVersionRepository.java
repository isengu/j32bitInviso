package com.j32bit.inviso.repository;

import com.j32bit.inviso.domain.Application;
import com.j32bit.inviso.domain.ApplicationVersion;
import com.j32bit.inviso.dto.response.ApplicationStructureNameDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ApplicationVersionRepository extends
        JpaRepository<ApplicationVersion, Long>, JpaSpecificationExecutor<ApplicationVersion> {

    /**
     * Get all of active(not soft deleted) applications last versions.
     *
     * @return {@link List} of {@link ApplicationVersion}s.
     */
    @Query("SELECT new com.j32bit.inviso.domain.ApplicationVersion(" +
            "a.id, a.createdAt, a.updatedAt, a.name, a.description, a.shortName, a.version, a.application) " +
            "FROM ApplicationVersion a WHERE a.status = 0 AND a.version = (SELECT MAX(a1.version) FROM " +
            "ApplicationVersion a1 WHERE a1.application.id = a.application.id)")
    List<ApplicationVersion> getAllApplicationsLastVersions();

    /**
     * Get last version of given application id.
     *
     * @param applicationId given application id.
     * @return {@link ApplicationVersion} as {@link Optional}.
     */
    @Query("SELECT a From ApplicationVersion a " +
            "Where a.application.id = :applicationId " +
            "AND a.version = (SELECT MAX(a1.version) FROM ApplicationVersion a1 " +
            "WHERE a.application = a1.application)")
    Optional<ApplicationVersion> getLastVersionOfApplication(@Param("applicationId") Long applicationId);

    /**
     * Get structure names and ids of applications
     * appointed to user of given username.
     *
     * @param username given username.
     * @return {@link List} of {@link ApplicationStructureNameDto}s.
     */
    @Query("SELECT new com.j32bit.inviso.dto.response.ApplicationStructureNameDto(av.name, av.application.id) " +
            "FROM ApplicationVersion av LEFT JOIN UserApplication ua ON (ua.application.id = av.application.id) " +
            "WHERE av.status = 0 AND av.version = (SELECT MAX(av1.version) FROM ApplicationVersion av1 " +
            "WHERE av1.application.id = av.application.id) AND ua.user.username = :username")
    List<ApplicationStructureNameDto> getStructureNamesOfUser(@Param("username") String username);

    /**
     * Get structure names and ids of all active(not soft deleted)
     * applications last versions.
     *
     * @return {@link List} of {@link ApplicationStructureNameDto}s.
     */
    // TODO currently `correlated subquery` is being used, bad performance, make improvemen
    // https://stackoverflow.com/a/47516321/13891083
    @Query("SELECT new com.j32bit.inviso.dto.response.ApplicationStructureNameDto(av.name, av.application.id) " +
            "FROM ApplicationVersion av WHERE av.status = 0 AND av.version = (SELECT MAX(av1.version) " +
            "FROM ApplicationVersion av1 WHERE av1.application.id = av.application.id)")
    List<ApplicationStructureNameDto> getStructureNames();

    /**
     * Find basic application information without applications whole structure
     * (like pages, components, etc.) by given application id and version number.
     *
     * @param applicationId given application id.
     * @param version given version.
     * @return {@link ApplicationVersion} as {@link Optional}.
     */
    @Query("SELECT new com.j32bit.inviso.domain.ApplicationVersion(av.id, av.createdAt, av.updatedAt," +
            "av.name, av.description, av.shortName, av.version, av.application) FROM ApplicationVersion av " +
            "LEFT OUTER JOIN Application a ON av.application.id = a.id WHERE a.id = :applicationId " +
            "AND av.version = :version")
    Optional<ApplicationVersion> findAppInfoByApplicationIdAndVersion(Long applicationId, BigDecimal version);

    /**
     * Find {@link ApplicationVersion} by given application id and version number.
     *
     * @param applicationId given application id.
     * @param version given version.
     * @return {@link ApplicationVersion} as {@link Optional}.
     */
    Optional<ApplicationVersion> findByApplicationIdAndVersion(Long applicationId, BigDecimal version);

    /**
     * Delete(soft delete) application by given shortname.
     *
     * @param shortName given shortname.
     */
    @Modifying
    @Query("UPDATE ApplicationVersion a SET a.status = 1" +
            "WHERE a.shortName = :shortName " +
            "AND a.version = (SELECT MAX(a1.version) FROM ApplicationVersion a1 " +
            "WHERE a.application = a1.application)")
    void softDeleteByShortName(@Param("shortName") String shortName);

    /**
     * Get count of active(not soft deleted) applications.
     * <br>
     * Note: this query uses "distinct on" which is a postgresql only expression.
     *
     * @return count of active applications.
     */
    @Query(value = "select count(*) from (select distinct on (application_id) * " +
            "from backend.application_version order by application_id, version desc) as a " +
            "where a.status = 0", nativeQuery = true)
    Long countOfNotDeletedApplications();

}