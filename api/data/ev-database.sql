--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4 (Ubuntu 13.4-4.pgdg20.04+1)
-- Dumped by pg_dump version 13.4 (Ubuntu 13.4-4.pgdg20.04+1)

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

SET default_table_access_method = heap;

--
-- Name: charging_station_levels; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.charging_station_levels (
    charging_level_id integer NOT NULL,
    charging_level character varying(30) NOT NULL,
    charging_station_speed integer NOT NULL,
    volt integer NOT NULL
);


ALTER TABLE public.charging_station_levels OWNER TO hackbright;

--
-- Name: charging_station_levels_charging_level_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.charging_station_levels_charging_level_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.charging_station_levels_charging_level_id_seq OWNER TO hackbright;

--
-- Name: charging_station_levels_charging_level_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.charging_station_levels_charging_level_id_seq OWNED BY public.charging_station_levels.charging_level_id;


--
-- Name: charging_stations; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.charging_stations (
    station_id integer NOT NULL,
    station_name character varying(30) NOT NULL,
    address character varying(30) NOT NULL,
    city character varying(30) NOT NULL,
    state character varying(2) NOT NULL,
    zip_code integer NOT NULL,
    connection_type character varying(30) NOT NULL,
    access character varying(7) NOT NULL,
    cost double precision,
    payment_type character varying(30),
    charging_level_id integer,
    user_id integer
);


ALTER TABLE public.charging_stations OWNER TO hackbright;

--
-- Name: charging_stations_station_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.charging_stations_station_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.charging_stations_station_id_seq OWNER TO hackbright;

--
-- Name: charging_stations_station_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.charging_stations_station_id_seq OWNED BY public.charging_stations.station_id;


--
-- Name: electric_vehicles; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.electric_vehicles (
    ev_id integer NOT NULL,
    make character varying(30) NOT NULL,
    model character varying(50) NOT NULL,
    year integer NOT NULL,
    ev_range integer
);


ALTER TABLE public.electric_vehicles OWNER TO hackbright;

--
-- Name: electric_vehicles_ev_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.electric_vehicles_ev_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.electric_vehicles_ev_id_seq OWNER TO hackbright;

--
-- Name: electric_vehicles_ev_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.electric_vehicles_ev_id_seq OWNED BY public.electric_vehicles.ev_id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    user_id integer,
    station_id integer,
    rating integer NOT NULL,
    review_content text
);


ALTER TABLE public.reviews OWNER TO hackbright;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.reviews_review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_review_id_seq OWNER TO hackbright;

--
-- Name: reviews_review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.reviews_review_id_seq OWNED BY public.reviews.review_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: hackbright
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(30) NOT NULL,
    ev_id integer
);


ALTER TABLE public.users OWNER TO hackbright;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: hackbright
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO hackbright;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hackbright
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: charging_station_levels charging_level_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.charging_station_levels ALTER COLUMN charging_level_id SET DEFAULT nextval('public.charging_station_levels_charging_level_id_seq'::regclass);


--
-- Name: charging_stations station_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.charging_stations ALTER COLUMN station_id SET DEFAULT nextval('public.charging_stations_station_id_seq'::regclass);


--
-- Name: electric_vehicles ev_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.electric_vehicles ALTER COLUMN ev_id SET DEFAULT nextval('public.electric_vehicles_ev_id_seq'::regclass);


--
-- Name: reviews review_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.reviews ALTER COLUMN review_id SET DEFAULT nextval('public.reviews_review_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: charging_station_levels; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.charging_station_levels (charging_level_id, charging_level, charging_station_speed, volt) FROM stdin;
1	Level 1	3	120
2	Level 2	12	240
3	Level 3	75	480
\.


--
-- Data for Name: charging_stations; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.charging_stations (station_id, station_name, address, city, state, zip_code, connection_type, access, cost, payment_type, charging_level_id, user_id) FROM stdin;
\.


--
-- Data for Name: electric_vehicles; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.electric_vehicles (ev_id, make, model, year, ev_range) FROM stdin;
1	Chevrolet	Bolt EUV	2022	247
2	Chevrolet	Bolt EV	2022	259
3	Hyundai	Kona Electric	2022	258
4	Kia	Niro Electric	2022	239
5	Lucid USA, Inc.	Air Dream P AWD w/19" wheels	2022	471
6	Lucid USA, Inc.	Air Dream P AWD w/21" wheels	2022	451
7	Lucid USA, Inc.	Air Dream R AWD w/19" wheels	2022	520
8	Lucid USA, Inc.	Air Dream R AWD w/21" wheels	2022	481
9	Lucid USA, Inc.	Air G Touring AWD w/19" wheels	2022	516
10	Lucid USA, Inc.	Air G Touring AWD w/21" wheels	2022	469
11	Mini	Cooper SE Hardtop 2 door	2022	114
12	Nissan	Leaf (40 kWh battery pack)	2022	149
13	Nissan	Leaf (62 kWh battery pack)	2022	226
14	Nissan	Leaf SV/SL (62 kWh battery pack)	2022	215
15	Polestar Automotive USA	Polestar 2 (Dual Motor)	2022	249
16	Volvo	XC40 Recharge Twin	2022	223
17	Audi	etron	2021	222
18	Audi	etron Sportback	2021	218
19	BMW	i3	2021	153
20	BMW	i3s	2021	153
21	Chevrolet	Bolt EV	2021	259
22	Ford	Mustang Mach-E AWD	2021	211
23	Ford	Mustang Mach-E AWD Extended	2021	270
24	Ford	Mustang Mach-E RWD	2021	230
25	Ford	Mustang Mach-E RWD California Route 1	2021	305
26	Ford	Mustang Mach-E RWD Extended	2021	300
27	Hyundai	Ioniq Electric	2021	170
28	Hyundai	Kona Electric	2021	258
29	Jaguar	I-PACE EV400	2021	234
30	Kandi	K27	2021	59
31	Kia	Niro Electric	2021	239
32	Mini	Cooper SE Hardtop 2 door	2021	110
33	Nissan	Leaf (40 kWh battery pack)	2021	149
34	Nissan	Leaf (62 kWh battery pack)	2021	226
35	Nissan	Leaf SV/SL (62 kWh battery pack)	2021	215
36	Polestar Automotive USA	Polestar 2	2021	233
37	Porsche	Taycan 4S Perf Battery	2021	199
38	Porsche	Taycan 4S Perf Battery Plus	2021	227
39	Porsche	Taycan Perf Battery	2021	200
40	Porsche	Taycan Perf Battery Plus	2021	225
41	Porsche	Taycan Turbo	2021	212
42	Porsche	Taycan Turbo S	2021	201
43	Tesla	Model 3 Long Range AWD	2021	353
44	Tesla	Model 3 Performance AWD	2021	315
45	Tesla	Model 3 Standard Range Plus RWD	2021	263
46	Tesla	Model S Long Range	2021	405
47	Tesla	Model S Performance (19" Wheels)	2021	387
48	Tesla	Model S Plaid (21" Wheels)	2021	348
49	Tesla	Model X Long Range Plus	2021	371
50	Tesla	Model X Performance (20" Wheels)	2021	341
51	Tesla	Model Y Long Range AWD	2021	326
52	Tesla	Model Y Performance AWD	2021	303
53	Tesla	Model Y Standard Range RWD	2021	244
54	Volkswagen	ID.4 1st	2021	250
55	Volkswagen	ID.4 Pro	2021	260
56	Volkswagen	ID.4 Pro S	2021	250
57	Volvo	XC40 Recharge	2021	208
58	Audi	etron Sportback	2020	218
59	BMW	i3	2020	153
60	BMW	i3s	2020	153
61	Chevrolet	Bolt EV	2020	259
62	Ford	Transit Cargo Van	2020	120
63	Ford	Transit Cargo Van	2020	60
64	Ford	Transit Passenger Van	2020	120
65	Ford	Transit Passenger Van	2020	60
66	Hyundai	Ioniq Electric	2020	170
67	Hyundai	Kona Electric	2020	258
68	Jaguar	I-PACE	2020	234
69	Kia	Niro Electric	2020	239
70	Mini	Cooper SE Hardtop 2 door	2020	110
71	Nissan	Leaf (40 kWh battery pack)	2020	149
72	Nissan	Leaf (62 kWh battery pack)	2020	226
73	Nissan	Leaf SV/SL (62 kWh battery pack)	2020	215
74	Porsche	Taycan 4S Perf Battery Plus	2020	203
75	Porsche	Taycan Turbo	2020	201
76	Porsche	Taycan Turbo S	2020	192
77	Tesla	Model 3 Long Range	2020	330
78	Tesla	Model 3 Long Range AWD	2020	322
79	Tesla	Model 3 Long Range Performance AWD (18" Wheels)	2020	322
80	Tesla	Model 3 Mid Range	2020	264
81	Tesla	Model 3 Standard Range	2020	220
82	Tesla	Model 3 Standard Range Plus	2020	250
83	Tesla	Model S Long Range	2020	373
84	Tesla	Model S Long Range Plus	2020	402
85	Tesla	Model S Performance (19" Wheels)	2020	348
86	Tesla	Model S Standard Range	2020	287
87	Tesla	Model X Long Range	2020	328
88	Tesla	Model X Performance (20" Wheels)	2020	305
89	Tesla	Model X Standard Range	2020	258
90	Tesla	Model Y Long Range AWD	2020	316
91	Tesla	Model Y Performance AWD	2020	315
92	Tesla	Model Y Performance AWD (21" wheels)	2020	291
93	Volkswagen	e-Golf	2020	123
94	Audi	etron	2019	204
95	BMW	i3	2019	153
96	BMW	i3s	2019	153
97	BYD Motors	e6	2019	187
98	Chevrolet	Bolt EV	2019	238
99	Fiat	500e	2019	84
100	Ford	Transit Van/Wagon	2019	120
101	Ford	Transit Van/Wagon	2019	60
102	Honda	Clarity	2019	89
103	Hyundai	Ioniq Electric	2019	124
104	Hyundai	Kona Electric	2019	258
105	Jaguar	I-PACE	2019	239
106	Kia	Niro Electric	2019	239
107	Kia	Soul	2019	111
108	Nissan	Leaf (40 kWh battery pack)	2019	150
109	Nissan	Leaf (62 kWh battery pack)	2019	226
110	Nissan	Leaf SV/SL (62 kWh battery pack)	2019	215
111	smart	EQ fortwo convertible	2019	57
112	smart	EQ fortwo coupe	2019	58
113	Tesla	Model 3 Long Range	2019	310
114	Tesla	Model 3 Long Range AWD	2019	310
115	Tesla	Model 3 Long Range AWD Performance	2019	310
116	Tesla	Model 3 Mid Range	2019	264
117	Tesla	Model 3 Standard Range	2019	220
118	Tesla	Model 3 Standard Range Plus	2019	240
119	Tesla	Model S 100D	2019	335
120	Tesla	Model S 75D	2019	259
121	Tesla	Model S Long Range	2019	370
122	Tesla	Model S P100D	2019	315
123	Tesla	Model S Performance (19" Wheels)	2019	345
124	Tesla	Model S Standard Range	2019	285
125	Tesla	Model X 100D	2019	295
126	Tesla	Model X 75D	2019	238
127	Tesla	Model X Long Range	2019	325
128	Tesla	Model X P100D	2019	289
129	Tesla	Model X Performance (22" Wheels)	2019	270
130	Volkswagen	e-Golf	2019	125
131	BMW	I3 (94 Ah)	2018	\N
132	BMW	I3s (94 Ah)	2018	\N
133	BYD Motors	e6	2018	\N
134	Chevrolet	Bolt EV	2018	\N
135	Fiat	500e	2018	\N
136	Ford	Focus Electric FWD	2018	\N
137	Honda	Clarity	2018	\N
138	Hyundai	Ioniq Electric	2018	\N
139	Kia	Soul	2018	\N
140	Nissan	Leaf	2018	\N
141	smart	fortwo electric drive convertable	2018	\N
142	smart	fortwo electric drive coupe	2018	\N
143	Tesla	Model 3 Long Range	2018	\N
144	Tesla	Model 3 Long Range AWD	2018	\N
145	Tesla	Model 3 Long Range AWD Performance	2018	\N
146	Tesla	Model S 75 kWh	2018	\N
147	Tesla	Model S AWD - 100D	2018	\N
148	Tesla	Model S AWD - 75D	2018	\N
149	Tesla	Model S AWD - P100D	2018	\N
150	Tesla	Model X AWD - 100D	2018	\N
151	Tesla	Model X AWD - 75D	2018	\N
152	Tesla	Model X AWD - P100D	2018	\N
153	BMW	i3 BEV	2017	\N
154	BMW	i3 BEV	2017	\N
155	BYD Motors	e6	2017	\N
156	Chevrolet	Bolt	2017	\N
157	Fiat	500e	2017	\N
158	Ford	Focus Electric	2017	\N
159	Honda	Clarity	2017	\N
160	Hyundai	Ioniq	2017	\N
161	Kia	Soul	2017	\N
162	Mercedes-Benz	B250e	2017	\N
163	Mitsubishi	i-MiEV	2017	\N
164	Nissan	Leaf	2017	\N
165	smart	fortwo electric drive convertable	2017	\N
166	smart	fortwo electric drive coupe	2017	\N
167	Tesla	Model 3 Long Range	2017	\N
168	Tesla	Model S AWD - 100D	2017	\N
169	Tesla	Model S AWD - 60D	2017	\N
170	Tesla	Model S AWD - 75D	2017	\N
171	Tesla	Model S AWD - P100D	2017	\N
172	Tesla	Model S AWD - P90D	2017	\N
173	Tesla	Model S RWD 60 kWh	2017	\N
174	Tesla	Model S RWD 75 kWh	2017	\N
175	Tesla	Model S RWD 90D	2017	\N
176	Tesla	Model X AWD - 100D	2017	\N
177	Tesla	Model X AWD - 60D	2017	\N
178	Tesla	Model X AWD - 75D	2017	\N
179	Tesla	Model X AWD - 90D	2017	\N
180	Tesla	Model X AWD - P100D	2017	\N
181	Tesla	Model X AWD - P90D	2017	\N
182	Volkswagen	e-Golf	2017	\N
183	BMW	i3	2016	\N
184	Chevrolet	Spark	2016	\N
185	Fiat	500e	2016	\N
186	Ford	Focus	2016	\N
187	Mercedes-Benz	B250e	2016	\N
188	Mitsubishi	i-MiEV	2016	\N
189	Nissan	Leaf	2016	\N
190	smart	fortwo	2016	\N
191	Tesla	Model S	2016	\N
192	Tesla	Model S AWD	2016	\N
193	Tesla	Model X AWD 90D	2016	\N
194	Tesla	Model X AWD P90D	2016	\N
195	Volkswagen	e-Golf	2016	\N
196	BMW	i3	2015	\N
197	Chevrolet	Spark	2015	\N
198	Fiat	500e	2015	\N
199	Ford	Focus	2015	\N
200	Kia	Soul	2015	\N
201	Mercedes-Benz	B-Class Electric	2015	\N
202	Mitsubishi	i-MiEV	2015	\N
203	Nissan	Leaf	2015	\N
204	smart	fortwo	2015	\N
205	Tesla	Model S	2015	\N
206	Volkswagen	e-Golf	2015	\N
207	BMW	i3	2014	\N
208	Chevrolet	Spark	2014	\N
209	Fiat	500e	2014	\N
210	Ford	Focus	2014	\N
211	Honda	Fit	2014	\N
212	Kia	Soul	2014	\N
213	Mercedes-Benz	B-Class Electric	2014	\N
214	Mitsubishi	i-MiEV	2014	\N
215	Nissan	Leaf	2014	\N
216	Scion	iQ EV	2014	\N
217	smart	fortwo	2014	\N
218	Tesla	Model S	2014	\N
219	Toyota	RAV 4 EV	2014	\N
220	Coda Automotive	CODA	2013	\N
221	Fiat	500e	2013	\N
222	Ford	Focus	2013	\N
223	Honda	FIT EV	2013	\N
224	Mitsubishi	i-MiEV	2013	\N
225	Nissan	Leaf	2013	\N
226	Scion	iQ EV	2013	\N
227	smart	fortwo	2013	\N
228	Tesla	Model S	2013	\N
229	Toyota	RAV 4 EV	2013	\N
230	Coda Automotive	CODA	2012	\N
231	Ford	Focus EV	2012	\N
232	Ford	Ford Azure Transit Connect	2012	\N
233	Honda	Fit EV	2012	\N
234	Mitsubishi	Mitusbishi i	2012	\N
235	Nissan	Leaf	2012	\N
236	Tesla	Model S	2012	\N
237	Toyota	RAV4 EV	2012	\N
238	Wheego Electric Cars, Inc.	LiFe	2012	\N
239	Ford	Ford  Azure Transit Connect	2011	\N
240	Nissan	Leaf	2011	\N
241	Nissan	LEAF	2011	\N
242	Tesla	Roadster 2.5	2011	\N
243	Tesla	Roadster	2010	\N
244	Tesla	Roadster 2.5	2009	\N
245	Solectria	Citivan	2004	\N
246	Ford	TH!NK City	2003	\N
247	Nissan	Altra EV	2003	\N
248	Nissan	Hypermini	2003	\N
249	Solectria	Citivan	2003	\N
250	Toyota	RAV4-EV	2003	\N
251	Ford	Ranger EV(Lead Acid)	2002	\N
252	Ford	Th!NK City	2002	\N
253	Nissan	Altra EV	2002	\N
254	Nissan	Hypermini	2002	\N
255	Solectria	Citivan	2002	\N
256	Toyota	RAV4-EV	2002	\N
257	Ford	Ranger EV(Lead Acid)	2001	\N
258	General Motors EV	EV1-Lead Acid	2001	\N
259	General Motors EV	EV1-NiMH	2001	\N
260	Nissan	Altra EV	2001	\N
261	Nissan	Hypermini (CA only)	2001	\N
262	Solectria	Citivan	2001	\N
263	Solectria	Flash	2001	\N
264	Solectria	Force	2001	\N
265	Toyota	E-COM	2001	\N
266	Toyota	RAV4-EV	2001	\N
267	Chevrolet	Chevrolet S-10 NiMH	2000	\N
268	Chevrolet	Chevrolet S-10 PbA	2000	\N
269	Chrysler	Voyager EPIC	2000	\N
270	Dodge	Caravan EPIC	2000	\N
271	Ford	Ranger EV-NiMH PbA	2000	\N
272	Ford	Th!NK City-sel mrkts	2000	\N
273	General Motors EV	EV1-Lead Acid	2000	\N
274	General Motors EV	EV1-NiMH	2000	\N
275	Nissan	Altra EV	2000	\N
276	Solectria	Flash	2000	\N
277	Solectria	Force NiCd PbA NiMH	2000	\N
278	Toyota	RAV4-EV	2000	\N
279	Chevrolet	Chevrolet S-10 L/A	1999	\N
280	Chevrolet	Chevrolet S-10 NiMH	1999	\N
281	Chrysler	Epic Minivan	1999	\N
282	Dodge	Caravan EPIC	1999	\N
283	Ford	Ranger EV-Lead Acid	1999	\N
284	Ford	Ranger EV-NiMH	1999	\N
285	General Motors EV	EV1-Lead Acid	1999	\N
286	General Motors EV	EV1-NiMH	1999	\N
287	Honda	EV Plus	1999	\N
288	Nissan	Altra EV	1999	\N
289	Solectria	CitiVan	1999	\N
290	Solectria	Flash	1999	\N
291	Solectria	Force Lead Acid	1999	\N
292	Solectria	Force NiCd	1999	\N
293	Toyota	RAV4-EV NiMH	1999	\N
294	Toyota	RAV4-EV PbA	1999	\N
295	Chevrolet	Chevrolet S-10	1998	\N
296	Chevrolet	Chevrolet S-10 PbA	1998	\N
297	Ford	Ranger EV	1998	\N
298	General Motors EV	EV1-NiMH (CA,AZ)	1998	\N
299	General Motors EV	EV1 - PbA (CA, AZ)	1998	\N
300	Honda	EV Plus	1998	\N
301	Toyota	RAV4-EV NiMH (Flts.)	1998	\N
302	Toyota	RAV4-EV PbA (Fleets)	1998	\N
303	Chevrolet	Chevrolet S-10 PbA	1997	\N
304	Ford	Ranger EV	1997	\N
305	General Motors EV	EV1-Lead Acid	1997	\N
306	Dodge	Plymouth TE Van	1995	\N
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.reviews (review_id, user_id, station_id, rating, review_content) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: hackbright
--

COPY public.users (user_id, first_name, last_name, email, password, ev_id) FROM stdin;
1	David	Herring	lrobertson@example.com	password123	1
2	Molly	Goodman	mcconnelleric@example.com	password123	2
3	Samuel	Todd	charles82@example.com	password123	3
4	Stephen	Rios	denisesmith@example.com	password123	4
5	Amanda	Warner	spearsdavid@example.net	password123	5
6	Nicole	Mason	murphythomas@example.org	password123	6
7	Darryl	Brown	wallacemelissa@example.net	password123	7
8	Joshua	Clark	joseph71@example.net	password123	8
9	Adam	Roberson	barry29@example.net	password123	9
10	Jill	Clark	angela75@example.org	password123	10
\.


--
-- Name: charging_station_levels_charging_level_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.charging_station_levels_charging_level_id_seq', 3, true);


--
-- Name: charging_stations_station_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.charging_stations_station_id_seq', 1, false);


--
-- Name: electric_vehicles_ev_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.electric_vehicles_ev_id_seq', 306, true);


--
-- Name: reviews_review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.reviews_review_id_seq', 1, false);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hackbright
--

SELECT pg_catalog.setval('public.users_user_id_seq', 10, true);


--
-- Name: charging_station_levels charging_station_levels_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.charging_station_levels
    ADD CONSTRAINT charging_station_levels_pkey PRIMARY KEY (charging_level_id);


--
-- Name: charging_stations charging_stations_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.charging_stations
    ADD CONSTRAINT charging_stations_pkey PRIMARY KEY (station_id);


--
-- Name: electric_vehicles electric_vehicles_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.electric_vehicles
    ADD CONSTRAINT electric_vehicles_pkey PRIMARY KEY (ev_id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: charging_stations charging_stations_charging_level_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.charging_stations
    ADD CONSTRAINT charging_stations_charging_level_id_fkey FOREIGN KEY (charging_level_id) REFERENCES public.charging_station_levels(charging_level_id);


--
-- Name: charging_stations charging_stations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.charging_stations
    ADD CONSTRAINT charging_stations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: reviews reviews_station_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_station_id_fkey FOREIGN KEY (station_id) REFERENCES public.charging_stations(station_id);


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: users users_ev_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: hackbright
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_ev_id_fkey FOREIGN KEY (ev_id) REFERENCES public.electric_vehicles(ev_id);


--
-- PostgreSQL database dump complete
--

