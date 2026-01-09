import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.html',
})
export class AdminUsers implements OnInit {
  userService = inject(UserService);
  users = this.userService.users;

  ngOnInit() {
    this.userService.getAllUsers();
  }

  deleteUser(id: string) {
    if(confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.userService.getAllUsers(),
        error: (err) => console.error('Error deleting user', err)
      });
    }
  }

  updateRole(user: any, event: any) {
    const newRole = event.target.value;
    if (confirm(`Change role of ${user.name} to ${newRole}?`)) {
      this.userService.updateUser(user._id, { role: newRole }).subscribe({
        next: () => {
          // Optimistic update or refresh
          this.userService.getAllUsers();
          // alert('Role updated successfully');
        },
        error: (err) => {
          console.error('Error updating role', err);
          alert(err.error?.message || 'Error updating role');
          this.userService.getAllUsers(); // Revert on error
        }
      });
    } else {
        // Revert selection if cancelled
        event.target.value = user.role;
    }
  }
}
