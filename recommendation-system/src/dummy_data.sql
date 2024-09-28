CREATE TABLE ngo (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    strategy TEXT NOT NULL,
    experience TEXT NOT NULL,
    social_objectives TEXT NOT NULL
);

CREATE TABLE company (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    social_strategy TEXT NOT NULL,
    business_objectives TEXT NOT NULL,
    social_objectives TEXT NOT NULL
);

INSERT INTO ngo VALUES ('1', 'EnvironmentNGO', 'Environmental protection', '10 years of forest conservation', 'Sustainability and climate change');
INSERT INTO ngo VALUES ('2', 'EducationtNGO', 'Education for children', '5 years of school development', 'Education for underprivileged');
INSERT INTO ngo VALUES ('3', 'HealthcareNGO', 'Healthcare for all', '7 years of community health work', 'Affordable healthcare');
INSERT INTO company VALUES ('1', 'EnvironmentCompany', 'Climate action and carbon reduction', 'Reduce carbon footprint', 'Climate change mitigation');
INSERT INTO company VALUES ('2', 'EducationCompany', 'Supporting education systems', 'Support educational grants', 'Improve education access');
INSERT INTO company VALUES ('3', 'Healthcare', 'Affordable health solutions', 'Healthcare innovations', 'Affordable healthcare for all');

