-- migrate:up
create table user
(
    uuid             char(36) primary key unique not null,
    username         varchar(50) unique          not null,
    usernameInternal varchar(50) unique          not null,
    firstName        varchar(50)                 not null,
    lastName         varchar(50)                 not null,
    email            varchar(50) unique          not null,
    emailVerifiedAt  datetime(3)        default null,
    phoneNumber      varchar(15) unique default null,
    phoneVerifiedAt  datetime(3)        default null,
    birthday         varchar(10)                 not null,
    createdAt        datetime(3)                 not null,
    updatedAt        datetime(3)                 not null,
    deletedAt        datetime(3)        default null,
    isActive         boolean            default true,
    isStaff          boolean            default false,
    isDeveloper      boolean            default false,
    index idx_user_email (email)
) charset = utf8mb4
  engine = InnoDB;

create table user_preferences
(
    userUuid                   char(36) primary key unique not null,
    staySignedIn               boolean default true,
    sessionLength              int     default null,
    termsAndConditionsAccepted boolean default false,
    useSmsMfa                  boolean default false,
    useEmailMfa                boolean default true,
    receiveEmailMarketing      boolean default true,
    language                   varchar(6)                  not null,
    timezone                   varchar(63)                 not null,
    constraint fk_userPreferences_userUuid foreign key (userUuid) references user (uuid) on delete cascade
) charset = utf8mb4
  engine = InnoDB;

create table credential
(
    userUuid       char(36) primary key unique not null,
    hashedPassword char(255)                   not null,
    createdAt      datetime(3)                 not null,
    updatedAt      datetime(3)                 not null,
    constraint fk_credential_userUuid foreign key (userUuid) references user (uuid) on delete cascade
) charset = utf8mb4
  engine = InnoDB;

create table session
(
    uuid       char(36) primary key not null,
    userUuid   char(36)             not null,
    deviceUuid char(36)             not null,
    createdAt  datetime(3)          not null,
    expiresAt  datetime(3) default null,
    lastUsedAt datetime(3)          not null,
    constraint fk_session_userUuid foreign key (userUuid) references user (uuid) on delete cascade,
    index idx_session_uuid (uuid),
    index idx_session_userUuid (userUuid)
) charset = utf8mb4
  engine = InnoDB;

-- migrate:down
drop table user_preferences;
drop table session;
drop table credential;
drop table user;
