from dataclasses import dataclass
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

@dataclass(frozen=True)
class RecommendationEngine:
    tfidf_vectorizer = TfidfVectorizer()

    def get_recommendations(self, target_name_column, df_target, recommendations_name_column, df_recommendations):
        tfidf_target = self.tfidf_vectorizer.fit_transform(df_target['features'])
        tfidf_recommendations = self.tfidf_vectorizer.transform(df_recommendations['features'])
        similarity_matrix = cosine_similarity(tfidf_target, tfidf_recommendations)
        similarity_df = pd.DataFrame(similarity_matrix, index=df_ngos[target_name_column], columns=df_companies[recommendations_name_column])
        print(similarity_df)
        print('---')


# ngo_data = {
#     'ngo_id': [1, 2, 3],
#     'ngo_name': ['NGO1', 'NGO2', 'NGO3'],
#     'strategy': ['Environmental protection', 'Education for children', 'Healthcare for all'],
#     'experience': ['10 years of forest conservation', '5 years of school development', '7 years of community health work'],
#     'social_objectives': ['Sustainability and climate change', 'Education for underprivileged', 'Affordable healthcare'],
#     'team': ['Team of environmentalists', 'Team of educators', 'Team of doctors and nurses']
# }

ngo_data = {
    'ngo_id': [1],
    'ngo_name': ['NGO1'],
    'strategy': ['Environmental protection'],
    'experience': ['10 years of forest conservation'],
    'social_objectives': ['Sustainability and climate change'],
    'team': ['Team of environmentalists']
}

company_data = {
    'name': ['Company1', 'Company2', 'Company3'],
    'social_strategy': ['Climate action and carbon reduction', 'Supporting education systems', 'Affordable health solutions'],
    'business_objectives': ['Reduce carbon footprint', 'Support educational grants', 'Healthcare innovations'],
    'social_objectives': ['Climate change mitigation', 'Improve education access', 'Affordable healthcare for all'],
}

df_ngos = pd.DataFrame(ngo_data)
df_companies = pd.DataFrame(company_data)

df_ngos['features'] = df_ngos['strategy'] + ' ' + df_ngos['experience'] + ' ' + df_ngos['social_objectives'] + ' ' + df_ngos['team']

df_companies['features'] = df_companies['social_strategy'] + ' ' + df_companies['business_objectives'] + ' ' + df_companies['social_objectives']

tfidf_vectorizer = TfidfVectorizer()

tfidf_ngos = tfidf_vectorizer.fit_transform(df_ngos['features'])

tfidf_companies = tfidf_vectorizer.transform(df_companies['features'])

similarity_matrix = cosine_similarity(tfidf_ngos, tfidf_companies)

similarity_df = pd.DataFrame(similarity_matrix, index=df_ngos['ngo_name'], columns=df_companies['name'])

# Display similarity scores
print(similarity_df)

# Function to get top N company recommendations for an NGO
def recommend_companies_for_ngo(ngo_name, top_n=3):
    if ngo_name in similarity_df.index:
        recommendations = similarity_df.loc[ngo_name].sort_values(ascending=False).head(top_n)
        return recommendations
    else:
        return "NGO not found."

# Function to get top N NGO recommendations for a Company
def recommend_ngos_for_company(company_name, top_n=3):
    if company_name in similarity_df.columns:
        recommendations = similarity_df[company_name].sort_values(ascending=False).head(top_n)
        return recommendations
    else:
        return "Company not found."

# Example: Recommend top 3 companies for NGO1
print("Top company recommendations for NGO1:")
print(recommend_companies_for_ngo('NGO2'))

# Example: Recommend top 3 NGOs for Company1
print("Top NGO recommendations for Company2:")
print(recommend_ngos_for_company('Company2'))