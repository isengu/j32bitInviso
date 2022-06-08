package com.j32bit.inviso.dto.request;

import com.j32bit.inviso.dto.RoleDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationRequestDto implements Serializable {

    @Serial
    private static final long serialVersionUID = -1L;

    private Long id;
    private String name;
    private String surname;
    private String email;
    private String phone;
    private String address;
    private String companyName;
    private String occupation;
    private String tcNumber;
    private String username;
    private String password;
    private byte status;
    private byte isAdmin;
    private String resetKey;
	private Set<RoleDto> roles;

}
