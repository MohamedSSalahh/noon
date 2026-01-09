import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-vendors',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  template: `
    <div class="container p-4">
      <h2 class="text-2xl font-bold mb-4">Vendor Management</h2>
      
      <table mat-table [dataSource]="vendors" class="w-full bg-white shadow-md rounded-lg overflow-hidden">
        
        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let element"> {{element.name}} </td>
        </ng-container>

        <!-- Email Column -->
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef> Email </th>
          <td mat-cell *matCellDef="let element"> {{element.email}} </td>
        </ng-container>
        
        <!-- Verified Column -->
        <ng-container matColumnDef="verified">
          <th mat-header-cell *matHeaderCellDef> Verified </th>
          <td mat-cell *matCellDef="let element"> 
            <span [class]="element.isVerifiedVendor ? 'text-green-600' : 'text-red-600'">
               {{element.isVerifiedVendor ? 'Yes' : 'No'}}
            </span>
          </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let element">
            <button mat-button color="primary" *ngIf="!element.isVerifiedVendor" (click)="verifyVendor(element._id)">
               Verify
            </button>
            <button mat-button color="warn" *ngIf="element.isVerifiedVendor" (click)="rejectVendor(element._id)">
               Revoke
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    table { width: 100%; }
  `]
})
export class AdminVendors {
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);
  vendors: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'verified', 'actions'];
  apiUrl = environment.apiUrl;

  ngOnInit() {
    this.loadVendors();
  }

  loadVendors() {
     // Assuming we have an endpoint or we filter users by role=vendor
     this.http.get<{data: any[]}>(`${this.apiUrl}/users?role=vendor`).subscribe({
        next: (res) => {
           this.vendors = res.data;
        },
        error: () => this.showSnack('Failed to load vendors')
     });
  }

  verifyVendor(id: string) {
     this.updateVendor(id, true);
  }

  rejectVendor(id: string) {
     this.updateVendor(id, false);
  }

  updateVendor(id: string, status: boolean) {
     this.http.put(`${this.apiUrl}/users/${id}`, { isVerifiedVendor: status }).subscribe({
        next: () => {
           this.showSnack(`Vendor ${status ? 'verified' : 'revoked'}`);
           this.loadVendors();
        },
        error: () => this.showSnack('Action failed')
     });
  }

  showSnack(msg: string) {
    this.snackBar.open(msg, 'Close', { duration: 3000 });
  }
}
