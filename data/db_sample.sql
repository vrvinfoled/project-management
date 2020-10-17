--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.22
-- Dumped by pg_dump version 9.5.22

SET statement_timeout = 0;
SET lock_timeout = 0;
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
-- Name: tbl_cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_cards (
    card_id integer NOT NULL,
    card_name character varying(255),
    status boolean DEFAULT true,
    card_order integer
);


ALTER TABLE public.tbl_cards OWNER TO postgres;

--
-- Name: tbl_cards_card_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_cards_card_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_cards_card_id_seq OWNER TO postgres;

--
-- Name: tbl_cards_card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_cards_card_id_seq OWNED BY public.tbl_cards.card_id;


--
-- Name: tbl_password_reset_auth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_password_reset_auth (
    id integer NOT NULL,
    user_id integer,
    otp integer,
    "createdAt" timestamp without time zone DEFAULT now(),
    expdate timestamp without time zone DEFAULT (now() + ((15)::double precision * '00:01:00'::interval)),
    status boolean DEFAULT true
);


ALTER TABLE public.tbl_password_reset_auth OWNER TO postgres;

--
-- Name: tbl_password_reset_auth_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_password_reset_auth_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_password_reset_auth_id_seq OWNER TO postgres;

--
-- Name: tbl_password_reset_auth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_password_reset_auth_id_seq OWNED BY public.tbl_password_reset_auth.id;


--
-- Name: tbl_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_role (
    role_id integer NOT NULL,
    role_name character varying(255)
);


ALTER TABLE public.tbl_role OWNER TO postgres;

--
-- Name: tbl_role_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_role_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_role_role_id_seq OWNER TO postgres;

--
-- Name: tbl_role_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_role_role_id_seq OWNED BY public.tbl_role.role_id;


--
-- Name: tbl_tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_tasks (
    task_id integer NOT NULL,
    task_name character varying(255),
    task_desc text,
    task_status boolean DEFAULT true,
    createdat timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
    updatedat timestamp without time zone DEFAULT ('now'::text)::timestamp(0) with time zone,
    from_card integer,
    current_card integer,
    task_state character varying(255),
    from_card_state character varying(255),
    current_card_state character varying(255),
    from_card_name character varying(255)
);


ALTER TABLE public.tbl_tasks OWNER TO postgres;

--
-- Name: tbl_tasks_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_tasks_task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_tasks_task_id_seq OWNER TO postgres;

--
-- Name: tbl_tasks_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_tasks_task_id_seq OWNED BY public.tbl_tasks.task_id;


--
-- Name: tbl_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tbl_user (
    user_id integer NOT NULL,
    user_name character varying(255),
    user_password character varying(255),
    user_phone bigint,
    user_email character varying(255),
    status boolean DEFAULT true,
    role_id integer
);


ALTER TABLE public.tbl_user OWNER TO postgres;

--
-- Name: tbl_user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tbl_user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tbl_user_user_id_seq OWNER TO postgres;

--
-- Name: tbl_user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tbl_user_user_id_seq OWNED BY public.tbl_user.user_id;


--
-- Name: card_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_cards ALTER COLUMN card_id SET DEFAULT nextval('public.tbl_cards_card_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_password_reset_auth ALTER COLUMN id SET DEFAULT nextval('public.tbl_password_reset_auth_id_seq'::regclass);


--
-- Name: role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_role ALTER COLUMN role_id SET DEFAULT nextval('public.tbl_role_role_id_seq'::regclass);


--
-- Name: task_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_tasks ALTER COLUMN task_id SET DEFAULT nextval('public.tbl_tasks_task_id_seq'::regclass);


--
-- Name: user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_user ALTER COLUMN user_id SET DEFAULT nextval('public.tbl_user_user_id_seq'::regclass);


--
-- Data for Name: tbl_cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_cards (card_id, card_name, status, card_order) FROM stdin;
1	alltasks	t	1
2	errored	t	2
3	tested	t	3
4	completed	t	4
\.


--
-- Name: tbl_cards_card_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_cards_card_id_seq', 4, true);


--
-- Data for Name: tbl_password_reset_auth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_password_reset_auth (id, user_id, otp, "createdAt", expdate, status) FROM stdin;
5	4	438152	2020-10-06 12:23:27.385043	2020-10-06 12:38:27.385043	f
6	6	196730	2020-10-06 12:24:17.273097	2020-10-06 12:39:17.273097	f
8	1	691913	2020-10-06 12:58:26.695385	2020-10-06 13:13:26.695385	f
7	1	918838	2020-10-06 12:56:57.620295	2020-10-06 13:11:57.620295	f
1	1	3054	2020-10-06 12:11:13.35223	2020-10-06 12:26:13.35223	f
2	1	6658	2020-10-06 12:20:33.714454	2020-10-06 12:35:33.714454	f
3	1	2770	2020-10-06 12:20:49.628999	2020-10-06 12:35:49.628999	f
4	1	708365	2020-10-06 12:21:32.965508	2020-10-06 12:36:32.965508	f
9	1	714710	2020-10-06 14:03:00.093081	2020-10-06 14:18:00.093081	f
10	1	195971	2020-10-06 14:24:30.207384	2020-10-06 14:39:30.207384	f
\.


--
-- Name: tbl_password_reset_auth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_password_reset_auth_id_seq', 10, true);


--
-- Data for Name: tbl_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_role (role_id, role_name) FROM stdin;
1	superadmin
2	admin
3	staff
\.


--
-- Name: tbl_role_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_role_role_id_seq', 3, true);


--
-- Data for Name: tbl_tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_tasks (task_id, task_name, task_desc, task_status, createdat, updatedat, from_card, current_card, task_state, from_card_state, current_card_state, from_card_name) FROM stdin;
11	task 11	task 11	t	2020-10-08 10:58:10	2020-10-08 10:58:10	1	4	completed	intermediate	disabled	alltasks
9	task 9	task 9	t	2020-10-07 17:20:21	2020-10-07 17:20:21	1	4	completed	intermediate	disabled	alltasks
8	task 8	task 8	t	2020-10-07 17:18:50	2020-10-07 17:18:50	1	4	completed	intermediate	disabled	alltasks
5	task 5	task 5	t	2020-10-07 15:31:58	2020-10-07 15:31:58	1	4	completed	intermediate	disabled	alltasks
7	task 7	task 7	t	2020-10-07 17:17:12	2020-10-07 17:17:12	1	4	completed	intermediate	disabled	alltasks
10	task 10	task 10	t	2020-10-08 10:46:32	2020-10-08 10:46:32	1	4	completed	intermediate	disabled	alltasks
6	task 6	task 6	t	2020-10-07 17:16:44	2020-10-07 17:16:44	1	4	completed	intermediate	disabled	alltasks
12	task12	task12	t	2020-10-08 13:32:12	2020-10-08 13:32:12	1	4	completed	intermediate	disabled	alltasks
3	task 3	task3	t	2020-10-07 15:26:08	2020-10-07 15:26:08	1	4	completed	intermediate	disabled	alltasks
4	task 4	task4	t	2020-10-07 15:29:30	2020-10-07 15:29:30	2	1	alltasks	unchecked	checked	errored
2	task 2	task 2	t	2020-10-06 16:04:23	2020-10-06 16:04:23	1	3	tested	checked	unchecked	alltasks
1	task 1	task 1	t	2020-10-06 16:00:13.084106	2020-10-06 16:00:13.084106	3	1	alltasks	intermediate	checked	tested
\.


--
-- Name: tbl_tasks_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_tasks_task_id_seq', 12, true);


--
-- Data for Name: tbl_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tbl_user (user_id, user_name, user_password, user_phone, user_email, status, role_id) FROM stdin;
6	vaishak	vaishak132	\N	vaishakshettykudlu@gmail.com	t	3
1	kiran	kiranbhat12341	\N	kiranbhatkv@gmail.com	t	3
7	kumar	kumar123212	\N	kumar@gmail.com	t	3
4	sharath	sharath123	\N	sharathacharya723@gmail.com	t	3
\.


--
-- Name: tbl_user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tbl_user_user_id_seq', 7, true);


--
-- Name: tbl_cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_cards
    ADD CONSTRAINT tbl_cards_pkey PRIMARY KEY (card_id);


--
-- Name: tbl_password_reset_auth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_password_reset_auth
    ADD CONSTRAINT tbl_password_reset_auth_pkey PRIMARY KEY (id);


--
-- Name: tbl_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_role
    ADD CONSTRAINT tbl_role_pkey PRIMARY KEY (role_id);


--
-- Name: tbl_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_tasks
    ADD CONSTRAINT tbl_tasks_pkey PRIMARY KEY (task_id);


--
-- Name: tbl_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_user
    ADD CONSTRAINT tbl_user_pkey PRIMARY KEY (user_id);


--
-- Name: tbl_user_user_email_user_password_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tbl_user
    ADD CONSTRAINT tbl_user_user_email_user_password_key UNIQUE (user_email, user_password);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

