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
        cursor.execute("SELECT * FROM ngo where id = %s", ngo_id)
        ngo = cursor.fetchone()
        return NGO(ngo[0], ngo[1], ngo[2], ngo[3], ngo[4])

    def get_ngos(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM ngo LIMIT 50")
        ngos_db = cursor.fetchall()
        return [NGO(ngo[0], ngo[1], ngo[2], ngo[3], ngo[4]) for ngo in ngos_db]

    def get_company_by_id(self, company_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM company where id = %s", company_id)
        company = cursor.fetchone()
        return Company(company[0], company[1], company[2], company[3], company[4])

    def get_companies(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM company LIMIT 50")
        companies_db = cursor.fetchall()
        return [Company(company[0], company[1], company[2], company[3], company[4]) for company in companies_db]

    def get_volunteer_by_id(self, volunteer_id):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM volunteer where id = %s", volunteer_id)
        volunteer = cursor.fetchone()
        return Volunteer(volunteer[0], volunteer[1], volunteer[2], volunteer[3], volunteer[4])

    def get_volunteers(self):
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM volunteer LIMIT 50")
        volunteers_db = cursor.fetchall()
        return [Company(volunteer[0], volunteer[1], volunteer[2], volunteer[3], volunteer[4]) for volunteer in volunteers_db]

db = Database(database="root",
              host="localhost",
              user="root",
              password="secret",
              port="5433")