package com.cg.TestProject4.web.rest;

import com.cg.TestProject4.domain.Testtable2;
import com.cg.TestProject4.repository.Testtable2Repository;
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
 * REST controller for managing {@link com.cg.TestProject4.domain.Testtable2}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class Testtable2Resource {

    private final Logger log = LoggerFactory.getLogger(Testtable2Resource.class);

    private static final String ENTITY_NAME = "testtable2";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Testtable2Repository testtable2Repository;

    public Testtable2Resource(Testtable2Repository testtable2Repository) {
        this.testtable2Repository = testtable2Repository;
    }

    /**
     * {@code POST  /testtable-2-s} : Create a new testtable2.
     *
     * @param testtable2 the testtable2 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new testtable2, or with status {@code 400 (Bad Request)} if the testtable2 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/testtable-2-s")
    public ResponseEntity<Testtable2> createTesttable2(@RequestBody Testtable2 testtable2) throws URISyntaxException {
        log.debug("REST request to save Testtable2 : {}", testtable2);
        if (testtable2.getId() != null) {
            throw new BadRequestAlertException("A new testtable2 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Testtable2 result = testtable2Repository.save(testtable2);
        return ResponseEntity.created(new URI("/api/testtable-2-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /testtable-2-s} : Updates an existing testtable2.
     *
     * @param testtable2 the testtable2 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated testtable2,
     * or with status {@code 400 (Bad Request)} if the testtable2 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the testtable2 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/testtable-2-s")
    public ResponseEntity<Testtable2> updateTesttable2(@RequestBody Testtable2 testtable2) throws URISyntaxException {
        log.debug("REST request to update Testtable2 : {}", testtable2);
        if (testtable2.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Testtable2 result = testtable2Repository.save(testtable2);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, testtable2.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /testtable-2-s} : get all the testtable2s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of testtable2s in body.
     */
    @GetMapping("/testtable-2-s")
    public List<Testtable2> getAllTesttable2s() {
        if ("testtable1_column1-is-null".equals(filter)) {
            log.debug("REST request to get all Testtable2s where Testtable1_Column1 is null");
            return StreamSupport
                .stream(testtable2Repository.findAll().spliterator(), false)
                .filter(testtable2 -> testtable2.getTesttable1_Column1() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Testtable2s");
        return testtable2Repository.findAll();
    }

    /**
     * {@code GET  /testtable-2-s/:id} : get the "id" testtable2.
     *
     * @param id the id of the testtable2 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the testtable2, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/testtable-2-s/{id}")
    public ResponseEntity<Testtable2> getTesttable2(@PathVariable Long id) {
        log.debug("REST request to get Testtable2 : {}", id);
        Optional<Testtable2> testtable2 = testtable2Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(testtable2);
    }

    /**
     * {@code DELETE  /testtable-2-s/:id} : delete the "id" testtable2.
     *
     * @param id the id of the testtable2 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/testtable-2-s/{id}")
    public ResponseEntity<Void> deleteTesttable2(@PathVariable Long id) {
        log.debug("REST request to delete Testtable2 : {}", id);
        testtable2Repository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
