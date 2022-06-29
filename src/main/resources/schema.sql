CREATE SCHEMA IF NOT EXISTS backend;
DROP SCHEMA backend CASCADE;
CREATE SCHEMA backend;

-- backend.application definition

-- Drop table

-- DROP TABLE backend.application;

CREATE TABLE backend.application (
	id bigserial NOT NULL,
	created_at timestamp NOT NULL,
	created_by varchar(255) NOT NULL,
	updated_at timestamp NULL,
	updated_by varchar(255) NULL,
	CONSTRAINT application_pkey PRIMARY KEY (id)
);


-- backend.component definition

-- Drop table

-- DROP TABLE backend.component;

CREATE TABLE backend.component (
	id bigserial NOT NULL,
	"type" varchar(255) NULL,
	CONSTRAINT component_pkey PRIMARY KEY (id)
);


-- backend."option" definition

-- Drop table

-- DROP TABLE backend."option";

CREATE TABLE backend."option" (
	id bigserial NOT NULL,
	"type" varchar(255) NULL,
	CONSTRAINT option_pkey PRIMARY KEY (id)
);


-- backend."role" definition

-- Drop table

-- DROP TABLE backend."role";

CREATE TABLE backend."role" (
	id bigserial NOT NULL,
	role_name varchar(255) NULL,
	short_name varchar(255) NULL,
	CONSTRAINT role_pkey PRIMARY KEY (id)
);


-- backend."user" definition

-- Drop table

-- DROP TABLE backend."user";

CREATE TABLE backend."user" (
	id bigserial NOT NULL,
	created_at timestamp NOT NULL,
	created_by varchar(255) NOT NULL,
	updated_at timestamp NULL,
	updated_by varchar(255) NULL,
	address varchar(255) NULL,
	company_name varchar(255) NULL,
	email varchar(255) NOT NULL,
	is_admin int2 NOT NULL,
	"name" varchar(255) NULL,
	occupation varchar(255) NULL,
	"password" varchar(255) NULL,
	phone varchar(255) NULL,
	reset_key varchar(255) NULL,
	status int2 NOT NULL,
	surname varchar(255) NULL,
	tc_number varchar(255) NULL,
	username varchar(255) NOT NULL,
	CONSTRAINT uk_ob8kqyqqgmefl0aco34akdtpe UNIQUE (email),
	CONSTRAINT uk_sb8bbouer5wak8vyiiy4pf2bx UNIQUE (username),
	CONSTRAINT user_pkey PRIMARY KEY (id)
);


-- backend.validation definition

-- Drop table

-- DROP TABLE backend.validation;

CREATE TABLE backend.validation (
	id bigserial NOT NULL,
	"name" varchar(255) NULL,
	CONSTRAINT validation_pkey PRIMARY KEY (id)
);


-- backend.application_version definition

-- Drop table

-- DROP TABLE backend.application_version;

CREATE TABLE backend.application_version (
	id bigserial NOT NULL,
	created_at timestamp NOT NULL,
	created_by varchar(255) NOT NULL,
	updated_at timestamp NULL,
	updated_by varchar(255) NULL,
	description varchar(255) NULL,
	"name" varchar(255) NULL,
	short_name varchar(255) NULL,
	status int2 NOT NULL,
	"version" numeric(19, 2) NULL,
	application_id int8 NULL,
	CONSTRAINT application_version_pkey PRIMARY KEY (id),
	CONSTRAINT uc_application_version_shortname_version UNIQUE (short_name, version),
	CONSTRAINT fkhfvphvt4y62yj3fcftrmpt8f8 FOREIGN KEY (application_id) REFERENCES backend.application(id)
);


-- backend.control_metadata definition

-- Drop table

-- DROP TABLE backend.control_metadata;

CREATE TABLE backend.control_metadata (
	id bigserial NOT NULL,
	barcode varchar(255) NULL,
	control_date timestamp NULL,
	coordinatex int8 NULL,
	coordinatey int8 NULL,
	state_code varchar(255) NULL,
	application_version_id int8 NULL,
	user_id int8 NULL,
	CONSTRAINT control_metadata_pkey PRIMARY KEY (id),
	CONSTRAINT uk_d17x2s9vp78j2ny6saubuhsh0 UNIQUE (barcode),
	CONSTRAINT fk2d59efqu5d53bx3i8n29lxbyq FOREIGN KEY (application_version_id) REFERENCES backend.application_version(id),
	CONSTRAINT fk8wrcxsruoucympmr8upc59hr8 FOREIGN KEY (user_id) REFERENCES backend."user"(id)
);


-- backend.page definition

-- Drop table

-- DROP TABLE backend.page;

CREATE TABLE backend.page (
	id bigserial NOT NULL,
	created_at timestamp NOT NULL,
	created_by varchar(255) NOT NULL,
	updated_at timestamp NULL,
	updated_by varchar(255) NULL,
	is_home_page bool NULL,
	is_page_name_hidden bool NULL,
	page_number int4 NULL,
	short_name varchar(255) NULL,
	title varchar(255) NULL,
	application_version_id int8 NULL,
	CONSTRAINT page_pkey PRIMARY KEY (id),
	CONSTRAINT fk95bc2579h3rwopmihmxg77i2w FOREIGN KEY (application_version_id) REFERENCES backend.application_version(id)
);


-- backend.user_application definition

-- Drop table

-- DROP TABLE backend.user_application;

CREATE TABLE backend.user_application (
	user_id int8 NOT NULL,
	application_id int8 NOT NULL,
	CONSTRAINT user_application_pkey PRIMARY KEY (user_id, application_id),
	CONSTRAINT fk483kmnovbg9ccip3mj0keku9m FOREIGN KEY (user_id) REFERENCES backend."user"(id),
	CONSTRAINT fk8n17vi0mc676sranq3umd4oal FOREIGN KEY (application_id) REFERENCES backend.application(id)
);


-- backend.user_role definition

-- Drop table

-- DROP TABLE backend.user_role;

CREATE TABLE backend.user_role (
	user_id int8 NOT NULL,
	role_id int8 NOT NULL,
	CONSTRAINT user_role_pkey PRIMARY KEY (user_id, role_id),
	CONSTRAINT fk859n2jvi8ivhui0rl0esws6o FOREIGN KEY (user_id) REFERENCES backend."user"(id),
	CONSTRAINT fka68196081fvovjhkek5m97n3y FOREIGN KEY (role_id) REFERENCES backend."role"(id)
);


-- backend.form definition

-- Drop table

-- DROP TABLE backend.form;

CREATE TABLE backend.form (
	id bigserial NOT NULL,
	created_at timestamp NOT NULL,
	created_by varchar(255) NOT NULL,
	updated_at timestamp NULL,
	updated_by varchar(255) NULL,
	short_name varchar(255) NULL,
	title varchar(255) NULL,
	page_id int8 NULL,
	CONSTRAINT form_pkey PRIMARY KEY (id),
	CONSTRAINT fkdjva8g0bqn5skuvkuyflhssr5 FOREIGN KEY (page_id) REFERENCES backend.page(id)
);


-- backend.form_component definition

-- Drop table

-- DROP TABLE backend.form_component;

CREATE TABLE backend.form_component (
	id bigserial NOT NULL,
	created_at timestamp NOT NULL,
	created_by varchar(255) NOT NULL,
	updated_at timestamp NULL,
	updated_by varchar(255) NULL,
	col_align varchar(255) NULL,
	col_number int4 NULL,
	col_size varchar(255) NULL,
	"row_number" int4 NULL,
	short_name varchar(255) NULL,
	component_id int8 NULL,
	form_id int8 NULL,
	CONSTRAINT form_component_pkey PRIMARY KEY (id),
	CONSTRAINT fk1d1gjrgj8elln6irre9vj45e FOREIGN KEY (form_id) REFERENCES backend.form(id),
	CONSTRAINT fklbpvqdblh0i147fqctd7dhs6a FOREIGN KEY (component_id) REFERENCES backend.component(id)
);


-- backend.form_component_data definition

-- Drop table

-- DROP TABLE backend.form_component_data;

CREATE TABLE backend.form_component_data (
	id bigserial NOT NULL,
	value varchar(255) NULL,
	form_component_id int8 NULL,
	control_metadata_id int8 NULL,
	CONSTRAINT form_component_data_pkey PRIMARY KEY (id),
	CONSTRAINT fkeav2cqbdhkx60o3tp6j7d1mvi FOREIGN KEY (form_component_id) REFERENCES backend.form_component(id),
	CONSTRAINT fkh0r5d709akxq9qsk8ytdt2y2i FOREIGN KEY (control_metadata_id) REFERENCES backend.control_metadata(id)
);


-- backend.form_component_option definition

-- Drop table

-- DROP TABLE backend.form_component_option;

CREATE TABLE backend.form_component_option (
	id bigserial NOT NULL,
	"key" varchar(255) NULL,
	"name" varchar(255) NULL,
	order_number int4 NULL,
	value varchar(255) NULL,
	option_id int8 NULL,
	form_component_id int8 NULL,
	CONSTRAINT form_component_option_pkey PRIMARY KEY (id),
	CONSTRAINT fk228d2hx77jxutxdwsychmn1sq FOREIGN KEY (option_id) REFERENCES backend."option"(id),
	CONSTRAINT fkmj2um3742c2w26gc2qlcrkbm2 FOREIGN KEY (form_component_id) REFERENCES backend.form_component(id)
);


-- backend.form_component_validation definition

-- Drop table

-- DROP TABLE backend.form_component_validation;

CREATE TABLE backend.form_component_validation (
	id bigserial NOT NULL,
	error_message varchar(255) NULL,
	value varchar(255) NULL,
	"selectable" bool NULL,
	"type" int4 NULL,
	validation_id int8 NULL,
	form_component_id int8 NULL,
	CONSTRAINT form_component_validation_pkey PRIMARY KEY (id),
	CONSTRAINT fkar7pi7h1agkp418x7al7oa106 FOREIGN KEY (form_component_id) REFERENCES backend.form_component(id),
	CONSTRAINT fkq1osrytick73s39dx01dhesbm FOREIGN KEY (validation_id) REFERENCES backend.validation(id)
);