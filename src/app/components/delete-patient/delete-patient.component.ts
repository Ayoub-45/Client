import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-delete-patient',
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.css'],
})
export class DeletePatientComponent implements OnInit {
  patientId!: number;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    // Retrieve the patient ID from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.patientId = Number(params.get('id'));
    });
  }

  deletePatient() {
    this.patientService
      .deletePatient(this.patientId)
      .then(() => {
        console.log('Patient deleted successfully');
        // Optionally, navigate to a different page or show a success message
      })
      .catch((error) => {
        console.error('Error deleting patient:', error);
        // Handle error, e.g., display error message to the user
      });
  }
}
