package com.cg.TestProject4.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.cg.TestProject4.web.rest.TestUtil;

public class Testtable2Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Testtable2.class);
        Testtable2 testtable21 = new Testtable2();
        testtable21.setId(1L);
        Testtable2 testtable22 = new Testtable2();
        testtable22.setId(testtable21.getId());
        assertThat(testtable21).isEqualTo(testtable22);
        testtable22.setId(2L);
        assertThat(testtable21).isNotEqualTo(testtable22);
        testtable21.setId(null);
        assertThat(testtable21).isNotEqualTo(testtable22);
    }
}
