package com.j32bit.inviso.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {

	@Serial
    private static final long serialVersionUID = -1L;

    private Long id;
	private String email;
	private String name;
	private String surname;
	private String username;
	private String tcNumber;
	private String companyName;
	private String occupation;
	private String phone;
	private String address;
	private byte isAdmin;
	private byte status;
	private Set<RoleDto> roles;

}
