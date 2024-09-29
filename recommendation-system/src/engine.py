import pandas as pd

from dataclasses import dataclass

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


@dataclass(frozen=True)
class RecommendationEngine:
    tfidf_vectorizer = TfidfVectorizer()

    def get_companies_for_ngo(self, ngo, companies):
        ngo_data =  {
            'social_goals': [ngo.social_goals],
            'strategies': [ngo.strategies],
            'projects': [ngo.projects],
            'project_experience': [ngo.project_experience]
        }
        companies_data = {
            'social_goals': [company.social_goals for company in companies],
            'strategies': [company.strategies for company in companies],
            'partners': [company.partners for company in companies],
        }
        df_ngo = pd.DataFrame(ngo_data)
        df_companies = pd.DataFrame(companies_data)

        df_ngo['features'] = df_ngo['social_goals'] + ' ' + df_ngo['strategies'] + ' ' + df_ngo['projects'] + ' ' + df_ngo['project_experience']
        df_companies['features'] = df_companies['social_goals'] + ' ' + df_companies['strategies'] + ' ' + df_companies['partners']

        return self._get_recommendations(df_ngo, companies, df_companies)

    def get_volunteers_for_ngo(self, ngo, volunteers):
        ngo_data =  {
            'social_goals': [ngo.social_goals],
            'strategies': [ngo.strategies],
            'projects': [ngo.projects],
            'project_experience': [ngo.project_experience]
        }
        volunteers_data = {
            'social_goals': [volunteer.social_goals for volunteer in volunteers],
            'hobbies': [volunteer.hobbies for volunteer in volunteers],
            'experience': [volunteer.experience for volunteer in volunteers],
        }
        df_ngo = pd.DataFrame(ngo_data)
        df_volunteers = pd.DataFrame(volunteers_data)

        df_ngo['features'] = df_ngo['social_goals'] + ' ' + df_ngo['strategies'] + ' ' + df_ngo['projects'] + ' ' + df_ngo['project_experience']
        df_volunteers['features'] = df_volunteers['social_goals'] + ' ' + df_volunteers['hobbies'] + ' ' + df_volunteers['experience']

        return self._get_recommendations(df_ngo, volunteers, df_volunteers)

    def get_ngos_for_company(self, company, ngos):
        company_data = {
            'social_goals': [company.social_goals],
            'strategies': [company.strategies],
            'partners': [company.partners],
        }
        ngos_data =  {
            'social_goals': [ngo.social_goals for ngo in ngos],
            'strategies': [ngo.strategies for ngo in ngos],
            'projects': [ngo.projects for ngo in ngos],
            'project_experience': [ngo.project_experience for ngo in ngos]
        }
        df_company = pd.DataFrame(company_data)
        df_ngos = pd.DataFrame(ngos_data)

        df_company['features'] = df_company['social_goals'] + ' ' + df_company['strategies'] + ' ' + df_company['partners']
        df_ngos['features'] = df_ngos['social_goals'] + ' ' + df_ngos['strategies'] + ' ' + df_ngos['projects'] + ' ' + df_ngos['project_experience']

        return self._get_recommendations(df_company, ngos, df_ngos)

    def get_ngos_for_volunteer(self, volunteer, ngos):
        volunteer_data = {
            'social_goals': [volunteer.social_goals],
            'hobbies': [volunteer.hobbies],
            'experience': [volunteer.experience],
        }
        ngos_data =  {
            'social_goals': [ngo.social_goals for ngo in ngos],
            'strategies': [ngo.strategies for ngo in ngos],
            'projects': [ngo.projects for ngo in ngos],
            'project_experience': [ngo.project_experience for ngo in ngos]
        }
        df_volunteer = pd.DataFrame(volunteer_data)
        df_ngos = pd.DataFrame(ngos_data)

        df_volunteer['features'] = df_volunteer['social_goals'] + ' ' + df_volunteer['hobbies'] + ' ' + df_volunteer['experience']
        df_ngos['features'] = df_ngos['social_goals'] + ' ' + df_ngos['strategies'] + ' ' + df_ngos['projects'] + ' ' + df_ngos['project_experience']

        return self._get_recommendations(df_volunteer, ngos, df_ngos)

    def _get_recommendations(self, df_target, companies, df_recommendations):
        tfidf_target = self.tfidf_vectorizer.fit_transform(df_target['features'])
        tfidf_recommendations = self.tfidf_vectorizer.transform(df_recommendations['features'])
        similarity_matrix = cosine_similarity(tfidf_target, tfidf_recommendations)
        recommendations = []
        for idx, val in enumerate(similarity_matrix[0]):
            recommendations.append((companies[idx], val))
        recommendations_sorted = sorted(recommendations, key=lambda x: x[1], reverse=True)
        return [recommendation[0] for recommendation in recommendations_sorted]

