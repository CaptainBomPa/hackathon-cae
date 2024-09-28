from dataclasses import dataclass

@dataclass(frozen=True)
class NGO:
    id: str
    name: str
    email: str
    social_goals: str
    description: str
    strategies: str
    projects: str
    project_experience: str

@dataclass(frozen=True)
class Company:
    id: str
    name: str
    email: str
    social_goals: str
    description: str
    strategies: str
    budget: int
    partners: str
    grants: str
    company_size: str

@dataclass(frozen=True)
class Volunteer:
    id: str
    name: str
    email: str
    social_goals: str
    description: str
    hobbies: str
    experience: str
