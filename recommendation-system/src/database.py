import psycopg2
from model import NGO, Company
from src.model import Volunteer


class Database:
    def __init__(self, database, host, user, password, port):
        self.conn = psycopg2.connect(database=database,
                                host=host,
                                user=user,
                                password=password,
                                port=port)

    def get_ngo_by_id(self, ngo_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM user where id = %s", ngo_id)
        ngo = cursor.fetchone()
        return NGO(ngo[1], ngo[4], ngo[3], ngo[7], ngo[2], ngo[12], ngo[14], ngo[13])

    def get_ngos(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM user WHERE user_type = 'NGO' LIMIT 50")
        ngos_db = cursor.fetchall()
        return [NGO(ngo[1], ngo[4], ngo[3], ngo[7], ngo[2], ngo[12], ngo[14], ngo[13]) for ngo in ngos_db]

    def get_company_by_id(self, company_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM user where id = %s", company_id)
        company = cursor.fetchone()
        return Company(company[1], company[4], company[3], company[7], company[2], company[12], company[8], company[11], company[10], company[9])

    def get_companies(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM user WHERE user_type = 'BUSINESS' LIMIT 50")
        companies_db = cursor.fetchall()
        return [Company(company[1], company[4], company[3], company[7], company[2], company[12], company[8], company[11], company[10], company[9]) for company in companies_db]

    def get_volunteer_by_id(self, volunteer_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM user where id = %s", volunteer_id)
        volunteer = cursor.fetchone()
        return Volunteer(volunteer[1], volunteer[4], volunteer[3], volunteer[7], volunteer[2], volunteer[17], volunteer[15])

    def get_volunteers(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM user WHERE user_type = 'VOLUNTEER' LIMIT 50")
        volunteers_db = cursor.fetchall()
        return [Volunteer(volunteer[1], volunteer[4], volunteer[3], volunteer[7], volunteer[2], volunteer[17], volunteer[15]) for volunteer in volunteers_db]