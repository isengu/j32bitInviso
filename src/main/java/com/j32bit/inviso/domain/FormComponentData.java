package com.j32bit.inviso.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "form_component_data")
public class FormComponentData implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String value;

    @OneToOne
    private FormComponent formComponent;
}
