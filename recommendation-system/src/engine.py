import pandas as pd

from dataclasses import dataclass

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


@dataclass(frozen=True)
class RecommendationEngine:
    tfidf_vectorizer = TfidfVectorizer()

    def get_companies_for_ngo(self, ngo, companies):
        ngo_data =  {
            'name': [ngo.name],
            'strategy': [ngo.strategy],
            'experience': [ngo.experience],
            'social_objectives': [ngo.social_objectives],
        }
        companies_data = {
            'name': [company.name for company in companies],
            'social_strategy': [company.social_strategy for company in companies],
            'business_objectives': [company.business_objectives for company in companies],
            'social_objectives': [company.social_objectives for company in companies],
        }
        df_ngo = pd.DataFrame(ngo_data)
        df_companies = pd.DataFrame(companies_data)

        df_ngo['features'] = df_ngo['strategy'] + ' ' + df_ngo['experience'] + ' ' + df_ngo['social_objectives']
        df_companies['features'] = df_companies['social_strategy'] + ' ' + df_companies['business_objectives'] + ' ' + df_companies['social_objectives']

        return self._get_recommendations(df_ngo, companies, df_companies)

    def get_volunteers_for_ngo(self, ngo, companies):
        ngo_data =  {
            'strategy': [ngo.strategy],
            'experience': [ngo.experience],
            'social_objectives': [ngo.social_objectives],
        }
        volunteers_data = {
            'social_strategy': [company.social_strategy for company in volunteers],
            'business_objectives': [company.business_objectives for company in volunteers],
            'social_objectives': [company.social_objectives for company in volunteers],
        }
        df_ngo = pd.DataFrame(ngo_data)
        df_volunteers = pd.DataFrame(volunteers_data)

        df_ngo['features'] = df_ngo['strategy'] + ' ' + df_ngo['experience'] + ' ' + df_ngo['social_objectives']
        df_volunteers['features'] = df_volunteers['social_strategy'] + ' ' + df_volunteers['business_objectives'] + ' ' + df_volunteers['social_objectives']

        return self._get_recommendations(df_ngo, volunteers, df_volunteers)

    def get_ngos_for_company(self, company, ngos):
        company_data =  {
            'social_strategy': [company.social_strategy],
            'business_objectives': [company.business_objectives],
            'social_objectives': [company.social_objectives],
        }
        ngos_data = {
            'strategy': [ngo.strategy for ngo in ngos],
            'experience': [ngo.experience for ngo in ngos],
            'social_objectives': [ngo.social_objectives for ngo in ngos],
        }
        df_company = pd.DataFrame(company_data)
        df_ngos = pd.DataFrame(ngos_data)

        df_company['features'] = df_company['social_strategy'] + ' ' + df_company['business_objectives'] + ' ' + df_company['social_objectives']
        df_ngos['features'] = df_ngos['strategy'] + ' ' + df_ngos['experience'] + ' ' + df_ngos['social_objectives']

        return self._get_recommendations(df_company, ngos, df_ngos)

    def get_ngos_for_volunteer(self, volunteer, ngos):
        volunteer_data =  {
            'social_strategy': [volunteer.social_strategy],
            'business_objectives': [volunteer.business_objectives],
            'social_objectives': [volunteer.social_objectives],
        }
        ngos_data = {
            'strategy': [ngo.strategy for ngo in ngos],
            'experience': [ngo.experience for ngo in ngos],
            'social_objectives': [ngo.social_objectives for ngo in ngos],
        }
        df_volunteer = pd.DataFrame(volunteer_data)
        df_ngos = pd.DataFrame(ngos_data)

        df_volunteer['features'] = df_volunteer['social_strategy'] + ' ' + df_volunteer['business_objectives'] + ' ' + df_volunteer['social_objectives']
        df_ngos['features'] = df_ngos['strategy'] + ' ' + df_ngos['experience'] + ' ' + df_ngos['social_objectives']

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

