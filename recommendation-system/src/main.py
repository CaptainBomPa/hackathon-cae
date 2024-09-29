from dataclasses import asdict

from flask import Flask, request, jsonify

from engine import RecommendationEngine
from database import Database
import os

app = Flask(__name__)
engine = RecommendationEngine()

@app.route('/recommendations/ngo/companies')
def get_companies_for_ngo():
    ngo_id = request.args.get('id')
    ngo = db.get_ngo_by_id(ngo_id)
    companies = db.get_companies()
    recommended_companies = engine.get_companies_for_ngo(ngo, companies)
    recommended_companies = [asdict(company) for company in recommended_companies]
    response = jsonify(recommended_companies)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/recommendations/ngo/volunteers')
def get_companies_for_volunteer():
    ngo_id = request.args.get('id')
    ngo = db.get_ngo_by_id(ngo_id)
    volunteers = db.get_volunteers()
    recommended_volunteers = engine.get_volunteers_for_ngo(ngo, volunteers)
    recommended_volunteers = [asdict(volunteer) for volunteer in recommended_volunteers]
    response = jsonify(recommended_volunteers)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/recommendations/company')
def get_ngos_for_company():
    company_id = request.args.get('id')
    company = db.get_company_by_id(company_id)
    ngos = db.get_ngos()
    recommended_ngos = engine.get_ngos_for_company(company, ngos)
    recommended_ngos = [asdict(ngo) for ngo in recommended_ngos]
    response = jsonify(recommended_ngos)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/recommendations/volunteer')
def get_ngos_for_volunteer():
    volunteer_id = request.args.get('id')
    volunteer = db.get_volunteer_by_id(volunteer_id)
    ngos = db.get_ngos()
    recommended_ngos = engine.get_ngos_for_volunteer(volunteer, ngos)
    recommended_ngos = [asdict(ngo) for ngo in recommended_ngos]
    response = jsonify(recommended_ngos)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    DATABASE_URL = os.getenv('DATABASE_URL')
    db = Database(DATABASE_URL)
    app.run(debug=True, host="0.0.0.0")
