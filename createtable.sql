-- Table: public.mondayevents

-- DROP TABLE public.mondayevents;

CREATE TABLE public.mondayevents
(
    type text COLLATE pg_catalog."default",
    event jsonb,
    ts time with time zone,
    status text COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.mondayevents
    OWNER to anguyen;