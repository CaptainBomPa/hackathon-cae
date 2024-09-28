from dataclasses import dataclass

@dataclass(frozen=True)
class NGO:
    id: str
    name: str
    strategy: str
    experience: str
    social_objectives: str

@dataclass(frozen=True)
class Company:
    id: str
    name: str
    social_strategy: str
    business_objectives: str
    social_objectives: str

@dataclass(frozen=True)
class Volunteer:
    id: str
    name: str
    social_strategy: str
    business_objectives: str
    social_objectives: str
