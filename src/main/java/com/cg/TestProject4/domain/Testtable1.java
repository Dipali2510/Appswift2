package com.cg.TestProject4.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A Testtable1.
 */
@Entity
@Table(name = "testtable1")
public class Testtable1 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "column_1")
    private String Column1;

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

    public String getColumn1() {
        return Column1;
    }

    public void setColumn1(String Column1) {
        this.Column1 = Column1;
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
        if (!(o instanceof Testtable1)) {
            return false;
        }
        return id != null && id.equals(((Testtable1) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Testtable1{" +
            "id=" + getId() +
            ", Column1='" + getColumn1() + "'" +
            "}";
    }
}
