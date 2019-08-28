--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE flightline;
ALTER ROLE flightline WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md5e8e2b08db7bb6b2c8fe0911b91603a47';
CREATE ROLE patryk;
ALTER ROLE patryk WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md53f3497488c2695ec0b910f177acc38aa';
CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md53a5613bbb6a1895c25662f3b0d4756b4';
CREATE ROLE tas;
ALTER ROLE tas WITH SUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'md53551a089ee4cc705fb1aa4bdd389362a';






--
-- Database creation
--

CREATE DATABASE flightlinebotdb WITH TEMPLATE = template0 OWNER = patryk;
CREATE DATABASE tasbotdb WITH TEMPLATE = template0 OWNER = patryk;
REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


\connect flightlinebotdb

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: login_details; Type: TABLE; Schema: public; Owner: patryk
--

CREATE TABLE public.login_details (
    username character varying(50),
    password character varying(50)
);


ALTER TABLE public.login_details OWNER TO patryk;

--
-- Name: login_logs; Type: TABLE; Schema: public; Owner: patryk
--

CREATE TABLE public.login_logs (
    staff_user_id numeric,
    username text,
    airport_served text,
    position_served text,
    time_start text,
    time_end text,
    status text
);


ALTER TABLE public.login_logs OWNER TO patryk;

--
-- Data for Name: login_details; Type: TABLE DATA; Schema: public; Owner: patryk
--

COPY public.login_details (username, password) FROM stdin;
blaze	airbusisthebest320
test	test
Dragon	P14ne
Hiddened	hid123
MarsDaAvatiorboi	P90631821aL
TLOK486	APTX4869388124
supraaxdd	y0smen
\.


--
-- Data for Name: login_logs; Type: TABLE DATA; Schema: public; Owner: patryk
--

COPY public.login_logs (staff_user_id, username, airport_served, position_served, time_start, time_end, status) FROM stdin;
367722931993968650	test	test	test	2019-08-20T10:05:43.056Z	2019-08-20T10:05:51.794Z	FIN_DUTY
367722931993968650	supraaxdd	JSLL	DIR	2019-08-20T13:27:56.117Z	2019-08-20T13:28:10.950Z	FIN_DUTY
\.


--
-- PostgreSQL database dump complete
--

\connect postgres

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

\connect tasbotdb

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: bans; Type: TABLE; Schema: public; Owner: patryk
--

CREATE TABLE public.bans (
    case_id integer,
    bannee_id numeric,
    ban_duration numeric,
    reason text,
    moderator_id numeric
);


ALTER TABLE public.bans OWNER TO patryk;

--
-- Name: mutes; Type: TABLE; Schema: public; Owner: patryk
--

CREATE TABLE public.mutes (
    case_id integer,
    mutee_id numeric,
    mute_duration numeric,
    reason text,
    moderator_id numeric
);


ALTER TABLE public.mutes OWNER TO patryk;

--
-- Name: perm_and_past_moderations; Type: TABLE; Schema: public; Owner: patryk
--

CREATE TABLE public.perm_and_past_moderations (
    case_id integer,
    punished_id numeric,
    punishment_type text,
    reason text,
    moderator_id numeric
);


ALTER TABLE public.perm_and_past_moderations OWNER TO patryk;

--
-- Name: warns; Type: TABLE; Schema: public; Owner: patryk
--

CREATE TABLE public.warns (
    case_id numeric,
    warnee_id numeric,
    reason text,
    moderator_id numeric
);


ALTER TABLE public.warns OWNER TO patryk;

--
-- Data for Name: bans; Type: TABLE DATA; Schema: public; Owner: patryk
--

COPY public.bans (case_id, bannee_id, ban_duration, reason, moderator_id) FROM stdin;
\.


--
-- Data for Name: mutes; Type: TABLE DATA; Schema: public; Owner: patryk
--

COPY public.mutes (case_id, mutee_id, mute_duration, reason, moderator_id) FROM stdin;
\.


--
-- Data for Name: perm_and_past_moderations; Type: TABLE DATA; Schema: public; Owner: patryk
--

COPY public.perm_and_past_moderations (case_id, punished_id, punishment_type, reason, moderator_id) FROM stdin;
\.


--
-- Data for Name: warns; Type: TABLE DATA; Schema: public; Owner: patryk
--

COPY public.warns (case_id, warnee_id, reason, moderator_id) FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

\connect template1

SET default_transaction_read_only = off;

--
-- PostgreSQL database dump
--

-- Dumped from database version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.10 (Ubuntu 10.10-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

