package com.cg.TestProject4.repository;

import com.cg.TestProject4.domain.Testtable2;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Testtable2 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Testtable2Repository extends JpaRepository<Testtable2, Long> {
}
