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
@Table(name = "page")
public class Page extends Auditable implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private String title;
    private Integer pageNumber;
    private Boolean isPageNameHidden;
    private Boolean isHomePage;
    private String shortName;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "page_id")
    private List<Form> forms;

}
