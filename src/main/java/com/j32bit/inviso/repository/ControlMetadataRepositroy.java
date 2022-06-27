package com.j32bit.inviso.repository;

import com.j32bit.inviso.domain.ControlMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface ControlMetadataRepositroy extends JpaRepository<ControlMetadata, Long>, JpaSpecificationExecutor<ControlMetadata> {

    Long countByControlDateBeforeAndControlDateAfter(Timestamp t1, Timestamp t2);

}
