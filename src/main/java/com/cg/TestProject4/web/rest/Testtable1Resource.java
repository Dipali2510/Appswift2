package com.cg.TestProject4.web.rest;

import com.cg.TestProject4.domain.Testtable1;
import com.cg.TestProject4.repository.Testtable1Repository;
import com.cg.TestProject4.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.cg.TestProject4.domain.Testtable1}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class Testtable1Resource {

    private final Logger log = LoggerFactory.getLogger(Testtable1Resource.class);

    private static final String ENTITY_NAME = "testtable1";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Testtable1Repository testtable1Repository;

    public Testtable1Resource(Testtable1Repository testtable1Repository) {
        this.testtable1Repository = testtable1Repository;
    }

    /**
     * {@code POST  /testtable-1-s} : Create a new testtable1.
     *
     * @param testtable1 the testtable1 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new testtable1, or with status {@code 400 (Bad Request)} if the testtable1 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/testtable-1-s")
    public ResponseEntity<Testtable1> createTesttable1(@RequestBody Testtable1 testtable1) throws URISyntaxException {
        log.debug("REST request to save Testtable1 : {}", testtable1);
        if (testtable1.getId() != null) {
            throw new BadRequestAlertException("A new testtable1 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Testtable1 result = testtable1Repository.save(testtable1);
        return ResponseEntity.created(new URI("/api/testtable-1-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /testtable-1-s} : Updates an existing testtable1.
     *
     * @param testtable1 the testtable1 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated testtable1,
     * or with status {@code 400 (Bad Request)} if the testtable1 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the testtable1 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/testtable-1-s")
    public ResponseEntity<Testtable1> updateTesttable1(@RequestBody Testtable1 testtable1) throws URISyntaxException {
        log.debug("REST request to update Testtable1 : {}", testtable1);
        if (testtable1.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Testtable1 result = testtable1Repository.save(testtable1);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, testtable1.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /testtable-1-s} : get all the testtable1s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of testtable1s in body.
     */
    @GetMapping("/testtable-1-s")
    public List<Testtable1> getAllTesttable1s() {
        if ("testtable1_column1-is-null".equals(filter)) {
            log.debug("REST request to get all Testtable1s where Testtable1_Column1 is null");
            return StreamSupport
                .stream(testtable1Repository.findAll().spliterator(), false)
                .filter(testtable1 -> testtable1.getTesttable1_Column1() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Testtable1s");
        return testtable1Repository.findAll();
    }

    /**
     * {@code GET  /testtable-1-s/:id} : get the "id" testtable1.
     *
     * @param id the id of the testtable1 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the testtable1, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/testtable-1-s/{id}")
    public ResponseEntity<Testtable1> getTesttable1(@PathVariable Long id) {
        log.debug("REST request to get Testtable1 : {}", id);
        Optional<Testtable1> testtable1 = testtable1Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(testtable1);
    }

    /**
     * {@code DELETE  /testtable-1-s/:id} : delete the "id" testtable1.
     *
     * @param id the id of the testtable1 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/testtable-1-s/{id}")
    public ResponseEntity<Void> deleteTesttable1(@PathVariable Long id) {
        log.debug("REST request to delete Testtable1 : {}", id);
        testtable1Repository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
