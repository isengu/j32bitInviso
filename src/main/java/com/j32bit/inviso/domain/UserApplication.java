package com.j32bit.inviso.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;

// this table is not updatable since this table is only storing static fields
@Entity
@Getter
@Setter
@Table(name = "user_application")
public class UserApplication extends Auditable implements Serializable {

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

//    @OneToMany(cascade = CascadeType.PERSIST, orphanRemoval = true)
//    @JoinColumn(name = "user_application_id")
//    private List<Application> applications;

}
