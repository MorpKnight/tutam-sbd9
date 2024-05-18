create table if not exists copypasta (
    copypasta_id uuid primary key default gen_random_uuid(),
    content text not null,
    code varchar(6) not null,
    total_copies int default 0,
    total_views int default 0,
    created_at timestamp default now(),
    updated_at timestamp default now()
);

insert into copypasta (content, code) values ('Hello World', '123456'), ('Hello World 2', '654321');

drop table if exists copypasta;