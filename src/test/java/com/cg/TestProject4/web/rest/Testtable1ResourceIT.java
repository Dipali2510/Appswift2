package com.cg.TestProject4.web.rest;

import com.cg.TestProject4.TestProject4App;
import com.cg.TestProject4.domain.Testtable1;
import com.cg.TestProject4.repository.Testtable1Repository;

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
 * Integration tests for the {@link Testtable1Resource} REST controller.
 */
@SpringBootTest(classes = TestProject4App.class)
@AutoConfigureMockMvc
@WithMockUser
public class Testtable1ResourceIT {

    private static final String DEFAULT_COLUMN_1 = "AAAAAAAAAA";
    private static final String UPDATED_COLUMN_1 = "BBBBBBBBBB";

    @Autowired
    private Testtable1Repository testtable1Repository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTesttable1MockMvc;

    private Testtable1 testtable1;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Testtable1 createEntity(EntityManager em) {
        Testtable1 testtable1 = new Testtable1();
        testtable1.setColumn1(DEFAULT_COLUMN_1);
        return testtable1;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Testtable1 createUpdatedEntity(EntityManager em) {
        Testtable1 testtable1 = new Testtable1();
        testtable1.setColumn1(UPDATED_COLUMN_1);
        return testtable1;
    }

    @BeforeEach
    public void initTest() {
        testtable1 = createEntity(em);
    }

    @Test
    @Transactional
    public void createTesttable1() throws Exception {
        int databaseSizeBeforeCreate = testtable1Repository.findAll().size();
        // Create the Testtable1
        restTesttable1MockMvc.perform(post("/api/testtable-1-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testtable1)))
            .andExpect(status().isCreated());

        // Validate the Testtable1 in the database
        List<Testtable1> testtable1List = testtable1Repository.findAll();
        assertThat(testtable1List).hasSize(databaseSizeBeforeCreate + 1);
        Testtable1 testTesttable1 = testtable1List.get(testtable1List.size() - 1);
        assertThat(testTesttable1.getColumn1()).isEqualTo(DEFAULT_COLUMN_1);
    }

    @Test
    @Transactional
    public void createTesttable1WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = testtable1Repository.findAll().size();

        // Create the Testtable1 with an existing ID
        testtable1.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTesttable1MockMvc.perform(post("/api/testtable-1-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testtable1)))
            .andExpect(status().isBadRequest());

        // Validate the Testtable1 in the database
        List<Testtable1> testtable1List = testtable1Repository.findAll();
        assertThat(testtable1List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTesttable1s() throws Exception {
        // Initialize the database
        testtable1Repository.saveAndFlush(testtable1);

        // Get all the testtable1List
        restTesttable1MockMvc.perform(get("/api/testtable-1-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(testtable1.getId().intValue())))
            .andExpect(jsonPath("$.[*].Column1").value(hasItem(DEFAULT_COLUMN_1)));
    }
    
    @Test
    @Transactional
    public void getTesttable1() throws Exception {
        // Initialize the database
        testtable1Repository.saveAndFlush(testtable1);

        // Get the testtable1
        restTesttable1MockMvc.perform(get("/api/testtable-1-s/{id}", testtable1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(testtable1.getId().intValue()))
            .andExpect(jsonPath("$.Column1").value(DEFAULT_COLUMN_1));
    }
    @Test
    @Transactional
    public void getNonExistingTesttable1() throws Exception {
        // Get the testtable1
        restTesttable1MockMvc.perform(get("/api/testtable-1-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTesttable1() throws Exception {
        // Initialize the database
        testtable1Repository.saveAndFlush(testtable1);

        int databaseSizeBeforeUpdate = testtable1Repository.findAll().size();

        // Update the testtable1
        Testtable1 updatedTesttable1 = testtable1Repository.findById(testtable1.getId()).get();
        // Disconnect from session so that the updates on updatedTesttable1 are not directly saved in db
        em.detach(updatedTesttable1);
        updatedTesttable1.setColumn1(UPDATED_COLUMN_1);

        restTesttable1MockMvc.perform(put("/api/testtable-1-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTesttable1)))
            .andExpect(status().isOk());

        // Validate the Testtable1 in the database
        List<Testtable1> testtable1List = testtable1Repository.findAll();
        assertThat(testtable1List).hasSize(databaseSizeBeforeUpdate);
        Testtable1 testTesttable1 = testtable1List.get(testtable1List.size() - 1);
        assertThat(testTesttable1.getColumn1()).isEqualTo(UPDATED_COLUMN_1);
    }

    @Test
    @Transactional
    public void updateNonExistingTesttable1() throws Exception {
        int databaseSizeBeforeUpdate = testtable1Repository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTesttable1MockMvc.perform(put("/api/testtable-1-s").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(testtable1)))
            .andExpect(status().isBadRequest());

        // Validate the Testtable1 in the database
        List<Testtable1> testtable1List = testtable1Repository.findAll();
        assertThat(testtable1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTesttable1() throws Exception {
        // Initialize the database
        testtable1Repository.saveAndFlush(testtable1);

        int databaseSizeBeforeDelete = testtable1Repository.findAll().size();

        // Delete the testtable1
        restTesttable1MockMvc.perform(delete("/api/testtable-1-s/{id}", testtable1.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Testtable1> testtable1List = testtable1Repository.findAll();
        assertThat(testtable1List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
