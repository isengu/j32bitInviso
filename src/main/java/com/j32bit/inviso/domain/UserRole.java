package com.j32bit.inviso.domain;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;

@Entity
@IdClass(UserRole.class)
@Table(name = "user_role")
public class UserRole implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role role;
}
