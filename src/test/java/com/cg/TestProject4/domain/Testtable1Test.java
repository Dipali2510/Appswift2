package com.cg.TestProject4.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.cg.TestProject4.web.rest.TestUtil;

public class Testtable1Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Testtable1.class);
        Testtable1 testtable11 = new Testtable1();
        testtable11.setId(1L);
        Testtable1 testtable12 = new Testtable1();
        testtable12.setId(testtable11.getId());
        assertThat(testtable11).isEqualTo(testtable12);
        testtable12.setId(2L);
        assertThat(testtable11).isNotEqualTo(testtable12);
        testtable11.setId(null);
        assertThat(testtable11).isNotEqualTo(testtable12);
    }
}
