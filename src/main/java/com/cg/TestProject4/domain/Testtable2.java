package com.cg.TestProject4.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A Testtable2.
 */
@Entity
@Table(name = "testtable2")
public class Testtable2 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "column_2")
    private String Column2;

    @OneToOne
    @JoinColumn(unique = true)
    private Testtable2 testtable1_Column1;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColumn2() {
        return Column2;
    }

    public void setColumn2(String Column2) {
        this.Column2 = Column2;
    }

    public Testtable2 getTesttable1_Column1() {
        return testtable1_Column1;
    }

    public void setTesttable1_Column1(Testtable2 Testtable2) {
        this.testtable1_Column1 = Testtable2;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Testtable2)) {
            return false;
        }
        return id != null && id.equals(((Testtable2) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Testtable2{" +
            "id=" + getId() +
            ", Column2='" + getColumn2() + "'" +
            "}";
    }
}
