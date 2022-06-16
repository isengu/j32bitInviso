package com.j32bit.inviso.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "validation")
public class Validation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}
