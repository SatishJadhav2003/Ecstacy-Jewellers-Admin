import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Edit,
  LucideAngularModule,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from 'lucide-angular';
import { User } from '../../Shared/Classes/User';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../Pipes/search.pipe';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, SearchPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  readonly search = Search;
  readonly more_horizontal = MoreHorizontal;
  readonly edit = Edit;
  readonly trash = Trash2;
  readonly plus = Plus;

  // declaration
  userList: User[] = [];
  searchInput: string = '';

  // Services
  readonly userService = inject(UsersService);

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUserList().subscribe(
      (res) => {
        this.userList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateStatus(userid: number, isactive: boolean) {
    this.userService.updateStatus(userid, !isactive).subscribe((res) => {
      console.log(res);
      this.getUserList();
    },err=>{
      console.log(err);
    });
  }
}
