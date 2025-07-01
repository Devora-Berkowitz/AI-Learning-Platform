--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: myuser
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO myuser;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: myuser
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Category" OWNER TO myuser;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO myuser;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Prompt; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."Prompt" (
    id integer NOT NULL,
    "userId" text NOT NULL,
    "categoryId" integer NOT NULL,
    "subCategoryId" integer NOT NULL,
    prompt text NOT NULL,
    response text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Prompt" OWNER TO myuser;

--
-- Name: Prompt_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."Prompt_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Prompt_id_seq" OWNER TO myuser;

--
-- Name: Prompt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."Prompt_id_seq" OWNED BY public."Prompt".id;


--
-- Name: SubCategory; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."SubCategory" (
    id integer NOT NULL,
    name text NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public."SubCategory" OWNER TO myuser;

--
-- Name: SubCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public."SubCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SubCategory_id_seq" OWNER TO myuser;

--
-- Name: SubCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public."SubCategory_id_seq" OWNED BY public."SubCategory".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    phone text NOT NULL,
    role text DEFAULT 'user'::text NOT NULL
);


ALTER TABLE public."User" OWNER TO myuser;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO myuser;

--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Prompt id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Prompt" ALTER COLUMN id SET DEFAULT nextval('public."Prompt_id_seq"'::regclass);


--
-- Name: SubCategory id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."SubCategory" ALTER COLUMN id SET DEFAULT nextval('public."SubCategory_id_seq"'::regclass);


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Category" (id, name) FROM stdin;
1	Science
2	Technology
3	Mathematics
4	History
5	Literature
\.


--
-- Data for Name: Prompt; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."Prompt" (id, "userId", "categoryId", "subCategoryId", prompt, response, "createdAt") FROM stdin;
1	033123712	4	12	Tell me about 'October 7th', Israel's war with Gaza.	October 7th is a significant date in the history of Israel's conflict with Gaza as it marks the beginning of a major military operation carried out by the Israel Defense Forces (IDF) in retaliation to ongoing rocket attacks from Palestinian militants in Gaza.\n\nThe conflict escalated on October 7th, when the IDF launched a series of airstrikes targeting Hamas and Islamic Jihad positions in Gaza in response to the firing of rockets towards Israeli communities. The Israeli government stated that the operation was in self-defense and aimed at stopping the rocket attacks and dismantling terrorist infrastructure in Gaza.\n\nThe operation resulted in significant destruction in Gaza, including civilian casualties and widespread damage to infrastructure. On the Israeli side, communities near the Gaza border were subjected to constant rocket fire, causing fear and disruption to daily life.\n\nThe conflict continued for several days, with both sides exchanging fire and engaging in battles on the ground. In the end, a ceasefire agreement was brokered by Egypt, bringing an end to the hostilities.\n\nOctober 7th serves as a reminder of the ongoing tensions and violence between Israel and Gaza, and the challenges facing efforts to achieve a lasting peace in the region.	2025-06-24 10:33:11.41
8	123456782	1	1	Explain Newton's Laws	Newton's laws of motion are three fundamental principles that describe the relationship between an object and the forces acting upon it. They were formulated by Sir Isaac Newton in the 17th century and laid the foundation for classical mechanics.\n\n1. First Law (Law of Inertia): An object at rest will remain at rest, and an object in motion will continue in motion with a constant velocity unless acted upon by an external force. In other words, an object will maintain its state of motion unless a net force is applied to it.\n\n2. Second Law (Law of Acceleration): The acceleration of an object is directly proportional to the net force acting upon it and inversely proportional to its mass. This relationship is described by the equation F = ma, where F represents the net force, m is the mass of the object, and a is the acceleration.\n\n3. Third Law (Action-Reaction Law): For every action, there is an equal and opposite reaction. This means that whenever one object exerts a force on a second object, the second object exerts an equal and opposite force back on the first object. Forces always occur in pairs.\n\nOverall, Newton's laws of motion provide a framework for understanding the nature of motion and the relationship between forces and the motion of objects. They are fundamental principles in physics and are still widely used to describe the behavior of objects in motion.	2025-06-24 11:02:50.389
9	567890126	5	13	How Does Modern Poetry Reflect Social and Political Issues?	Failed to fetch response from OpenAI.	2025-06-24 11:12:53.663
10	567890126	2	7	Provide an overview of how Progressive Web Apps (PWAs) are transforming mobile web usage.	Progressive Web Apps (PWAs) are changing the way mobile web usage is experienced by offering a more streamlined and user-friendly experience compared to traditional mobile websites. \n\nOne of the key features of PWAs is their ability to work offline, allowing users to access the app's content even without an internet connection. This is made possible by caching key resources and data, which ensures that the app can still be used in areas with limited or no connectivity.\n\nPWAs are also designed to be fast and responsive, providing a smooth and seamless user experience. This is achieved through techniques such as lazy loading of content, aggressive caching, and pre-fetching of resources, which help reduce load times and improve overall performance.\n\nMoreover, PWAs can be installed on a user's device, giving them a more app-like experience without the need to download and install an app from the app store. This makes it more convenient for users to access the app, as they can simply add it to their home screen with just a few taps.\n\nOverall, PWAs are transforming mobile web usage by offering a more engaging and user-friendly experience, while also providing the benefits of offline access, improved performance, and easy installation. This has led to an increase in adoption of PWAs by businesses looking to enhance their mobile web presence and provide a better experience for their users.	2025-06-24 14:06:27.624
11	678901237	4	11	Summarize the main political structures of Ancient Greece.	Ancient Greece was a collection of independent city-states, each with its own government and political structure. The two most prominent city-states were Athens and Sparta. Athens was a democracy, where all citizens could participate in decision-making through the Assembly and other democratic institutions. Sparta, on the other hand, was an oligarchy ruled by a small group of elites. Other city-states had varying forms of government, such as tyrannies, monarchies, and aristocracies. Overall, Ancient Greece was characterized by a diverse mix of political systems that reflected the values and interests of its citizens.	2025-06-24 14:07:45.432
12	033123712	3	9	How Does Calculus Help in Predicting Population Growth?	Calculus can help in predicting population growth by analyzing trends in population data over time and making projections about future growth rates. For example, calculus can be used to calculate the rate of change of a population over time, which can then be used to predict future population sizes. Calculus can also be used to model complex population dynamics, such as birth rates, death rates, immigration, and emigration, in order to make more accurate predictions about population growth. Overall, calculus provides a powerful tool for understanding and predicting complex population dynamics.	2025-06-24 14:09:01.433
13	345678904	5	14	In What Ways Has Science Fiction Predicted Technological Advances?	Science fiction has often been ahead of its time in predicting technological advances. Some ways in which science fiction has predicted future technologies include:\n\n1. Space travel: Many works of science fiction, such as Jules Verne's "From the Earth to the Moon" and Arthur C. Clarke's "2001: A Space Odyssey," predicted the possibility of space travel long before it became a reality.\n\n2. Robots and artificial intelligence: Science fiction has long explored the concept of robots and artificial intelligence, with works like Isaac Asimov's "I, Robot" envisioning a future where robots are commonplace.\n\n3. Communication technology: Science fiction has predicted the development of technologies like video calls, instant messaging, and virtual reality, with works like George Orwell's "1984" and William Gibson's "Neuromancer" foreshadowing the way we communicate today.\n\n4. Biotechnology: Science fiction has explored the possibilities of genetic engineering, cloning, and other biotechnologies, with works like Aldous Huxley's "Brave New World" and Margaret Atwood's "Oryx and Crake" imagining how these technologies could shape the future.\n\n5. Nanotechnology: Science fiction has also predicted the development of nanotechnology, with works like Michael Crichton's "Prey" and Neal Stephenson's "The Diamond Age" exploring the potential for manipulating matter at the atomic and molecular level.\n\nOverall, science fiction has been a source of inspiration and prediction for many technological advances, serving as a creative and forward-thinking platform for envisioning the future of technology.	2025-06-24 14:10:22.876
14	456789015	1	4	Evaluate the possibilities of sustaining life on exoplanets.	Sustaining life on exoplanets is a complex and challenging prospect that depends on a variety of factors, including the planet's size, composition, distance from its host star, and potential for liquid water. \n\nOne of the key requirements for sustaining life as we know it is the presence of liquid water, which is necessary for chemical reactions and the development of biological processes. Exoplanets located within the habitable zone of their star, where the temperature allows for the existence of liquid water, are considered potential candidates for hosting life.\n\nOther factors that are important for sustaining life on exoplanets include the presence of a stable atmosphere, a magnetic field to protect from harmful radiation, and a suitable mix of elements and compounds for biological processes. The planet's size and composition also play a role in determining its potential habitability, as well as the presence of volcanic activity and tectonic processes that can recycle nutrients and maintain a stable environment.\n\nFuture missions, such as the James Webb Space Telescope and upcoming exoplanet missions, will provide more data and insights into the conditions and potential for life on exoplanets. While the possibilities of sustaining life on exoplanets are still largely unknown, ongoing research and technological advancements may help us better understand and potentially support life beyond Earth in the future.	2025-06-24 14:11:43.265
15	678901237	2	6	Discuss ethical dilemmas associated with the development of autonomous vehicles.	One ethical dilemma associated with the development of autonomous vehicles is the question of liability and responsibility in the event of accidents. If an autonomous vehicle is involved in a collision, who should be held accountable - the manufacturer, the owner, the programmer, or the vehicle itself? This raises concerns about how to allocate blame and whether current laws and regulations adequately address these issues.\n\nAnother ethical dilemma is the potential for bias in the programming of autonomous vehicles. For example, if a situation arises where a crash is inevitable, how should the autonomous vehicle prioritize protecting its occupants versus minimizing harm to others on the road? Decisions about what actions to take in these scenarios may inadvertently reflect societal biases or values, which could lead to discriminatory outcomes.\n\nThere is also concern about the impact of autonomous vehicles on jobs and the economy. The widespread adoption of autonomous vehicles could result in the displacement of millions of workers in industries such as transportation and logistics. This raises questions about how to mitigate the social and economic consequences of increased automation and ensure that the benefits of autonomous vehicles are equitably distributed.\n\nOverall, the development of autonomous vehicles presents a range of ethical dilemmas that must be carefully considered and addressed to ensure that these technologies are deployed in a safe, ethical, and equitable manner. This will require collaboration between policymakers, industry stakeholders, and ethicists to establish guidelines and regulations that prioritize safety, fairness, and accountability in the development and deployment of autonomous vehicles.	2025-06-24 14:15:18.534
16	234567893	4	12	What Were the Long-Term Impacts of the Industrial Revolution?	1. Urbanization: The Industrial Revolution led to a rapid increase in urbanization as people migrated from rural areas to cities in search of employment in factories and industries. This led to the growth of cities and the development of infrastructure to support the increasing population.\n\n2. Economic growth: The Industrial Revolution spurred economic growth by increasing productivity and efficiency in manufacturing processes. This led to the creation of wealth and the expansion of the middle class. It also laid the foundation for modern capitalism and the global economy.\n\n3. Technological advancements: The Industrial Revolution brought about significant technological advancements in various fields, such as transportation, communication, and manufacturing. These advancements laid the groundwork for further innovation and progress in the years to come.\n\n4. Social change: The Industrial Revolution brought about significant social changes, including the rise of the working class and the emergence of labor unions to fight for workers' rights. It also led to the creation of new social classes and altered traditional social structures.\n\n5. Environmental impact: The Industrial Revolution had a significant environmental impact, as it led to increased pollution, deforestation, and the depletion of natural resources. This laid the groundwork for future environmental challenges and the need for sustainable development practices.\n\n6. Globalization: The Industrial Revolution laid the foundation for globalization by increasing trade and economic interconnectedness between different countries. This led to the spread of technology, ideas, and culture across borders and facilitated the growth of international trade networks.	2025-06-24 14:16:32.158
17	123456782	2	5	List the advantages of using TypeScript over JavaScript in large-scale projects.	1. Type checking: TypeScript includes static type checking, which can help catch errors during development and ensure more robust code. This can be particularly beneficial in large-scale projects where there are multiple developers working on the codebase.\n\n2. Better tooling support: TypeScript offers features such as code navigation, auto-completion, and refactoring tools that are not available in JavaScript. This can improve productivity and make it easier to work with large codebases.\n\n3. Improved readability and maintainability: By adding type annotations to code, TypeScript can make the code easier to understand and maintain. This can be especially important in large projects with many contributors.\n\n4. Strict null checking: TypeScript includes strict null checking, which can help prevent null and undefined errors in code. This can be helpful in large projects where it may be more difficult to track down these types of errors.\n\n5. Enhanced ES6+ features: TypeScript includes support for modern JavaScript features such as ES6+ syntax, modules, and async/await. This can make it easier to write clean and concise code in large projects.\n\n6. Strong ecosystem and community support: TypeScript has a strong ecosystem of tools, libraries, and resources that can help developers build and maintain large-scale projects. Additionally, TypeScript has a large and active community that can provide support and guidance.	2025-06-24 14:18:02.583
18	033123712	1	3	How Does DNA Replication Ensure Genetic Fidelity?	DNA replication is a highly accurate process that ensures genetic fidelity by employing several mechanisms to minimize errors. \n\n1. Proofreading: DNA polymerase, the enzyme responsible for synthesizing new DNA strands, has a built-in proofreading mechanism. It can recognize when an incorrect nucleotide has been incorporated and can remove the incorrect nucleotide before continuing with DNA synthesis.\n\n2. Mismatch repair: After DNA replication is complete, other enzymes scan the newly synthesized DNA for any mismatched base pairs. If any errors are detected, these enzymes will remove the incorrect nucleotide and replace it with the correct one.\n\n3. Error-correcting enzymes: In addition to proofreading and mismatch repair mechanisms, there are specific enzymes in the cell that are responsible for correcting any DNA replication errors that may occur.\n\nTogether, these mechanisms work to ensure that DNA replication is highly accurate and results in the faithful transmission of genetic information from one generation to the next.	2025-06-24 14:20:34.393
19	033123712	1	4	Have people ever been to Mars?	As of now, no one has ever been to Mars. NASA has sent multiple unmanned spacecraft to Mars, and there are plans for a manned mission in the future, but no humans have set foot on the planet as of yet.	2025-06-25 11:11:56.43
\.


--
-- Data for Name: SubCategory; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."SubCategory" (id, name, "categoryId") FROM stdin;
1	Physics	1
2	Chemistry	1
3	Biology	1
4	Space	1
5	Programming	2
6	Artificial Intelligence	2
7	Web Development	2
8	Algebra	3
9	Calculus	3
10	Geometry	3
11	Ancient History	4
12	Modern History	4
13	Poetry	5
14	Fiction	5
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public."User" (id, name, phone, role) FROM stdin;
123456789	Admin User	0501234567	admin
033123712	Yoav Mor	0552127631	user
123456782	Alice Cohen	0501111111	user
234567893	David Levi	0502222222	user
345678904	Sara Mizrahi	0503333333	user
456789015	Yossi Bar	0504444444	user
567890126	Noa Green	0505555555	user
678901237	Lior Katz	0506666666	user
123	John	0501234567	user
b0897c86-4025-4e4b-b8e4-15e611c9928d	John	0501234567	user
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
45c2194b-3f4d-4d63-b784-cfab5097c416	4e8ab5d477125209368918858460467645eb4b9521bcd13ff0b1a28a86750303	2025-06-24 09:35:55.749378+00	20250623103216_change_id_to_string	\N	\N	2025-06-24 09:35:55.712278+00	1
bf500ab6-0d29-48cb-87f5-0d2fe10448b1	25524a6422faa4e621296c10095a89e032e4ba0073e4283930d3dc14e354605e	2025-06-24 09:35:55.781532+00	20250624091905_input_role	\N	\N	2025-06-24 09:35:55.757752+00	1
\.


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."Category_id_seq"', 1, false);


--
-- Name: Prompt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."Prompt_id_seq"', 19, true);


--
-- Name: SubCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public."SubCategory_id_seq"', 1, false);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Prompt Prompt_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Prompt"
    ADD CONSTRAINT "Prompt_pkey" PRIMARY KEY (id);


--
-- Name: SubCategory SubCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."SubCategory"
    ADD CONSTRAINT "SubCategory_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Prompt Prompt_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Prompt"
    ADD CONSTRAINT "Prompt_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Prompt Prompt_subCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Prompt"
    ADD CONSTRAINT "Prompt_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES public."SubCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Prompt Prompt_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."Prompt"
    ADD CONSTRAINT "Prompt_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SubCategory SubCategory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public."SubCategory"
    ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: myuser
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

