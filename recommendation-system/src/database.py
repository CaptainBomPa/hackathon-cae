import psycopg2
from model import NGO, Company
from model import Volunteer


class Database:
    def __init__(self, url):
        self.conn = psycopg2.connect(url)

    def get_ngo_by_id(self, ngo_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = %s", ngo_id)
        ngo = cursor.fetchone()
        col_names = [desc[0] for desc in cursor.description]
        ngo_dict = dict(zip(col_names, [(val if val is not None else "") for val in ngo]))
        cursor.close()
        return NGO(ngo_dict['id'], ngo_dict['name'], ngo_dict['email'], ngo_dict['social_goals'], ngo_dict['description'], ngo_dict['strategies'], ngo_dict['projects'], ngo_dict['project_experience'])

    def get_ngos(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE user_type = 'NGO' LIMIT 50")
        ngos_db = cursor.fetchall()
        col_names = [desc[0] for desc in cursor.description]
        ngos_dict = [dict(zip(col_names, [(val if val is not None else "") for val in ngo])) for ngo in ngos_db]
        cursor.close()
        return [NGO(ngo['id'], ngo['name'], ngo['email'], ngo['social_goals'], ngo['description'], ngo['strategies'], ngo['projects'], ngo['project_experience']) for ngo in ngos_dict]

    def get_company_by_id(self, company_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = %s", company_id)
        company = cursor.fetchone()
        col_names = [desc[0] for desc in cursor.description]
        company_dict = dict(zip(col_names, [(val if val is not None else "") for val in company]))
        cursor.close()
        return Company(company_dict['id'], company_dict['name'], company_dict['email'], company_dict['social_goals'], company_dict['description'], company_dict['strategies'], company_dict['budget'], company_dict['partners'], company_dict['grants'], company_dict['company_size'])

    def get_companies(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE user_type = 'BUSINESS' LIMIT 50")
        companies_db = cursor.fetchall()
        col_names = [desc[0] for desc in cursor.description]
        companies_dict = [dict(zip(col_names, [(val if val is not None else "") for val in company])) for company in companies_db]
        cursor.close()
        return [Company(company['id'], company['name'], company['email'], company['social_goals'], company['description'], company['strategies'], company['budget'], company['partners'], company['grants'], company['company_size']) for company in companies_dict]

    def get_volunteer_by_id(self, volunteer_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = %s", volunteer_id)
        volunteer = cursor.fetchone()
        col_names = [desc[0] for desc in cursor.description]
        volunteer_dict = dict(zip(col_names, [(val if val is not None else "") for val in volunteer]))
        cursor.close()
        return Volunteer(volunteer_dict['id'], volunteer_dict['name'], volunteer_dict['email'], volunteer_dict['social_goals'], volunteer_dict['description'], volunteer_dict['hobbies'], volunteer_dict['experience'])

    def get_volunteers(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE user_type = 'VOLUNTEER' LIMIT 50")
        volunteers_db = cursor.fetchall()
        col_names = [desc[0] for desc in cursor.description]
        volunteers_dict = [dict(zip(col_names, [(val if val is not None else "") for val in volunteer])) for volunteer in volunteers_db]
        cursor.close()
        return [Volunteer(volunteer['id'], volunteer['name'], volunteer['email'], volunteer['social_goals'], volunteer['description'], volunteer['hobbies'], volunteer['experience']) for volunteer in volunteers_dict]