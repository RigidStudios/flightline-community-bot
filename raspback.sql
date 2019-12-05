--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

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
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

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
-- Name: flightlinebotdb; Type: DATABASE; Schema: -; Owner: patryk
--

CREATE DATABASE flightlinebotdb;


-- ALTER DATABASE flightlinebotdb OWNER TO patryk;

\connect flightlinebotdb

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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: login_details; Type: TABLE; Schema: public; Owner: patryk
--

CREATE TABLE public.login_details (
    username character varying(50),
    password character varying(50)
);


-- ALTER TABLE public.login_details OWNER TO patryk;

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


-- ALTER TABLE public.login_logs OWNER TO patryk;

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
DKbowsermaster	run4ME@okinawa9357!
CP	thepilotismymum
LukxionAviz	LukxionAviz
Ballistic	Ballistic
\.


--
-- Data for Name: login_logs; Type: TABLE DATA; Schema: public; Owner: patryk
--

COPY public.login_logs (staff_user_id, username, airport_served, position_served, time_start, time_end, status) FROM stdin;
367722931993968650	supraaxdd	JSLL	DIR	2019-08-20T13:27:56.117Z	2019-08-20T13:28:10.950Z	FIN_DUTY
452472723806093313	MarsDaAvatiorboi	JTPH	TWR	2019-08-26T08:48:23.231Z	2019-08-26T10:10:20.309Z	FIN_DUTY
367722931993968650	supraaxdd	JSLL	TWR	2019-08-26T08:32:03.884Z	2019-08-26T10:10:48.099Z	FIN_DUTY
183651413656600576	blaze	JTPH	CTR	2019-08-26T16:00:10.022Z	2019-08-26T17:54:12.343Z	FIN_DUTY
183651413656600576	blaze	JTPH	CTR	2019-08-27T10:45:07.051Z	2019-08-27T12:16:51.026Z	FIN_DUTY
183651413656600576	blaze	JTPH	CTR	2019-08-24T15:54:26.483Z	2019-08-24T16:42:22.808Z	FIN_DUTY
452472723806093313	MarsDaAvatiorboi	JSLL	CTR	2019-08-25T08:21:51.844Z	2019-08-25T09:29:01.668Z	FIN_DUTY
367722931993968650	supraaxdd	JSLL	GND	2019-08-25T08:13:10.830Z	2019-08-25T10:04:35.806Z	FIN_DUTY
183651413656600576	blaze	JTPH	CTR	2019-08-25T09:00:23.422Z	2019-08-25T10:35:57.849Z	FIN_DUTY
367722931993968650	supraaxdd	JSLL	TWR	2019-08-25T10:04:56.606Z	2019-08-25T10:48:59.385Z	FIN_DUTY
320600141855981588	Dragon	JTPH	CLR	2019-08-30T17:57:58.975Z	2019-08-30T17:58:52.171Z	FIN_DUTY
367722931993968650	supraaxdd	JSLL	TWR	2019-08-30T19:48:48.043Z	2019-08-30T19:51:47.176Z	FIN_DUTY
367722931993968650	supraaxdd	JSLL	TWR	2019-08-31T15:28:13.215Z	2019-08-31T16:04:36.395Z	FIN_DUTY
371470625799274508	DKbowsermaster	JSLL	GRD	2019-08-31T17:59:54.537Z	2019-08-31T18:14:53.974Z	FIN_DUTY
367722931993968650	supraaxdd	JSLL	TWR	2019-08-31T16:20:36.395Z	2019-08-31T18:16:36.325Z	FIN_DUTY
183651413656600576	blaze	JTPH	CTR	2019-08-31T16:01:10.069Z	2019-08-31T18:16:50:352Z	FIN_DUTY
320600141855981588	Dragon	JTPH	DIR	2019-09-03T13:34:00.000Z	2019-09-03T15:29:00.000Z	FIN_DUTY
183651413656600576	blaze	JTPH	CTR	2019-09-01T13:20:00.000Z	2019-09-01T15:00:00.000Z	FIN_DUTY
505384357025021973	TLOK486	JTPH	DIR	2019-09-01T13:20:00.000Z	2019-09-01T15:00:00.000Z	FIN_DUTY
472874385821138978	test	test	test	2019-09-06T19:44:12.655Z	2019-09-06T19:44:28.229Z	FIN_DUTY
367722931993968650	supraaxdd	JSLL	DIR	2019-09-08T11:11:26.966Z	2019-09-08T12:15:00.423Z	FIN_DUTY
183651413656600576	blaze	JTPH	CTR	2019-09-08T11:11:17.283Z	2019-09-08T12:16:04.855Z	FIN_DUTY
\.


--
-- PostgreSQL database dump complete
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

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
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

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
-- Name: tasbotdb; Type: DATABASE; Schema: -; Owner: patryk
--

CREATE DATABASE tasbotdb;


-- ALTER DATABASE tasbotdb OWNER TO patryk;

\connect tasbotdb

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


-- ALTER TABLE public.bans OWNER TO patryk;

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


-- ALTER TABLE public.mutes OWNER TO patryk;

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


-- ALTER TABLE public.perm_and_past_moderations OWNER TO patryk;

--
-- Name: warns; Type: TABLE; Schema: public; Owner: patryk
--

CREATE TABLE public.warns (
    case_id numeric,
    warnee_id numeric,
    reason text,
    moderator_id numeric
);


-- ALTER TABLE public.warns OWNER TO patryk;

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

--
-- PostgreSQL database cluster dump complete
--

