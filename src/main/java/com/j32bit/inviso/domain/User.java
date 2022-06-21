package com.j32bit.inviso.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(name = "uc_user_username", columnNames = {"username"}),
        @UniqueConstraint(name = "uc_user_email", columnNames = {"email"})
})
@SQLDelete(sql = "UPDATE backend.user SET status = 1 WHERE id=?")
@FilterDef(name = "deletedUserFilter", parameters = @ParamDef(name = "status", type = "byte"))
@Filter(name = "deletedUserFilter", condition = "status = :status")
public class User extends Auditable implements Serializable {

    private String name;
    private String surname;
    @Column(unique = true, nullable = false)
    private String email;
    @JsonProperty("phoneNumber")
    private String phone;
    private String address;
    private String companyName;
    private String occupation;
    private String tcNumber;
    @Column(unique = true, nullable = false)
    @JsonProperty("userName")
    private String username;
    private String password;
    private byte status = 0;
    private byte isAdmin = 0;
    private String resetKey;

    @ManyToMany
	@JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
	private List<Role> roles = new ArrayList<>();

}
