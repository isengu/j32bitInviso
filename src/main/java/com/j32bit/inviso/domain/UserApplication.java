package com.j32bit.inviso.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@IdClass(UserApplication.class)
@Table(name = "user_application")
public class UserApplication implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "application_id", referencedColumnName = "id")
    private Application application;

}
