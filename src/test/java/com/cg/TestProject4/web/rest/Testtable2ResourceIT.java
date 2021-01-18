package com.cg.TestProject4.web.rest;

import com.cg.TestProject4.TestProject4App;
import com.cg.TestProject4.domain.Testtable2;
import com.cg.TestProject4.repository.Testtable2Repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link Testtable2Resource} REST controller.
 */
@SpringBootTest(classes = TestProject4App.class)
@AutoConfigureMockMvc
@WithMockUser
public class Testtable2ResourceIT {

    private static final String DEFAULT_COLUMN_2 = "AAAAAAAAAA";
    private static final String UPDATED_COLUMN_2 = "BBBBBBBBBB";

    @Autowired
    private Testtable2Repository testtable2Repository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTesttable2MockMvc;

    private Testtable2 testtable2;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Testtable2 createEntity(EntityManager em) {
        Testtable2 testtable2 = new Testtable2();
        testtable2.setColumn2(DEFAULT_COLUMN_2);
        return testtable2;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Testtable2 createUpdatedEntity(EntityManager em) {
        Testtable2 testtable2 = new Testtable2();
        testtable2.setColumn2(UPDATED_COLUMN_2);
        return testtable2;
    }

    @BeforeEach
    public void initTest() {
        testtable2 = createEntity(em);
    }

    @Test
    @Transactional
    public void createTesttable2() throws Exception {
        int databaseSizeBeforeCreate = testtable2Repository.findAll().size();
        // Create the Testtable2
        restTesttable2MockMvc.perform(post("/api/testtable-2-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testtable2)))
            .andExpect(status().isCreated());

        // Validate the Testtable2 in the database
        List<Testtable2> testtable2List = testtable2Repository.findAll();
        assertThat(testtable2List).hasSize(databaseSizeBeforeCreate + 1);
        Testtable2 testTesttable2 = testtable2List.get(testtable2List.size() - 1);
        assertThat(testTesttable2.getColumn2()).isEqualTo(DEFAULT_COLUMN_2);
    }

    @Test
    @Transactional
    public void createTesttable2WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testtable2Repository.findAll().size();

        // Create the Testtable2 with an existing ID
        testtable2.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTesttable2MockMvc.perform(post("/api/testtable-2-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testtable2)))
            .andExpect(status().isBadRequest());

        // Validate the Testtable2 in the database
        List<Testtable2> testtable2List = testtable2Repository.findAll();
        assertThat(testtable2List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTesttable2s() throws Exception {
        // Initialize the database
        testtable2Repository.saveAndFlush(testtable2);

        // Get all the testtable2List
        restTesttable2MockMvc.perform(get("/api/testtable-2-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testtable2.getId().intValue())))
            .andExpect(jsonPath("$.[*].Column2").value(hasItem(DEFAULT_COLUMN_2)));
    }
    
    @Test
    @Transactional
    public void getTesttable2() throws Exception {
        // Initialize the database
        testtable2Repository.saveAndFlush(testtable2);

        // Get the testtable2
        restTesttable2MockMvc.perform(get("/api/testtable-2-s/{id}", testtable2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(testtable2.getId().intValue()))
            .andExpect(jsonPath("$.Column2").value(DEFAULT_COLUMN_2));
    }
    @Test
    @Transactional
    public void getNonExistingTesttable2() throws Exception {
        // Get the testtable2
        restTesttable2MockMvc.perform(get("/api/testtable-2-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTesttable2() throws Exception {
        // Initialize the database
        testtable2Repository.saveAndFlush(testtable2);

        int databaseSizeBeforeUpdate = testtable2Repository.findAll().size();

        // Update the testtable2
        Testtable2 updatedTesttable2 = testtable2Repository.findById(testtable2.getId()).get();
        // Disconnect from session so that the updates on updatedTesttable2 are not directly saved in db
        em.detach(updatedTesttable2);
        updatedTesttable2.setColumn2(UPDATED_COLUMN_2);

        restTesttable2MockMvc.perform(put("/api/testtable-2-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTesttable2)))
            .andExpect(status().isOk());

        // Validate the Testtable2 in the database
        List<Testtable2> testtable2List = testtable2Repository.findAll();
        assertThat(testtable2List).hasSize(databaseSizeBeforeUpdate);
        Testtable2 testTesttable2 = testtable2List.get(testtable2List.size() - 1);
        assertThat(testTesttable2.getColumn2()).isEqualTo(UPDATED_COLUMN_2);
    }

    @Test
    @Transactional
    public void updateNonExistingTesttable2() throws Exception {
        int databaseSizeBeforeUpdate = testtable2Repository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTesttable2MockMvc.perform(put("/api/testtable-2-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testtable2)))
            .andExpect(status().isBadRequest());

        // Validate the Testtable2 in the database
        List<Testtable2> testtable2List = testtable2Repository.findAll();
        assertThat(testtable2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTesttable2() throws Exception {
        // Initialize the database
        testtable2Repository.saveAndFlush(testtable2);

        int databaseSizeBeforeDelete = testtable2Repository.findAll().size();

        // Delete the testtable2
        restTesttable2MockMvc.perform(delete("/api/testtable-2-s/{id}", testtable2.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Testtable2> testtable2List = testtable2Repository.findAll();
        assertThat(testtable2List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
