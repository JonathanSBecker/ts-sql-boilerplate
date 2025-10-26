-- migrate:up
create table example (
    uuid       char(36)     not null primary key,
    userUuid   char(36)     not null,
    name       varchar(255) not null,
    created_at datetime(3)  not null,
    updated_at datetime(3)  not null,
    constraint fk_example_userUuid foreign key (userUuid) references user (uuid) on delete cascade
) charset = utf8mb4
  engine = InnoDB;

-- migrate:down
drop table example;
