package com.j32bit.inviso.domain;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "control_metadata")
public class ControlMetadata implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NaturalId
    private String barcode;

    private Timestamp controlDate;
    private Long coordinateX;
    private Long coordinateY;
    private String stateCode;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "control_metadata_id")
    private List<FormComponentData> formComponentDatas;

    @ManyToOne(fetch = FetchType.LAZY)
    private Application application;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

}
