package com.j32bit.inviso.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "form_component")
public class FormComponent extends Auditable implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String shortName;
    private String colSize;
    private Integer colNumber;
    private Integer rowNumber;
    private String colAlign;

    @ManyToOne
    private Component component;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "form_component_id")
    private List<FormComponentOption> formComponentOptions;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "form_component_id")
    private List<FormComponentValidation> formComponentValidations;

}
