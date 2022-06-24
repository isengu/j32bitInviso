package com.j32bit.inviso.repository;

import com.j32bit.inviso.domain.ControlMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface ControlMetadataRepositroy extends JpaRepository<ControlMetadata, Long>, JpaSpecificationExecutor<ControlMetadata> {
}
