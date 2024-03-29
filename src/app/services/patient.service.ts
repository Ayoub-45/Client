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
  async addPatient(
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
  ): Promise<Patient | string> {
    const patient = {
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

    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      });

      if (!response.ok) {
        console.error(
          'Network response was not ok. Status code:',
          response.status
        );
        const responseBody = await response.text(); // or response.json() if the response is JSON
        console.error(
          'Network response was not ok. Response body:',
          responseBody
        );
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      return responseData as Patient;
    } catch (error) {
      return error instanceof Error ? error.message : 'Unknown error occurred';
    }
  }
  async updatePatient(
    id: number,
    updatedPatientData: Partial<Patient>
  ): Promise<Patient | string> {
    try {
      const response = await fetch(`${this.url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPatientData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      return responseData as Patient;
    } catch (error) {
      return error instanceof Error ? error.message : 'Unknown error occurred';
    }
  }
  deletePatient(patientId: number): Promise<void> {
    const deleteUrl = `${this.url}/${patientId}`;
    return this.http.delete<void>(deleteUrl).toPromise();
  }
}
