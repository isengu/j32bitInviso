package com.j32bit.inviso.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "form_component_validation")
public class FormComponentValidation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String errorMessage;
    private String value;

    @ManyToOne
    private Validation validation;

}
