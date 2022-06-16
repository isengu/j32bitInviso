package com.j32bit.inviso.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "application", uniqueConstraints = {
        @UniqueConstraint(name = "uc_application_shortname", columnNames = {"shortName", "version"})
})
public class Application extends Auditable implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    private String description;
    private String shortName;
    private BigDecimal version;
    private byte status;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "application_id")
    private List<Page> pages;

    @ManyToOne(fetch = FetchType.LAZY)
    private UserApplication userApplication;

}
