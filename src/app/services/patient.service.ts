import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Patient } from '../patient';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private url: string = environment.apiBaseUrl + '/Patient';
  public patient!: Patient;
  constructor(public http: HttpClient) {
    this.fetchData();
  }
  async fetchData(): Promise<Patient[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? {};
  }
  async getPatientById(id: number): Promise<Patient | undefined> {
    console.log(id);
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  addPatient(
    id: number,
    code: string,
    nom: string,
    prenom: string,
    sexe: string,
    adresse: string,
    profession: string,
    gs: string,
    rh: number,
    race: string,
    poids: number,
    taille: number,
    statutMatrimonial: string,
    date_Naissance: string
  ): Observable<Patient> {
    const patient: Patient = {
      id,
      code,
      nom,
      prenom,
      sexe,
      adresse,
      profession,
      race,
      poids,
      taille,
      rh,
      gs,
      statutMatrimonial,
      date_Naissance,
    };
    console.log(patient);
    return this.http.post<Patient>(this.url, patient, httpOptions);
  }
}
