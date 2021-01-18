package com.cg.TestProject4.repository;

import com.cg.TestProject4.domain.Testtable1;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Testtable1 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Testtable1Repository extends JpaRepository<Testtable1, Long> {
}
