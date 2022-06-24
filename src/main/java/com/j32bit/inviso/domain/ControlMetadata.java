package com.j32bit.inviso.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
    private ApplicationVersion applicationVersion;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

}
